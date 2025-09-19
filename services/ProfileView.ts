// --- Example: Update User Profile (Requires Auth Token) ---
// Assume authToken is available

async function updateUserProfile(profileData: any) {
  // profileData should contain fields you want to update (e.g., first_name, last_name)
  const url = 'http://localhost:8000/api/profile/'; // Adjust base URL

  if (!authToken) {
    console.error('No authentication token found.');
    return { success: false, errors: { detail: 'Not authenticated.' } };
  }

  try {
    // Use PUT to replace the entire profile or PATCH for partial updates
    const response = await fetch(url, {
      method: 'PUT', // or 'PATCH'
      headers: {
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData), // Send updated data
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Profile updated successfully:', data);
      // data will contain the updated user profile information
      // Update UI with new profile data
      return { success: true, data };
    } else {
      console.error('Updating profile failed:', data);
      // Handle validation errors or other issues returned by the API
      return { success: false, errors: data };
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    // Handle network errors
    return { success: false, errors: { detail: 'Network error or server unreachable.' } };
  }
}

// --- Usage Example ---
// const updatedData = { first_name: 'NewFirstName', last_name: 'NewLastName' };
// updateUserProfile(updatedData).then(result => {
//   if (result.success) {
//     console.log("Profile updated:", result.data);
//   } else {
//     console.log("Update errors:", result.errors);
//   }
// });