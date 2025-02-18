# Express Crawler Test Server

This project is a minimal Express.js server designed for testing web crawlers. It serves static HTML and PDF files, supports basic authentication using cookies, and allows custom response headers and status codes for testing edge cases.


To login
```
fetch(
  '/login',
  {
    method: 'POST',
  },
)
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
