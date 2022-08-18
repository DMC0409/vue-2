<template>
  <div class="outBorder">
    <div ref="map" :style="{ width: '100%', height: '90%' }"></div>
  </div>
</template>

<script>
import chinaJson from "./utils/china.json";
import shenzhengJson from "./utils/shenzhen.json";
export default {
  name: "",
  data() {
    return {
      myChart: "",
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.map);
    this.$echarts.registerMap("china", chinaJson);
    this.myChart.showLoading();
    this.$nextTick(() => {
      this.myChart.hideLoading();
      this.myChart.setOption({
        tooltip: {
          trigger: "item",
          position: "inside",
          formatter: function () {},
          backgroundColor: "default: 'rgba(50,50,50,0.7)'",
          textStyle: {
            color: "#FFFFFF",
            textalign: "center",
            fontSize: "12px",
          },
        },
        geo3D: {
          type: "map3D", // 系列类型
          name: "map3D", // 系列名称
          map: "china", // 地图类型。echarts-gl 中使用的地图类型同 geo 组件相同(ECharts 中提供了两种格式的地图数据，一种是可以直接 script 标签引入的 js 文件，引入后会自动注册地图名字和数据。还有一种是 JSON 文件，需要通过 AJAX 异步加载后手动注册。)
          boxHeight: 4,
          label: {
            // 标签的相关设置
            formatter: function (params) {
              return params.name;
            },
            // position: "right",
            distance: 1,
            show: true, // (地图上的城市名称)是否显示标签 [ default: false ]
            //formatter:,               // 标签内容格式器
            textStyle: {
              // 标签的字体样式
              color: "#000", // 地图初始化区域字体颜色
              fontSize: "16", // 字体大小
            },
          },
          //地图的颜色
          itemStyle: {
            color: "#286ECA", // 地图板块的颜色
            opacity: 1, // 图形的不透明度 [ default: 1 ]
            borderWidth: 0.5, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
            borderColor: "#286ECA", // 图形描边的颜色。[ default: #333 ]
          },
          emphasis: {
            // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时  label和itemStyle 的样式)
            label: {
              // label高亮时的配置
              show: true,
              textStyle: {
                color: "#000", // 高亮时标签颜色变为 白色
                fontSize: 15, // 高亮时标签字体 变大
              },
            },
            itemStyle: {
              // itemStyle高亮时的配置
              areaColor: "#66ffff", // 高亮时地图板块颜色改变
            },
          },
          groundPlane: {
            // 地面可以让整个组件有个“摆放”的地方，从而使整个场景看起来更真实，更有模型感。
            show: false, // 是否显示地面。[ default: false ]
            color: "#aaa", // 地面颜色。[ default: '#aaa' ]
          },
          light: {
            // 光照相关的设置。在 shading 为 'color' 的时候无效。  光照的设置会影响到组件以及组件所在坐标系上的所有图表。合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。
            main: {
              // 场景主光源的设置，在 globe 组件中就是太阳光。
              color: "#3D94CE", //主光源的颜色。[ default: #fff ]
              intensity: 1.2, //主光源的强度。[ default: 1 ]
              shadow: false, //主光源是否投射阴影。默认关闭。    开启阴影可以给场景带来更真实和有层次的光照效果。但是同时也会增加程序的运行开销。
              //shadowQuality: 'high',      // 阴影的质量。可选'low', 'medium', 'high', 'ultra' [ default: 'medium' ]
              alpha: 55, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。[ default: 40 ]
              beta: 10, // 主光源绕 y 轴，即左右旋转的角度。[ default: 40 ]
            },
            ambient: {
              // 全局的环境光设置。
              color: "red", // 环境光的颜色。[ default: #fff ]
              intensity: 0.5, // 环境光的强度。[ default: 0.2 ]
            },
          },

          viewControl: {
            projection: "perspective", // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
            autoRotate: false, // 是否开启视角绕物体的自动旋转查看。[ default: false ]
            autoRotateDirection: "cw", // 物体自传的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向。
            autoRotateSpeed: 10, // 物体自传的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
            autoRotateAfterStill: 3, // 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。[ default: 3 ]
            damping: 0, // 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
            rotateSensitivity: 1, // 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1, 设置为0后无法旋转。	rotateSensitivity: [1, 0]——只能横向旋转； rotateSensitivity: [0, 1]——只能纵向旋转。
            zoomSensitivity: 3, // 缩放操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法缩放。
            panSensitivity: 1, // 平移操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法平移。支持使用数组分别设置横向和纵向的平移灵敏度
            panMouseButton: "middle", // 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
            rotateMouseButton: "left", // 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
            distance: 140, // [ default: 100 ] 默认视角距离主体的距离，对于 grid3D 和 geo3D 等其它组件来说是距离中心原点的距离,对于 globe 来说是距离地球表面的距离。在 projection 为'perspective'的时候有效。
            minDistance: 40, // [ default: 40 ] 视角通过鼠标控制能拉近到主体的最小距离。在 projection 为'perspective'的时候有效。
            maxDistance: 100, // [ default: 400 ] 视角通过鼠标控制能拉远到主体的最大距离。在 projection 为'perspective'的时候有效。
            alpha: 40, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
            beta: 10, // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
            minAlpha: -180, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
            maxAlpha: 180, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
            minBeta: -180, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
            maxBeta: 180, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
            center: [-10, -30, -35], // 视角中心点，旋转也会围绕这个中心点旋转，默认为[0,0,0]。
            animation: true, // 是否开启动画。[ default: true ]
            animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
            animationEasingUpdate: "cubicInOut", // 过渡动画的缓动效果。[ default: cubicInOut ]
          },
        },
        series: [
          {
            name: "scatter3D",
            type: "scatter3D", //光标，标注点文字显示配置
            coordinateSystem: "geo3D",
            blendMode: "lighter",
            symbol: "circle",
            symbolSize: 10,
            itemStyle: {
              color: "#ffd80c",
              opacity: 1,
            },
            geo3DIndex: 0,
            zlevel: 1,
            data: [
              {
                name: "浙江省",
                value: [120.153576, 30.287459, 2],
                itemStyle: {},
              },
              {
                name: "江苏省",
                value: [118.767413, 32.041544, 2],
                itemStyle: {},
              },
            ],
          },
        ],
      });
      this.myChart.on("click", function (e) {
        console.log(e);
        //防止重复点击
        // if (this.name == e.name) {
        //   return false;
        // }
      });
    });
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.outBorder {
  width: 100%;
  height: 100%;
}
</style>