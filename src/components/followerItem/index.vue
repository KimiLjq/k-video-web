<template>
  <div class="followerItem">
    <div class="container">
      <img class="icon-user" alt="profile" :src="avatar" @click="toPersonalPage(username)">
      <div class="info">
        <span @click="toPersonalPage(username)">{{username}}</span>
        <p>{{description}}</p>
      </div>
      <el-button v-show="!getFollowStatus" class="follow-btn" size="mini" @click="follow()" round>关注TA</el-button>
      <el-button v-show="getFollowStatus" class="unfollow-btn" size="mini" @click="unfollow()" @mouseover.native="over()" @mouseout.native="out()" round>{{followText}}</el-button>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "followerItem",
  props: {
    data: Object
  },
  data() {
    return {
      avatar: "",
      username: "",
      description: "",
      isfollow:false,
      followText: "已关注",
    }
  },
  mounted() {
    this.avatar = this.$store.state.property.ip + this.data.avatarUrl;
    this.username = this.data.username;
    this.description = this.data.description;
    console.log("this.data.follow=", this.data.follow);
    this.isfollow = this.data.follow;
    console.log("this.isfollow = ", this.isfollow);
  },
  methods: {
    toPersonalPage(username) {
      let personalIndex = this.$router.resolve({
        path: '/person',
        query: {username: username}
      });

      window.open(personalIndex.href, '_blank');
    },

    follow() {
      let loginUsername = JSON.parse(localStorage.getItem("user")).username;
      if (loginUsername == this.username) {
        return;
      }

      if (localStorage.isLogin == "true") {
        let that = this;
        this.$axios.post(
          that.$store.state.property.ip + "/ki-video/userFans/addRelationship",
          that.$qs.stringify({
            username: that.username,
            fansUsername: loginUsername
          })
        ).then(function (response) {
          let res = JSON.parse(JSON.stringify(response));
          if (res.data.code == 200) {
            that.isfollow = true;
          }
        })
      }
      else {
        alert("请先登录才能关注噢");
      }
    },
    unfollow() {
      let loginUsername = JSON.parse(localStorage.getItem("user")).username;
      if (loginUsername == this.username) {
        return;
      }

      if (localStorage.isLogin == "true") {
        let that = this;
        let loginUsername = JSON.parse(localStorage.getItem("user")).username;
        this.$axios.post(
          that.$store.state.property.ip + "/ki-video/userFans/cancelRelationship",
          that.$qs.stringify({
            username: that.username,
            fansUsername: loginUsername
          })
        ).then(function (response) {
          let res = JSON.parse(JSON.stringify(response));
          if (res.data.code == 200) {
            that.isfollow = false;
          }
        })
      }
    },
    over() {
      this.followText = "取关";
    },
    out() {
      this.followText = "已关注";
    }
  },
  computed: {
    getFollowStatus() {
      if (!this.$store.state.isLogin) {
        return false;
      }
      return this.isfollow;
    }
  }
}
</script>

<style lang="scss">
.followerItem {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-self: flex-start;
  align-items: center;

  .container {
    width: 100%;
    height: 79px;
    margin-top: 0px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #FFFFFF;

    .icon-user {
      width: 55px;
      height: 55px;
      margin-left: 20px;
      cursor: pointer;
    }

    .info {
      width: 100%;
      margin-left: 20px;
      flex-direction: row;
      align-items: center;

      span {
        cursor: pointer;
      }

      &:hover {
        span {
          color: rgba(255, 186, 116, 1);
        }
      }

      p {
        margin-top: 5px;
        color: #6d757a;
        font: {
          size: 12px;
          family: MicrosoftYaHei;
        };
      }
    }

    .follow-btn {
      width: 10%;
      height: 35px;
      margin-right: 80px;
      margin-top: 5px;
      border: 1px solid #ccd0d7;
    }

    .unfollow-btn {
      width: 10%;
      height: 35px;
      margin-right: 80px;
      margin-top: 5px;
      border: 0;
      background-color: #e5e9ef;
      color: #6d757a;

      &:hover {
        color: #00a1d6 !important;
      }
    }
  }

  .line {
    width: 100%;
    height: 1px;
    background: #EEE;
  }
}
</style>
