<template>
  <div class="follow">
    <div class="content-null" v-show="!isNotEmpty">
      <img alt="null"  src="../../assets/null.png">
      <span>暂无关注用户</span>
    </div>
    <div class="content" v-show="isNotEmpty">
      <follower-item v-for="item in this.followList" :key="item.id" :data="item"></follower-item>
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
      followList: Array,
      isNotEmpty: false,
    }
  },
  mounted() {
    this.username = this.$route.query.username;

    let that = this;
    let loginUsername = JSON.parse(localStorage.getItem("user")).username;
    this.$axios.post(
      that.$store.state.property.ip + "/ki-video/userFans/queryFollowUsers",
      that.$qs.stringify({
        username: that.username,
        loginUsername: loginUsername
      })
    ).then(function (response) {
      let res = JSON.parse(JSON.stringify(response));
      if (res.data.code == 200) {
        that.followList = res.data.data;
        if (that.followList.length > 0) {
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
