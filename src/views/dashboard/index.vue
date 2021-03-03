<template>
  <div>
  <el-row :gutter="10">
    <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
      <div class="grid-content ">
        <div class="panel bar" v-for="(item,index) in dataList" v-if="index<3" >
          <h2>{{departments[item.panal.departmentId]}}--{{item.panal.description}}</h2>
          <div class="chart">
            <chart :chart-type="panalTypeArray[item.panal.panalTypeId]" :chart-data1="item.rows"
                   :axis="item.panal.x"/>
          </div>
          <div class="panel-footer"></div>
        </div>

        <div class="panel bar" v-for="item in (3-dataList.length)>0?(3-dataList.length):0">
          <div class="el-icon-circle-plus-outline add-icon" @click="addNewChart()"></div>
          <div class="panel-footer"></div>
        </div>

      </div>
    </el-col>


    <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
      <div class="grid-content ">
        <!-- no模块制作 -->
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>{{monitors}}</li>
              <li>{{websiteFlow}}</li>
              <li>{{userNum}}</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>当前监控实例总计</li>
              <li>当前网站客流总计</li>
              <li>企业用户注册总计</li>
            </ul>
          </div>
        </div>
<!--         地图模块-->
        <div class="map" v-if="chartData.length != 0">
<!--          <div class="map1"></div>-->
<!--          <div class="map2"></div>-->
<!--          <div class="map3"></div>-->
<!--          <div class="chart">-->
            <map-chart :chartData="chartData"/>
<!--          </div>-->
        </div>
      </div>
    </el-col>

    <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
      <div class="grid-content " >
        <div class="panel bar" v-for="(item,index) in dataList" v-if="index>2 && index < 5">
          <h2>{{departments[item.panal.departmentId]}}--{{item.panal.description}}</h2>
          <div class="chart">
            <chart :chart-type="panalTypeArray[item.panal.panalTypeId]" :chart-data1="item.rows"
                   :axis="item.panal.x"/>
            <!--            <chart :chart-type="panalTypeArray[item.panal.panalTypeId]" :chart-data="formateChartData(item.rows, panalTypeArray[item.panal.panalTypeId])"/>-->
          </div>

          <div class="panel-footer"></div>
        </div>

        <div class="panel bar" v-for="item in (5 -dataList.length)>2?2:(5 -dataList.length)">
          <div class="el-icon-circle-plus-outline add-icon" @click="addNewChart()"></div>
          <div class="panel-footer"></div>
        </div>

        <div class="panel line">
          <h2>
            更多
          </h2>
          <div class="chart">
            <div class="map1"></div>
            <div class="map2"></div>
            <div class="map3"></div>
            <div class="button" v-waves @click="datasource">
              添加数据源
              <div class="panel-footer"></div>
            </div>
            <div class="button" v-waves @click="addPanals">
              添加面板
              <div class="panel-footer"></div>
            </div>
            <div class="button" v-waves @click="panals">
              查看更多面板
              <div class="panel-footer"></div>
            </div>
          </div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import chart from "@/views/dashboard/chart";
import MapChart from "@/views/dashboard/components/MapChart";
import * as dashboard from '@/api/homePage'
import * as getDepartment from "@/api/datasourceApi";
import * as getChart from "@/api/panal"


export default {

  name: 'Test',
  directives: { waves },
  components: {
    chart,MapChart
  },
  created() {
    this.panalTypeArray = this.$store.getters.panalTypeArray
    this.init()
  },
  data(){
    return{
      chartData:[],
      dataList:[],
      departments:{},
      panalTypeArray:[],
      userNum: 0,
      websiteFlow: 0,
      monitors: 0,


    }
  },

  methods:{
    addNewChart() {
      this.$router.push({ path:'/panal/add'  })
    },
    datasource() {
      this.$router.push({ path:'/panal/datasource'  })
    },
    panals() {
      this.$router.push({ path:'/panal/list'  })
    },
    addPanals() {
      this.$router.push({ path:'/panal/add'  })
    },
    init() {
      dashboard.getSourceMap().then(resp1 => {
        console.log("地图数据",resp1)
        this.chartData = resp1.data
      })
      //获取部门列表
      getDepartment.fetchDepartment().then(resp => {
        // console.log(resp)
        for (let item in resp.data) {
          let id =  resp.data[item].id;
          let name1 =  resp.data[item].name;
          this.departments[id] = name1
        }
        console.log(this.departments)
      })

      dashboard.getAllPanalOnHomePage().then(resp1 => {
        console.log(resp1)
        this.dataList = resp1.data.rows
        console.log(this.dataList)
      })

      dashboard.getSourceNum().then(resp1 => {
        console.log(resp1)
        this.monitors = resp1.data.total
      })

      dashboard.getUserNum().then(resp1 => {
        console.log(resp1)
        this.userNum = resp1.data.total
      })

      dashboard.getLoginAtToday().then(resp1 => {
        console.log(resp1)
        this.websiteFlow = resp1.data.total
      })
    }
  }

}
</script>

