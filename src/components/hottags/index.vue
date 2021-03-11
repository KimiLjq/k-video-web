<template>
  <div class="hottags">
    <ul>
      <li>
        <span class="tags-title">#热门标签</span>
      </li>
      <li
        class="tages-items"
        v-for="item in tags"
        :key="item.id"
        @click="linkToIndex(item)"
        @mouseover="mouseIn(item.id)"
        @mouseout="mouseOut(item.id)"
      >
        <a>
          <span v-bind:class="{'tags-selected':(isHoverId == item.id)}">{{item.content}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "hottags",
  props: {
    tags: Array
  },
  data() {
    return {
      isHoverId: 0
    };
  },
  methods: {
    mouseIn(n) {
      this.isHoverId = n;
    },
    mouseOut(n) {
      this.isHoverId = 0;
    },
    linkToIndex(d) {
      let that = this;
      this.$axios.post(
        this.$store.state.property.ip + "/ki-video/video/hotTag",
        that.$qs.stringify({
          hotTag: d.content
        })
      ).then(function (response) {
        let res = JSON.parse(JSON.stringify(response));
        console.log("hotTag");
        console.log(res.data.data);
        if (res.data.code == 200) {
          that.$router.push({
            path: "/index",
            query: { data: res.data.data }
          });
        }
      })
    }
  },

};
</script>

<style lang="scss">
.tags-selected {
  color: rgba(255, 186, 116, 1) !important;
}

.hottags {
  width: 100%;
  height: 60px;
  background: rgba(242, 242, 242, 1);

  ul {
    height: 60px;
    position: absolute;
    left: 5.5%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    li {
      margin-left: 20px;
      margin-right: 20px;
      cursor: pointer;

      .tags-title {
        font: {
          size: 16px;
          family: MicrosoftYaHei;
          weight: 400;
        }
        height: 15px;
        margin-left: 0;
        color: rgba(102, 102, 102, 1);
        line-height: 19px;
      }

      .tags-items {
        font: {
          size: 16px;
          family: MicrosoftYaHei;
          weight: 400;
        }
        height: 15px;
        color: rgba(51, 51, 51, 1);
        line-height: 19px;

        a,
        span {
          &:hover {
            color: rgba(255, 186, 116, 1) !important;
          }
        }
      }
    }
  }
}
</style>
