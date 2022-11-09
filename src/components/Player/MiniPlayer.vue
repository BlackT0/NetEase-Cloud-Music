<template>
  <div class="mini-player" @click="cli">
    <div class="player-wrapper">
      <div class="player-left">
        <img :src=currentSong.picUrl alt="" :class="{'active':is}">
        <div class="player-title">
          <h3>{{ currentSong.name }}</h3>
          <p>{{ currentSong.singer }}</p>
        </div>
      </div>
      <div class="player-right">
        <div class="play" @click.stop="play" :class="{'active':is}"></div>
        <div class="more" @click.stop="showList"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'MiniPlayer',
  components: '',
  data() {
    return {
      is: true,
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    ...mapActions(['setIsPlaying', 'setMiniPlayer', 'setFullScreen', 'setMiniList']),
    play() {
      if (this.isPlaying === true) {
        this.setIsPlaying(false);
      } else {
        this.setIsPlaying(true);
      }
    },
    cli() {
      this.setFullScreen(true);
      this.setMiniPlayer(false);
    },
    showList() {
      this.setMiniList(true);
      this.setMiniPlayer(false);
    }
  },
  computed: {
    ...mapGetters(['currentSong', 'isPlaying', 'isFullScreen', 'songs'])
  },
  watch: {
    isPlaying(newV) {
      this.is = newV;
    },
    isFullScreen(newV) {
      this.setMiniPlayer(!newV);
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";

.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;

  .player-wrapper {
    width: 100%;
    height: 100%;
    @include bg_color;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .player-left {
      display: flex;
      padding-left: 30px;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 10px;
        animation: sport 5s linear infinite;
        animation-play-state: paused;

        &.active {
          animation-play-state: running;
        }
      }

      .player-title {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h3, p {
          font-size: 30px;
          color: #FFFFFF;
          @include clamp(1)
        }
      }
    }

    .player-right {
      display: flex;
      align-items: center;

      .play {
        width: 75px;
        height: 75px;
        @include bg_img('@/assets/images/play');

        &.active {
          @include bg_img('@/assets/images/pause');
        }
      }

      .more {
        width: 120px;
        height: 120px;
        @include bg_img('@/assets/images/list');
      }
    }
  }
}

@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>