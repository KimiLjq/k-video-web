<template>
  <div class="player-page">
    <div class="header">
      <navbar
        :scroll="false"
        :style_shade="false"
        :menu_v="false"
        :extend="false"
        :activeitem="activeitem"
      ></navbar>
      <div class="play-area" v-if="isReload">
        <div class="play-player">
          <video-player
            class="video-player-box vjs-custom-skin"
            ref="videoPlayer"
            :options="playerOptions"
            @ready="playerReadied"
          ></video-player>
        </div>
        <div class="play-info">
          <el-row>
            <el-col :span="12">
              <div class="play-details">
                <div class="play-title">
                  <p ref="playTitle">{{title}}</p>
                  <span @click="linkToPersonal()">{{author}}</span>
                </div>
                <div class="play-append">
                  <div class="play-share">
                    <span>分享：</span>
                    <a>
                      <img alt="wechat" src="../../assets/wechat.png">
                    </a>
                    <a>
                      <img alt="sina" src="../../assets/weibo.png">
                    </a>
                  </div>
                  <div class="play-amount">
                    <p>
                      浏览量：
                      <span>{{amount}}</span>
                    </p>
                  </div>
                  <div class="play-like">
                    <img alt="like" src="../../assets/like.png" @click="changeLikeStatus()" v-show="!isLike">
                    <img alt="liked" src="../../assets/liked.png" @click="changeLikeStatus()" v-show="isLike">
                    <span v-bind:class="{'like': isLike}">{{likeCount}}</span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="play-ad" @click="googleAd()">
                <a>
                  <img alt="ad" src="../../../static/images/ad/ad.png">
                </a>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="left"></div>
      <div class="right"></div>
      <div class="main">
        <el-row>
          <el-col :span="18">
            <discuss :video-data="this.videoData" :comment-data="this.commentData"></discuss>
          </el-col>
          <el-col :span="6">
            <recommend :data="recommendVideos"></recommend>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="footer">
      <div class="line"></div>
      <footbar></footbar>
    </div>
  </div>
</template>

<script>
import "../../assets/css/custom-player.scss";
import videojs from "video.js";
window.videojs = videojs;

// hls plugin for videojs6 (replaced by VHS)
// require("videojs-contrib-hls/dist/videojs-contrib-hls.js");

export default {
  components: {},
  inject: ["reload"],
  props: {},
  data() {
    return {
      title: "",
      author: "",
      amount: 0,
      likeCount: 0,
      activeitem: ["", "", "", "", "", "", ""],
      videoData: {},
      isLike: false,
      loginUsername: "",
      commentData: Array,
      recommendVideos: Array,
      isReload: true,
      playerOptions: {
        // videojs options
        autoplay: false,
        muted: false,
        loop: false,
        preload: "auto",
        language: "en",
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        aspectRatio: "16:9",
        fluid: true,
        sources: [],
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        poster: "",
        notSupportedMessage: "遇到问题，视频无法播放",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullScreenToggle: true
        }
      }
    };
  },
  watch: {
    $route(e) {
      console.log("player route")
      this.videoData = JSON.parse(e.query.data);
      this.requestData();
    }
  },
  created() {},
  mounted() {
    console.log("player mounted");
    this.videoData = JSON.parse(this.$route.query.data);
    this.requestData();
  },
  beforeDestroy() {},
  destroyed() {},
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    requestData() {
      if (this.videoData == {}) {
        this.videoData = JSON.parse(localStorage.getItem("shotcut_videoData"));
        console.log("get videoData from cache")
      } else {
        localStorage.setItem("shotcut_videoData", JSON.stringify(this.videoData));
        console.log("save videoData in cache");
      }

      if (this.$store.state.isLogin) {
        this.loginUsername = JSON.parse(localStorage.getItem("user")).username;
      }

      let that = this;
      this.$axios.post(
        that.$store.state.property.ip + "/ki-video/comment/getComments",
        that.$qs.stringify({
          videoId:that.videoData.id
        })
      ).then(function (response) {
        let res = JSON.parse(JSON.stringify(response));
        if (res.data.code == 200) {
          that.commentData = res.data.data;
        }
      })

      this.$axios.post(
        that.$store.state.property.ip + "/ki-video/video/recommendVideo",
        that.$qs.stringify({
          type: that.videoData.firstType,
          videoId: that.videoData.id,
        })
      ).then(function (response) {
        let res = JSON.parse(JSON.stringify(response));
        if (res.data.code == 200) {
          console.log("get recommend video success");
          that.recommendVideos = res.data.data;
        }
      })

      if (this.$store.state.isLogin) {
        this.$axios.post(
          that.$store.state.property.ip + "/ki-video/userLikeVideo/queryLikeVideo",
          that.$qs.stringify({
            username: that.loginUsername,
            videoId: that.videoData.id
          })
        ).then(function (response){
          let res = JSON.parse(JSON.stringify(response));
          if (res.data.code == 200) {
            that.isLike = true;
          }
          else if (res.data.code == 512) {
            console.log(res.data.msg);
          }
        })
      }

      this.title = this.videoData.title;
      this.author = this.videoData.author;
      this.amount = this.videoData.amount;
      this.likeCount = this.videoData.likeCount;
      this.playerOptions.poster = this.videoData.poster;
      this.playerOptions.sources = this.videoData.source;
    },
    playerReadied(player) {
      if (this.videoData.source.type == "application/x-mpegURL") {
        let hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
        player.tech_.hls.xhr.beforeRequest = function(options) {
          // console.log(options)
          return options;
        };
      }
    },

    linkToPersonal() {
      let personalIndex = this.$router.resolve({
        path: '/person',
        query: {username: this.author}
      });

      window.open(personalIndex.href, '_blank');
    },

    changeLikeStatus() {
      if (!this.$store.state.isLogin) {
        alert("请先登录");
        return;
      }

      let that = this;
      if (this.isLike) {
        this.$axios.post(
          that.$store.state.property.ip + "/ki-video/userLikeVideo/cancelLikeVideo",
          that.$qs.stringify({
            username: that.loginUsername,
            videoId: that.videoData.id,
            author: that.videoData.author
          })
        ).then(function (response) {
          let res = JSON.parse(JSON.stringify(response));
          if (res.data.code == 200) {
            that.isLike = false;
            that.likeCount = that.likeCount - 1;
          }
        })
      }
      else {
        this.$axios.post(
          that.$store.state.property.ip + "/ki-video/userLikeVideo/addLikeVideo",
          that.$qs.stringify({
            username: that.loginUsername,
            videoId: that.videoData.id,
            author: that.videoData.author
          })
        ).then(function (response) {
          let res = JSON.parse(JSON.stringify(response));
          if (res.data.code == 200) {
            that.isLike = true;
            that.likeCount = that.likeCount + 1;
          }
        })
      }
    },

    googleAd() {
      window.open(
        "https://www.google.com/adsense/start/#/?modal_active=none",
        "_blank"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
