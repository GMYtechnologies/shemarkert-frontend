const token = localStorage.getItem('token');

fetch('/api/api/me/', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(r => r.json())
.then(console.log); // Full profile + role info!