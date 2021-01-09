<template>
  <div class="aidedtools" v-if="tool == -1">
    <div class="header">
      <img
        @click="goBack"
        class="back"
        src="../assets/tools/icon_back.png"
        alt="返回"
      />
    </div>
    <div class="content">
      <div
        class="toolBox"
        v-for="(item, index) in tools"
        :key="index"
        @click="goTool(index)"
      >
        <img class="toolIcon" :src="item.imgurl" alt="辅助工具Icon" />
        <span class="toolName">{{ item.name }}</span>
      </div>
    </div>
  </div>
  <div class="toolBox" v-else>
    <div class="header">
      <img src="../assets/tools/icon_back.png" alt="返回" @click="backList" />
      <span>{{ tools[tool].toolname }}</span>
    </div>
    <div class="nav" v-if="tool == 1|| tool == 2">
      <div
        class="navName"
        :class="{ navChoise: transNav == 0 }"
        @click="goNav(0)"
      >
        <span>伤残赔偿</span>
        <div class="underline"></div>
      </div>
      <div
        class="navName"
        :class="{ navChoise: transNav == 1 }"
        @click="goNav(1)"
      >
        <span>死亡赔偿</span>
        <div class="underline"></div>
      </div>
    </div>
    
    <lawsuit v-if="tool == 0"></lawsuit>
    <injuries v-else-if="tool == 1" :nav="transNav"></injuries>
    <trans v-else-if="tool == 2" :nav="transNav"></trans>
    <fee v-else-if="tool == 3"></fee>
  </div>
</template>

<script>
import lawsuit from "../components/tool_aidedtool_0";
import injuries from "../components/tool_aidedtool_1";
import trans from "../components/tool_aidedtool_2";
import fee from "../components/tool_aidedtool_3";
export default {
  name: "",
  data() {
    return {
      tool: -1, //-1辅助工具栏,0诉讼服务,1工伤服务,2交通赔偿,3律师费用
      tools: [
        {
          imgurl: require("../assets/tools/3_aidedtools/icon_0_lawsuit.png"),
          name: "诉讼服务",
          toolname: "诉讼费用计算",
        },
        {
          imgurl: require("../assets/tools/3_aidedtools/icon_1_injuries.png"),
          name: "工伤赔偿",
          toolname: "工伤赔偿",
        },
        {
          imgurl: require("../assets/tools/3_aidedtools/icon_2_trans.png"),
          name: "交通赔偿",
          toolname: "交通赔偿",
        },
        {
          imgurl: require("../assets/tools/3_aidedtools/icon_3_fee.png"),
          name: "律师费用",
          toolname: "律师费用计算",
        },
      ],
      transNav: 0, //交通赔偿导航栏，默认为0
    };
  },
  props: {},
  components: {
    lawsuit,
    injuries,
    trans,
    fee,
  },
  mounted() {},
  methods: {
    // 返回总工具栏
    goBack() {
      this.$parent.getTool(-1);
    },
    // 使用工具
    goTool(index) {
      this.tool = index;
    },
    // 前往工具导航指定内容
    goNav(nav) {
      this.transNav = nav;
    },
    // 返回列表
    backList() {
      this.tool = -1;
    },
  },
};
</script>

<style lang="scss" scoped>
.aidedtools {
  .header {
    width: 100%;
    height: 138px;
    background-position: 0% center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../assets/tools/3_aidedtools/back.png");
    position: relative;

    .back {
      width: 8px;
      height: 15px;
      display: block;
      position: absolute;
      top: 28px;
      left: 16px;
      cursor: pointer;
    }
  }
  .content {
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .toolBox {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: 0 7.5px;
      cursor: pointer;
      img.toolIcon {
        width: 58px;
        height: 58px;
        display: block;
        margin: 20px 0 10px;
      }
      span.toolName {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #3d3d3d;
      }
    }
  }
}
.toolBox {
  .header {
    width: 100%;
    height: 70px;
    background-color: #2083e7;
    position: relative;
    img {
      width: 8px;
      height: 15px;
      display: block;
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
    }
    span {
      display: inline-block;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .nav {
    width: 100%;
    min-height: 20px;
    background-color: #2083e7;
    position: relative;
    // top: -9px;
    display: flex;
    align-items: center;
    justify-content: center;
    .navName {
      width: 45%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;

      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba($color: #ffffff, $alpha: 0.7);
        display: inline-block;
        margin-bottom: 7px;
      }

      .underline {
        width: 100%;
        height: 3px;
        background: #2083e7;
      }
    }
    .navChoise {
      span {
        color: #ffffff;
      }
      .underline {        
        background: #ffffff;
      }
    }
  }
}
</style>