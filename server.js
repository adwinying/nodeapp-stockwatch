const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const port = process.env.PORT || 6000

let stocks = ['AAPL', 'GOOG', 'FB']

app.get('/', (req, res) => {
  res.json({ status: 'API online' })
})

io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('get_stock_list', () => {
    socket.emit('stock_list', stocks)
  })

  socket.on('update_stock', (data) => {
    stocks = data
    io.emit('stock_list', data)
  })
})

http.listen(port, () => {
  console.log('Server started on port', port);
})
