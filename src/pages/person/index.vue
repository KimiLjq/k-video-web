<template>
  <div class="person-page">
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
      <div class="topMargin"></div>
      <div class="top">
        <div class="iconColor"></div>
        <img class="icon-user" alt="profile" src="../../assets/profilephoto.png">
        <div class="info">
          <span style="margin-right: 5px !important;">{{ this.$store.state.property.user.username }}</span>
          <span>({{this.$store.state.property.user.email}})</span>
          <div class="other-info">
            <span>作品数：0</span>
            <span>关注数：{{this.$store.state.property.user.followsCount}}</span>
            <span>粉丝数：{{ this.$store.state.property.user.fansCount }}</span>
            <span>获赞数：{{ this.$store.state.property.user.receiveLikeCount }}</span>
          </div>
        </div>
        <el-button class="discuss-btn" size="mini" @click="postComment()" round>编辑信息</el-button>
      </div>
      <div style="width: 100%; height: 10px"></div>
      <div class="mid">
        <div class="left">
          <ul>
            <li v-bind:class="{'active':item[0]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">我的视频</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li v-bind:class="{'active':item[1]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">收藏视频</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li v-bind:class="{'active':item[2]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">我的关注</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li v-bind:class="{'active':item[3]}">
              <a>
                <div class="icon"></div>
                <span style="vertical-align: middle;">我的粉丝</span>
                <img class="right-icon" src="../../assets/right-icon.png">
              </a>
            </li>
            <li v-bind:class="{'active':item[4]}">
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
  props: {},
  data() {
    return {
      activeitem: ["", "", "", "", "", "", ""],
      item: ["", "", true, "", ""],
      module_data_1: this.$store.state.webData.monthly_rank.module_data_1,
    }
  },
  watch: {
    itemid(itemid) {
      if (itemid) {
        this.item[itemid] = true;
      }
    }
  }
}
</script>

<style lang="scss">
  @import "./index";
</style>
