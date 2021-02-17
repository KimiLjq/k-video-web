<template>
  <div class="forget-page">
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
        <span class="tit" style="font-size: 38px;">重置密码</span>
      </div>
      <div class="forget-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" :type="passw">
          <el-form-item label="邮箱" prop="email" class="interval up" >
            <el-input v-model="ruleForm.email" class="inputLeft"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password" class="interval up">
            <el-input type="password" v-model="ruleForm.password" class="inputLeft"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPass" class="interval up">
            <el-input type="password" v-model="ruleForm.confirmPass" class="inputLeft"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verification" class="interval up">
            <el-input v-model="ruleForm.verification" class="inputLeft"></el-input>
            <el-button type="primary" :disabled="clickVeri" @click="sub" style="right:0px;width: 35%; position:absolute;z-index: 1">
              <span v-show="!clickVeri">获取验证码</span>
              <span v-show="clickVeri">{{count}} s</span>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="clickable" @click="sub" style="width: 82.5%">确认修改</el-button>
          </el-form-item>
          <el-form-item class="choose">
            <a class="" @click="gotoLogin()">
              <span>返回登录</span>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else {
        if (this.ruleForm.password != this.ruleForm.confirmPass) {
          callback(new Error('两次密码不一致，请重新输入'));
        }
        callback();
      }
    };
    return {
      clickable: true,
      activeitem: ["", "", "", "", "", "", ""],
      veriText:"获取验证码",
      count:'',
      clickVeri: false,
      timer:null,
      ruleForm: {
        email: '',
        password: '',
        confirmPass: '',
        verification: ''
      },
      rules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        confirmPass: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        verification: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    sub() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.clickVeri = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.clickVeri = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    },
    gotoLogin() {
      this.$router.push({path:"/login"});
    }
  },
  watch: {
    ruleForm: {
      handler:function (newVal, oldVal) {
        if (newVal.email != "" && newVal.password != "" && newVal.confirmPass != "" && newVal.verification != "" && newVal.password == newVal.confirmPass) {
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
