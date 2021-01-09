<template>
  <div class="trans content">
    <div class="calcBox">
      <div class="select item">
        <span class="point">*</span>
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
      <div class="select item">
        <span class="point">*</span>
        <span>户籍类型</span>
        <div class="selectBox itemBox">
          <select v-model="hukou">
            <option value="-1">选择户口类型</option>
            <option value="0">农村</option>
            <option value="1">城镇</option>
          </select>
        </div>
      </div>
      <div class="select item" v-if="nav == 0">
        <span class="point">*</span>
        <span>伤残等级</span>
        <div class="selectBox itemBox">
          <select v-model="level">
            <option value="-1">选择伤残等级</option>
            <option value="一级伤残">一级伤残</option>
            <option value="二级伤残">二级伤残</option>
            <option value="三级伤残">三级伤残</option>
            <option value="四级伤残">四级伤残</option>
            <option value="五级伤残">五级伤残</option>
            <option value="六级伤残">六级伤残</option>
            <option value="七级伤残">七级伤残</option>
            <option value="八级伤残">八级伤残</option>
            <option value="九级伤残">九级伤残</option>
            <option value="十级伤残">十级伤残</option>
          </select>
        </div>
      </div>
      <div class="input item">
        <span class="point">*</span>
        <span>年龄</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="age"
              placeholder="请输入年龄"
            />岁</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>营养费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.nutrition"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>护理费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.nursing"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>住院伙食补助费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.board"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="radio item" v-if="nav == 0">
        <span>伤者有无固定收入</span>
        <div class="radioBox itemBox">
          <label
            ><input
              type="radio"
              name="isIncome"
              v-model="isIncome"
              value="1"
            />是</label
          >
          <label
            ><input
              type="radio"
              name="isIncome"
              v-model="isIncome"
              value="0"
            />否</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>伤者月收入</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="income"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>误工天数</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="lostdays"
              placeholder="请输入天数"
            />天</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>医疗费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.medical"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>鉴定费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.APF"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>交通费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.trans"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>残疾辅助器皿费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.aidedtool"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 1">
        <span>抢救医疗费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.rescue"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 1">
        <span>家庭误工费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.lostfee_home"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 1">
        <span>家庭交通住宿费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.transfee_home"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="input item">
        <span>财产损失费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.loss"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
    </div>
    <div class="isNeed">
      <div class="isNeedRadio">
        <span>是否有需扶养人</span>
        <label
          ><input
            type="radio"
            name="isNeed"
            v-model="isNeed"
            value="1"
          />是</label
        >
        <label
          ><input
            type="radio"
            name="isNeed"
            v-model="isNeed"
            value="0"
          />否</label
        >
      </div>
      <div class="isNeedBox" v-if="isNeed == 1">
        <div
          class="isNeedInputBox"
          v-for="(item, index) in isNeedInfo"
          :key="index"
        >
          <img
            class="delete"
            @click="deleteNeed(index)"
            src="../assets/tools/3_aidedtools/icon_delete.png"
            alt="删除此扶养人"
          />
          <div class="input item">
            <span>被抚养人的年龄</span>
            <div class="inputBox itemBox">
              <label
                ><input
                  type="number"
                  v-model="item.age"
                  placeholder="请输入年龄"
                />岁</label
              >
            </div>
          </div>
          <div class="radio item">
            <span>被抚养人的户口</span>
            <div class="radioBox itemBox">
              <label
                ><input
                  type="radio"
                  v-model="item.hukou"
                  value="0"
                />农村</label
              >
              <label
                ><input
                  type="radio"
                  v-model="item.hukou"
                  value="1"
                />城镇</label
              >
            </div>
          </div>
          <div class="input item">
            <span>抚养的人数</span>
            <div class="inputBox itemBox">
              <label
                ><input
                  type="number"
                  v-model="item.number"
                  placeholder="请输入人数"
                />人</label
              >
            </div>
          </div>
        </div>
        <div class="addNeed" @click="addNeed">
          <img
            src="../assets/tools/3_aidedtools/icon_add.png"
            alt="添加扶养人"
          />
          <span>添加扶养人</span>
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
      <div v-if="nav == 0">
        <div
          class="result"
          v-for="(item, index) in result_injured"
          :key="index"
        >
          <span class="name">{{ item.name }}</span>
          <div class="unit">
            <span>{{ item.value }}</span>
            <span class="unit_">元</span>
          </div>
        </div>
      </div>
      <div v-else-if="nav == 1">
        <div class="result" v-for="(item, index) in result_death" :key="index">
          <span class="name">{{ item.name }}</span>
          <div class="unit">
            <span>{{ item.value }}</span>
            <span class="unit_">元</span>
          </div>
        </div>
      </div>
      <div v-if="result_supprt.length>0">
        <div class="result" v-for="(item, index) in result_supprt" :key="index">
          <span class="name">{{ item.name }}</span>
          <div class="unit">
            <span>{{ item.value }}</span>
            <span class="unit_">元</span>
          </div>
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
      //calcBox-----------------------------
      provinceList: ["选择省份"],
      provinceIndex: 0,
      hukou: -1, //户籍类型0农村1城镇
      level: "-1", //伤残等级
      age: "", //年龄
      charges: {
        //医药费用
        nutrition: "", //营养费
        nursing: "", //护理费
        board: "", //住院伙食补助费
        medical: "", //医疗费
        APF: "", //鉴定费
        trans: "", //交通费
        aidedtool: "", //残疾辅助器皿费
        loss: "", //财产损失费
        rescue: "", //抢救医疗费
        lostfee_home: "", //家庭误工费
        transfee_home: "", //家庭交通住宿费
      },
      isIncome: -1, //是否有固定收入
      income: "", //伤者月收入
      lostdays: "", //误工天数
      //isNeed-----------------------------
      isNeed: -1, //是否有需扶养人
      isNeedInfo: [],
      isNeedInput: {
        age: "", //年龄
        hukou: -1, //户口，0农村1城镇
        number: "", //抚养人数
      },
      //result-----------------------------
      result_injured: [
        //伤残情况
        {
          name: "残疾赔偿金",
          value: "",
        },
        {
          name: "误工费用",
          value: "",
        },
        {
          name: "精神抚慰金",
          value: "",
        },
        {
          name: "医疗费用",
          value: "",
        },
        {
          name: "其他费用",
          value: "",
        },
      ],
      result_death: [
        //死亡情况
        {
          name: "丧葬费",
          value: "",
        },
        {
          name: "死亡赔偿金",
          value: "",
        },
        {
          name: "误工费用",
          value: "",
        },
        {
          name: "精神抚慰金",
          value: "",
        },
        {
          name: "医疗费用",
          value: "",
        },
        {
          name: "其它费用",
          value: "",
        },
      ],
      result_supprt:[]
    };
  },
  props: {
    nav: {
      required: true,
    },
  },
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
    // 删除需被扶养人
    deleteNeed(index) {
      this.isNeedInfo.splice(index, 1);
      if (this.isNeedInfo.length == 0) {
        this.isNeed = 0;
      }
    },
    // 添加需被扶养人
    addNeed() {
      this.isNeedInfo.push(JSON.parse(JSON.stringify(this.isNeedInput)));
    },
    // 去计算
    goCalc() {
      if (this.provinceIndex == 0 || this.hukou == -1 || this.age == "") {
        alert("有必填信息未填写");
        return;
      } else {
        if (this.nav == 0) {
          if (this.level == -1) {
            alert("有必填信息未填写");
            return;
          }
        }
      }
      if(this.isNeedInfo.length==0){
        this.isNeed = 0
      }
      var data = {};
      // wages
      if (this.income == "") {
        data.wages = 0;
      } else {
        data.wages = Number(this.income);
      }
      // lostdays
      if (this.lostdays == "") {
        data.delayworkday = 0;
      } else {
        data.delayworkday = Number(this.lostdays);
      }
      // province
      data.province = this.provinceList[this.provinceIndex];
      var index;
      if (data.province.indexOf("省") > -1) {
        index = data.province.indexOf("省");
        data.province = data.province.substring(0, index);
      } else if (data.province.indexOf("市") > -1) {
        index = data.province.indexOf("市");
        data.province = data.province.substring(0, index);
      }
      // level
      if (this.nav == 0) {
        data.level = this.level;
      }
      // hukou
      data.hukou = this.hukou;
      // medical && otherfee
      if (this.nav == 0) {
        data.medical =
          Number(this.charges.nutrition) +
          Number(this.charges.nursing) +
          Number(this.charges.board) +
          Number(this.charges.medical) +
          Number(this.charges.APF);
        data.otherfee =
          Number(this.charges.trans) +
          Number(this.charges.aidedtool) +
          Number(this.charges.loss);
      } else if (this.nav == 1) {
        data.medical = Number(this.charges.rescue);
        data.otherfee =
          Number(this.charges.lostfee_home) +
          Number(this.charges.transfee_home) +
          Number(this.charges.loss);
      }
      // age
      data.age = Number(this.age);
      // support
      data.support = [];
      if (this.isNeedInfo.length > 0) {
        for (var i of this.isNeedInfo) {
          var a = {};
          a.age = i.age;
          a.hukou = i.hukou;
          a.amount = i.number;
          if (i.number < 1) {
            alert("抚养人包含受害者本人，至少为1人");
            return;
          }
          data.support.push(a);
        }
        data.support = JSON.stringify(data.support);
      }
      // type
      data.type = this.nav;
      this.$axios({
        url: "http://ai.365lawhelp.com/API/Cost/getTrafficMoney",
        method: "post",
        data,
      }).then((res) => {
        if (this.nav == 0) {
          this.result_injured[0].value = res.data.disabfee;
          this.result_injured[1].value = res.data.delayworkfee;
          this.result_injured[2].value = res.data.mentalfee;
          this.result_injured[3].value = res.data.medicalfee;
          this.result_injured[4].value = res.data.otherfee;
        } else if (this.nav == 1) {
          this.result_death[0].value = res.data.funeralfee;
          this.result_death[1].value = res.data.deathfee;
          this.result_death[2].value = res.data.delayworkfee;
          this.result_death[3].value = res.data.mentalfee;
          this.result_death[4].value = res.data.medicalfee;
          this.result_death[5].value = res.data.otherfee;
        }
        if (res.data.besupport) {
          this.result_supprt = []
          var i_=1
          for (var i of res.data.besupport) {
            var support = {};
            support.name = "第" + i_ + "位被扶养人";
            support.value = i.fee;
            this.result_supprt.push(support);
            i_++
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 16px;
  height: 570px;
  overflow-y: scroll;
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
      .point {
        color: red;
        position: absolute;
        left: 8px;
      }
    }
    .itemBox {
      width: 60%;
      height: 50px;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.08);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      z-index: 5;
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
        input::placeholder {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
    .selectBox {
      position: relative;
      select {
        border: none;
        outline: none;
        width: 100%;
        height: 48px;
        line-height: 48px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        font-size: 12px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.5);

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
  .isNeed {
    .isNeedRadio {
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 20px;
      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #2083e7;
        display: inline-block;
        margin-right: 10px;
      }
      label {
        display: flex;
        align-items: center;
        input {
          margin-left: 10px;
          margin-right: 5px;
        }
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba($color: #000000, $alpha: 0.7);
      }
    }
    .isNeedBox {
      .isNeedInputBox {
        width: 100%;
        border: 2px solid #f2f2f2;
        border-radius: 6px;
        margin-bottom: 10px;
        position: relative;
        img.delete {
          width: 20px;
          height: 20px;
          display: block;
          cursor: pointer;
          position: absolute;
          z-index: 99999999;
          top: -10px;
          right: -10px;
        }
      }
      .addNeed {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
          display: block;
          margin-right: 10px;
        }
        span {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #000000;
          opacity: 0.8;
        }
      }
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
        .itemBox {
          width: 60%;
          height: 50px;
          border-bottom: 1px solid rgba($color: #000000, $alpha: 0.08);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          position: relative;
          z-index: 5;
          label {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba($color: #000000, $alpha: 0.7);
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
            input::placeholder {
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: bold;
              color: rgba(0, 0, 0, 0.5);
            }
          }
        }
        .radioBox {
          label {
            display: flex;
            align-items: center;
            margin-right: 20px;
            input {
              display: inline-block;
              margin-right: 5px;
            }
          }
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
.content::-webkit-scrollbar {
  width: 8px;
}
.content::-webkit-scrollbar-thumb {
  background-color: #d2d2d2;
  border-radius: 5px;
}
</style>