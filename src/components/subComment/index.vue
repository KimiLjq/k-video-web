<template>
  <div class="subComment">
    <img class="comment-profile" alt="profile" src="../../assets/profilephoto.png" @click="linkToPersonal(user)">
    <div class="comment-info">
      <a class="comment-username" @click="linkToPersonal(user)">{{data.replier}} 回复 {{data.atName}}</a>
      <p>{{data.content}}</p>
      <div class="info">
        <span>{{data.date}}</span>
        <a class="" @click="reply()">
          <span>回复</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "subComment",
  props: {
    data: Object,
    isShowInputArea: false
  },
  methods: {
    linkToPersonal(user) {

    },

    reply() {
      this.$emit('changeInputAreaState', true, this.data.replier);
    }
  }
}

</script>

<style lang="scss">
.subComment {
  width: 100%;
  margin-top: 10px;
  margin-left: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background: rgba(255, 255, 255, 1);
  border: 0px solid rgba(204, 204, 204, 1);
  border-radius: 2px;

  .comment-profile {
    width: 24px;
    height: 24px;
    margin-top: 1px;
    border-radius: 50%;
  }

  .comment-info {
    width: 100%;
    margin-left: 15px;
    flex-direction: row;
    align-items: center;

    .comment-username {
      font-size: 14px;
      text-align: left;
    }

    p {
      font: {
        size: 14px;
        family: MicrosoftYaHei;
      }
      width: 100%;
      color: rgba(0, 0, 0, 1);
      line-height: 20px;
    }

    .info {
      line-height: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      a {
        margin-left: 20px;
      }

      span {
        font: {
          size: 12px;
          family: MicrosoftYaHei;
          weight: 400;
        };

        color: rgba(153, 153, 153, 1);
        line-height: 20px;
      }
    }
  }
}

</style>
