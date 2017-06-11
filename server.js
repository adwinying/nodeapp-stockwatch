const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const yahoo = require('yahoo-finance')

const port = process.env.PORT || 6000

let stocks = ['AAPL', 'GOOG', 'FB', 'TSLA']

app.get('/', (req, res) => {
  res.json({ status: 'API online' })
})

io.on('connection', (socket) => {
  console.log('user connected')

  socket.on('get_stock_list', () => {
    socket.emit('stock_list', stocks)
  })

  socket.on('get_stock_data', () => {
    yahoo.historical({
      symbols: stocks,
      period: 'd',
    })
    .then((data) => {
      const compiledData = {}
      stocks.forEach((stock) => {
        compiledData[stock] = data[stock].map(dataPoint => ({
          date: dataPoint.date,
          high: dataPoint.high,
        }))
      })

      socket.emit('stock_data', compiledData)
    })
    .catch((err) => {
      throw err
    })

    stocks.forEach((stock) => {
      yahoo.quote({
        symbol: stock,
        modules: ['summaryProfile'],
      })
      .then((data) => {
        socket.emit('stock_info', {
          summaryProfile: data.summaryProfile,
          stock,
        })
      })
      .catch((err) => {
        throw err
      })
    })
  })

  socket.on('update_stock', (data) => {
    stocks = data
    io.emit('stock_list', data)
  })
})

http.listen(port, () => {
  console.log('Server started on port', port);
})
