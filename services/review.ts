async function getMyReviews(accessToken: any) {
    const url = '/my-reviews/';

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Include your auth token
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('My Reviews:', data);
        return data; // { count: number, reviews: Array }

    } catch (error) {
        console.error('Failed to fetch your reviews:');
        throw error; // Re-throw for the calling function to handle
    }
}

// Usage Example:
// getMyReviews('your_jwt_token_here')
//     .then(data => {
//         // Update your UI with data.reviews
//     })
//     .catch(error => {
//         // Show error message to user
//     });