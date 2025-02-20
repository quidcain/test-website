const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = 3000

app.use(cookieParser())

// Middleware for simple auth
app.use((req, res, next) => {
  if (req.path.startsWith('/auth/') && req.cookies.auth !== 'true') {
    return res.status(401).send('Unauthorized')
  }
  next()
})

app.use(express.static('static/public')) // Serve static HTML & PDFs from 'public' folder

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'static/page.html');
  res.sendFile(filePath);
  res.redirect('landing.html');
})

// Auth simulation (login sets a cookie)
app.post('/login', (req, res) => {
  res.cookie('auth', 'true', { httpOnly: true });
  res.redirect('/auth/landing.html')
})

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('auth')
  res.redirect('/');
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
