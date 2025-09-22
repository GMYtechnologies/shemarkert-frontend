// --- Example: Fetch Products (List) ---
// This endpoint currently requires authentication. Adjust if it should be public.

async function fetchProducts(filters = {}) {
  // filters object can contain query parameters like category_id
  let url = 'http://localhost:8000/api/product/list/';
  
  // Add query parameters if provided
  const queryParams = new URLSearchParams(filters).toString();
  if (queryParams) {
    url += `?${queryParams}`;
  }
  // Example resulting URL: http://localhost:8000/api/product/list/?category_id=3

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
      console.log('Products fetched successfully:', data);
      // data contains 'count' and 'products' array
      // Update UI (e.g., render product cards/list)
      return { success: true, data };
    } else {
      console.error('Fetching products failed:', data);
      return { success: false, errors: data };
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, errors: { detail: 'Network error or server unreachable.' } };
  }
}

// --- Usage Example ---
// fetchProducts({ category_id: '3' }).then(result => {
//   if (result.success) {
//     console.log("Products in category 3:", result.data.products);
//     // Render product list
//   } else {
//     console.log("Product fetch errors:", result.errors);
//   }
// });