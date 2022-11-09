<template>
  <div class="player-middle">
    <swiper :options="swiperOptions" class="banner">
      <swiper-slide class="cd">
        <div class="cd-warpper" ref="cw">
          <img :src=this.currentSong.picUrl alt="">
        </div>
        <p>{{ getFirstLyric() }}</p>
      </swiper-slide>
      <swiper-slide class="lyric" ref="lyric">
        <ScrollView ref="scrollView">
          <ul class="lyric-ul">
            <li v-for="(v, i) in currentLyric"
                class="lyricli"
                :key="i"
                :class="{'active': i===currentLineNum}"
            >{{ v }}
            </li>
            <!--            <li></li>-->
          </ul>
        </ScrollView>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import {mapGetters} from "vuex";
import ScrollView from "@/components/ScrollView";

export default {
  name: 'PlayerMiddle',
  components: {swiper, swiperSlide, ScrollView},
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    },
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
        observer: true,
        observeSlideChildren: true,
        observeParents: true,
      },
      currentLineNum: 1,
      nowLyric: ""

    };
  },
  created() {

  },
  mounted() {
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentSong', 'currentLyric']),
  },
  watch: {
    isPlaying(newV, oldV) {
      if (newV) {
        this.$refs.cw.classList.remove('active')
      } else {
        this.$refs.cw.classList.add('active')
      }
    },
    currentTime(newV) {
      let lineNum = Math.floor(newV)
      let result = this.currentLyric[lineNum];
      this.nowLyric = result;
      if (result !== undefined && result !== '') {
        this.currentLineNum = Math.floor(newV) + '';
      }
      //高亮歌词距离顶部的距离、
      let currentLyricTop
      try {
        currentLyricTop = document.querySelector('.lyricli.active').offsetTop;
      } catch (e) {
        console.log()
      }
      let Lyric = this.$refs.lyric.$el.offsetHeight;
      // console.log(currentLyricTop, Lyric)
      if (currentLyricTop > Lyric / 2) {
        // console.log('开始滚动');
        this.$refs.scrollView.scrollTo(0, Lyric / 2 - currentLyricTop - 100, 100);
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100);
      }
    },
  },
  methods: {
    getFirstLyric() {
      return this.currentLyric[this.currentLineNum];
    }
  }
};
</script>

<style scoped lang="scss">
.player-middle {
  position: fixed;
  top: 84px;
  bottom: 249px;
  left: 0;
  right: 0;
  z-index: 3;

  .banner {
    position: fixed;
    top: 0;
    bottom: 249px;
    left: 0;
    right: 0;

    .cd {
      .cd-warpper {
        position: absolute;
        top: 130px;
        left: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 550px;
        height: 550px;
        border-radius: 50%;
        background-color: #fff;

        img {
          width: 490px;
          height: 490px;
          border-radius: 50%;
        }

        animation: sport 5s linear infinite;
        animation-play-state: running;

        &.active {
          animation-play-state: paused;
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

      p {
        position: absolute;
        top: 730px;
        left: 50%;
        transform: translate(-50%);
        width: 100%;
        text-align: center;
        color: #949494;
        font-size: 35px;
      }
    }

    .lyric {
      height: 95%;
      margin-top: 118px;
      overflow: hidden;

      .lyric-ul {
        width: 100%;


        li {
          margin: 10px;
          text-align: center;
          color: #949494;
          font-size: 35px;
          line-height: 50px;
          //歌词高亮
          &.active {
            color: rgb(180, 0, 0);
          }
        }

        li:last-child {
          width: 100%;
          height: 1000px;
        }
      }
    }
  }
}
</style>
<style scoped lang="scss">
@import "../../assets/css/mixin";

.banner {
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background: #000;
    opacity: 1;
  }

  .swiper-pagination .swiper-pagination-bullet-active {
    margin: 0 10px;
    @include bg_color();
    width: 38px;
    height: 16px;
    border-radius: 8px;
  }

}
</style>