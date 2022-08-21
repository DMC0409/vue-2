<template>
  <div class="outBorder">
    <div ref="map" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      myChart: "",
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.map);
    this.drawMap("china");
  },
  methods: {
    drawMap(mapName) {
      let mapJSON = require("../views/utils/" + mapName + ".json");
      this.$echarts.registerMap("mapData", mapJSON);
      this.myChart.showLoading();
      let mapSeries = [];
      for(let i in mapJSON){

      }
      this.$nextTick(() => {
        this.myChart.hideLoading();
        this.myChart.setOption({
          series: [
            {
              type: "map",
              map: "mapData",
              roam: true,
              label: {
                show: true,
              },
            },
          ],
        });
        this.myChart.off("click");
        this.myChart.on("click", function (e) {
          console.log(e);
          this.drawMap("china");
        });
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.outBorder {
  width: 100%;
  height: 100%;
}
</style>