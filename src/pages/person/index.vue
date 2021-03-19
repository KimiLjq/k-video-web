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
        <img class="icon-user" alt="profile" :src="avatar" v-show="!isUserSelf">
        <div class="headerAvatar" v-show="isUserSelf">
          <img class="icon-user" alt="profile" :src="avatar">
          <input @change="modifyAvatar($event)" ref="file" title='' type="file" accept="image/*" class="hiddenInput"/>
        </div>
        <div class="info">
          <span style="margin-right: 5px !important;">{{ user.username }}</span>
          <span>({{ user.email }})</span>
          <input class="introduce" ref="input" v-model="description" @focus="getFocus" @blur="postDescription" type="text" :disabled="!isUserSelf" placeholder="编辑个性签名" maxlength="100">
          <div class="other-info">
            <span>作品数：0</span>
            <span>关注数：{{ user.followsCount }}</span>
            <span>粉丝数：{{ user.fansCount }}</span>
            <span>获赞数：{{ user.receiveLikeCount }}</span>
          </div>

        </div>
        <el-button class="discuss-btn" size="mini" @click="editMessage()" v-show="isUserSelf" round>编辑信息</el-button>
        <el-button class="discuss-btn" size="mini" @click="changeFollowStatus()" v-show="!isUserSelf && !getFollowRelationship" round>关注TA</el-button>
        <el-button class="discuss-btn" size="mini" @click="changeFollowStatus()" v-show="!isUserSelf && getFollowRelationship" @mouseover.native="over()" @mouseout.native="out()" round>{{followText}}</el-button>
      </div>
      <div style="width: 100%; height: 10px"></div>
      <div class="mid">
        <div class="left">
          <ul>
            <li @click="linkTo('',0)" v-bind:class="{'active':item[0]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">{{getNick}}视频</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li @click="linkTo('',1)" v-bind:class="{'active':item[1]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">{{getNick}}收藏</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li @click="linkTo('',2)" v-bind:class="{'active':item[2]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">{{getNick}}关注</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li @click="linkTo('',3)" v-bind:class="{'active':item[3]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">{{getNick}}粉丝</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li @click="linkTo('',4)" v-bind:class="{'active':item[4]}" v-show="isUserSelf">
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
      isUserSelf: false,
      relationship: false, //false表示未关注
      followText: "已关注",
      oldDescription: "",
      description: "",
      avatar:"",
      focusState: false,
      activeitem: ["", "", "", "", "", "", ""],
      item: {0: true, 1: false, 2: false, 3: false, 4: false, length: 5},
      module_data_1: this.$store.state.webData.monthly_rank.module_data_1,
    }
  },
  mounted() {
    document.addEventListener('visibilitychange', this.handleVisiable);
    this.username = this.$route.query.username;
    if (localStorage.isLogin == "true") {
      this.loginStatus = true;
      this.loginUsername = JSON.parse(localStorage.getItem("user")).username;
      if (this.loginUsername == this.username) {
        this.isUserSelf = true;
      }
    }

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
        that.description = that.user.description;
        if (that.loginUsername == that.user.username) {
          localStorage.setItem("user", JSON.stringify(that.user));
        }
      }
    })

    if (this.loginStatus) {
      this.requestRelationship();
    }
  },
  methods: {
    linkTo(path, index) {
      for(let j = 0; j < this.item.length; j++) {
        this.item[j] = false;
      }
      this.item[index] = true;
    },

    getFocus() {
      this.oldDescription = this.description;
    },

    modifyAvatar: function (e) {
      let file = e.target.files[0];
      let that = this;
      let data = new FormData();
      data.append("username", that.username);
      data.append("file", file);
      let headers = {headers: {"Content-Type": "multipart/form-data"}}
      this.$axios.post(
        that.$store.state.property.ip + "/ki-video/user/modifyAvatar",
        data,
        headers
      ).then(function (response) {
        let res = JSON.parse(JSON.stringify(response));
        console.log(res.data.data);
        if (res.data.code == 200) {
          that.avatar = that.$store.state.property.ip + res.data.data;
          let user = JSON.parse(localStorage.getItem("user"));
          user.avatarUrl = res.data.data;
          localStorage.setItem("user", JSON.stringify(user));
        };
      })
    },

    postDescription() {
      if (this.oldDescription == this.description) {
        return;
      }
      let that = this;
      this.$axios.post(
        that.$store.state.property.ip + "/ki-video/user/changePersonDescription",
        this.$qs.stringify({
          username: that.username,
          description: that.description
        })
      ).then(function (response){
        let res = JSON.parse(JSON.stringify(response));
        console.log(res.data.data);
      })
    },

    editMessage() {
      this.$refs.input.focus();
    },

    requestRelationship() {
      let that = this;
      this.$axios.post(
        that.$store.state.property.ip + "/ki-video/userFans/queryRelationship",
        this.$qs.stringify({
          username: that.username,
          fansUsername: that.loginUsername
        })
      ).then(function (response) {
        let res = JSON.parse(JSON.stringify(response));
        if (res.data.code == 200 && res.data.data) {
          that.relationship = true;
        }
        else if (res.data.code == 512) {
          that.relationship = false;
        }
      })
    },

    changeFollowStatus() {
      if (!this.loginStatus) {
        alert("请先登录才能关注噢");
        return;
      }

      let that = this;
      if (this.relationship) {
        this.$axios.post(
          that.$store.state.property.ip + "/ki-video/userFans/cancelRelationship",
          that.$qs.stringify({
            username: that.username,
            fansUsername: that.loginUsername
          })
        ).then(function (response) {
          let res = JSON.parse(JSON.stringify(response));
          if (res.data.code == 200) {
            console.log("取关成功");
            that.relationship = false;
          }
          else {
            console.log(res.data.msg);
          }
        })
      }
      else {
        this.$axios.post(
          that.$store.state.property.ip + "/ki-video/userFans/addRelationship",
          that.$qs.stringify({
            username: this.username,
            fansUsername: this.loginUsername
          })
        ).then(function (response) {
          let res = JSON.parse(JSON.stringify(response));
          if (res.data.code == 200) {
            console.log("关注成功");
            that.relationship = true;
          }
          else {
            console.log(res.data.msg);
          }
        })
      }
    },

    over() {
      this.followText = "取关";
    },
    out() {
      this.followText = "已关注";
    },

    handleVisiable() {
      this.loginStatus = localStorage.isLogin == "true" ? true : false;
      if (this.loginStatus) {
        this.loginUsername = JSON.parse(localStorage.getItem("user")).username;
        this.requestRelationship();
      }

      if (this.loginUsername == this.username) {
        this.isUserSelf = true;
      }
      else {
        this.isUserSelf = false;
      }

      if (!this.loginStatus && this.loginUsername == this.username) {
        this.$router.push({path: "/"});
      }

    }
  },
  computed: {
    getNick() {
      return this.isUserSelf ? "我的" : "TA的";
    },

    getFollowRelationship() {
      return this.relationship
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
