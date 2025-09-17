// --- Example: User Login ---
let authToken: null = null; // Variable to store the token in this example scope

async function loginUser(credentials: any) {
  // credentials should contain fields like email, password
  const url = 'http://localhost:8000/api/login/'; // Adjust base URL

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data);
      // data will contain 'user' object and 'token' string
      authToken = data.token; // Store token for subsequent requests
      // Store the token securely in real app (localStorage/sessionStorage)
      // localStorage.setItem('authToken', authToken);
      // Update UI state to reflect logged-in user
      return { success: true, data };
    } else {
      console.error('Login failed:', data);
      // Handle specific errors (e.g., invalid credentials)
      return { success: false, errors: data };
    }
  } catch (error) {
    console.error('Error during login:', error);
    // Handle network errors
    return { success: false, errors: { detail: 'Network error or server unreachable.' } };
  }
}

// --- Usage Example ---
// const credentials = { email: 'user@example.com', password: 'securepassword123' };
// loginUser(credentials).then(result => {
//   if (result.success) {
//     console.log("Welcome back!");
//   } else {
//     console.log("Login errors:", result.errors);
//   }
// });