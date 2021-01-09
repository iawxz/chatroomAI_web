<template>
  <div class="fee content">
    <div class="option">
      <select v-model="typeIndex">
        <option v-for="(item, index) in type" :key="index" :value="index">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="calcBox">
      <div class="select item">
        <span>受诉法院省份</span>
        <div class="selectBox itemBox">
          <select v-model="provinceIndex">
            <option
              v-for="(item, index) in provinceList"
              :key="index"
              :value="index"
            >
              {{ item }}
            </option>
          </select>
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

      <div class="result" v-if="typeIndex != 2">
        <span class="name">律师费用</span>
        <div class="unit">
          <span>{{ result }}</span>
          <span class="unit_">元</span>
        </div>
      </div>
      <div
        class="result"
        v-else
        v-for="(item, index) in result_cril"
        :key="index"
      >
        <span class="name">{{ item.name }}</span>
        <div class="unit">
          <span>{{ item.amount }}</span>
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
      type: ["选择案件类型", "民事案件", "刑事案件", "行政案件"],
      typeIndex: 0, //选中类型默认为0
      provinceList: ["选择省份"],
      provinceIndex: 0,
      isInvolve: -1, //是否涉及财产
      amount: "", //涉事金额
      result: "", //计算结果
      result_cril: [
        {
          name: "侦察阶段",
          amount: "",
        },
        {
          name: "审查起诉阶段",
          amount: "",
        },
        {
          name: "一审阶段",
          amount: "",
        },
      ],
    };
  },
  props: {},
  components: {},
  mounted() {},
  created() {
    this.getProvinceList();
  },
  methods: {
    // 获取省份列表
    getProvinceList: function () {
      let city = require("../components/city.json");
      // 因一国两制政策，计费方式不统一，暂不包含港澳台
      for (var i of city) {
        if (i.label == "香港" || i.label == "台湾省" || i.label == "澳门") {
          return;
        } else {
          this.provinceList.push(i.label);
        }
      }
    },
    // 去计算
    goCalc() {
      var data = {};
      data.money = this.amount;
      if (this.provinceIndex > 0) {
        data.province = this.provinceList[this.provinceIndex];
        var index;
        if (data.province.indexOf("省") > -1) {
          index = data.province.indexOf("省");
          data.province = data.province.substring(0, index);
        } else if (data.province.indexOf("市") > -1) {
          index = data.province.indexOf("市");
          data.province = data.province.substring(0, index);
        }
      }
      if (this.typeIndex == 0 || data.money == "" || !data.province) {
        alert("有信息未填写");
        return;
      } else {
        this.$axios({
          url: "http://ai.365lawhelp.com/API/Cost/getLawyerCost",
          method: "post",
          data,
        }).then((res) => {
          if (this.typeIndex == 2) {
            this.result_cril[0].amount = res.data.cril.zhencha;
            this.result_cril[1].amount = res.data.cril.shencha;
            this.result_cril[2].amount = res.data.cril.yishen;
          } else if (this.typeIndex == 1) {
            this.result = res.data.minshi;
          } else if (this.typeIndex == 3) {
            this.result = res.data.xingzheng;
          }
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
      z-index: 999;
      span {
        display: inline-block;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #6d6d6d;
        position: relative;
        z-index: 999;
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
    .selectBox {
      position: relative;
      z-index: 0;
      select {
        border: none;
        outline: none;
        width: 100%;
        height: 50px;
        line-height: 50px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.7);
        direction: rtl;
        padding-right: 35px;
        position: relative;
        z-index: 0;
      }
    }
    .selectBox:after {
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