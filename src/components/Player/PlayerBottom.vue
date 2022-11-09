<template>
  <div class="playerbottom">
    <div class="plan">
      <span class="now" ref="eleCurrentTime">{{ currentTime }}</span>
      <div class="bar" ref="progressBar" @click="progressClick">
        <div class="move" ref="progressLine">
          <div class="dot"></div>
        </div>
      </div>
      <span class="total" ref="eleTotalTime">{{ totalTime }}</span>
    </div>
    <div class="but">
      <div class="model" ref="model" @click="model"></div>
      <div class="prev" @click="prev"></div>
      <div class="action" ref="play" @click="plays"></div>
      <div class="next" @click="next"></div>
      <div class="favorite" @click="fav" :class="{'active':isFav(currentSong)}"></div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import modeType from "@/store/modeType";
import {formartTime} from "../../../tools/formatTime";

export default {
  name: 'PlayerBottom',
  components: {},
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
    let localFav = JSON.parse(window.localStorage.getItem('favList'));

    if (localFav) {
      this.setFsvLocalList(localFav);
    }
    let localHistory = JSON.parse(window.localStorage.getItem('historyList'))
    if (localHistory) {
      this.setHistoryList(localHistory);
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex',
      'currentSong',
      'favList',
      'historyList']),
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setcurrentIndex',
      'setcurTime',
      'setFavSong',
      'setFsvLocalList',
      'setHistorySong',
      'setHistoryList']),
    plays() {
      this.setIsPlaying(!this.isPlaying);
    },
    model() {
      if (this.modeType === modeType.loop) {
        //如果model为loop， loop=>one
        //读取（get）到播放模式，如果是loop就set成one
        this.setModeType(modeType.one);
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random);
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop);
      }
    },
    prev() {
      this.setcurrentIndex(this.currentIndex - 1);
      if (this.isPlaying !== true) {
        this.setIsPlaying(true);
      }
    },
    next() {
      this.setcurrentIndex(this.currentIndex + 1);
      if (this.isPlaying !== true) {
        this.setIsPlaying(true);
      }
    },
    progressClick(e) {
      let value = (e.pageX - this.$refs.progressBar.offsetLeft) / this.$refs.progressBar.offsetWidth;
      this.$refs.progressLine.style.width = value * 100 + "%";
      let currentTime = this.totalTime * value;
      //mapActions中映射到本地
      this.setcurTime(currentTime);
    },
    fav() {
      if (this.favList.length === 0) {
        this.setFavSong(this.currentSong)
      } else {
        this.favList.forEach((e) => {
          if (e.id === this.currentSong.id) {
            this.favList.splice(this.favList.indexOf(e), 1);
          } else {
            this.setFavSong(this.currentSong)
          }
        })
      }
    },
    isFav(song) {
      let result = this.favList.find(function (item) {
        return item.id === song.id;
      })
      return result !== undefined;
    }
  },
  watch: {
    isPlaying(newV) {
      if (newV === false) {
        this.$refs.play.classList.add('active')
        this.setIsPlaying(false)
      } else {
        this.$refs.play.classList.remove('active')
        this.setIsPlaying(true)
      }
    },
    modeType(newV) {
      if (newV === modeType.loop) {
        this.$refs.model.classList.add('loop');
        this.$refs.model.classList.remove('random');
      } else if (newV === modeType.one) {
        this.$refs.model.classList.add('one');
        this.$refs.model.classList.remove('loop');
      } else if (newV === modeType.random) {
        this.$refs.model.classList.add('random');
        this.$refs.model.classList.remove('one');
      }
    },
    totalTime(newV) {
      let time = formartTime(newV);
      this.$refs.eleTotalTime.innerHTML = time.minute + ":" + time.second;
    },
    currentTime(newV) {
      let time = formartTime(newV);
      this.$refs.eleCurrentTime.innerHTML = time.minute + ":" + time.second;

      //百分比
      let value = newV / this.totalTime * 100;
      this.$refs.progressLine.style.width = value + '%';

    },
    currentSong() {
      this.setHistorySong(this.currentSong);
    },
    //数据持久化，当收藏歌单有变化是，将数组存到localStorage中
    favList(newV) {
      window.localStorage.setItem('favList', JSON.stringify(newV));
    },
    historyList(newV) {
      window.localStorage.setItem('historyList', JSON.stringify(newV));
    },
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';

.playerbottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 230px;


  .plan {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    width: 80%;
    height: 25px;
    line-height: 25px;

    .bar {
      margin: 0 20px;
      width: 75%;
      height: 9px;
      background-color: #fff;

      .move {
        position: relative;
        height: 100%;
        background-color: #5b5b5b;

        .dot {
          position: absolute;
          top: 50%;
          left: 100%;
          transform: translate(0, -50%);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: #fff;
        }
      }
    }

    span {
      font-size: 25px;
      color: rgba(128, 119, 119, 0.98);
    }
  }

  .but {
    margin: 42px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;

    div {
      width: 75px;
      height: 75px;
      background-size: cover;
    }

    .model {
      @include bg_img("../../assets/images/one");

      &.loop {
        @include bg_img("../../assets/images/loop");
      }

      &.one {
        @include bg_img("../../assets/images/one");
      }

      &.random {
        @include bg_img("../../assets/images/shuffle");
      }
    }

    .prev {
      @include bg_img("../../assets/images/prev");
    }

    .action {
      width: 120px;
      height: 120px;
      @include bg_img("../../assets/images/pause");
    }

    .action.active {
      width: 120px;
      height: 120px;
      @include bg_img('../../assets/images/play');
    }

    .next {
      @include bg_img("../../assets/images/next");
    }

    .favorite {
      @include bg_img("../../assets/images/un_favorite");

      &.active {
        @include bg_img("../../assets/images/favorite");
      }
    }
  }
}
</style>