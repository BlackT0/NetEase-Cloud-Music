<template>
  <!--  <div class="userHeader" @click="checkTheme(index)">-->
  <!--    <div class="header-left" @click.stop="back"></div>-->
  <!--    <ul class="header-title">-->
  <!--      <li @click.stop="switchItem(0)" :class="{active:switchNum === 0}">我的收藏</li>-->
  <!--      <li @click.stop="switchItem(1)" :class="{active:switchNum === 1}">最近播放</li>-->
  <!--    </ul>-->
  <!--    <div class="header-right" @click.stop=""></div>-->
  <!--  </div>-->
  <MainHeader class="header">
    <div slot="left" class="header-left" @click.stop="back"></div>
    <ul slot="middle" class="header-title">
      <li @click.stop="switchItem(0)" :class="{active:switchNum === 0}">我的收藏</li>
      <li @click.stop="switchItem(1)" :class="{active:switchNum === 1}">最近播放</li>
    </ul>
    <div slot="right" class="header-right" @click.stop=""></div>
  </MainHeader>
</template>

<script>
import MainHeader from "@/components/MainHeader";

export default {
  name: 'UserHeader',
  components: {MainHeader},
  data() {
    return {
      themes: ["theme", "theme1", "theme2"],
      index: 1,
      switchNum: 0
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    checkTheme(value) {
      this.index++;
      if (this.index >= this.themes.length) {
        this.index = 0;
      }
      document.documentElement.setAttribute('data-theme', this.themes[value])
    },
    back() {
      window.history.back();
    },
    switchItem(num) {
      this.switchNum = num;
      this.$emit('switchNum', this.switchNum)
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";

.header {

  .header-left {
    @include bg_img("../../assets/images/back")
  }

  .header-right {
    @include bg_img("../../assets/images/more")
  }

  .header-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65%;
    border: 2px solid;
    border-radius: 10px;
    color: #FFFFFF;
    font-weight: bold;

    li {
      padding: 0 10px;
      border-right: 5px solid;
      height: 100%;
      line-height: 50px;
      font-size: 35px;

      &:last-child {
        border-right: 0;
      }

      &.active {
        background: rgba(255, 255, 255, .5);
      }
    }
  }
}
</style>