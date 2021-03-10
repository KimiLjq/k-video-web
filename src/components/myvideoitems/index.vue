<template>
  <div
    class="myvideoitems"
    ref="myvideoitem"
    :id="data.id"
    @click="linkToPlayer(data)"
    @mouseover="mouseIn()"
    @mouseout="mouseOut()"
  >
    <img alt="bmp" :src="data.poster">
    <div class="video-info">
      <div class="introduce">
        <p v-bind:class="{'items-selected':isHover}">{{data.title}}</p>
      </div>
      <div class="time">
        <p v-bind:class="{'items-selected':isHover}">收藏于：2021-2-20</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myvideoitems",
  props: {
    data: Object
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
        title: obj.title,
        poster: obj.poster,
        amount: obj.amount,
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
        query: { data: testData }
      });
    }
  },
  watch: {}
}
</script>

<style lang="scss">
.myvideoitems {
  width: 18%;
  margin: 2% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;

  img {
    width: 100%;
  }

  .video-info {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    .introduce {
      width: 100%;
      height: 50px;
      max-height: 50px;
      margin-top: 4px;
      word-break: normal;
      white-space: pre-wrap;
      word-wrap: break-word;
      font: {
        size: 14px;
        family: MicrosoftYaHei;
        weight: 400;
      }
      color: #000000;
      line-height: 21px;
      //cursor: pointer;
    }

    .time {
      width: 100%;
      margin-top: 15px;
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
}
</style>
