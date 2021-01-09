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
      <div class="radio item" v-if="nav == 0">
        <span>性别</span>
        <div class="radioBox itemBox">
          <label
            ><input
              type="radio"
              name="gender"
              v-model="gender"
              value="1"
            />男</label
          >
          <label
            ><input
              type="radio"
              name="gender"
              v-model="gender"
              value="0"
            />女</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>停工留薪时长</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="furloughMonth"
              placeholder="请输入时长"
            />月</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>停工留薪工资(月)</span>
        <div class="inputBox itemBox">
          <label
            ><input type="number" v-model="furlough" placeholder="请输入金额" />
            元
          </label>
        </div>
      </div>
      <div class="input item">
        <span class="point">*</span>
        <span>本人缴费工资(月)</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="paymentWage"
              placeholder="请输入金额"
            />元</label
          >
        </div>
      </div>
      <div class="input item" v-if="nav == 0">
        <span>住院天数</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="hospitalDay"
              placeholder="请输入天数"
            />天</label
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
        <span>康复治疗费</span>
        <div class="inputBox itemBox">
          <label
            ><input
              type="number"
              v-model="charges.recovery"
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
      <div class="input item" v-if="nav == 0">
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
      <div class="radio item" v-if="nav == 1">
        <span>是否有配偶</span>
        <div
          class="radioBox itemBox"
          :class="{ haveDetail: isMarried.isMarried == 1 }"
        >
          <label
            ><input
              type="radio"
              name="isMarried"
              v-model="isMarried.isMarried"
              value="1"
            />是</label
          >
          <label
            ><input
              type="radio"
              name="isMarried"
              v-model="isMarried.isMarried"
              value="0"
            />否</label
          >
        </div>
      </div>
      <div class="detailItem" v-if="isMarried.isMarried == 1">
        <div class="meet detailItemBox">
          <span>是否有以下情形</span>
          <div class="radioBox">
            <label
              ><input
                type="radio"
                name="isMeet"
                v-model="isMarried.isMeet"
                value="1"
              />是</label
            >
            <label
              ><input
                type="radio"
                name="isMeet"
                v-model="isMarried.isMeet"
                value="0"
              />否</label
            >
          </div>
        </div>
        <div class="meetCon">
          1、完全丧失劳动能力<br />
          2、男子年满60周岁、女年满55周岁
        </div>
        <div class="detailItemBox">
          <span>是否属于孤寡老人</span>
          <div class="radioBox">
            <label
              ><input
                type="radio"
                name="isOld"
                v-model="isMarried.isOld"
                value="1"
              />是</label
            >
            <label
              ><input
                type="radio"
                name="isOld"
                v-model="isMarried.isOld"
                value="0"
              />否</label
            >
          </div>
        </div>
        <div class="splitLine" style="margin-top: 10px"></div>
      </div>
      <div class="radio item" v-if="nav == 1">
        <span>是否有其他供养家属</span>
        <div
          class="radioBox itemBox"
          :class="{ haveDetail: isHave.isHave == 1 }"
        >
          <label
            ><input
              type="radio"
              name="isHave"
              v-model="isHave.isHave"
              value="1"
            />是</label
          >
          <label
            ><input
              type="radio"
              name="isHave"
              v-model="isHave.isHave"
              value="0"
            />否</label
          >
        </div>
      </div>
      <div class="detailItem" v-if="isHave.isHave == 1">
        <div class="meet detailItemBox">
          <span>是否有以下情形</span>
          <div class="radioBox">
            <label
              ><input
                type="radio"
                name="isMeet_have"
                v-model="isHave.isMeet"
                value="1"
              />是</label
            >
            <label
              ><input
                type="radio"
                name="isMeet_have"
                v-model="isHave.isMeet"
                value="0"
              />否</label
            >
          </div>
        </div>
        <div class="meetCon">
          1、完全丧失劳动能力<br />
          2、子女未满18周岁<br />
          3、父母均已死亡，其祖父外祖父年满60周岁，祖母、外祖 母年满55周岁；<br />
          4、子女已经死亡或完全丧失劳动能力，其孙子女、外孙子女
          未满18周岁的；<br />
          5、父母均已死亡或完全丧失劳动能力，其兄弟姐妹未满18 周岁的；
        </div>
        <div class="detailItemBox" style="padding-bottom: 15px">
          <span>其他供养家属人数</span>
          <div class="inputBox">
            <label
              ><input
                type="number"
                v-model="isHave.number"
                placeholder="请输入人数"
              />人</label
            >
          </div>
        </div>
        <div class="detailItemBox" style="padding-bottom: 15px">
          <span>是否属于孤寡老人</span>
          <div class="radioBox">
            <label
              ><input
                type="radio"
                name="isOld_have"
                v-model="isHave.isOld"
                value="1"
              />是</label
            >
            <label
              ><input
                type="radio"
                name="isOld_have"
                v-model="isHave.isOld"
                value="0"
              />否</label
            >
          </div>
        </div>
        <div class="splitLine"></div>
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
      level: "-1", //伤残等级
      age: "", //年龄
      gender: -1, //性别0女1男
      furloughMonth: "", //停工留薪时长
      furlough: "", //停职留薪工资
      paymentWage: "", //本人缴费工资
      hospitalDay: "", //住院天数
      charges: {
        nursing: "", //护理费
        APF: "", //鉴定费
        medical: "", //医疗费
        recovery: "", //康复治疗费
        trans: "", //交通费
        aidedtool: "", //残疾辅助器皿费
        rescue: "", //抢救医疗费
        lostfee_home: "", //家庭误工费
        transfee_home: "", //家庭交通住宿费
        loss: "", //财产损失费
      },
      isMarried: {
        isMarried: -1, //是否有配偶
        isMeet: -1, //是否有以下情形，是否符合
        isOld: -1, //是否属于孤寡老人
      },
      isHave: {
        isHave: -1, //是否有其它供养家属
        isMeet: -1, //是否有以下情形，是否符合
        number: "", //其他供养家属人数
        isOld: -1, //是否属于孤寡老人
      },
      //result-----------------------------
      result_injured: [
        //伤残情况
        {
          name: "伤残津贴(每月)",
          value: "",
        },
        {
          name: "伤残补助金(一次性)",
          value: "",
        },
        {
          name: "医疗补助金(一次性)",
          value: "",
        },
        {
          name: "伤残其余赔偿(一次性)",
          value: "",
        },
        {
          name: "就业补助金(一次性)",
          value: "",
        },
      ],
      result_death: [
        //死亡情况
        {
          name: "工亡补助金(一次性)",
          value: "",
        },
        {
          name: "丧葬补助金(一次性)",
          value: "",
        },
        {
          name: "配偶抚恤金(每月)",
          value: "",
        },
        {
          name: "其余家属抚恤金(每月)",
          value: "",
        },
        {
          name: "死亡其余赔偿(一次性)",
          value: "",
        },
      ],
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
    // 去计算
    goCalc() {
      if (this.provinceIndex == 0 || this.age == "" || this.paymentWage == "") {
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
      var data = {};
      // type
      data.type = this.nav;
      // level&medical&otherfee
      if (this.nav == 0) {
        data.level = this.level;
        data.medical =
          Number(this.charges.nursing) +
          Number(this.charges.APF) +
          Number(this.charges.medical) +
          Number(this.charges.recovery);
        data.otherfee =
          Number(this.charges.trans) +
          Number(this.charges.aidedtool) +
          Number(this.charges.loss);
      } else if (this.nav == 1) {
        data.otherfee =
          Number(this.charges.lostfee_home) +
          Number(this.charges.transfee_home);
      }
      // wages
      data.wages = Number(this.paymentWage);
      // age
      data.age = Number(this.age);
      // stopworktime
      if (Number(this.furloughMonth) > 24) {
        data.stopworktime = 24;
      } else {
        data.stopworktime = Number(this.furloughMonth);
      }
      // stopworkwage
      data.stopworkwage = Number(this.furlough);
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
      //isspousealone
      data.isspousealone = this.isMarried.isOld
      if(this.isMarried.isOld==-1){
        data.isspousealone = 0
      }
      // isfamily
      data.isfamily = this.isHave.isHave
      if(this.isHave.isHave==-1){
        data.isfamily = 0
      }
      // isfamilyalone
      data.isfamilyalone = this.isHave.isOld
      if(this.isHave.isOld==-1){
        data.isfamilyalone = 0
      }            
        this.$axios({
          url: "http://ai.365lawhelp.com/API/Cost/getInjuryMoney",
          method: "post",
          data,
        }).then((res) => {                    
          if (this.nav == 0) {
            this.result_injured[0].value = res.data.disabfee;
            this.result_injured[1].value = res.data.onetimedisabfee;
            this.result_injured[2].value = res.data.medicaldisabfee;
            this.result_injured[3].value = res.data.disabotherfee;
            this.result_injured[4].value = res.data.jobdisabfee;
          } else if (this.nav == 1) {
            this.result_death[0].value = res.data.deathfee;
            this.result_death[1].value = res.data.funeralfee;
            this.result_death[2].value = res.data.deathspousefee;
            this.result_death[3].value = res.data.deathfamilyfee;
            this.result_death[4].value = res.data.deathotherfee;
          }
          for(var i of this.result_injured){
            if (i.value==null){
              i.value = 0
            }
          }
          for(var i of this.result_death){
            if (i.value==null){
              i.value = 0
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
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      position: relative;
      z-index: 999;
      span {
        display: inline-block;
        width: 40%;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #6d6d6d;
        position: absolute;
        z-index: 999;
        left: 16px;
      }
      .point {
        color: red;
        position: absolute;
        left: 8px;
      }
    }
    .detailItem {
      width: 100%;
      position: relative;
      .detailItemBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          display: inline-block;
          margin-left: 16px;

          font-size: 12px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #6d6d6d;
          opacity: 0.8;
        }
        .radioBox {
          display: flex;
          align-items: center;
        }
      }
      .meetCon {
        padding-right: 16px;
        margin-left: 16px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #6d6d6d;
        line-height: 20px;
        margin: 10px 0 10px 16px;
        opacity: 0.7;
      }
      .splitLine {
        position: absolute;
        right: 0;
        width: 60%;
        height: 1px;

        background: rgba($color: #000000, $alpha: 0.08);
      }
    }
    .haveDetail {
      border-bottom: none !important;
    }
    .itemBox {
      width: 60%;
      height: 50px;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.08);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: absolute;
      right: 0;
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
      position: absolute;
      right: 0;
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