<style lang="less" scoped>
  .add-icon {
    cursor:pointer;

    position: absolute;
    font-size: 150px;
    font-weight: 100;
    color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .panel {
    position: relative;
    height: 30vh;
    padding: 0 0.1875rem 0.5rem;
    border: 1px solid rgba(25, 186, 139, 0.17);
    margin-bottom: 20px;
    // background-color: #02b553;
    background: url(../../icons/images/line.png) rgba(255, 255, 255, 0.03);
    // 边框角
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid #02a6b5;
      border-top: 2px solid #02a6b5;
      content: "";
    }
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-right: 2px solid #02a6b5;
      border-top: 2px solid #02a6b5;
      content: "";
    }
    .panel-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      &::before {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
        border-left: 2px solid #02a6b5;
        border-bottom: 2px solid #02a6b5;
        content: "";
      }
      &::after {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid #02a6b5;
        border-bottom: 2px solid #02a6b5;
        content: "";
      }
    }
    h2 {
      /*height: 0.6rem;*/
      color: #fff;
      line-height: 20px;
      text-align: center;
      font-size: 15px;
      font-weight: 400;
      a {
        color: #fff;
        text-decoration: none;
        margin: 0 0.125rem;
      }
    }
    .chart {
      /*height: 3rem;*/
      /*height: 225px;*/
      margin: 6px;
      position: relative;
      /*background-color: #000a39;*/
      .button {
        cursor:pointer;

        position: relative;
        font-family: "mengxiangFont";
        text-align: center;
        font-size: 25px;
        color: #80E5F3;
        height: 52px;
        margin: 0 25px 0;
        padding: 10px 0.1875rem 0.5rem;
        border: 1px solid rgba(25, 186, 139, 0.17);
        margin-bottom: 25px;
        // background-color: #02b553;
        background: url(../../icons/images/line.png) rgba(255, 255, 255, 0.2);
        // 边框角
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 10px;
          height: 10px;
          border-left: 2px solid #02a6b5;
          border-top: 2px solid #02a6b5;
          content: "";
        }

        &::after {
          position: absolute;
          top: 0;
          right: 0;
          width: 10px;
          height: 10px;
          border-right: 2px solid #02a6b5;
          border-top: 2px solid #02a6b5;
          content: "";
        }

        .panel-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;

          &::before {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 10px;
            height: 10px;
            border-left: 2px solid #02a6b5;
            border-bottom: 2px solid #02a6b5;
            content: "";
          }

          &::after {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 10px;
            height: 10px;
            border-right: 2px solid #02a6b5;
            border-bottom: 2px solid #02a6b5;
            content: "";
          }
        }
      }
      .map1 {
        width: 200px;
        height: 200px;
        // 水平垂直居中
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url(../../icons/images/map.png);
        background-size: 100% 100%;
        opacity: 0.3;
      }
      .map2 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
        background: url(../../icons/images/lbx.png);
        // 15s无限循环
        animation: rotate1 15s linear infinite;
        opacity: 0.6;
        background-size: 100% 100%;
      }
      .map3 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 230px;
        height: 230px;
        background: url(../../icons/images/jt.png);
        animation: rotate2 10s linear infinite;
        opacity: 0.6;
        background-size: 100% 100%;
      }
    }
  }
