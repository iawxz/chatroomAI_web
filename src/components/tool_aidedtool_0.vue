<template>
  <div class="lawsuit content">
    <div class="option">
      <select v-model="typeIndex">
        <option v-for="(item, index) in type" :key="index" :value="index">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="calcBox">
      <div class="radio item">
        <span>涉及财产</span>
        <div class="radioBox itemBox">
          <label
            ><input
              type="radio"
              name="involve"
              v-model="isInvolve"
              value="1"
            />是</label
          >
          <label
            ><input
              type="radio"
              name="involve"
              v-model="isInvolve"
              value="0"
            />否</label
          >
        </div>
      </div>
      <div class="input item">
        <span>涉及金额</span>
        <div class="inputBox itemBox">
          <label><input type="number" v-model="amount" />元</label>
        </div>
      </div>
    </div>
    <div class="calcBtn" @click="goCalc()">去计算</div>
    <div class="resultBox">
      <div class="resultHeader">
        <img
          src="../assets/tools/3_aidedtools/icon_result.png"
          alt="计算结果icon"
        />
        <span>计算结果</span>
      </div>
      <div class="result">
        <span class="name">受理费</span>
        <div class="unit">
          <span v-if="result.acceptfee">{{result.acceptfee}}</span>
          <span class="unit_">元</span>
        </div>
      </div>
      <div class="result">
        <span class="name">执行费</span>
        <div class="unit">
          <span v-if="result.exefee">{{result.exefee}}</span>
          <span class="unit_">元</span>
        </div>
      </div>
      <div class="result">
        <span class="name">保全费</span>
        <div class="unit">
          <span v-if="result.prefee">{{result.prefee}}</span>
          <span class="unit_">元</span>
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
      type: ["选择案件类型"],
      typeID: [],
      typeIndex: 0, //选中类型默认为0
      isInvolve: -1, //是否涉及财产
      amount: "", //涉事金额
      result: {}, //计算结果
    };
  },
  props: {},
  components: {},
  mounted() {},
  created() {
    this.getType();
  },
  methods: {
    // 获取案件类型
    getType() {
      // 获取诉讼服务案件类型
      this.$axios({
        url: "http://ai.365lawhelp.com/API/Cost/getsusongType",
        method: "post",
        data: {},
      }).then((res) => {
        for (var i of res.data) {
          this.type.push(i.name);
          this.typeID.push(i.id);
        }
      });
    },
    // 去计算
    goCalc() {
      var data = {};
      if (this.typeIndex == 0) {
        alert("未选择类型");
        return;
      } else if (this.amount == "" && this.isInvolve == 1) {
        alert("请填写涉及金额");
        return;
      } else {
        data.type = this.type[this.typeIndex];
        if (this.isInvolve == -1) {
          this.isInvolve = 0;
        }
        data.isPoperty = this.isInvolve;
        data.money = this.amount;
        this.$axios({
          url: "http://ai.365lawhelp.com/API/Cost/getsusongCost",
          method: "post",
          data,
        }).then((res) => {
          this.result = res.data
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 16px;
  .calcBox {
    width: 100%;
    border: 2px solid #f2f2f2;
    border-radius: 6px;
    .item {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      span {
        display: inline-block;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #6d6d6d;
        position: relative;
        left: 16px;
      }
    }
    .itemBox {
      width: 60%;
      height: 50px;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.08);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      label {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba($color: #000000, $alpha: 0.7);
      }
    }
    .radioBox {
      label {
        display: flex;
        align-items: center;
        margin: 0 20px;
        input {
          display: inline-block;
          margin-right: 5px;
        }
      }
    }
    .inputBox {
      label {
        margin-right: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        input {
          width: 80%;
          border: none;
          outline: none;
          text-align: right;
          margin-right: 5px;
        }
        input[type="number"] {
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
          -moz-appearance: textfield;
        }
      }
    }
  }
  .calcBtn {
    width: 160px;
    height: 40px;
    background: #2083e7;
    border-radius: 6px;
    margin: 20px auto;
    cursor: pointer;

    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
  }
  .resultBox {
    width: 100%;
    background: #ffffff;
    border: 2px solid #f2f2f2;
    border-radius: 10px;
    overflow: hidden;
    .resultHeader {
      width: 100%;
      height: 50px;
      background: #e6f2ff;
      display: flex;
      align-items: center;
      img {
        width: 19px;
        height: 22px;
        display: block;
        margin: 0px 6px 0px 6px;
      }
      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #2083e7;
      }
    }
    .result {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      span.name {
        display: inline-block;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #6d6d6d;
        position: relative;
        left: 16px;
      }
      div.unit {
        width: 60%;
        height: 50px;
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.08);
        display: flex;
        align-items: center;
        justify-content: flex-end;

        font-size: 14px;
        font-family: PingFang SC;
        span.unit_ {
          display: inline-block;
          margin: 0 20px 0 5px;
          font-weight: bold;
          color: #2083e7;
          opacity: 0.9;
        }
      }
    }
  }
}
.option {
  width: 100%;
  height: 40px;
  border: 2px solid #f2f2f2;
  border-radius: 6px;
  margin-bottom: 12px;
  position: relative;
  select {
    border: none;
    outline: none;
    width: 100%;
    height: 40px;
    line-height: 40px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-left: 20px;

    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #6d6d6d;
  }
}
.option:after {
  content: "";
  width: 9px;
  height: 6px;
  background-image: url("../assets/tools/3_aidedtools/icon_more.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: absolute;
  right: 20px;
  top: 41%;
  pointer-events: none;
}
</style>