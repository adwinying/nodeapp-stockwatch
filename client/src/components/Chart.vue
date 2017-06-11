<template>
  <div class="chart-wrapper" ref="chart"></div>
</template>

<script>
import chartTheme from '../config/chart'

const Highcharts = require('highcharts/highstock')
require('highcharts/modules/exporting')(Highcharts)

window.Highcharts = Highcharts

export default {

  name: 'Chart',
  props: ['data'],
  data() {
    return {
      stockData: [],
      chart: undefined,
    };
  },
  mounted() {
    Highcharts.setOptions({
      ...chartTheme,
    })
    this.drawChart()
  },
  methods: {
    sortArrAsc(arr) {
      return arr.sort((a, b) => a[0] - b[0])
    },
    compileData(data) {
      return data.map(dataPoint => [
        new Date(dataPoint.date).getTime(),
        dataPoint.close,
      ])
    },
    compileSeries(stockName, data) {
      return {
        name: stockName,
        data,
        tooltip: {
          valueDecimals: 2,
        },
      }
    },
    handleDataChange() {
      const stockNames = Object.keys(this.data)
      this.stockData = []
      stockNames.forEach((stockName) => {
        this.stockData.push(this.compileSeries(
          stockName,
          this.sortArrAsc(this.compileData(this.data[stockName])),
        ))
      })

      while (this.chart.series.length > 0) {
        this.chart.series[0].remove(false)
      }
      this.drawChart()
    },
    drawChart() {
      this.chart = Highcharts.stockChart(this.$refs.chart, {
        rangeSelector: {
          selected: 1,
        },

        title: {
          text: 'StockWatch',
        },

        navigator: {
          enabled: false,
        },

        exporting: {
          enabled: false,
        },

        credits: {
          enabled: false,
        },

        series: this.stockData,
      })
    },
  },
  watch: {
    data() { this.handleDataChange(); },
  },
};
</script>

<style lang="sass" scoped>
.chart-wrapper
  padding: 60px 0
</style>
