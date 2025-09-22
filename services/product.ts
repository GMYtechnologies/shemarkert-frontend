// --- Example: Create a Product (Requires Auth Token) ---
// Assume authToken is available

async function createProduct(productData: any, productImageFile = null) {
  // productData should contain fields like name, description, price, category_id, size, color
  const url = 'http://localhost:8000/api/product/create/'; // Adjust base URL

  if (!authToken) {
    console.error('No authentication token found.');
    return { success: false, errors: { detail: 'Not authenticated.' } };
  }

  // Use FormData for handling file uploads and mixed data
  const formData = new FormData();
  // Append text fields
  for (const key in productData) {
    if (productData.hasOwnProperty(key)) {
      formData.append(key, productData[key]);
    }
  }
  // Append the image file if provided
  if (productImageFile) {
    formData.append('product_image', productImageFile);
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${authToken}`, // Include the token
        // Do NOT set 'Content-Type' header when using FormData
        // The browser will set it correctly with the boundary
      },
      body: formData, // Send FormData
    });

    // Important: product_views.py expects JSON in request.body, but also handles FILES.
    // Sending FormData means data fields are in request.POST, not request.body.
    // You might need to adjust your Django view to handle request.POST.get('name') etc.
    // OR, send JSON and handle the file upload differently (base64 encode or separate endpoint).

    // Assuming your view is adjusted or can handle FormData:
    const data = await response.json();

    if (response.ok) {
      console.log('Product created successfully:', data);
      // data will contain the created product information
      // Update UI (e.g., add product to list)
      return { success: true, data };
    } else {
      console.error('Creating product failed:', data);
      // Handle validation errors or other issues returned by the API
      return { success: false, errors: data };
    }
  } catch (error) {
    console.error('Error creating product:', error);
    // Handle network errors
    return { success: false, errors: { detail: 'Network error or server unreachable.' } };
  }
}

// --- Alternative: Sending JSON data (no file upload) ---
// If you are NOT uploading an image, you can send JSON:
async function createProductJSON(productData: any) {
  const url = 'http://localhost:8000/api/product/create/';

  if (!authToken) {
    console.error('No authentication token found.');
    return { success: false, errors: { detail: 'Not authenticated.' } };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json', // Set content type for JSON
      },
      body: JSON.stringify(productData), // Send JSON data
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Product created successfully (JSON):', data);
      return { success: true, data };
    } else {
      console.error('Creating product failed (JSON):', data);
      return { success: false, errors: data };
    }
  } catch (error) {
    console.error('Error creating product (JSON):', error);
    return { success: false, errors: { detail: 'Network error or server unreachable.' } };
  }
}


// --- Usage Example (FormData) ---
// const productDetails = { name: 'New Product', description: 'A great product', price: '19.99', category_id: '2', size: 'Large', color: 'Blue' };
// const imageFileInput = document.getElementById('product-image-input'); // Assuming an <input type="file" id="product-image-input">
// const imageFile = imageFileInput.files[0];
// createProduct(productDetails, imageFile).then(result => {
//   if (result.success) {
//     console.log("Product created:", result.data);
//     // Refresh product list or navigate to product detail
//   } else {
//     console.log("Create product errors:", result.errors);
//   }
// });

// --- Usage Example (JSON) ---
// const productDetailsNoImage = { name: 'New Product No Image', description: 'A great product without image', price: '29.99', category_id: '3' };
// createProductJSON(productDetailsNoImage).then(result => {
//   if (result.success) {
//     console.log("Product created (no image):", result.data);
//   } else {
//     console.log("Create product errors (no image):", result.errors);
//   }
// });