<template>
  <div class="search-item">
    <div class="search-content" @click="linkToPlayer(data.data)">
      <el-row>
        <el-col :span="6">
          <div class="search-cover">
            <img alt="search-img" :src="data.data.poster">
          </div>
        </el-col>
        <el-col :span="18">
          <div class="search-info">
            <p class="search-info-title">
              <span>No.{{data.id}}:</span>
              {{data.data.title}}
            </p>
            <p>
              <span>发布时间：</span>2019-01-01
            </p>
            <p>
              <span>简介：</span>hello
            </p>
          </div>
          <img>
        </el-col>
      </el-row>
    </div>
    <div class="search-line"></div>
  </div>
</template>

<script>
export default {
  nmae: "searchitem",
  props: {
    data: Object
  },
  created() {},
  mounted() {},
  methods: {
    linkToPlayer(obj) {
      let testData = {
        id: obj.id,
        author: obj.author,
        title: obj.title,
        likeCount: obj.likeCount,
        poster: obj.poster,
        amount: obj.amount,
        firstType: obj.firstType,
        createTime: obj.createTime,
        source: [
          {
            withCredentials: false,
            type: obj.type,
            src: obj.videoUrl
          }
        ]
      };
      this.$router.push({
        path: "/player",
        query: { data: JSON.stringify(testData) }
      });
    }
  }
};
</script>

<style lang="scss">
.search-item {
  width: 100%;
  min-height: 130px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  .search-content {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;

    .el-row {
      width: 100%;

      .search-cover {
        img {
          max-width: 218px;
          max-height: 122px;
        }
      }

      .search-info {
        width: 100%;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        .search-info-title {
          font-size: 22px;
          font-weight: bold;
        }
      }
    }
  }
  .search-line {
    width: 98%;
    height: 1px;
    margin: auto;
    padding: 0;
    background: gray;
    opacity: 0.2;
  }
}
</style>