// 页面主体盒子
/*.mainbox {*/
/*  display: flex;*/
/*  min-width: 1024px;*/
/*  max-width: 1920px;*/
/*  margin: 0 auto;*/
/*  padding: 10px 10px 0;*/
/*  .column {*/
/*    flex: 3;*/
/*  }*/
/*  .column:nth-child(2) {*/
/*    flex: 5;*/
/*    margin: 0 10px 0.1875rem;*/
/*    overflow: hidden;*/
/*  }*/
/*  .panel {*/
/*    position: relative;*/
/*    height: 285px;*/
/*    padding: 0 0.1875rem 0.5rem;*/
/*    border: 1px solid rgba(25, 186, 139, 0.17);*/
/*    margin-bottom: 20px;*/
/*    // background-color: #02b553;*/
/*    background: url(../../icons/images/line\(1\).png) rgba(255, 255, 255, 0.03);*/
/*    // 边框角*/
/*    &::before {*/
/*      position: absolute;*/
/*      top: 0;*/
/*      left: 0;*/
/*      width: 10px;*/
/*      height: 10px;*/
/*      border-left: 2px solid #02a6b5;*/
/*      border-top: 2px solid #02a6b5;*/
/*      content: "";*/
/*    }*/
/*    &::after {*/
/*      position: absolute;*/
/*      top: 0;*/
/*      right: 0;*/
/*      width: 10px;*/
/*      height: 10px;*/
/*      border-right: 2px solid #02a6b5;*/
/*      border-top: 2px solid #02a6b5;*/
/*      content: "";*/
/*    }*/
/*    .panel-footer {*/
/*      position: absolute;*/
/*      bottom: 0;*/
/*      left: 0;*/
/*      width: 100%;*/
/*      &::before {*/
/*        position: absolute;*/
/*        left: 0;*/
/*        bottom: 0;*/
/*        width: 10px;*/
/*        height: 10px;*/
/*        border-left: 2px solid #02a6b5;*/
/*        border-bottom: 2px solid #02a6b5;*/
/*        content: "";*/
/*      }*/
/*      &::after {*/
/*        position: absolute;*/
/*        bottom: 0;*/
/*        right: 0;*/
/*        width: 10px;*/
/*        height: 10px;*/
/*        border-right: 2px solid #02a6b5;*/
/*        border-bottom: 2px solid #02a6b5;*/
/*        content: "";*/
/*      }*/
/*    }*/
/*    h2 {*/
/*      !*height: 0.6rem;*!*/
/*      color: #fff;*/
/*      line-height: 20px;*/
/*      text-align: center;*/
/*      font-size: 15px;*/
/*      font-weight: 400;*/
/*      a {*/
/*        color: #fff;*/
/*        text-decoration: none;*/
/*        margin: 0 0.125rem;*/
/*      }*/
/*    }*/
/*    .chart {*/
/*      !*height: 3rem;*!*/
/*      height: 225px;*/
/*      margin: 6px;*/
/*      position: relative;*/
/*      !*background-color: #000a39;*!*/
/*      .button {*/
/*        cursor:pointer;*/

/*        position: relative;*/
/*        font-family: "mengxiangFont";*/
/*        text-align: center;*/
/*        font-size: 25px;*/
/*        color: #80E5F3;*/
/*        height: 52px;*/
/*        margin: 0 25px 0;*/
/*        padding: 10px 0.1875rem 0.5rem;*/
/*        border: 1px solid rgba(25, 186, 139, 0.17);*/
/*        margin-bottom: 25px;*/
/*        // background-color: #02b553;*/
/*        background: url(../../icons/images/line\(1\).png) rgba(255, 255, 255, 0.2);*/
/*        // 边框角*/
/*        &::before {*/
/*          position: absolute;*/
/*          top: 0;*/
/*          left: 0;*/
/*          width: 10px;*/
/*          height: 10px;*/
/*          border-left: 2px solid #02a6b5;*/
/*          border-top: 2px solid #02a6b5;*/
/*          content: "";*/
/*        }*/

/*        &::after {*/
/*          position: absolute;*/
/*          top: 0;*/
/*          right: 0;*/
/*          width: 10px;*/
/*          height: 10px;*/
/*          border-right: 2px solid #02a6b5;*/
/*          border-top: 2px solid #02a6b5;*/
/*          content: "";*/
/*        }*/

/*        .panel-footer {*/
/*          position: absolute;*/
/*          bottom: 0;*/
/*          left: 0;*/
/*          width: 100%;*/

/*          &::before {*/
/*            position: absolute;*/
/*            left: 0;*/
/*            bottom: 0;*/
/*            width: 10px;*/
/*            height: 10px;*/
/*            border-left: 2px solid #02a6b5;*/
/*            border-bottom: 2px solid #02a6b5;*/
/*            content: "";*/
/*          }*/

