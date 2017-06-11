# NodeJS Stock Market App

### Frameworks / Technologies Used
- Express.js
- Node.js
- Vue.js
- Socket.io (websockets)
- Yahoo Finance API
- ESLint (Airbnb)

## Websocket APIs

### Events


#### `get_stock_list`
Returns the list of stocks currently active.

```javascript
socket.on('get_stock_list', () => {
  socket.emit('stock_list', stocks)
})

/*
(event: 'stock_list')

['AAPL', 'GOOG', 'FB']
 */
```