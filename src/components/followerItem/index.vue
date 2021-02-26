<template>
  <div class="followerItem">
    <div class="container">
      <img class="icon-user" alt="profile" src="../../assets/profilephoto.png" @click="toPersonalPage(data)">
      <div class="info">
        <spin>Kimijiaqili</spin>
        <p>随便说说，展示用户的个性说明</p>
      </div>
      <el-button v-show="!isfollow" class="follow-btn" size="mini" @click="follow()" round>关注TA</el-button>
      <el-button v-show="isfollow" class="unfollow-btn" size="mini" @click="unfollow()" @mouseover.native="over()" @mouseout.native="out()" round>{{followText}}</el-button>
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
      isfollow:false,
      followText: "已关注",
      isHover: false,
    }
  },
  methods: {
    toPersonalPage(obj) {

    },
    follow() {
      this.isfollow = true;
    },
    unfollow() {
      this.isfollow = false;
    },
    over() {
      this.followText = "取关";
    },
    out() {
      this.followText = "已关注";
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
