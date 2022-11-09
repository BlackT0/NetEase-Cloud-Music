<template>
  <div>
    <ul class="sliderUl">
      <li v-for="(v,i) in list" :key="i" v-show="i === currentIndex">
        <img :src='v.pic'>
      </li>
    </ul>
    <ul class="circle">
      <li v-for="(v, i) in list" :key="i"
          :style="{'background-Color':i===currentIndex?'rgba(180, 0, 0, 1)':'rgba(255,255,255, .5)'}">
        <div></div>
      </li>
    </ul>
    <div class="lr">
      <div class="leftmove iconfont icon-xiangzuo" @click="leftMove()"></div>
      <div class="rightmove iconfont icon-xiangyou" @click="rightMove()"></div>
    </div>
  </div>
</template>

<script>
import {getBanner} from '@/api/index'

export default {
  name: 'Slidesshow',
  components: '',
  data() {
    return {
      currentIndex: 0,
      list: []
    }
  },
  async created() {
    const slider = await getBanner();
    // console.log(slider.data.banners);
    this.list = slider.data.banners;
  },
  mounted() {
    this.startInterval()
  },
  methods: {
    startInterval() {
      setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex > this.list.length - 1) {
          this.currentIndex = 0
        }
      }, 2000);
      this.$parent.$emit('startInterval')
    },
    leftMove() {
      if (this.currentIndex <= 0) {
        this.currentIndex = this.list.length - 1;
      }
      this.currentIndex--;

    },
    rightMove() {
      if (this.currentIndex >= this.list.length - 1) {
        this.currentIndex = 0;
      }
      this.currentIndex++;
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
@import '../../assets/css/variable';

div {
  position: relative;
  top: 0;
  width: 100%;

  .sliderUl {
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    height: 292px;

    li {
      width: 100%;
      height: 100%;
      background-color: pink;

      img {
        width: 100%;
      }
    }
  }

  .circle {
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 15px;

    li {
      margin-right: 15px;
      width: 30px;
      height: 10px;
      border-radius: 5px;
    }
  }

  .lr {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: space-between;
    transform: translate(2%, -50%);
    width: 96%;
    height: 60px;

    div {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      text-align: center;
      line-height: 60px;
      font-size: 60px;
      color: $background-color-theme;
      background-color: rgba(255, 255, 255, .3);

    }
  }
}
</style>