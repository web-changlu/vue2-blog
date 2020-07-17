<template>
<div>
    <el-row>
        <el-col :span="24">
            <div id="myChart1" class="myChart1"></div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
                <div id="myChart2" :style="{width: '500px', height: '300px'}"></div>
        </el-col>
        <el-col :span="12">
                <div id="myChart3" :style="{width: '500px', height: '300px'}"></div>
        </el-col>
</el-row>
</div>
</template>

<script>
// 按需引入的模式
// 引入基本模板
// const echarts = require('echarts/lib/echarts')
// 引入提示框和标题组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')

// 暂不考虑体积问题 全部引入
const echarts = require('echarts')

export default {
  name: 'report',
  data () {
    return {
      option1: {
        backgroundColor: '#F2F6FC',
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
              {
                value: 235,
                name: '视频广告',
                itemStyle: {
                  color: '#409EFF'
                }
              },
              {
                value: 274,
                name: '联盟广告',
                itemStyle: {
                  color: '#409EFF'
                }
              },
              {
                value: 310,
                name: '邮件营销',
                itemStyle: {
                  color: '#409EFF'
                }
              },
              {
                value: 335,
                name: '直接访问',
                itemStyle: {
                  color: '#409EFF'
                }
              },
              {
                value: 400,
                name: '搜索引擎',
                itemStyle: {
                  color: '#409EFF'
                }
              }
            ],
            roseType: 'angle',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(0, 0, 0, 0.6)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(0, 0, 255, 0.3)'
                }
              }
            }
            // itemStyle: {
            //   normal: {
            //     color: '#c23531',
            //     shadowBlur: 200,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //   }
            // }
          }
        ]
      },
      option2: {
        angleAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        radiusAxis: {
        },
        polar: {
        },
        series: [{
          type: 'bar',
          data: [1, 2, 3, 4, 3, 5, 1],
          coordinateSystem: 'polar',
          name: 'A',
          stack: 'a'
        }, {
          type: 'bar',
          data: [2, 4, 6, 1, 3, 2, 1],
          coordinateSystem: 'polar',
          name: 'B',
          stack: 'a'
        }, {
          type: 'bar',
          data: [1, 2, 3, 4, 1, 2, 5],
          coordinateSystem: 'polar',
          name: 'C',
          stack: 'a'
        }],
        legend: {
          show: true,
          data: ['A', 'B', 'C']
        }

      },
      option3: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]

      }
    }
  },
  methods: {
    setEchart (dom, option) {
      const myChart1 = echarts.init(document.getElementById(dom))
      myChart1.setOption(option)
    }
  },
  mounted () {
    this.setEchart('myChart1', this.option1)
    this.setEchart('myChart2', this.option2)
    this.setEchart('myChart3', this.option3)
  }
}
</script>

<style lang="less" scoped>
.el-row{
      height: 50vh;
  }
.myChart1{
    width: 900px;
    height: 200px;
    margin: 0 auto;
}
</style>
