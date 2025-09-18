// --- Example: Create a Shop (Requires Auth Token) ---
// Assume authToken is available

async function createShop(shopData: any) {
  // shopData should contain fields like name, description
  const url = 'http://localhost:8000/api/shop/create/'; // Adjust base URL

  if (!authToken) {
    console.error('No authentication token found.');
    return { success: false, errors: { detail: 'Not authenticated.' } };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${authToken}`, // Include the token
        'Content-Type': 'application/json', // Sending JSON data
      },
      body: JSON.stringify(shopData), // Send JSON data
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Shop created successfully:', data);
      // data will contain the created shop information
      // Update UI (e.g., redirect to shop management, show success message)
      return { success: true, data };
    } else {
      console.error('Creating shop failed:', data);
      // Handle validation errors or other issues returned by the API
      return { success: false, errors: data };
    }
  } catch (error) {
    console.error('Error creating shop:', error);
    // Handle network errors
    return { success: false, errors: { detail: 'Network error or server unreachable.' } };
  }
}

// --- Usage Example ---
// const shopDetails = { name: 'My Awesome Shop', description: 'The best shop for awesome things!' };
// createShop(shopDetails).then(result => {
//   if (result.success) {
//     console.log("Shop created:", result.data);
//     // Navigate to shop page or update state
//   } else {
//     console.log("Create shop errors:", result.errors);
//   }
// });