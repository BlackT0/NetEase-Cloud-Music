<template>
  <!--  <div class="detail-top">-->
  <!--    <div class="header-left" @click.stop="back"></div>-->
  <!--    <p class="header-title">{{ title }}</p>-->
  <!--    <div class="header-right"></div>-->
  <!--  </div>-->
  <MainHeader class="header">
    <div slot="left" class="header-left" @click.stop="back"></div>
    <p slot="middle" class="header-title">{{ title }}</p>
    <div slot="right" class="header-right"></div>
  </MainHeader>
</template>

<script>
import MainHeader from "@/components/MainHeader";

export default {
  name: 'DetailTop',
  components: {MainHeader},
  props: ['title'],
  data() {
    return {};
  },
  created() {

  },
  mounted() {

  },
  methods: {
    back() {
      this.$emit('back')
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";

.header {
  position: fixed;
  top: 0;
  z-index: 2;

  .header-left {
    @include bg_img("../../assets/images/back")
  }

  .header-right {
    @include bg_img("../../assets/images/more")
  }
}
</style>