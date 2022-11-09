<template>
  <div class="tabbar">
    <router-link tag="div" to="/recommend" class="item"><span>推荐</span></router-link>
    <router-link tag="div" to="/singer" class="item"><span>歌手</span></router-link>
    <router-link tag="div" to="/rank" class="item"><span>排行</span></router-link>
    <router-link tag="div" to="/search" class="item"><span>搜索</span></router-link>
  </div>
</template>

<script>
export default {
  name: 'tabber',
  components: '',
  data() {
    return {};
  },
  created() {

  },
  mounted() {

  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import '../assets/css/mixin';

.tabbar {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 84px;
  line-height: 84px;
  font-size: 30px;
}

.myStyle {
  @include font_active_color();
}
</style>