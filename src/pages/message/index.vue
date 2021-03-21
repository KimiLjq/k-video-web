<template>
  <div class="message">
    <div class="content-null" v-show="!isNotEmpty">
      <img alt="null"  src="../../assets/null.png">
      <span>暂无消息</span>
    </div>
    <div class="content" v-show="isNotEmpty">

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
      messageList: Array,
      isNotEmpty: false,
    }
  }
}
</script>

<style lang="scss">
  @import "./index";
</style>
