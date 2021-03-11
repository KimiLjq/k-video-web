<template>
  <div class="today-page">
    <div class="header">
      <homeheader :scroll="true" :style_shade="true" :activeitem="activeitem"></homeheader>
      <hottags :tags="data.tagList"></hottags>
    </div>
    <div class="container">
      <div class="left"></div>
      <div class="right"></div>
      <div class="main">
        <frame v-for="category in data.videoCategoryList" :key="category.id" :data="category" :limit="14"></frame>
<!--        <frame :data="module_data_2" :limit="14">-->
<!--        <frame :data="module_data_3" :limit="14">-->
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
  data() {
    return {
      activeitem: ["", true, "", "", "", ""],
      data: this.$store.state.networkData.today,
    };
  },
  destroyed() {},
  methods: {}
};
</script>


<style lang="scss">
@import "./index";
</style>
