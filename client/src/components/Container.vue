<template>
  <div class="container">
    <chart v-bind:data="stockData"></chart>
    <info v-bind:stockInfo="stockInfo"></info>
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
    stocks: [],
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
      this.stocks = data
      this.$socket.emit('get_stock_data')
    },

    stock_data(data) {
      console.log('stock_data received')
      this.stockData = data
    },

    stock_info(data) {
      console.log('stock_info received')
      this.stockInfo.push({
        ...data.summaryProfile,
        stock: data.stock,
      })
    },
  },

  created() {
    this.$socket.emit('get_stock_list')
  },

  methods: {

  },

  components: {
    Chart,
    Info,
  },
}
</script>

<style lang="sass" scoped>

</style>
