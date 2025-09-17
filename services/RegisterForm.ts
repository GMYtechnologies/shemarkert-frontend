// // src/components/RegisterForm.jsx
// import React, { useState } from 'react';

// function RegisterForm() {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [role, setRole] = useState('buyer');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch('http://localhost:8000/api/auth/register/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email,
//         username,
//         password,
//         full_name: fullName,
//         phone,
//         role,
//       }),
//     });

//     const data = await response.json();
//     console.log(data);

//     if (data.token) {
//       // Save token and redirect
//       localStorage.setItem('token', data.token);
//       alert('Registration successful!');
//       window.location.href = '/dashboard';
//     } else {
//       alert(data.error || 'Registration failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={fullName}
//         onChange={(e) => setFullName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Phone"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="buyer">Buyer</option>
//         <option value="seller">Seller</option>
//       </select>
//       <button type="submit">Register</button>
//     </form>
//   );
// }

// export default RegisterForm;