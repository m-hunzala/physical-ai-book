import { useState, useEffect } from 'react';
// Placeholder import - in a real implementation, you would use the proper auth library
// import { useAuth } from 'better-auth/react';

// For now, we'll create a mock auth context for the component to work
const useAuth = () => {
  return {
    session: null
  };
};
import { personalizeChapterContent } from '../../auth/personalization';

const PersonalizeChapterButton = ({ chapterContent, onPersonalize }) => {
  const { session } = useAuth();
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handlePersonalizeClick = async () => {
    if (!session?.user) {
      alert('Please log in to personalize content');
      return;
    }

    setIsPersonalizing(true);
    
    try {
      // Fetch user profile
      const response = await fetch('/api/auth/session', {
        headers: {
          'Authorization': `Bearer ${session.accessToken}` // This would need to be adapted based on Better Auth's actual implementation
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      
      const userData = await response.json();
      const userProfile = userData.user; // The profile data from our Neon table
      
      // Personalize the content
      const personalizedContent = personalizeChapterContent(chapterContent, userProfile);
      
      // Call the parent component's callback to update the content
      if (onPersonalize) {
        onPersonalize(personalizedContent);
      }
      
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
      
    } catch (error) {
      console.error('Error personalizing content:', error);
      alert('Error personalizing content: ' + error.message);
    } finally {
      setIsPersonalizing(false);
    }
  };

  // Alternative approach if we need to fetch profile separately
  const handlePersonalizeClickAlt = async () => {
    if (!session?.user) {
      alert('Please log in to personalize content');
      return;
    }

    setIsPersonalizing(true);
    
    try {
      // In a real implementation, this would be a protected route that requires authentication
      const response = await fetch(`/api/auth/profile/${session.user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          alert('Please complete your profile first');
          return;
        }
        throw new Error('Failed to fetch user profile');
      }
      
      const userProfile = await response.json();
      
      // Personalize the content
      const personalizedContent = personalizeChapterContent(chapterContent, userProfile);
      
      // Call the parent component's callback to update the content
      if (onPersonalize) {
        onPersonalize(personalizedContent);
      }
      
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
      
    } catch (error) {
      console.error('Error personalizing content:', error);
      alert('Error personalizing content: ' + error.message);
    } finally {
      setIsPersonalizing(false);
    }
  };

  return (
    <div className="personalize-chapter-section mb-6">
      <button
        onClick={handlePersonalizeClickAlt}
        disabled={isPersonalizing}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md 
                   inline-flex items-center transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPersonalizing ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Personalizing...
          </>
        ) : (
          'Personalize this chapter'
        )}
      </button>
      
      {showMessage && (
        <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-md text-sm inline-block ml-2">
          Content has been personalized for your setup!
        </div>
      )}
      
      {!session?.user && (
        <div className="mt-2 p-2 bg-yellow-100 text-yellow-700 rounded-md text-sm inline-block ml-2">
          Log in to personalize content for your hardware and experience level.
        </div>
      )}
    </div>
  );
};

export default PersonalizeChapterButton;