async function createReview(productId: any, rating: any, comment = '', accessToken: any) {
    const url = '/reviews/';

    const payload = {
        product_id: productId,
        rating: rating,
        comment: comment // Can be an empty string
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload) // Convert the JS object to a JSON string
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Review created successfully:', data);
        return data; // { success: true, message, review: Object }

    } catch (error) {
        console.error('Failed to create review:');
        throw error;
    }
}

// Usage Example:
// createReview(123, 5, "Great product!", 'your_jwt_token_here')
//     .then(data => {
//         alert(data.message); // "Review created successfully"
//         // Optionally, update the UI with the new review: data.review
//     })
//     .catch(error => {
//         alert('Error: ' + error.message); // e.g., "You have already reviewed this product"
//     });