<template>
  <!--  <div class="header" @click="check(index)">-->
  <!--    <div class="header-left"></div>-->
  <!--    <p class="header-title">网抑云</p>-->
  <!--    <div class="header-right" @click.stop="user"></div>-->
  <!--  </div>-->
  <MainHeader class="header">
    <div slot="left" class="header-left"></div>
    <p slot="middle" class="header-title">网抑云</p>
    <div slot="right" class="header-right" @click.stop="user"></div>
  </MainHeader>

</template>

<script>
import MainHeader from './MainHeader';

export default {
  name: 'myHeader',
  components: {MainHeader},
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
    check(value) {
      this.index++;
      if (this.index >= this.themes.length) {
        this.index = 0;
      }
      document.documentElement.setAttribute('data-theme', this.themes[value])
    },
    user() {
      this.$router.push('/user')
    }
  }
};
</script>
<style scoped lang="scss">
</style>