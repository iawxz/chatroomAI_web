<template>
  <div class="home">
    <div class="chatroom">
      <div class="header">
        <img src="../assets/logo.png" alt="法保网logo" />
        <p>法保网AI智能客服</p>
      </div>
      <div class="content">
        <!-- 聊天区域 -->
        <div class="chatBox">
          <!-- 聊天窗 -->
          <div class="chatWindow"></div>
          <!-- 聊天输入框 -->
          <div class="chatInput">
            <div class="sendBtn">发送</div>
          </div>
        </div>
        <!-- 辅助工具 -->
        <div class="tools">
          <div class="toolsBox">
            <img
              v-for="(item, index) in tools"
              :key="index"
              :src="item.img"
              :alt="item.name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 辅助工具
      tools: [
        {
          name: "法规搜索",
          url: "",
          img: require("../assets/chatroom/tool_1.png"),
        },
        {
          name: "案例搜索",
          url: "",
          img: require("../assets/chatroom/tool_2.png"),
        },
        {
          name: "解纷方式",
          url: "",
          img: require("../assets/chatroom/tool_3.png"),
        },
        {
          name: "辅助工具",
          url: "",
          img: require("../assets/chatroom/tool_4.png"),
        },
      ],
    };
  },
  props: {},
  components: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #c0cad5;

  .chatroom {
    width: 73%;
    min-width: 1000px;
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);

    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;

    .header {
      width: 100%;
      height: 80px;
      background: #3699ff;
      display: flex;
      align-items: center;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      img {
        width: 42px;
        height: 42px;
        display: block;
        margin-left: 40px;
        margin-right: 12px;
      }
      p {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }
    .content {
      width: 100%;
      height: 720px;
      display: flex;
      .chatBox {
        width: 73%;
        height: 720px;
        border-right: 4px solid #e6e6e6;
        .chatWindow {
          width: 100%;
          height: 586px;
          background: #f2f2f2;
          border-bottom: 4px solid #e6e6e6;
        }
        .chatInput {
          width: 100%;
          height: 130px;
          position: relative;
          .sendBtn {
            width: 100px;
            height: 40px;
            text-align: center;
            line-height: 40px;

            font-size: 20px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;

            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            background: #3699ff;
            border-radius: 10px;

            position: absolute;
            right: 40px;
            bottom: 14px;
          }
        }
      }
      .tools {
        width: 27%;
        min-width: 268px;
        height: 720px;
        .toolsBox {
          margin-top: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          img {
            width: 81px;
            height: 80px;
            display: block;
            cursor: pointer;
            padding: 15px 30px;
          }
        }
      }
    }
  }
}
</style>