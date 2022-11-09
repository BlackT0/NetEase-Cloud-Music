<template>
  <div class="normalplayer">
    <div class="normalplayer-main">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
      <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
    </div>
    <div class="player-bg">
      <img :src=this.currentSong.picUrl alt="">
    </div>
  </div>
</template>

<script>
import PlayerHeader from "@/components/Player/PlayerHeader";
import PlayerMiddle from "@/components/Player/PlayerMiddle";
import PlayerBottom from "@/components/Player/PlayerBottom";
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'NormalPlayer',
  components: {PlayerHeader, PlayerMiddle, PlayerBottom},
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    },

  },
  data() {
    return {};
  },
  created() {

  },
  mounted() {
  },
  methods: {
    ...mapActions(['setSongLyric'])
  },
  computed: {
    ...mapGetters(['currentSong'])
  },
  watch: {
    currentSong(newV) {
      this.setSongLyric(newV.id);
    }
  }
};
</script>

<style scoped lang="scss">

.normalplayer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;


  .normalplayer-main {
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
  }

  .player-bg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    background-color: #000;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 102%;
      opacity: 0.3;
      filter: blur(10px);
    }
  }
}
</style>