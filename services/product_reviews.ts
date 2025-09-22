async function getProductReviews(productId: any, accessToken = null) {
    const url = `/product/${productId}/reviews/`;

    const headers: Record<string, string> = {
    'Content-Type': 'application/json',
};

    // Add Authorization header if token is provided
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const options = {
        method: 'GET',
        headers: headers
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log(`Reviews for Product ID ${productId}:`, data);
        return data; // { product_id, product_name, count, reviews: Array }

    } catch (error) {
        console.error(`Failed to fetch reviews for product ${productId}:`);
        throw error;
    }
}

// Usage Example
// getProductReviews(123, 'optional_jwt_token')
//     .then(data => {
//         // Display product name: data.product_name
//         // Display reviews: data.reviews
//     })
//     .catch(error => {
//         // Handle error (e.g., product not found)
//     });