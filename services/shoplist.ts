// --- Example: Fetch Shops (List) ---
// This endpoint currently requires authentication. Adjust if it should be public.

async function fetchShops() {
  const url = 'http://localhost:8000/api/shop/list/';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${authToken}`, // Include if required by the view
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json(); // Assuming JSON response

    if (response.ok) {
      console.log('Shops fetched successfully:', data);
      // data contains 'count' and 'shops' array
      // Update UI (e.g., render shop cards/list)
      return { success: true, data };
    } else {
      console.error('Fetching shops failed:', data);
      return { success: false, errors: data };
    }
  } catch (error) {
    console.error('Error fetching shops:', error);
    return { success: false, errors: { detail: 'Network error or server unreachable.' } };
  }
}

// --- Usage Example ---
// fetchShops().then(result => {
//   if (result.success) {
//     console.log("Shops:", result.data.shops);
//     // Render shop list
//   } else {
//     console.log("Shop fetch errors:", result.errors);
//   }
// });