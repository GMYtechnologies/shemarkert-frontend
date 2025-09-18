// --- Example: User Registration ---
async function registerUser(userData: any) {
  // userData should contain fields like username, email, password, role
  const url = 'http://localhost:8000/api/register/'; // Adjust base URL

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // No Authorization header needed for registration
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Registration successful:', data);
      // data will contain 'user' object and 'token' string
      // Store the token securely (e.g., localStorage, sessionStorage - BEWARE OF SECURITY IMPLICATIONS)
      // localStorage.setItem('authToken', data.token);
      // Redirect user or update UI state
      return { success: true, data };
    } else {
      console.error('Registration failed:', data);
      // Handle specific errors from data (e.g., data.username, data.email)
      return { success: false, errors: data };
    }
  } catch (error) {
    console.error('Error during registration:', error);
    // Handle network errors
    return { success: false, errors: { detail: 'Network error or server unreachable.' } };
  }
}

// --- Usage Example ---
// const userData = { username: 'newuser', email: 'user@example.com', password: 'securepassword123', role: 'BUYER' };
// registerUser(userData).then(result => {
//   if (result.success) {
//     console.log("Welcome, new user!");
//   } else {
//     console.log("Registration errors:", result.errors);
//   }
// });