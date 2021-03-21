<template>
  <div class="fans">
    <div class="content-null" v-show="!isNotEmpty">
      <img alt="null"  src="../../assets/null.png">
      <span>暂无粉丝关注</span>
    </div>
    <div class="content" v-show="isNotEmpty">
      <follower-item v-for="item in this.fansList" :key="item.id" :data="item"></follower-item>
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
      fansList: Array,
      isNotEmpty: false,
    }
  },
  mounted() {
    this.username = this.$route.query.username;

    let that = this;
    let loginUsername = JSON.parse(localStorage.getItem("user")).username;
    this.$axios.post(
      that.$store.state.property.ip + "/ki-video/userFans/queryFansList",
      that.$qs.stringify({
        username: that.username,
        loginUsername: loginUsername
      })
    ).then(function (response) {
      let res = JSON.parse(JSON.stringify(response));
      if (res.data.code == 200) {
        that.fansList = res.data.data;
        if (that.fansList.length > 0) {
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
