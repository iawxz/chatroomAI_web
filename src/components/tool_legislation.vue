<template>
  <div class="legislation">
    <div class="list" v-if="!isDetail">
      <div class="header">
        <div class="headerBox">
          <img
            @click="goBack"
            class="back"
            src="../assets/tools/icon_back.png"
            alt="返回"
          />
          <div class="searchBox">
            <img
              class="search"
              src="../assets/tools/icon_search.png"
              alt="搜索"
            />
            <input
              type="text"
              placeholder="请输入检索字段"
              v-model="keywords"
              @input="searchList"
            />
          </div>
          <div class="back"></div>
        </div>
      </div>
      <div class="listBox" v-if="list" @scroll="getMore">
        <div class="total">共收录{{ listTotal }}份法规</div>
        <div
          class="listItem"
          v-for="(item, index) in list"
          :key="index"
          @click="goDetail(item)"
        >
          <div class="title">
            <span>{{ item.title }}</span>
          </div>
          <div class="content" v-html="item.text"></div>
          <img
            src="../assets/tools/0_legislation/useful.png"
            v-if="item.isimpl == '现行有效'"
            alt="现行有效"
          />
          <img
            src="../assets/tools/0_legislation/useless.png"
            v-else
            alt="尚未生效"
          />
        </div>
      </div>
    </div>
    <div class="detail" v-else>
      <div class="header" @click="backList">
        <img src="../assets/tools/icon_back.png" alt="返回" />
        法律法规
      </div>
      <div class="content" id="detailContent">
        <span class="title">{{ detail.title }}</span>
        <div class="keywords">
          <span>关键词:</span>
          <div class="key">{{ detail.lawType }}</div>
          <div class="key">{{ detail.issueDate }}</div>
          <div class="key">{{ detail.issuedNumber }}</div>
          <div class="key">{{ detail.issuingAuthority }}</div>
        </div>
        <div class="text">
          <span>内容:</span>
          <div class="textContent" v-html="detail.text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      pageSize: 10,
      keywords: "",
      list: [],
      listTotal: 0,
      detail: {},
      isDetail: 0, //是否为详情界面，0不是1是
    };
  },
  props: {},
  components: {},
  mounted() {
    this.getList();
  },
  methods: {
    // 返回工具栏
    goBack() {
      this.$parent.getTool(-1);
    },
    // 获取列表
    getList() {
      this.$axios({
        url: "http://ai.365lawhelp.com/API/Default/getLawList",
        method: "post",
        data: {
          pageNum: 1,
          pageSize: this.pageSize,
          keywords: this.keywords,
        },
      }).then((res) => {
        this.list = res.data.datalist;
        this.listTotal = res.data.total;
        var textRule = new RegExp("<.+?>", "g");
        var index = 0;
        for (var i of this.list) {
          this.list[index].text = i.content.replace(textRule, "");
          this.list[index].text = this.list[index].text.replace(/\s+/g, "");
          this.list[index].text = this.list[index].text.replace(
            /\【+/g,
            "<br>【"
          ); //全部的【前加换行符
          this.list[index].text = this.list[index].text.replace(
            /\<br>【+/,
            "【"
          ); //第一个【前不加换行，通过不加g全局来判断
          index++;
        }
      });
    },
    // 获取更多法规
    getMore(e) {
      if (
        e.srcElement.scrollTop + e.srcElement.clientHeight ==
        e.srcElement.scrollHeight
      ) {
        this.pageSize += 10;
        this.getList();
      }
    },
    // 搜索法规列表
    searchList() {
      let oldInput = this.keywords;
      let that = this;
      // 添加延时判断500毫秒内input框内容会不会变化，不会变化时发送请求
      setTimeout(function () {
        if (that.keywords == oldInput) {
          that.getList();
        }
      }, 500);
    },
    // 查看详情
    goDetail(item) {
      this.detail = item;
      this.isDetail = 1;
    },
    // 返回列表
    backList() {
      this.isDetail = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  .header {
    width: 100%;
    height: 138px;
    background-position: 20% center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../assets/tools/0_legislation/back.png");

    position: relative;

    .headerBox {
      display: flex;
      align-items: center;
      justify-content: center;

      position: relative;
      top: 25px;

      .back {
        width: 8px;
        height: 15px;
        display: block;
      }
      img.back {
        cursor: pointer;
      }
      .searchBox {
        width: 70%;
        max-width: 277px;
        height: 30px;
        background: #ffffff;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.17);
        border-radius: 15px;
        margin-left: 25px;

        display: flex;
        align-items: center;
        justify-content: center;
        .search {
          width: 12px;
          height: 16px;
          display: block;
        }
        input {
          width: 80%;
          display: block;
          margin-left: 10px;
          outline: none;
          border: none;
        }
      }
    }
  }
  .listBox {
    width: 100%;
    height: 570px;
    overflow-y: scroll;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    .total {
      width: 90%;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #000000;
      opacity: 0.7;
      margin: 20px 0;
    }
    .listItem {
      width: 90%;
      background-color: #f7f7f7;
      border-radius: 5px;
      margin-bottom: 20px;
      cursor: pointer;
      position: relative;
      img {
        width: 50px;
        height: 23px;
        position: absolute;
        top: 6px;
        left: -3px;
      }
      .title {
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-bottom: 1px solid #000000;
        span {
          display: inline-block;
          width: 55%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;

          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #3d3d3d;
          line-height: 18px;
          opacity: 0.9;
        }
      }
      .content {
        padding: 10px 15px 0;
        margin-bottom: 10px;
        height: 52px;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;

        font-size: 12px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #3e3e3e;
        line-height: 18px;
        opacity: 0.8;
      }
    }
  }
  .listBox::-webkit-scrollbar {
    width: 8px;
  }
  .listBox::-webkit-scrollbar-thumb {
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
      display: inline-block;
      margin-bottom: 10px;
    }
    .keywords,
    .text {
      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
        opacity: 0.7;
      }
    }
    .keywords {
      margin-bottom: 5px;
      display: flex;
      flex-wrap: wrap;
      .key {
        font-size: 11px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000000;
        opacity: 0.6;
        padding: 2px 5px;
        background: #e6f2ff;
        border-radius: 5px;
        margin: 5px;
        margin-top: 0;
      }
    }
    .text {
      .textContent {
        padding-left: 10px;
        margin-top: 10px;
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