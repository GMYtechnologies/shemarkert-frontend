// --- Example: Fetch User Profile (Requires Auth Token) ---
// Assume authToken is obtained from login/registration and stored securely
// const authToken = localStorage.getItem('authToken'); // Example retrieval

async function fetchUserProfile() {
  const url = 'http://localhost:8000/api/profile/'; // Adjust base URL

  // Check if token exists
  // const token = localStorage.getItem('authToken');
  if (!authToken) { // Using the variable from login example
    console.error('No authentication token found.');
    // Redirect to login or handle lack of auth
    return { success: false, errors: { detail: 'Not authenticated.' } };
  }

  try {
    const response = await fetch(url, {
      method: 'GET', // Default for fetch, but good to be explicit
      headers: {
        'Authorization': `Token ${authToken}`, // Include the token
        'Content-Type': 'application/json', // Often not strictly required for GET, but good practice
      },
     // body: null // Not needed for GET request
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Profile fetched successfully:', data);
      // data will contain the user profile information (from UserSerializer)
      // Update UI with profile data
      return { success: true, data };
    } else {
       // Handle specific errors (e.g., 401 Unauthorized if token is invalid/expired)
      console.error('Fetching profile failed:', data);
      if (response.status === 401) {
          // Handle expired/invalid token (e.g., clear token, redirect to login)
          // localStorage.removeItem('authToken');
          authToken = null;
      }
      return { success: false, errors: data };
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    // Handle network errors
    return { success: false, errors: { detail: 'Network error or server unreachable.' } };
  }
}

// --- Usage Example ---
// fetchUserProfile().then(result => {
//   if (result.success) {
//     console.log("User profile:", result.data);
//     // Display user info in the UI
//   } else {
//     console.log("Profile fetch errors:", result.errors);
//     // Handle errors (especially auth errors)
//   }
// });