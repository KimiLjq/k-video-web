<template>
  <div class="my-video">
    <div class="content-null" v-show="!isNotEmpty">
      <img alt="null"  src="../../assets/null.png">
      <span>暂无上传视频</span>
    </div>
    <div class="content" v-show="isNotEmpty">
      <myvideoitems v-for="item in this.myVideoList" :key="item.id" :data="item" text="发布于"></myvideoitems>
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
      myVideoList: Array,
      isNotEmpty: false,
    }
  },
  mounted() {
    this.username = this.$route.query.username;

    let that = this;
    this.$axios.post(
      that.$store.state.property.ip + "/ki-video/video/myVideo",
      that.$qs.stringify({
        username: that.username
      })
    ).then(function (response) {
      let res = JSON.parse(JSON.stringify(response));
      if (res.data.code == 200) {
        console.log("myvideoitems", res.data.data);
        that.myVideoList = res.data.data;
        if (that.myVideoList.length > 0) {
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
