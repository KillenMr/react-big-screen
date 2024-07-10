import echarts from "echarts/lib/echarts";
import "echarts/map/js/china";
//  地图数据
const treeData = [
  {
    name: "治安管理工作",
    children: [
      {
        name: "娱乐场所治安管理",
        children: [
          {
            name: "娱乐场所治安管理工作",
          },
        ],
      },
      {
        name: "安保工作",
        children: [
          {
            name: "输油气管道安保工作",
          },
          {
            name: "校园安保工作",
          },
          {
            name: "节假日、重大活动、大型群众性活动安保和敏感期社会面管控工作",
          },
        ],
      },
      {
        name: "精神病人管控工作",
        children: [
          {
            name: "精神病人肇事肇祸案事件",
          },
        ],
      },
      {
        name: "物流寄递业",
        children: [
          {
            name: "物流寄递业治安管理工作",
          },
        ],
      },
      {
        name: "推进基层基础工作创新",
        children: [
          {
            name: "加强派出所建设",
          },
        ],
      },
      {
        name: "地网建设工作",
        children: [
          {
            name: "加强二轮电动车防盗登记备案装置安装工作",
          },
        ],
      },
      {
        name: "无人机管理",
        children: [
          {
            name: "加强无人机管理",
          },
        ],
      },
      {
        name: "加强社会面巡逻防控",
        children: [
          {
            name: "武装联勤巡逻",
          },
        ],
      },
    ],
  },
];

export const treeOptions = (params) => ({
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove",
  },
  series: [
    {
      type: "tree",
      id: 0,
      name: "tree1",
      data: params,
      // top: "20%",
      left: "18%",
      // bottom: "12%",
      right: "40%",
      // symbolSize: 3,
      edgeShape: "polyline",
      // edgeForkPosition: "33%",
      initialTreeDepth: 2,
      lineStyle: {
        width: 1,
      },
      // itemStyle: {
      //   color: {
      //     type: "radial",
      //     x: 0.5,
      //     y: 0.5,
      //     r: 0.5,
      //     colorStops: [
      //       {
      //         offset: 0,
      //         color: "red", // 0% 处的颜色
      //       },
      //       {
      //         offset: 1,
      //         color: "blue", // 100% 处的颜色
      //       },
      //     ],
      //     global: false, // 缺省为 false
      //   },
      // },
      label: {
        // backgroundColor: "rgba(50, 120, 180, 0.2)",
        position: "left",
        verticalAlign: "middle",
        align: "right",
        normal: {
          // position: "center",
          verticalAlign: "middle",
          // align: "left",
          backgroundColor: "rgba(50, 120, 180, 0.2)",
          color: "#fff",
          padding: 3,
          formatter: ["{box|{b}}"].join("\n"),
          rich: {
            box: {
              height: 30,
              color: "#fff",
              padding: [0, 5],
              align: "center",
            },
          },
        },
      },
      leaves: {
        label: {
          position: "right",
          verticalAlign: "middle",
          align: "left",
        },
      },
      emphasis: {
        focus: "descendant",
      },
      expandAndCollapse: false,
      animationDuration: 550,
      animationDurationUpdate: 750,
    },
  ],
});
