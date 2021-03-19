<template>
  <div class="comment">
    <div class="line">
    </div>
    <div class="con">
      <img class="comment-profile" alt="profile" :src="data.firstComment.fromUserAvatar" @click="linkToPersonal(data.firstComment.fromUsername)">
<!--      <a class="comment-username" @click="linkToPersonal(user)">{{user.username}}</a>-->
<!--      <p>{{data.comment}}</p>-->
      <div class="comment-info">
        <a class="comment-username" @click="linkToPersonal(data.firstComment.fromUsername)">{{data.firstComment.fromUsername}}</a>
        <p>{{data.firstComment.content}}</p>
        <div class="info">
          <span>{{data.firstComment.createTime}}</span>
          <a class="" @click="reply()">
            <span>回复</span>
          </a>
        </div>
      </div>
    </div>
    <sub-comment
      @changeInputAreaState="changeInputAreaState"
      v-for="item in data.secondComment"
      :key="item.id"
      :data="item"
    ></sub-comment>
    <div class="discuss-input" v-if="isShowInputArea">
      <img class="discuss-input-profile" alt="profile" src="../../assets/profilephoto.png">
      <el-input
        type="textarea"
        class="discuss-input-inputarea"
        :autosize="{ minRows: 3, maxRows: 3 }"
        maxlength="200"
        :placeholder="holder"
        v-model="inputtext"
        show-word-limit
      ></el-input>
    </div>
    <el-button class="discuss-btn" size="mini" v-show="isNotEmpty" @click="postComment()" round>发布评论</el-button>
  </div>

</template>

<script>
import utils from "../../../static/utils/utils";

export default {
  name: "comment",
  props: {
    videoData: Object,
    data: Object,
  },
  data() {
    return {
      holder: "说两句吧...",
      inputtext: "",
      isNotEmpty: false,
      isShowInputArea: false,
      toUserName: "",
      subCommentList:[
        // {id: '1', replier: 'jay', atName: 'kimi', content: '童年的纸飞机', date: utils.getNowTime()},
        // {id: '2', replier: 'lulu', atName:'zhou', content: '但偏偏雨渐渐', date: utils.getNowTime()}
      ]
    }
  },
  methods: {
    linkToPersonal(username) {
      let personalIndex = this.$router.resolve({
        path: '/person',
        query: {username: username}
      });

      window.open(personalIndex.href, '_blank');
    },

    reply() {
      if (localStorage.isLogin == "true") {
        this.holder = "@" + this.data.firstComment.fromUsername;
        this.isShowInputArea = true;
        this.toUserName = this.data.firstComment.fromUsername;
      }
      else {
        alert("未登录无法评论噢，快去登录吧")
      }
    },

    postComment() {
      console.log("comment: "+this.toUserName);
      if (localStorage.isLogin == "true") {
        let that = this;
        this.$axios.post(
          that.$store.state.property.ip + "/ki-video/comment/postComment",
          this.$qs.stringify({
            fromUsername: that.$store.state.property.user.username,
            toUsername: that.toUserName,
            fromUserAvatar: that.$store.state.property.user.avatarUrl,
            videoId: that.data.firstComment.videoId,
            fatherCommentId: that.data.firstComment.commentId,
            content: that.inputtext
          })
        ).then(function (response) {
          let res = JSON.parse(JSON.stringify(response));
          if (res.data.code == 200) {
            let webComment = JSON.parse(JSON.stringify(res.data.data));
            console.log("secondComment");
            that.data.secondComment.push(webComment.firstComment);
          }
        })
        this.inputtext = "";
        this.isShowInputArea = false;
      }
      else {
        alert("未登录无法评论噢，快去登录吧")
      }
    },

    changeInputAreaState(isShowInputArea, name) {
      this.isShowInputArea = isShowInputArea;
      this.holder = "@"+name;
      this.toUserName = name;
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
  }
}
</script>

<style lang="scss">
.comment {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-self: flex-start;
  align-items: center;

  .line {
    width: 100%;
    height: 1.5px;
    margin-left:70px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #EEE;
  }

  .con {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background: rgba(255, 255, 255, 1);
    border: 0px solid rgba(204, 204, 204, 1);
    border-radius: 2px;

    .comment-profile {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
    }

    .comment-info {
      width: 100%;
      margin-left: 22px;
      flex-direction: row;
      align-items: center;

      .comment-username {
        height: 18px;
        font-size: 14px;
        text-align: left;
      }

      p {
        font: {
          size: 14px;
          family: MicrosoftYaHei;
        }
        width: 100%;
        color: rgba(0, 0, 0, 1);
        line-height: 20px;
      }

      .info {
        line-height: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        a {
          margin-left: 20px;
        }

        span {
          font: {
            size: 12px;
            family: MicrosoftYaHei;
            weight: 400;
          };

          color: rgba(153, 153, 153, 1);
          line-height: 20px;
        }
      }
    }
  }

  .items-right-row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }

  .discuss-input {
    width: 100%;
    height: 80px;
    margin-top: 10px;
    margin-left: 70px;
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
    width: 13%;
    margin-left: auto;
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
}

</style>