/*          &::after {*/
/*            position: absolute;*/
/*            bottom: 0;*/
/*            right: 0;*/
/*            width: 10px;*/
/*            height: 10px;*/
/*            border-right: 2px solid #02a6b5;*/
/*            border-bottom: 2px solid #02a6b5;*/
/*            content: "";*/
/*          }*/
/*        }*/
/*      }*/
/*      .map1 {*/
/*        width: 200px;*/
/*        height: 200px;*/
/*        // 水平垂直居中*/
/*        position: absolute;*/
/*        top: 50%;*/
/*        left: 50%;*/
/*        transform: translate(-50%, -50%);*/
/*        background: url(../../icons/images/map.png);*/
/*        background-size: 100% 100%;*/
/*        opacity: 0.3;*/
/*      }*/
/*      .map2 {*/
/*        position: absolute;*/
/*        top: 50%;*/
/*        left: 50%;*/
/*        transform: translate(-50%, -50%);*/
/*        width: 200px;*/
/*        height: 200px;*/
/*        background: url(../../icons/images/lbx.png);*/
/*        // 15s无限循环*/
/*        animation: rotate1 15s linear infinite;*/
/*        opacity: 0.6;*/
/*        background-size: 100% 100%;*/
/*      }*/

/*      .map3 {*/
/*        position: absolute;*/
/*        top: 50%;*/
/*        left: 50%;*/
/*        transform: translate(-50%, -50%);*/
/*        width: 230px;*/
/*        height: 230px;*/
/*        background: url(../../icons/images/jt.png);*/
/*        animation: rotate2 10s linear infinite;*/
/*        opacity: 0.6;*/
/*        background-size: 100% 100%;*/
/*      }*/
/*    }*/
/*  }*/
/*}*/
// no数字模块
li {
  list-style: none;
}
/* 声明字体*/
@font-face {
  font-family: electronicFont;
  src: url(../../font/DS-DIGIT.TTF);
}

@font-face {
  font-family: mengxiangFont;
  src: url(../../font/RuiZiRuiXianMengXiangHeiJianV1-0-1.ttf);
}
.no {
  background: rgba(101, 132, 226, 0.1);
  padding: 0.1875rem;
  .no-hd {
    position: relative;
    border: 1px solid rgba(25, 186, 139, 0.17);
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 30px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
    }
    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      content: "";
      width: 30px;
      height: 10px;
      border-right: 2px solid #02a6b5;
      border-bottom: 2px solid #02a6b5;
    }
    ul {
      display: flex;
      li {
        position: relative;
        flex: 1;
        line-height: 70px;
        font-size: 70px;
        color: #ffeb7b;
        text-align: center;
        font-family: "electronicFont";
        &::after {
          content: "";
          position: absolute;
          /*top: 25%;*/
          right: 0;
          height: 100%;
          width: 1px;
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
  .no-bd {
    ul {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        color: rgba(255, 255, 255, 0.7);
        font-size: 15px;
        /*height: 0.5rem;*/
        /*line-height: 0.5rem;*/
        /*padding-top: 0.125rem;*/
      }
    }
  }
}

.map {
  position: relative;
  /*height: 60vh;*/
  .map1 {
    /*width: 518px;*/
    /*height: 518px;*/
    /*// 水平垂直居中*/
    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
    /*background: url(../../icons/images/map.png);*/
    /*background-size: 100% 100%;*/
    /*opacity: 0.3;*/
  }
  .map2 {
    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
    /*width: 518px;*/
    /*height: 518px;*/
    /*background: url(../../icons/images/lbx.png);*/
    /*// 15s无限循环*/
    /*animation: rotate1 15s linear infinite;*/
    /*opacity: 0.6;*/
    /*background-size: 100% 100%;*/
  }

  .map3 {
    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
    /*width: 550px;*/
    /*height: 550px;*/
    /*background: url(../../icons/images/jt.png);*/
    /*animation: rotate2 10s linear infinite;*/
    /*opacity: 0.6;*/
    /*background-size: 100% 100%;*/
  }
  .chart {
    position: absolute;
    top: 0;
    left: 0;
    /*background-color: pink;*/
    width: 100%;
    height: 730px;
    z-index: 999;
  }
  // 旋转动画
  @keyframes rotate1 {
    form {
      // 先定位再旋转
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes rotate2 {
    form {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }
}

</style>

