async function listAllReviews(accessToken: any) {
    const url = '/reviews/';

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('All Reviews:', data);
        return data; // { count: number, reviews: Array }

    } catch (error) {
        console.error('Failed to fetch all reviews:');
        throw error;
    }
}

// Usage Example:
// listAllReviews('your_jwt_token_here')
//     .then(data => {
//         // Render data.reviews in an admin panel or public feed
//     })
//     .catch(error => {
//         // Handle error (e.g., user not authorized)
//     });