<template>
  <div class="login-page">
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
        <span class="tit" style="font-size: 38px;">登录</span>
      </div>

      <div class="login-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
          <el-form-item label="用户名" prop="username" class="interval up" >
            <el-input v-model="ruleForm.username" class="inputLeft"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" class="interval up">
            <el-input type="password" v-model="ruleForm.password" class="inputLeft"></el-input>
          </el-form-item>
          <el-form-item class="choose">
            <input type="checkbox">
            <span class="remember">记住我</span>
            <a class="" @click="enroll()">
              <span>点击注册</span>
            </a>
            <a class="" @click="forget()">
              <span>忘记密码</span>
            </a>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="clickable" @click="sub" style="width: 82.5%">登录</el-button>
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
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    enroll() {
      this.$router.push({path:"/register"});
    },
    forget() {
      this.$router.push({path:"/forget"});
    },
    sub() {
      let that = this;
      this.$axios.post(
        that.$store.state.property.ip+"/ki-video/loginRegister/login",
        this.$qs.stringify({
            username : that.ruleForm.username,
            password : that.ruleForm.password
          })
      ).then(function (response){
        let res = JSON.parse(JSON.stringify(response));
        if (res.data.code == 200) {
          localStorage.isLogin = "true";
          let user = JSON.stringify(res.data.data);
          localStorage.setItem("user", user);
          localStorage.setItem("userToken", res.data.data.userToken);
          that.$store.state.property.user = res.data.data;
          that.$store.commit('changeLoginStatus', true);
          that.$router.push({path:"/"});
        }
        else {
          alert(res.data.msg);
          localStorage.isLogin = "false";
        }

      })
    }
  },
  watch: {
    ruleForm: {
      handler:function (newVal, oldVal) {
        if (newVal.username != "" && newVal.password != "") {
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
