<template>
  <div
    class="navbar navbar_default"
    v-bind:class="[{'navbar_shade':shade_visiable},{'navbar_extend':extend}]"
  >
    <div class="generalbar">
      <div class="logo">
        <img class="img-brand" alt="brand" src="../../assets/brand.png">
        <img class="img-logo" alt="logo" src="../../assets/logo.png">

        <div class="aggergationbar" v-show="btn_visiable">
          <a @click="linkTo('home')">
            <span>首页</span>
          </a>
          <a @click="toggleMenu()" v-bind:class="{'a_selected':btn_selected}">
            <span>栏目</span>
            <img class="icon-column" src="../../assets/icon_column.png">
          </a>
        </div>
      </div>
      <div class="searchbar" v-if="search">
        <el-row>
          <el-col :span="20">
            <el-input
              v-model="keyWord"
              prefix-icon="el-icon-search"
              placeholder="请输入关键字"
              maxlength="10"
              @keyup.enter.native="getSearch"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-button @click="getSearch()" round>搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="user">
        <img class="icon-user" :src="avatar" @click="getPersonal()">
<!--        <el-button @click="getPersonal()" circle>-->
<!--          <i class="icon-user"></i>-->
<!--        </el-button>-->
        <div v-show="!loginStatus">
          <a @click="getPersonal()">
            <span style="margin-left: 20px">登录</span>
          </a>
          <span style="margin-left: 5px;margin-right: 5px">|</span>
          <a @click="register()">
            <span>注册</span>
          </a>
        </div>
        <div v-show="loginStatus">
          <a @click="getPersonal()">
            <span style="margin-left: 20px">{{ username }}</span>
          </a>
          <span style="margin-right: 5px; margin-left: 5px">|</span>
          <a @click="logout()">
            <span>退出</span>
          </a>
        </div>
      </div>
    </div>
    <div class="menubar" v-show="menu_visiable">
      <ul class="menu">
        <li @click="linkTo('home')" v-bind:class="{'active':item[0]}">
          <a>
            <span>首页</span>
          </a>
        </li>
        <li @click="linkTo('today')" v-bind:class="{'active':item[1]}">
          <a>
            <span>今日热门</span>
          </a>
        </li>
        <li @click="linkTo('rank')" v-bind:class="{'active':item[2]}">
          <a>
            <span>月度排行</span>
          </a>
        </li>
        <li @click="linkTo('fashion')" v-bind:class="{'active':item[3]}">
          <a>
            <span>时尚热度</span>
          </a>
        </li>
        <li @click="linkTo('punchline')" v-bind:class="{'active':item[4]}">
          <a>
            <span>最佳笑点</span>
          </a>
        </li>
        <li @click="linkTo('playlet')" v-bind:class="{'active':item[5]}">
          <a>
            <span>青春短剧</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: {
    activeitem: Array, //活跃的标签
    menu_v: Boolean, //下栏导航栏
    btn_v: Boolean, //上栏附加按钮
    style_shade: Boolean, //背景渐变
    scroll: Boolean, //滚动响应
    extend: Boolean, //扩展型
    personUsername: "", //个人页用户名
    search: {
      type: Boolean,
      default: true
    }
  },
  inject: ["reload"],
  data() {
    return {
      avatar: this.$store.state.property.ip + "/ki-video/user/avatar/unLogin-avatar.png",
      username: "",
      item: this.activeitem,
      menu_visiable: this.menu_v,
      btn_visiable: this.btn_v,
      shade_visiable: this.style_shade,
      btn_selected: false,
      loginStatus: false,
      keyWord: ""
    };
  },
  created() {},
  mounted() {
    document.addEventListener('visibilitychange', this.handleVisiable);
    this.loginStatus = localStorage.isLogin == "true" ? true : false;
    console.log(this.scroll);
    if (this.scroll) {
      this.menu_visiable = true;
      this.btn_visiable = false;
      window.addEventListener("scroll", this.handleScroll);
    } else {
      this.menu_visiable = false;
      this.btn_visiable = true;
    }

    if (localStorage.isLogin == "true" && localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.username = user.username;
      this.avatar = this.$store.state.property.ip + user.avatarUrl;
    }

    if (this.extend) {
      this.menu_visiable = true;
      this.btn_visiable = false;
    }
  },
  destroyed() {
    if (this.scroll) {
      window.removeEventListener("scroll", this.handleScroll);
    }
    document.removeEventListener('visibilitychange',this.handleVisiable)
  },
  methods: {
    linkTo(path) {
      this.$router.push({ name: path });
    },
    linkToPunchline() {
      let that = this;
      this.$axios.post(
        that.$store.state.property.ip + "/ki-video/video/punchline"
      ).then(function (response) {
        let res = JSON.parse(JSON.stringify(response));
        if (res.data.code == 200) {
          that.$router.push({
            path: "/punchline",
            query: { module_data_4: res.data.data }
          });
        }
        else {
          console.log(res.data.data);
        }
      })
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //console.log(scrollTop);
      if (scrollTop > 600 - 60 - 10) {
        this.btn_visiable = true;
        this.menu_visiable = false;
        this.shade_visiable = false;
      } else {
        this.btn_visiable = false;
        this.menu_visiable = true;
        this.shade_visiable = true;
      }
    },
    toggleMenu() {
      if (this.menu_visiable) {
        this.menu_visiable = false;
        this.btn_selected = false;
      } else {
        this.menu_visiable = true;
        this.btn_selected = true;
      }
    },
    getSearch() {
      //搜索
      if (this.keyWord) {
        this.$router.push({
          path: "/search",
          query: { keyWord: this.keyWord }
        });
      }
    },
    getPersonal() {
      if (!this.loginStatus) {
        let loginIndex =this.$router.resolve({
          path: '/login',
        })

        console.log("toLogin");
        window.open(loginIndex.href, '_blank');
      }
      else {
        let personIndex = this.$router.resolve({
          path: '/person',
          query: { username : this.username}
        });

        console.log("toPerson");
        window.open(personIndex.href, '_blank');
      }
    },
    register() {
      let registerPage = this.$router.resolve({
        path: 'register',
      });

      window.open(registerPage.href, '_blank');
    },
    logout() {
      console.log("退出登录");
      this.$store.commit('changeLoginStatus', false);
      if (location.pathname.indexOf("person") > 0 && this.personUsername == JSON.parse(localStorage.getItem("user")).username) {
        this.$router.push({path: "/"});
      }

      this.avatar = this.$store.state.property.ip + "/ki-video/user/avatar/unLogin-avatar.png";
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
      localStorage.isLogin = "false";
      this.loginStatus = false
      this.username = null;
    },
    handleVisiable(e) {
      if (e.target.visibilityState === 'visible') {
        this.loginStatus = localStorage.isLogin == "true" ? true : false;

        if (this.loginStatus) {
          let user = JSON.parse(localStorage.getItem("user"));
          this.avatar = this.$store.state.property.ip + user.avatarUrl;
          this.username = user.username
        }
        else {
          this.avatar = this.$store.state.property.ip + "/ki-video/user/avatar/unLogin-avatar.png";
        }
      }
    }
  },
  // watch: {
  //   activeitemid(activeitemid) {
  //     if (activeitemid) {
  //       this.item[activeitemid] = true;
  //     }
  //   }
  // }
};
</script>

