<template>
  <div class="player">
    <!--普通播放器-->
    <transition @enter="enter" @leave="leave" :css="false">
      <normal-player :totalTime="totalTime"
                     :currentTime="currentTime"
                     v-show="this.isFullScreen"
      ></normal-player>
    </transition>

    <!--待补全：miniPlayer listPlayer-->
    <transition @enter="enter" @leave="leave" :css="false">
      <MiniPlayer v-show="this.isShowMiniPlayer"
      ></MiniPlayer>
    </transition>
    <transition @enter="enter" @leave="leave" :css="false">
      <MiniPlayerList v-show="this.isShowMiniPlayerList"></MiniPlayerList>
    </transition>
    <audio ref="ado"
           :src=currentSong.url
           autoplay="autoplay"
           @timeupdate="timeupdate"
           @ended="end"
    ></audio>
  </div>
</template>

<script>
import NormalPlayer from "@/components/Player/NormalPlayer";
import MiniPlayer from "@/components/Player/MiniPlayer";
import {mapActions, mapGetters} from "vuex"
import modeType from "@/store/modeType";
import {getRandomIntInclusive} from "../../tools/audio";
import Velocity from "velocity-animate";
import MiniPlayerList from "@/components/Player/MiniPlayerList";

export default {
  name: 'Player',
  components: {MiniPlayerList, NormalPlayer, MiniPlayer},
  data() {
    return {
      totalTime: 0,
      currentTime: 0,
    };
  },
  created() {

  },
  mounted() {
    this.$refs.ado.oncanplay = () => {
      this.totalTime = this.$refs.ado.duration;
    }

  },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'isShowMiniPlayer',
      'isShowMiniPlayerList',
      'currentSong',
      'isPlaying',
      'curTime',
      'modeType',
      'songs',
      'currentIndex'
    ])
  },
  methods: {
    ...mapActions(['setHistoryList', 'setHistorySong', 'setcurrentIndex']),

    timeupdate(e) {
      this.currentTime = e.target.currentTime;
    },
    end() {
      if (this.modeType === modeType.loop) {
        this.setcurrentIndex(this.currentIndex + 1);
      } else if (this.modeType === modeType.one) {
        this.$refs.ado.play();
      } else if (this.modeType === modeType.random) {
        let index = getRandomIntInclusive(0, this.songs.length - 1);
        console.log(index);
        this.setcurrentIndex(index);
      }
    },
    enter(el) {
      Velocity(el, {opacity: 1}, {duration: 500});
    },
    leave(el) {
      Velocity(el, {opacity: 0}, {duration: 500});
    },
  },
  watch: {
    isPlaying(newV) {
      if (newV) {
        this.$refs.ado.play();
      } else {
        this.$refs.ado.pause();
      }
    },
    curTime(newV) {
      this.$refs.ado.currentTime = newV;
    },
  }
};
</script>

<style scoped lang="scss">

</style>