<template>
  <div class="search-page">
    <div class="header">
      <navbar
        :scroll="false"
        :style_shade="false"
        :menu_v="false"
        :extend="false"
        :activeitem="activeitem"
        :search="false"
      ></navbar>
    </div>
    <div class="container">
      <div class="left"></div>
      <div class="right"></div>
      <div class="main">
        <div class="search-bar">
          <el-row>
            <el-col :span="20">
              <el-input
                v-model="keyWord"
                prefix-icon="el-icon-search"
                :placeholder="keyWord"
                maxlength="10"
                @keyup.enter.native="getSearch()"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button @click="getSearch()" round>搜索</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="search-title">
          <div class="search-icon"></div>
          <span class="search-title-name">搜索结果</span>
        </div>
        <div class="search-result">
          <p class="search-no-result" v-show="isEmpty">无搜索结果</p>
          <div class="search-item-set" v-if="!isEmpty">
            <searchitem v-for="item in result" :key="item.id" :data="item"></searchitem>
          </div>
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
function getResult(dataSet, key) {
  let result = new Array();
  let counter = 1;

  for (let i in dataSet) {
    if (dataSet[i].data) {
      for (let j in dataSet[i].data) {
        if (
          dataSet[i].data[j] != undefined &&
          dataSet[i].data[j].title.match(key) != null
        ) {
          //console.log(dataSet[i].data[j].title);
          result.push({ id: counter, data: dataSet[i].data[j] });
          counter++;
        }
      }
    } else {
      if (
        dataSet[i].data != undefined &&
        dataSet[i].data.title.match(key) != null
      ) {
        console.log(dataSet[i].data.title);
        result.push({ id: counter, data: dataSet[i].data });
        counter++;
      }
    }
  }
  console.log(result);
  return result;
}

import searchitem from "./searchitem";
export default {
  components: {
    searchitem
  },
  props: {},
  data() {
    return {
      activeitem: ["", "", "", "", "", "", ""],
      data: {},
      keyWord: "",
      isEmpty: true,
      result: []
    };
  },
  created() {},
  mounted() {
    this.keyWord = this.$route.query.keyWord;
    this.data = this.$store.state.webData;

    if (this.keyWord) {
      this.result = getResult(this.data, this.keyWord);
      if (this.result.length) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
      this.$router.push({
        path: "/search",
        query: { keyWord: this.keyWord }
      });
    } else {
      this.isEmpty = true;
      this.result = [];
    }
  },
  methods: {
    getSearch() {
      if (this.keyWord) {
        this.result = getResult(this.data, this.keyWord);
        if (this.result.length) {
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }
        this.$router.push({
          path: "/search",
          query: { keyWord: this.keyWord }
        });
      } else {
        this.isEmpty = true;
        this.result = [];
      }
    }
  }
};
</script>


<style lang="scss">
@import "./index";
</style>
