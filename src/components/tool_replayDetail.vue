<template>
  <div class="detail">
    <div class="header" @click="goBack">
      <img src="../assets/tools/icon_back.png" alt="返回" />
      <span>详情</span>
    </div>
    <div class="content" v-if="type == 'QA'">
      <span class="title">问：{{ detail.title }}</span>
      <div class="keywords">
        <div class="keyTitle">关键词:</div>
        <div class="key">{{ detail.parenttype }}</div>
        <div class="key">{{ detail.childtype }}</div>
      </div>
      <div class="text">
        <span>相关法律:</span>
        <div class="textContent">{{ detail.law }}</div>
      </div>
      <div class="text">
        <span>答：</span>
        <div class="textContent" v-text="detail.answer"></div>
      </div>
    </div>
    <div class="content" v-else-if="type == 'LAW'">
      <span class="title">{{ detail_.title }}</span>
      <div class="keywords">
        <div class="keyTitle">关键词:</div>
        <div class="key" v-if="detail_.issuingAuthority">
          {{ detail_.issuingAuthority }}
        </div>
        <div class="key" v-if="detail_.lawType">{{ detail_.lawType }}</div>
        <div class="key" v-if="detail_.issueDate">
          发布时间：{{ detail_.issueDate }}
        </div>
        <div class="key" v-if="detail_.implDate">
          实施时间：{{ detail_.implDate }}
        </div>
      </div>
      <div class="text">
        <span>内容：</span>
        <div class="textContent" v-html="detail_.content"></div>
      </div>
    </div>
    <div class="content" v-else-if="type == 'CASE'">
      <span class="title">{{ detail_.title }}</span>
      <div class="keywords">
        <div class="keyTitle">关键词:</div>
        <div class="key" v-if="detail_.trailCourt">{{ detail_.trailCourt }}</div>
        <div class="key" v-if="detail_.caseNumber">{{ detail_.caseNumber }}</div>
        <div class="key" v-if="detail_.caseType">{{ detail_.caseType }}</div>
        <div class="key" v-if="detail_.trailProcedure">{{ detail_.trailProcedure }}</div>        
        <div class="key" v-if="detail_.judgmentDate">{{ detail_.judgmentDate }}</div>
        <div class="key" v-if="detail_.publicDate">{{ detail_.publicDate }}</div>
      </div>
      <div class="text">      
        <span>内容：</span>  
        <div class="textContent" v-html="detail_.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      type: "",
      detail_: {},
    };
  },
  props: {
    detail: {
      required: true,
    },
  },
  components: {},
  mounted() {
    this.getDetail();
  },
  watch: {
    detail(val) {
      this.getDetail();
    },
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$parent.getTool(-1);
    },
    // 获取详情信息
    getDetail() {
      if (this.detail.answer) {
        //问答类型
        this.type = "QA";
      } else if (this.detail.lawDataId) {
        // 法律知识类型
        this.$axios({
          url: "http://ai.365lawhelp.com/API/Default/getLawDetail",
          method: "post",
          data: {
            id: this.detail.lawDataId,
          },
        }).then((res) => {
          this.detail_ = res.data;
          if (this.detail_) {
            var index = 0;
            this.detail_.content = this.detail_.content.replace(
              /\【+/g,
              "<br>【"
            ); //全部的【前加换行符
            this.detail_.content = this.detail_.content.replace(
              /\<br>【+/,
              "【"
            ); //第一个【前不加换行，通过不加g全局来判断
          }
          this.type = "LAW";
        });
      } else if (this.detail.caseDataId) {
        // 案件文书类型
        this.$axios({
          url: "http://ai.365lawhelp.com/API/Default/getCaseDetail",
          method: "post",
          data: {
            id: this.detail.caseDataId,
          },
        }).then((res) => {
          this.detail_ = res.data;
          console.log(this.detail_)
          if (this.detail_) {
            var index = 0;
            this.detail_.content = this.detail_.content.replace(
              /\【+/g,
              "<br>【"
            ); //全部的【前加换行符
            this.detail_.content = this.detail_.content.replace(
              /\<br>【+/,
              "【"
            ); //第一个【前不加换行，通过不加g全局来判断
            this.detail_.content = this.detail_.content.replace(/\\n/g, "<br>");
          }
          this.type = "CASE";
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .keyTitle {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
        opacity: 0.7;
      }
      .key {
        height: 16px;
        background: #e6f2ff;
        border-radius: 2px;
        padding: 2px 5px;
        margin: 5px;

        font-size: 12px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
        opacity: 0.6;
      }
    }
    .text {
      margin-bottom: 10px;
      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
        opacity: 0.7;
        display: block;
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