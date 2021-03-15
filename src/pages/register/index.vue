<template>
  <div class="register-page">
    <div class="header">
      <navbar
        :scroll="false"
        :style_shade="false"
        :menu_v="false"
        :extend="false"
        :activeitem="activeitem"
      ></navbar>
    </div>
    <div class="container">
      <div class="title-line">
        <span class="tit" style="font-size: 38px;">注册</span>
      </div>
      <div class="register-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
          <el-form-item label="昵称" prop="nickname" class="interval up" >
            <el-input v-model="ruleForm.nickname" class="inputLeft"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" class="interval up">
            <el-input type="password" v-model="ruleForm.password" class="inputLeft"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" class="interval up">
            <el-input v-model="ruleForm.email" class="inputLeft"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verification" class="interval up">
            <el-input v-model="ruleForm.verification" class="inputLeft"></el-input>
            <el-button type="primary" :disabled="clickVeri" @click="sub" style="right:0px;width: 35%; position:absolute;z-index: 1">
              <span v-show="!clickVeri">获取验证码</span>
              <span v-show="clickVeri">{{count}} s</span>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="clickable" @click="register" style="width: 82.5%">注册</el-button>
          </el-form-item>
          <el-form-item class="choose">
            <a class="" @click="gotoLogin()">
              <span>已有账号，直接登录</span>
            </a>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="footer">
      <div class="line"></div>
      <footbar></footbar>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  inject: ["reload"],
  props: {},
  data() {
    return {
      clickable: true,
      activeitem: ["", "", "", "", "", "", ""],
      veriText:"获取验证码",
      count:'',
      clickVeri: false,
      timer:null,
      ruleForm: {
        nickname: '',
        password: '',
        email: '',
        verification: ''
      },
      rules: {
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        verification: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    sub() {
      let that = this;
      this.$axios.post(
        that.$store.state.property.ip + "/ki-video/loginRegister/verificationCode",
        that.$qs.stringify({
            email : that.ruleForm.email,
            type : 1
        })
      ).then(function (response) {
        let res = JSON.parse(JSON.stringify(response));
        if (res.data.code) {
          const TIME_COUNT = 60*60;
          if (!that.timer) {
            that.count = TIME_COUNT;
            that.clickVeri = true;
            that.timer = setInterval(() => {
              if (that.count > 0 && that.count <= TIME_COUNT) {
                that.count--;
              } else {
                that.clickVeri = false;
                clearInterval(that.timer);
                that.timer = null;
              }
            }, 1000)
          }
        }
        else if (res.data.code == 520) {
          alert(res.data.data);
        }
      })
    },
    register() {
      let that = this;
      this.$axios.post(
        that.$store.state.property.ip + "/ki-video/loginRegister/register",
        that.$qs.stringify({
          username : that.ruleForm.nickname,
          email : that.ruleForm.email,
          password : that.ruleForm.password,
          verification : that.ruleForm.verification
        })
      ).then(function(response) {
        let res = JSON.parse(JSON.stringify(response));
        console.log(res);
        if (res.data.code == 200) {
          alert(res.data.data + "，快去登录吧");
        }
        else {
          alert(res.data.data);
        }
      })
    },
    gotoLogin() {
      this.$router.push({path:"/login"});
    }
  },
  watch: {
    ruleForm: {
      handler:function (newVal, oldVal) {
        if (newVal.nickname != "" && newVal.password != "" && newVal.email != "" && newVal.verification != "") {
          this.clickable = false;
        }
        else {
          this.clickable = true;
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
  @import "./index";
</style>
