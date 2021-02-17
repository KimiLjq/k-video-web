<template>
  <div class="comment">
    <div class="line">
    </div>
    <div class="con">
      <img class="comment-profile" alt="profile" src="../../assets/profilephoto.png" @click="linkToPersonal(user)">
<!--      <a class="comment-username" @click="linkToPersonal(user)">{{user.username}}</a>-->
<!--      <p>{{data.comment}}</p>-->
      <div class="comment-info">
        <a class="comment-username" @click="linkToPersonal()">{{data.name}}</a>
        <p>{{data.content}}</p>
        <div class="info">
          <span>{{data.date}}</span>
          <a class="" @click="reply()">
            <span>回复</span>
          </a>
        </div>
      </div>
    </div>
    <sub-comment
      @changeInputAreaState="changeInputAreaState"
      v-for="item in subCommentList"
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
    data: Object,
    replies: Array
  },
  data() {
    return {
      isLogin: true,
      holder: "说两句吧...",
      inputtext: "",
      isNotEmpty: false,
      isShowInputArea: false,
      subCommentList:[
        {id: '1', replier: 'carry', atName: 'kimi', content: '童年的纸飞机', date: utils.getNowTime()},
        {id: '2', replier: 'lulu', atName:'zhou', content: '但偏偏雨渐渐', date: utils.getNowTime()}
      ]
    }
  },
  methods: {
    linkToPersonal(user) {
      let personalIndex = this.$router.resolve({
        path: '/personal',
        query: {data: user}
      });

      window.open(personalIndex.href, '_blank');
    },

    reply() {
      this.holder = "@" + this.data.name;
      this.isShowInputArea = true;
    },

    postComment() {
      let subComment = {id: this.subCommentList.length+1, replier: 'arvit', atName: this.data.name, content: this.inputtext, date: utils.getNowTime()};
      this.subCommentList.push(subComment);
      console.log(subComment);
      this.inputtext = "";
      this.isShowInputArea = false;
    },

    changeInputAreaState(isShowInputArea, name) {
      this.isShowInputArea = isShowInputArea;
      this.holder = "@"+name;
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
