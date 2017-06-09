const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const port = process.env.PORT || 6000;

app.get('/', (req, res) => {
  res.json({ status: 'API online' })
})

io.on('connection', (socket) => {
  console.log('user connected:', socket)
})

http.listen(port, () => {
  console.log('Server started on port', port);
})
