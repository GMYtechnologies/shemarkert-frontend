fetch('/api/product/create/', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' },
  body: new FormData() // Include file upload
})
.then(r => r.json())
.then(console.log);

fetch('/api/product/list/?category_id=1')
.then(r => r.json())
.then(console.log);

fetch('/api/product/1/')
.then(r => r.json())
.then(console.log);