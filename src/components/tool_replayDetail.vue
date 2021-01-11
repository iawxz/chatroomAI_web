<template>
  <div class="detail">
    <div class="header" @click="goBack">
      <img src="../assets/tools/icon_back.png" alt="返回" />
      答复详情
    </div>
    <div class="content">
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
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    detail: {
      required: true,
    },
  },
  components: {},
  mounted() {},
  methods: {
    goBack() {
      this.$parent.getTool(-1);
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