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
      for (let i in mapJSON.features) {
        console.log(mapJSON.features[i].properties);
        mapSeries.push({
          name:mapJSON.features[i].properties.name,
          adcode:mapJSON.features[i].properties.adcode,
        })
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
              data: mapSeries,
            },
          ],
        });
        this.myChart.off("click");
        let _this = this;
        this.myChart.on("click", function (e) {
          console.log(e);
          _this.drawMap(e.data.adcode);
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