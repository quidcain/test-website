const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = 3000

app.use(cookieParser())
app.use(express.static('public')) // Serve static HTML & PDFs from 'public' folder

// Middleware for simple auth
app.use((req, res, next) => {
  if (req.path.startsWith('/auth/') && req.cookies.auth !== 'true') {
    return res.status(401).send('Unauthorized')
  }
  next()
})


app.get('/', (req, res) => {
  res.set('X-Custom-Header', 'CrawlerTest');
  // res.status(418).send('I am a teapot')
  const filePath = path.join(__dirname, 'public/page.html');
  res.sendFile(filePath);
})


app.get('/simple.pdf', (req, res) => {
  const filePath = path.join(__dirname, 'public/simple.pdf');
  res.sendFile(filePath);
})


// Auth simulation (login sets a cookie)
app.post('/login', (req, res) => {
  res.cookie('auth', 'true', { httpOnly: true });
  res.send('Logged in');
})

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('auth')
  res.send('Logged out')
})

app.get('/auth/page1', (req, res) => {
  res.set('X-Custom-Header', 'CrawlerTest');
  const filePath = path.join(__dirname, 'public/page1.html');
  res.sendFile(filePath);
})

app.get('/auth/protected.pdf', (req, res) => {
  const filePath = path.join(__dirname, 'public/protected.pdf');
  res.sendFile(filePath);
})

// Custom response headers & status control
// app.get('/custom-response', (req, res) => {
//   res.set('X-Custom-Header', 'CrawlerTest')
//   res.status(418).send('I am a teapot')
// })

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
