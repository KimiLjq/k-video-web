<template>
  <div class="home-page">
    <div class="header">
      <homeheader :scroll="true" :style_shade="true" :activeitem="activeitem"></homeheader>
    </div>
    <div class="container">
      <div class="left"></div>
      <div class="right"></div>
      <div class="main">
        <frame :data="module_data_10" :limit="11"  :exhibition="true">
        <frame :data="module_data_3" :limit="14">
        <frame :data="module_data_2" :limit="11"  :exhibition="true">
        <frame :data="module_data_5" :limit="14">
      </div>
    </div>
    <div class="footer">
      <div class="line"></div>
      <footbar></footbar>
    </div>
  </div>
</template>

<script>
import store from "../../store";

export default {
  components: {},
  data() {
    return {
      activeitem: [true,"","","","",""],
      scroll: 0,
      module_data_10: Object,
      module_data_2: Object,
      module_data_3: Object,
      module_data_5: Object
    };
  },
  created() {
    let homePage = JSON.parse(sessionStorage.getItem("homePage"));
    this.module_data_10 = homePage[0];
    this.module_data_2 = homePage[2];
    this.module_data_3 = homePage[1];
    this.module_data_5 = homePage[3];
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
  }
};
</script>


<style lang="scss">
@import "./index";
</style>
