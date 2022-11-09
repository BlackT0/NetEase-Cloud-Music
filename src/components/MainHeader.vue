<template>
  <div class="header" @click="changeTheme(index)">
    <slot name="left">左</slot>
    <slot name="middle">中</slot>
    <slot name="right">右</slot>
  </div>
</template>

<script>
export default {
  name: 'MainHeader',
  components: '',
  data() {
    return {
      themes: ["theme", "theme1", "theme2"],
      index: 1
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    changeTheme(value) {
      this.index++;
      if (this.index >= this.themes.length) {
        this.index = 0;
      }
      document.documentElement.setAttribute('data-theme', this.themes[value])
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";

.header {
  width: 100%;
  height: 84px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include bg_color();

  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    @include bg_color();
  }

  .header-left {
    @include bg_img("../assets/images/logo")
  }

  .header-right {
    @include bg_img("../assets/images/account")
  }

  .header-title {
    color: aliceblue;
    font-size: 32px;
    font-weight: bold;
    line-height: 84px;
    @include clamp(1);
  }
}
</style>