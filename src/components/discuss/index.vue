<template>
  <div class="discuss">
    <h3>评论</h3>
    <!-- <div class="discuss-void">
      <p>评论功能暂未开放</p>
    </div> -->
    <div class="discuss-login" v-if="!loginStatus">
      <p>
        点击此处
        <a @click="setLoginStatus()">
          <span class="discuss-login-link">登录</span>
        </a> 后方可发布评论
      </p>
      <div class="discuss-login-shortcut">
        <span>快捷登录：</span>
        <a>
          <img alt="wechat" src="../../assets/wechat.png">
        </a>
        <a>
          <img alt="sina" src="../../assets/weibo.png">
        </a>
      </div>
    </div>
    <div class="discuss-input" v-if="loginStatus">
      <img class="discuss-input-profile" alt="profile" :src="avatar">
      <el-input
        type="textarea"
        class="discuss-input-inputarea"
        :autosize="{ minRows: 3, maxRows: 3 }"
        maxlength="200"
        placeholder="说两句吧..."
        v-model="inputtext"
        show-word-limit
      ></el-input>
    </div>
    <el-button class="discuss-btn" size="mini" v-show="isNotEmpty" @click="postComment()" round>发布评论</el-button>
<!--    <div class="discuss-details" v-show="!haveComment">-->
<!--      <p>暂无评论，快参与评论吧</p>-->
<!--    </div>-->
    <div class="items-right-row">
      <comment class="discuss-content"
        v-for="item in commentData"
        :key="item.id"
        :data="item"
      >
      </comment>
    </div>
  </div>
</template>

<script>
import utils from "../../../static/utils/utils";

export default {
  name: "discuss",
  props: {
    videoData: Object,
    commentData: Array
  },
  data() {
    return {
      inputtext: "",
      isNotEmpty: false,
      loginStatus: false,
      avatar: this.$store.state.property.user.avatarUrl
    };
  },
  mounted() {
    document.addEventListener('visibilitychange', this.handleVisiable);
    this.loginStatus = localStorage.isLogin == "true" ? true : false;
  },
  methods: {
    setLoginStatus() {
      this.$router.push({path:"/login"})
    },

    postComment() {
      if (localStorage.isLogin == "true") {
        let that = this;
        this.$axios.post(
          that.$store.state.property.ip + "/ki-video/comment/postComment",
          this.$qs.stringify({
            fromUsername: that.$store.state.property.user.username,
            fromUserAvatar: that.$store.state.property.user.avatarUrl,
            videoId: that.videoData.id,
            content: that.inputtext
          })
        ).then(function (response) {
          let res = JSON.parse(JSON.stringify(response));
          if (res.data.code == 200) {
            let webComment = JSON.parse(JSON.stringify(res.data.data));
            that.commentData.unshift(webComment);
          }
        })
      }
      else {
        alert("未登录无法评论噢，快去登录吧")
      }
      this.inputtext = "";
    },
    handleVisiable() {
      this.loginStatus = localStorage.isLogin == "true" ? true : false;
      this.$nextTick(() => {
        console.log(this.loginStatus)
      })
    }
  },
  watch: {
    inputtext(inputtext) {
      //console.log(inputtext);
      if (inputtext != "") {
        this.isNotEmpty = true;
      } else {
        this.isNotEmpty = false;
      }
    }
  },
  destroyed() {
    document.removeEventListener('visibilitychange',this.handleVisiable)
  }
};
</script>

<style lang="scss">
.discuss {
  width: 100%;
  padding-right: 60px;

  h3 {
    font: {
      size: 24px;
      family: MicrosoftYaHei;
      weight: 400;
    }
    color: rgba(51, 51, 51, 1);
    line-height: 42px;
  }

  .discuss-void {
    height: 80px;
    margin-left: 68px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 2px;

    p {
      font: {
        size: 16px;
        family: MicrosoftYaHei;
        weight: 400;
      }
      color: rgba(128, 128, 128, 1);
      line-height: 20px;
    }
  }

  .discuss-login {
    height: 80px;
    margin-left: 68px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 2px;

    p {
      font: {
        size: 16px;
        family: MicrosoftYaHei;
        weight: 400;
      }
      color: rgba(128, 128, 128, 1);
      line-height: 20px;
      margin-right: 80px;

      span {
        color: rgba(255, 85, 51, 1);
      }
    }

    .discuss-login-shortcut {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      span {
        font: {
          size: 12px;
          family: MicrosoftYaHei;
          weight: 400;
        }
        color: rgba(179, 179, 179, 1);
        line-height: 20px;
      }

      a {
        img {
          width: 22px;
          height: 18px;
          margin: 5px;
        }
      }
    }
  }

  .discuss-input {
    height: 80px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    border: 0px solid rgba(204, 204, 204, 1);
    border-radius: 2px;

    .discuss-input-profile {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }

    .discuss-input-inputarea {
      width: 100%;
      height: 80px;
      margin-top: 4px;
      margin-left: 22px;

      .el-input__count {
        margin-bottom: 1px; //修复计数器与边框重叠问题
      }
    }
  }

  .discuss-btn {
    width: 16%;
    float: right;
    margin-top: 5px;
    background: linear-gradient(
      30deg,
      rgba(255, 85, 51, 1) 0%,
      rgba(255, 108, 0, 1) 100%
    );
    border: 0;

    span {
      font: {
        size: 14px;
        family: MicrosoftYaHei;
        weight: 400;
      }
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
    }
  }

  .discuss-details {
    width: 100%;
    min-height: 200px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      text-align: center;
    }
  }

  .items-right-row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .discuss-content {
      width: 100%;
      background: #fff;
      //display: flex;
      //justify-content: flex-start;
      //align-items: center;
    }
  }
}
</style>