<style lang="scss">
.a_selected {
  background: rgba(51, 51, 51, 1) !important;
}

.navbar_shade {
  width: 100%;
  height: 120px !important;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.9) 100%
  ) !important;

  .menubar {
    background: rgba(26, 26, 26, 0) !important;
  }
}

.navbar_default {
  width: 100%;
  height: 60px;
}
.navbar_extend {
  background: rgba(26, 26, 26, 1);

  .menubar {
    background: rgba(26, 26, 26, 1) !important;
    opacity: 1 !important;
  }
}

.navbar {
  width: 100%;
  min-width: 1050px;
  background: rgba(26, 26, 26, 1);

  .generalbar {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      height: 60px;
      position: absolute;
      left: 7%;
      display: inline-flex;
      justify-content: center;
      align-items: center;

      .img-brand {
        width: 48px;
        height: 30px;
        margin-right: 24px;
      }

      .img-logo {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }

      .aggergationbar {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;

        a {
          width: 80px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            background: rgba(51, 51, 51, 1);
          }

          span {
            font: {
              size: 16px;
              family: MicrosoftYaHei;
              weight: 400;
            }
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgba(255, 255, 255, 1);
          }

          img {
            width: 20px;
            height: 20px;
            margin-left: 5px;
          }
        }
      }
    }

    .searchbar {
      width: 24%;
      min-width: 300px;
      height: 40px;

      input {
        width: 100%;
        height: 40px;
        color: #fff !important;
        background: rgba(153, 153, 153, 0.25);
        opacity: 0.7;
        border: 0;
        border-radius: 20px;

        &::placeholder {
          color: #fff;
        }
      }

      button {
        width: 80px;
        height: 40px;
        color: #fff;
        background: linear-gradient(
          30deg,
          rgba(255, 85, 51, 1) 0%,
          rgba(255, 108, 0, 1) 100%
        );
        border: 0;
        border-radius: 20px;
      }
    }
  }

  .user {
    position: absolute;
    right: 13%;
    display: flex;
    justify-content: center;
    align-items: center;
    font: {
      size: 16px;
    };
    color: #FFFFFF;

    .icon-user {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      cursor: pointer;
    }

    button {
      width: 40px;
      height: 40px;
      background: rgba(204, 238, 255, 1);
      border-radius: 50%;
      border: 0;
    }
  }

  .menubar {
    width: 100%;
    min-width: 1050px;
    height: 40px;
    background: rgba(51, 51, 51, 0.8);

    ul {
      width: 100%;
      height: 30px;
      padding-top: 10px;
      position: absolute;
      left: 7%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .active {
        margin-top: 2px;
        border-bottom: 2px solid;
        border-bottom-color: rgba(255, 127, 0, 1);

        a {
          span {
            color: rgba(255, 127, 0, 1);
          }
        }
      }

      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 29px;

        a {
          span {
            height: 15px;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }

        &:hover {
          margin-top: 2px;
          border-bottom: 2px solid;
          border-bottom-color: rgba(255, 186, 116, 0.8);

          a {
            span {
              color: rgba(255, 186, 116, 0.8);
            }
          }
        }
      }
    }
  }
}
</style>
