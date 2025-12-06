import React from 'react';
import Layout from '@theme/Layout';

export default function SigninPage() {
  return (
    <Layout title="Sign In" description="Sign in to access your personalized learning experience">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="text--center">Sign In to Your Account</h1>
            <p className="text--center">
              Access your personalized learning experience.
            </p>
            
            <div className="margin-vert--lg">
              <div className="card">
                <div className="card__body">
                  <form>
                    <div className="margin-bottom--lg">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        className="form-control"
                      />
                    </div>
                    <div className="margin-bottom--lg">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className="form-control"
                      />
                    </div>
                    <div className="margin-bottom--lg">
                      <button type="submit" className="button button--primary button--block">
                        Sign In
                      </button>
                    </div>
                  </form>
                  
                  <div className="text--center">
                    <a href="/signup">Don't have an account? Sign up</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}