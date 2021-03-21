<template>
  <div
    class="myvideoitems"
    ref="myvideoitem"
    :id="data.id"
    @click="linkToPlayer(data)"
    @mouseover="mouseIn()"
    @mouseout="mouseOut()"
  >
    <div class="items-bg">
      <div class="items-cover">
        <img alt="bmp" style="width: 100%;" :src="data.poster">
      </div>
      <p v-bind:class="{'items-selected':isHover}">{{data.title}}</p>
    </div>

    <div class="time">
      <p v-bind:class="{'items-selected':isHover}">{{this.text}}：{{data.createTime}}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "myvideoitems",
  props: {
    data: Object,
    text: "",
  },
  data() {
    return {
      isHover: false
    };
  },
  methods: {
    mouseIn() {
      this.isHover = true;
    },
    mouseOut() {
      this.isHover = false;
    },
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
  },
  watch: {}
}
</script>

<style lang="scss">
.myvideoitems {
  margin: 10px 4%;
  cursor: pointer;
  width: 25%;

  items-bg {
    border: none;
    border-radius: 5px;
    background-color: rgb(243, 243, 243);

    .items-cover {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    }

    p {
      width: 100%;
      height: 42px;
      padding-left: 5px;
      padding-right: 5px;
      word-break: normal;
      white-space: pre-wrap;
      word-wrap: break-word;
      text-align: left;
      font: {
        size: 14px;
        family: MicrosoftYaHei;
        weight: 400;
      }
      color: rgb(20, 20, 20);
      line-height: 18px;
      //letter-spacing: 1px;
      cursor: pointer;
    }
  }

  .time {
    width: 100%;
    margin-top: 5px;
    font: {
      size: 12px;
      family: MicrosoftYaHei;
    };
    color: rgba(102, 102, 102, 1);
  }

  .items-selected {
    color: rgba(255, 186, 116, 1) !important;
  }
}
</style>
