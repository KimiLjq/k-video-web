<template>
  <div class="index-page">
    <div class="header">
      <navbar
        :scroll="false"
        :style_shade="false"
        :menu_v="false"
        :extend="false"
        :activeitem="activeitem"
      ></navbar>
      <div class="index-title">
        <p v-if="!data.multi">{{data.title}}</p>
        <el-breadcrumb separator="/" v-if="data.multi">
          <el-breadcrumb-item v-for="tags in data.dataList" :key="tags.id">
            <a @click="switchTags(tags.title)" class="index-tags-link" v-bind:class="{'actived-el-breadcrumb__item':(activeName == tags.title)}">{{tags.title}}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div class="left"></div>
      <div class="right"></div>
      <div class="main" v-if="!data.multi">
        <div class="items-row">
          <items v-for="item in data.data" :key="item.id" :data="item"></items>
        </div>
        <div class="items-paging">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-size="35"
            layout="total, prev, pager, next, jumper"
            :total="data.data.length"
          ></el-pagination>
        </div>
      </div>
      <div class="main" v-if="data.multi">
        <el-tabs v-model="activeName">
          <el-tab-pane
            v-for="tags in data.dataList"
            :key="tags.id"
            :name="tags.title"
            :label="tags.title"
          >
            <div class="items-row">
              <items v-for="item in tags.data" :key="item.id" :data="item"></items>
            </div>
            <div class="items-paging">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-size="35"
                layout="total, prev, pager, next, jumper"
                :total="tags.data.length"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
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
  props: {},
  data() {
    return {
      data: {},
      activeitem: ["", "", "", "", "", "", ""],
      activeName: "",
      currentPage1: 1
    };
  },
  created() {
  },
  mounted() {
    this.data = this.$route.query.data;
    console.log("index");
    console.log(this.data);
    if (this.data == {}) {
      this.data = JSON.parse(localStorage.getItem("shotcut_indexData"));
    } else {
      localStorage.setItem("shotcut_indexData", JSON.stringify(this.data));
    }
    this.activeName = this.data.dataList[0].title;
    console.log(this.data);
  },
  destroyed() {},
  methods: {
    switchTags(t) {
      console.log(t);
      this.$nextTick(() => {
        this.activeName = t;
      });
    },
    handleSizeChange(val) {
      console.log("每页 ${val} 条");
    },
    handleCurrentChange(val) {
      console.log("当前页: ${val}");
    }
  }
};
</script>


<style lang="scss">
@import "./index";
</style>
