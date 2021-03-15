<template>
  <div class="person-page">
    <div class="header">
      <navbar
        :scroll="false"
        :style_shade="false"
        :menu_v="false"
        :extend="false"
        :activeitem="activeitem"
        :person-username="username"
      ></navbar>
    </div>
    <div class="container">
      <div class="topMargin"></div>
      <div class="top">
        <div class="iconColor"></div>
        <img class="icon-user" alt="profile" :src="avatar">
        <div class="info">
          <span style="margin-right: 5px !important;">{{ user.username }}</span>
          <span>({{ user.email }})</span>
          <div class="other-info">
            <span>作品数：0</span>
            <span>关注数：{{ user.followsCount }}</span>
            <span>粉丝数：{{ user.fansCount }}</span>
            <span>获赞数：{{ user.receiveLikeCount }}</span>
          </div>
        </div>
        <el-button class="discuss-btn" size="mini" @click="postComment()" round>编辑信息</el-button>
      </div>
      <div style="width: 100%; height: 10px"></div>
      <div class="mid">
        <div class="left">
          <ul>
            <li @click="linkTo('',0)" v-bind:class="{'active':item[0]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">我的视频</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li @click="linkTo('',1)" v-bind:class="{'active':item[1]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">收藏视频</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li @click="linkTo('',2)" v-bind:class="{'active':item[2]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">我的关注</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li @click="linkTo('',3)" v-bind:class="{'active':item[3]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">我的粉丝</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li @click="linkTo('',4)" v-bind:class="{'active':item[4]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">我的消息</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
          </ul>
        </div>
        <div class="right">
          <myvideoitems v-show="item[0]" v-for="ele in module_data_1" :data="ele" :key="ele.id"></myvideoitems>
          <follower-item v-show="item[2]"></follower-item>
          <follower-item v-show="item[2]"></follower-item>
            <router-view></router-view>
        </div>
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
  props: {
    username:"",
  },
  data() {
    return {
      user:Object,
      loginStatus: false,
      loginUsername: "",
      avatar:"",
      activeitem: ["", "", "", "", "", "", ""],
      item: {0: true, 1: false, 2: false, 3: false, 4: false, length: 5},
      module_data_1: this.$store.state.webData.monthly_rank.module_data_1,
    }
  },
  mounted() {
    document.addEventListener('visibilitychange', this.handleVisiable);
    if (localStorage.isLogin == "true") {
      this.loginStatus = true;
      this.loginUsername = JSON.parse(localStorage.getItem("user")).username;
    }

    console.log("person page query username: " + this.$route.query.username);
    this.username = this.$route.query.username;
    let that = this;
    this.$axios.post(
      that.$store.state.property.ip + "/ki-video/user/queryUserByUsername",
      this.$qs.stringify({
        username: that.username
      })
    ).then(function (response) {
      let res = JSON.parse(JSON.stringify(response));
      if (res.data.code == 200) {
        that.user = res.data.data;
        that.avatar = that.$store.state.property.ip + that.user.avatarUrl;
        if (that.loginUsername == that.user.username) {
          localStorage.setItem("user", JSON.stringify(that.user));
        }
      }
    })
  },
  methods: {
    linkTo(path, index) {
      for(let j = 0; j < this.item.length; j++) {
        this.item[j] = false;
      }
      this.item[index] = true;
    },
    handleVisiable() {
      this.loginStatus = localStorage.isLogin == "true" ? true : false;
      if (this.loginStatus) {
        this.loginUsername = JSON.parse(localStorage.getItem("user")).username;
      }
      if (!this.loginStatus && this.loginUsername == this.username) {
        this.$router.push({path: "/"});
      }

    }
  },
  watch: {
    loginStatus:function (newVal, oldVal) {
      if (newVal == false && this.username == this.loginUsername) {
        this.$router.push({path: "/"});
      }
      else {
        this.loginUsername = JSON.parse(localStorage.getItem("user")).username;
      }
    }
  }
}
</script>

<style lang="scss">
  @import "./index";
</style>
