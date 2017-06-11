<template>
  <div class="container">
    <chart v-bind:data="stockData"></chart>
    <info
      v-bind:stockInfo="stockInfo"
      v-bind:errMsg="errMsg"
      v-on:addStock="checkStock"
    ></info>
    <footer class="text-center">
      <p>
        StockWatch webapp made for &nbsp;
        <a href="//www.freecodecamp.com/challenges/chart-the-stock-market">
          <i class="fa fa-free-code-camp" aria-hidden="true" />
          &nbsp;freeCodeCamp
        </a>. <br/>
        Powered by Vue.js, Socket.io and &nbsp;
        <i class="fa fa-yahoo" aria-hidden="true" />
        &nbsp;Yahoo! Finance. <br/>
        Build by <a href="//iadw.in">Adwin</a>.
      </p>
    </footer>
  </div>
</template>

<script>
import Chart from './Chart'
import Info from './Info'

export default {
  data: () => ({
    isConnected: false,
    errMsg: '',
    stockList: [],
    stockData: [],
    stockInfo: [],
  }),

  sockets: {
    connect() {
      console.log('connected')
      this.isConnected = true
    },

    stock_list(data) {
      console.log('stock_list received')
      this.stockList = data
      this.$socket.emit('get_stock_data')
    },

    stock_data(data) {
      console.log('stock_data received')
      this.stockData = data
    },

    stock_info(data) {
      console.log('stock_info received')
      this.stockInfo = data.map(stockProfile => ({
        ...stockProfile.summaryProfile,
        stock: stockProfile.stock,
      }))
    },

    stock_valid_result(data) {
      console.log('stock_valid_result received')
      if (data.valid) {
        this.stockList.push(data.stock)
        this.$socket.emit('update_stock_list', this.stockList)
      } else {
        this.errMsg = 'Invalid stock code'
      }
    },
  },

  created() {
    this.$socket.emit('get_stock_list')
  },

  methods: {
    checkStock(stockName) {
      this.errMsg = '';
      if (this.stockList.indexOf(stockName.toUpperCase()) === -1) {
        this.$socket.emit('check_stock_valid', stockName.toUpperCase())
      } else {
        this.errMsg = 'Stock already exists'
      }
    },
  },

  components: {
    Chart,
    Info,
  },
}
</script>

<style lang="sass" scoped>
footer
  padding: 30px 0
</style>
