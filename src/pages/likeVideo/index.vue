<template>
  <div class="like-video">
    <div class="content-null" v-show="!isNotEmpty">
      <img alt="null"  src="../../assets/null.png">
      <span>暂无喜爱视频</span>
    </div>
    <div class="content" v-show="isNotEmpty">
      <myvideoitems v-for="item in this.likeVideoList" :key="item.id" :data="item" text="点赞于"></myvideoitems>
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
      username: "",
      likeVideoList: Array,
      isNotEmpty: false,
    }
  },
  mounted() {
    this.username = this.$route.query.username;

    let that = this;
    this.$axios.post(
      that.$store.state.property.ip + "/ki-video/userLikeVideo/likeVideo",
      that.$qs.stringify({
        username: that.username
      })
    ).then(function (response) {
      let res = JSON.parse(JSON.stringify(response));
      if (res.data.code == 200) {
        console.log("likeVideoitems", res.data.data);
        that.likeVideoList = res.data.data;
        if (that.likeVideoList.length > 0) {
          that.isNotEmpty = true;
        }
      }
    })
  }
}
</script>

<style lang="scss">
  @import "./index";
</style>
