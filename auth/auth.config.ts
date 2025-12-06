import { BetterAuth } from "better-auth";
import { postgresAdapter } from "@better-auth/postgres-adapter";
import { neon } from '@neondatabase/serverless';

// Initialize Neon database connection
const sql = neon(process.env.NEON_DB_URL || '');

// Initialize Better Auth with Postgres adapter
export const auth = BetterAuth({
  database: postgresAdapter(sql, {
    // This tells Better Auth to use our custom user profiles table
    user: {
      model: {
        table: "user_profiles",
        fields: {
          id: "id",
          email: "email",
          emailVerified: "email_verified",
          name: "name",
          image: "image",
          createdAt: "created_at",
          updatedAt: "updated_at",
        }
      }
    }
  }),
  secret: process.env.BETTER_AUTH_SECRET || 'dev-secret-change-in-production',
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },
  socialProviders: {
    // Add social providers as needed
  },
  // Custom fields for user profile
  user: {
    fields: {
      // We'll add custom profile fields using hooks
    }
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["email-password"], // Only enable for email/password
    },
  },
  session: {
    expiresIn: 7 * 24 * 60 * 60, // 1 week
    updateAge: 24 * 60 * 60, // 1 day
  }
});

// Create the user profile table if it doesn't exist
export async function initializeUserProfileTable() {
  try {
    await sql(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        email_verified BOOLEAN DEFAULT false,
        country VARCHAR(100),
        primary_os VARCHAR(50),
        gpu VARCHAR(100),
        experience_level VARCHAR(20) CHECK (experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
        main_domain VARCHAR(50) CHECK (main_domain IN ('Robotics', 'Computer Vision', 'Embedded')),
        hardware_owned TEXT[], -- Array of hardware strings
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create indexes
    await sql(`CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email)`);
    await sql(`CREATE INDEX IF NOT EXISTS idx_user_profiles_country ON user_profiles(country)`);
    await sql(`CREATE INDEX IF NOT EXISTS idx_user_profiles_main_domain ON user_profiles(main_domain)`);
    
    console.log("User profiles table initialized successfully");
  } catch (error) {
    console.error("Error initializing user profiles table:", error);
    throw error;
  }
}