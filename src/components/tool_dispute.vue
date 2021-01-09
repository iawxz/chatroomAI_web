<template>
  <div class="dispute" v-if="!isdetail">
    <div class="header">
      <div class="back">
        <img src="../assets/tools/icon_back.png" alt="返回" @click="goBack" />
        <span>解纷方式</span>
      </div>
      <div class="navs">
        <div
          class="nav"
          v-for="(item, index) in typeList"
          :key="index"
          @click="typeChoose(index)"
        >
          <span :class="{ navChoose: type == index }">{{ item }}</span>
          <div class="navLine" :class="{ navLineChoose: type == index }"></div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 流程进度 -->
      <div class="progress">
        <div class="titleBox">
          <span class="title">流程进度</span>
          <span class="subtitle" v-if="progress"
            >共{{ progress.length }}步</span
          >
        </div>
        <div class="progressBox">
          <div class="progressX" v-for="(item, index) in progress" :key="index">
            <div class="title" @click="goChoose(index)">
              <img
                src="../assets/tools/2_dispute/point.png"
                alt="标识点"
                v-if="choose != index"
              />
              <img
                src="../assets/tools/2_dispute/point_chose.png"
                alt="标识点—选中"
                v-else
              />
              <span>{{ item.step }}</span>
            </div>
            <div class="span" :class="{ noline: index == progress.length - 1 }">
              <div class="spanP" v-if="choose == index">
                <span>{{ item.content }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 常见问题 -->
      <div class="problem">
        <div class="titleBox">
          <span class="title">常见问题</span>
        </div>
        <div class="problemBox">
          <div
            class="problems"
            v-for="(item, index) in problems"
            :key="index"
            @click="goDetail(item.id)"
          >
            <span>{{ item.title }}</span>
            <img src="../assets/tools/2_dispute/icon_more.png" alt="查看详情" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="detail" v-else>
    <div class="header" @click="backDispute">
      <img src="../assets/tools/icon_back.png" alt="返回" />
      解纷方式
    </div>
    <div class="content">
      <span class="title">问：{{ detail.title }}</span>
      <div class="keywords">
        <span>关键词:</span>
        <div class="key">{{ detail.parenttype }}</div>
      </div>
      <div class="text">
        <span>答：</span>
        <div class="textContent" v-text="detail.answer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dispute",
  data() {
    return {
      type: 0, //类型选择 0协商 1调解 2仲裁 3诉讼，默认为0
      typeList: ["协商", "调解", "仲裁", "诉讼"],
      progress: [], //进度
      choose: 0, //当前选中的流程，默认为0
      problems: [], //常见问题
      question: [],
      isdetail: 0, //是否为详情页，0不是1是
      detail: {},
    };
  },
  props: {},
  components: {},
  mounted() {},
  created() {
    this.getProgress();
  },
  methods: {
    // 返回工具栏
    goBack() {
      this.$parent.getTool(-1);
    },
    // 选择类型
    typeChoose(index) {
      this.type = index;
      this.getProgress();
    },
    // 获取解纷方式
    getProgress() {
      var data = {};
      data.type = this.typeList[this.type];
      this.$axios({
        url: "http://ai.365lawhelp.com/API/Resolve/getResolveList",
        method: "post",
        data: data,
      }).then((res) => {
        this.progress = res.data.datalist;
        this.problems = res.data.questionlist;
      });
    },
    // 选择流程
    goChoose(index) {
      this.choose = index;
    },
    // 查看详情
    goDetail(id) {
      this.isdetail = 1;
      var data = {};
      data.id = id;
      this.$axios({
        url: "http://ai.365lawhelp.com/API/Question/getQuestionDetail",
        method: "post",
        data: data,
      }).then((res) => {
        this.detail = res.data;
      });
    },
    // 返回解纷方式
    backDispute() {
      this.isdetail = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.dispute {
  .header {
    width: 100%;
    height: 90px;
    background-color: #2083e7;
    position: relative;
    .back {
      position: relative;
      img {
        width: 8px;
        height: 14px;
        position: absolute;
        top: 30px;
        left: 16px;
        cursor: pointer;
      }
      span {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        position: absolute;
        top: 27px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .navs {
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: center;
      .nav {
        width: 23%;
        height: 40px;
        cursor: pointer;
        position: relative;
        span {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          opacity: 0.7;

          position: absolute;
          bottom: 7px;
          left: 50%;
          transform: translateX(-50%);
        }
        .navLine {
          width: 100%;
          height: 3px;
          background: transparent;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .navChoose {
          opacity: 1;
        }
        .navLineChoose {
          background-color: #ffffff;
        }
      }
      .nav:hover {
        span {
          opacity: 1;
        }
        .navLine {
          background-color: #ffffff;
        }
      }
    }
  }
  .content {
    height: 600px;
    overflow-y: scroll;
    padding: 20px 16px 0;

    .progress {
      .titleBox {
        display: flex;
        align-items: center;
        .title {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #000000;
          opacity: 0.95;
          display: inline-block;
          margin-right: 18px;
        }
        .subtitle {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #000000;
          opacity: 0.7;
        }
      }
      .progressBox {
        margin-top: 20px;
        .progressX {
          .title {
            display: flex;
            align-items: center;
            cursor: pointer;
            img {
              width: 24px;
              height: 24px;
              display: block;
              margin-right: 18px;
            }
            span {
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #000000;
              opacity: 0.95;
            }
          }
          .span {
            min-height: 14px;
            border-left: 3px solid rgba($color: #000000, $alpha: 0.3);
            margin-left: 10.5px;
            .spanP {
              margin-left: 29px;
              padding: 8px;
              background: #1980e8;
              border-radius: 5px;
              span {
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: bold;
                color: #fffefe;
                line-height: 18px;
              }
            }
          }
          .noline {
            border: none;
            margin-left: 13.5px;
          }
        }
      }
    }
    .problem {
      margin-top: 20px;
      padding-bottom: 20px;
      .titleBox {
        margin-bottom: 10px;
        span {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #000000;
          opacity: 0.95;
        }
      }
      .problemBox {
        .problems {
          cursor: pointer;
          margin-left: 15px;
          height: 24px;
          border-bottom: 1px dashed rgba($color: #000000, $alpha: 0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            width: 90%;
            display: inline-block;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #3e3e3e;
            opacity: 0.8;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          img {
            width: 8px;
            height: 14px;
            display: block;
          }
        }
      }
    }
  }
  .content::-webkit-scrollbar {
    width: 8px;
  }
  .content::-webkit-scrollbar-thumb {
    background-color: #d2d2d2;
    border-radius: 5px;
  }
}
.detail {
  .header {
    width: 100%;
    height: 60px;
    background-color: #1980e8;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    img {
      width: 8px;
      height: 15px;
      display: block;
      margin: 0 10px 0 20px;
    }
  }
  .content {
    padding: 25px 15px 0 15px;
    height: 623px;
    overflow-y: scroll;
    .title {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #3d3d3d;
      opacity: 0.9;
      display: block;
      margin-bottom: 16px;
    }
    .keywords {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
        line-height: 50px;
        opacity: 0.7;
      }
      .key {
        background: #e6f2ff;
        border-radius: 2px;
        padding: 2px 5px;
        margin: 0 9px;

        font-size: 12px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
        opacity: 0.6;
      }
    }
    .text {
      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
        opacity: 0.7;
        display: block;
        margin-bottom: 13px;
      }
      .textContent {
        padding-left: 16px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #3e3e3e;
        line-height: 20px;
        opacity: 0.7;
      }
    }
  }
  .content::-webkit-scrollbar {
    width: 8px;
  }
  .content::-webkit-scrollbar-thumb {
    background-color: #d2d2d2;
    border-radius: 5px;
  }
}
</style>