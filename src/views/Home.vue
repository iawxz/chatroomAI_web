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
          <div class="chatWindow">
            <div
              class="chatBubbleBox"
              v-for="(item, index) in chats"
              :key="index"
            >
              <div class="chatBubbleTime" v-if="item.send_timestamp">
                <span>{{ item.show_time }}</span>
              </div>
              <div
                class="chatBubble"
                :class="{ chatBubbleUser: item.sender != 0 }"
              >
                <div name="亮亮" class="avatar" v-if="item.sender == 0"></div>
                <span>{{ item.send_con }}</span>
              </div>
            </div>
          </div>
          <!-- 聊天输入框 -->
          <div class="chatInput">
            <textarea placeholder="请输入您的问题..."></textarea>
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
      // 聊天记录
      chats: [
        {
          sender: 0, //发送人，0机器人1用户
          send_con: "你好，我是法保网智能客服，有问题请咨询我!",
          send_timestamp: "1607583703", //发送时间,存时间戳好进行判断，若聊天间隔3分钟内，不重复显示时间          
          show_time: "星期一 15:01",
        },
        {
          sender: 1,
          send_con: "你好，你能干嘛？",
          send_timestamp: "1607583730",
          show_time: "今天 15:01",
        },
        {
          sender: 0,
          send_con: "你可以让我帮你找合同模板、法律案例、这些东西",
          send_timestamp: "1607583735",
          show_time: "2020-12-26 15:01:43",
        },
        {
          sender: 1,
          send_con: "我需要一些劳动仲裁官司的案例",
          send_timestamp: "1607929330",
          show_time: "2020-12-26 15:08:56",
        },
        {
          sender: 0,
          send_con: "好的，我这就为你去找...",
          send_timestamp: "1607929336",
          show_time: "2020-12-26 15:08:56",
        },
      ],
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
  created () {
    
  },
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
    box-shadow: 0px 5px 24px 0px rgba(0, 0, 0, 0.2);

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
          height: 586px;
          background: #f2f2f2;
          border-bottom: 4px solid #e6e6e6;
          overflow-y: scroll;
          padding: 0 40px;

          .chatBubbleBox {
            .chatBubbleTime {
              text-align: center;
              span {
                display: inline-block;
                margin: 4px 0 16px;

                padding: 4px 8px;
                text-align: center;
                background: #dadada;
                border-radius: 4px;

                font-size: 14px;
                font-family: PingFang SC;
                color: #ffffff;
              }
            }
            .chatBubble {
              margin-bottom: 16px;
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
              .avatar {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                background-color: #ffffff;
                margin-right: 10px;
              }
              span {
                max-width: 50%;

                font-size: 15px;
                font-family: PingFang SC;
                color: #3b3b3b;

                display: inline-block;
                padding: 12.5px 20px;
                background: #ffffff;
                border-radius: 10px;
              }
            }
            .chatBubbleUser {
              justify-content: flex-end;
            }
          }
          .chatBubbleBox:first-child {
            margin-top: 30px;
          }
        }
        .chatWindow::-webkit-scrollbar {
          width: 8px;
        }
        .chatWindow::-webkit-scrollbar-thumb {
          background-color: #d2d2d2;
          border-radius: 5px;
        }
        .chatInput {
          width: 100%;
          height: 130px;
          position: relative;

          textarea {
            width: 93%;
            height: 60px;
            position: absolute;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);

            display: block;
            border: 0;
            resize: none;
            outline: none;
            cursor: default;

            font-size: 16px;
            font-family: PingFang SC;
          }

          textarea::-webkit-scrollbar {
            width: 8px;
          }
          textarea::-webkit-scrollbar-thumb {
            background-color: #d2d2d2;
            border-radius: 5px;
          }

          .sendBtn {
            width: 80px;
            height: 32px;
            text-align: center;
            line-height: 32px;

            font-size: 16px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;

            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            background: #3699ff;
            border-radius: 4px;

            position: absolute;
            right: 45px;
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