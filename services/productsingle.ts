// --- Example: Fetch a Single Product Detail ---
// This endpoint currently requires authentication. Adjust if it should be public.

async function fetchProductDetail(productId: any) {
  const url = `http://localhost:8000/api/product/${productId}/`; // Adjust base URL and insert ID

  if (!authToken) { // Remove if endpoint becomes public
    console.error('No authentication token found.');
    return { success: false, errors: { detail: 'Not authenticated.' } };
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${authToken}`, // Include if required
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Product detail fetched successfully:', data);
      // data contains the single product's information
      // Update UI (e.g., product detail page)
      return { success: true, data };
    } else {
      console.error('Fetching product detail failed:', data);
      return { success: false, errors: data };
    }
  } catch (error) {
    console.error('Error fetching product detail:', error);
    return { success: false, errors: { detail: 'Network error or server unreachable.' } };
  }
}

// --- Usage Example ---
// const productIdToFetch = 5;
// fetchProductDetail(productIdToFetch).then(result => {
//   if (result.success) {
//     console.log("Product details:", result.data);
//     // Display product details
//   } else {
//     console.log("Product detail fetch errors:", result.errors);
//   }
// });