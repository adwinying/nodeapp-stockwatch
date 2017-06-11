const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const yahoo = require('yahoo-finance')

const port = process.env.PORT || 6000

let stocks = ['AAPL', 'FB', 'TSLA']

app.get('/', (req, res) => {
  res.json({ status: 'API online' })
})

io.on('connection', (socket) => {
  console.log('user connected')

  socket.on('get_stock_list', () => {
    socket.emit('stock_list', stocks)
  })

  socket.on('get_stock_data', () => {
    // fetch historical data and broadcast
    yahoo.historical({
      symbols: stocks,
      from: '2012-01-01',
      period: 'd',
    })
    .then((data) => {
      const compiledData = {}
      stocks.forEach((stock) => {
        compiledData[stock] = data[stock].map(dataPoint => ({
          date: dataPoint.date,
          close: dataPoint.close,
        }))
      })

      socket.emit('stock_data', compiledData)
    })
    .catch((err) => {
      throw err
    })

    // fetch stock info and broadcast
    const stockInfo = []
    let counter = 0

    stocks.forEach((stock) => {
      yahoo.quote({
        symbol: stock,
        modules: ['summaryProfile'],
      })
      .then((data) => {
        stockInfo[stocks.indexOf(stock)] = {
          summaryProfile: data.summaryProfile,
          stock,
        }
        counter += 1
      })
      .then(() => {
        if (counter === stocks.length) {
          socket.emit('stock_info', stockInfo)
        }
      })
      .catch((err) => {
        throw err
      })
    })
  })

  socket.on('update_stock_list', (data) => {
    stocks = data
    io.emit('stock_list', data)
  })

  socket.on('check_stock_valid', (stock) => {
    yahoo.quote({
      symbol: stock,
      modules: ['summaryProfile'],
    })
    .then(() => {
      socket.emit('stock_valid_result', {
        valid: true,
        stock,
      })
    })
    .catch((err) => {
      console.log(err.message);
      socket.emit('stock_valid_result', {
        valid: false,
        stock,
      })
    })
  })
})

http.listen(port, () => {
  console.log('Server started on port', port);
})
