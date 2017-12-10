webpackJsonp([1],[,,,,,,,,,,,,,,,function(t,e,o){function s(t){o(54)}var r=o(2)(o(20),o(65),s,null,null);t.exports=r.exports},,,function(t,e,o){"use strict";var s={colors:["#2b908f","#90ee7e","#f45b5b","#7798BF","#aaeeee","#ff0066","#eeaaee","#55BF3B","#DF5353","#7798BF","#aaeeee"],chart:{backgroundColor:{linearGradient:{x1:0,y1:0,x2:1,y2:1},stops:[[0,"#2a2a2b"],[1,"#3e3e40"]]},style:{fontFamily:"'Unica One', sans-serif"},plotBorderColor:"#606063"},title:{style:{color:"#E0E0E3",textTransform:"uppercase",fontSize:"20px"}},subtitle:{style:{color:"#E0E0E3",textTransform:"uppercase"}},xAxis:{gridLineColor:"#707073",labels:{style:{color:"#E0E0E3"}},lineColor:"#707073",minorGridLineColor:"#505053",tickColor:"#707073",title:{style:{color:"#A0A0A3"}}},yAxis:{gridLineColor:"#707073",labels:{style:{color:"#E0E0E3"}},lineColor:"#707073",minorGridLineColor:"#505053",tickColor:"#707073",tickWidth:1,title:{style:{color:"#A0A0A3"}}},tooltip:{backgroundColor:"rgba(0, 0, 0, 0.85)",style:{color:"#F0F0F0"}},plotOptions:{series:{dataLabels:{color:"#B0B0B3"},marker:{lineColor:"#333"}},boxplot:{fillColor:"#505053"},candlestick:{lineColor:"white"},errorbar:{color:"white"}},legend:{itemStyle:{color:"#E0E0E3"},itemHoverStyle:{color:"#FFF"},itemHiddenStyle:{color:"#606063"}},credits:{style:{color:"#666"}},labels:{style:{color:"#707073"}},drilldown:{activeAxisLabelStyle:{color:"#F0F0F3"},activeDataLabelStyle:{color:"#F0F0F3"}},navigation:{buttonOptions:{symbolStroke:"#DDDDDD",theme:{fill:"#505053"}}},rangeSelector:{buttonTheme:{fill:"#505053",stroke:"#000000",style:{color:"#CCC"},states:{hover:{fill:"#707073",stroke:"#000000",style:{color:"white"}},select:{fill:"#000003",stroke:"#000000",style:{color:"white"}}}},inputBoxBorderColor:"#505053",inputStyle:{backgroundColor:"#333",color:"silver"},labelStyle:{color:"silver"}},navigator:{handles:{backgroundColor:"#666",borderColor:"#AAA"},outlineColor:"#CCC",maskFill:"rgba(255,255,255,0.1)",series:{color:"#7798BF",lineColor:"#A6C7ED"},xAxis:{gridLineColor:"#505053"}},scrollbar:{barBackgroundColor:"#808083",barBorderColor:"#808083",buttonArrowColor:"#CCC",buttonBackgroundColor:"#606063",buttonBorderColor:"#606063",rifleColor:"#FFF",trackBackgroundColor:"#404043",trackBorderColor:"#404043"},legendBackgroundColor:"rgba(0, 0, 0, 0.5)",background2:"#505053",dataLabelsColor:"#B0B0B3",textColor:"#C0C0C0",contrastTextColor:"#F0F0F3",maskColor:"rgba(255,255,255,0.3)"};e.a=s},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o(17),r=o(16),n=o.n(r),a=o(15),c=o.n(a);s.a.config.productionTip=!1;s.a.use(n.a,"/"),new s.a({el:"#app",template:"<App/>",components:{App:c.a}})},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o(62),r=o.n(s);e.default={name:"app",components:{Container:r.a}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o(25),r=o.n(s),n=o(6),a=o.n(n),c=o(18),i=o(57);o(58)(i),window.Highcharts=i,e.default={name:"Chart",props:["data"],data:function(){return{stockData:[],chart:void 0}},mounted:function(){i.setOptions(a()({},c.a)),this.drawChart()},methods:{sortArrAsc:function(t){return t.sort(function(t,e){return t[0]-e[0]})},compileData:function(t){return t.map(function(t){return[new Date(t.date).getTime(),t.close]})},compileSeries:function(t,e){return{name:t,data:e,tooltip:{valueDecimals:2}}},handleDataChange:function(){var t=this,e=r()(this.data);for(this.stockData=[],e.forEach(function(e){t.stockData.push(t.compileSeries(e,t.sortArrAsc(t.compileData(t.data[e]))))});this.chart.series.length>0;)this.chart.series[0].remove(!1);this.drawChart()},drawChart:function(){this.chart=i.stockChart(this.$refs.chart,{rangeSelector:{selected:1},title:{text:"StockWatch"},navigator:{enabled:!1},exporting:{enabled:!1},credits:{enabled:!1},series:this.stockData})}},watch:{data:function(){this.handleDataChange()}}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o(6),r=o.n(s),n=o(61),a=o.n(n),c=o(63),i=o.n(c);e.default={data:function(){return{isConnected:!1,errMsg:"",stockList:[],stockData:[],stockInfo:[]}},sockets:{connect:function(){console.log("connected"),this.isConnected=!0,this.$socket.emit("get_stock_list")},stock_list:function(t){console.log("stock_list received"),this.stockList=t,this.$socket.emit("get_stock_data")},stock_data:function(t){console.log("stock_data received"),this.stockData=t},stock_info:function(t){console.log("stock_info received"),this.stockInfo=t.map(function(t){return r()({},t.summaryProfile,{stock:t.stock})})},stock_valid_result:function(t){console.log("stock_valid_result received"),t.valid?(this.stockList.push(t.stock),this.$socket.emit("update_stock_list",this.stockList)):this.errMsg="Invalid stock code"}},methods:{checkStock:function(t){this.errMsg="",-1===this.stockList.indexOf(t.toUpperCase())?this.$socket.emit("check_stock_valid",t.toUpperCase()):this.errMsg="Stock already exists"},removeStock:function(t){var e=this.stockList.indexOf(t);-1!==e?(this.stockList.splice(e,1),this.$socket.emit("update_stock_list",this.stockList)):console.error("Stock does not exist in stockArray[]!")}},components:{Chart:a.a,Info:i.a}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Info",props:["stockInfo","errMsg"],data:function(){return{newStockName:""}},methods:{onAdd:function(){this.$emit("addStock",this.newStockName)},onRemove:function(t){this.$emit("removeStock",t)}},watch:{stockInfo:function(){this.newStockName=""}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,function(t,e,o){function s(t){o(55)}var r=o(2)(o(21),o(66),s,"data-v-59d7ec14",null);t.exports=r.exports},function(t,e,o){function s(t){o(56)}var r=o(2)(o(22),o(67),s,"data-v-dcc595ce",null);t.exports=r.exports},function(t,e,o){function s(t){o(53)}var r=o(2)(o(23),o(64),s,"data-v-2f57a1c6",null);t.exports=r.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"stock-info"},[o("div",{staticClass:"row"},[t._m(0,!1,!1),t._v(" "),0===t.stockInfo.length?o("div",{staticClass:"stock-info-loading text-center"},[t._m(1,!1,!1)]):t._e(),t._v(" "),t._l(t.stockInfo,function(e){return o("div",{staticClass:"col-sm-4"},[o("div",{staticClass:"well"},[o("span",{staticClass:"stock-remove",on:{click:function(o){t.onRemove(e.stock)}}},[o("i",{staticClass:"fa fa-times",attrs:{"aria-hidden":"true"}})]),t._v(" "),o("h3",[t._v(t._s(e.stock)+" ")]),t._v(" "),o("p",[o("i",[t._v(t._s(e.industry))])]),t._v(" "),o("p",[t._v(t._s(e.longBusinessSummary.slice(0,160)+"..."))])])])}),t._v(" "),0!==t.stockInfo.length?o("div",{staticClass:"col-sm-4 stock-add"},[o("div",{staticClass:"well"},[o("h3",[t._v("Add Stock")]),t._v(" "),o("form",{on:{submit:function(e){e.preventDefault(),t.onAdd(e)}}},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-xs-9"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.newStockName,expression:"newStockName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Insert Stock Code..."},domProps:{value:t.newStockName},on:{input:function(e){e.target.composing||(t.newStockName=e.target.value)}}})]),t._v(" "),t._m(2,!1,!1)]),t._v(" "),o("div",{staticClass:"row"},[t.errMsg?o("div",{staticClass:"col-xs-12 error"},[t._v("\n              "+t._s(t.errMsg)+"\n            ")]):t._e()])])])]):t._e()],2)])},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"text-center stock-info-title"},[o("h2",[t._v("Stock List")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("h2",[o("i",{staticClass:"fa fa-circle-o-notch fa-spin fa-fw"}),t._v(" "),o("span",{staticClass:"sr-only"},[t._v("Loading...")]),t._v(" Loading...\n      ")])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"col-xs-3"},[o("button",{staticClass:"btn btn-success",attrs:{type:"submit"}},[t._v("\n                Add\n              ")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("container")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{ref:"chart",staticClass:"chart-wrapper"})},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container"},[o("chart",{attrs:{data:t.stockData}}),t._v(" "),o("info",{attrs:{stockInfo:t.stockInfo,errMsg:t.errMsg},on:{addStock:t.checkStock,removeStock:t.removeStock}}),t._v(" "),t._m(0,!1,!1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("footer",{staticClass:"text-center"},[o("p",[t._v("\n      StockWatch webapp made for  \n      "),o("a",{attrs:{href:"//www.freecodecamp.com/challenges/chart-the-stock-market"}},[o("i",{staticClass:"fa fa-free-code-camp",attrs:{"aria-hidden":"true"}}),t._v("\n         freeCodeCamp\n      ")]),t._v(". "),o("br"),t._v("\n      Powered by Vue.js, Socket.io and  \n      "),o("i",{staticClass:"fa fa-yahoo",attrs:{"aria-hidden":"true"}}),t._v("\n       Yahoo! Finance. "),o("br"),t._v("\n      Build by "),o("a",{attrs:{href:"//iadw.in"}},[t._v("Adwin")]),t._v(".\n    ")])])}]}}],[19]);
//# sourceMappingURL=app.2f251ae29ca25764095d.js.map