<template>
  <div class="stock-info">
    <div class="row">
      <div class="text-center stock-info-title">
        <h2>Stock List</h2>
      </div>
      <div v-if="stockInfo.length === 0" class="stock-info-loading text-center">
        <h2>
          <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
          <span class="sr-only">Loading...</span> Loading...
        </h2>
      </div>
      <div v-for="info in stockInfo" class="col-sm-4">
        <div class="well">
          <h3>{{info.stock}} </h3>
          <p><i>{{info.industry}}</i></p>
          <p>{{info.longBusinessSummary.slice(0, 160) + '...'}}</p>
        </div >
      </div>
      <div class="col-sm-4 stock-add">
        <div class="well">
          <h3>Add Stock</h3>
          <form v-on:submit.prevent="onAdd">
            <div class="row">
              <div class="col-xs-9">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Insert Stock Code..."
                  v-model="newStockName"
                >
              </div>
              <div class="col-xs-3">
                <button type="submit" class="btn btn-success">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: ['stockInfo'],
  data: () => ({
    newStockName: '',
  }),
  methods: {
    onAdd(e) {
      console.log(e)
    },
  },
}
</script>

<style lang="sass" scoped>
.stock-info-title
  padding-bottom: 20px

.stock-info-loading
  padding-bottom: 40px

.stock-add
  h3
    padding-bottom: 20px

  .well
    height: 225px
</style>
