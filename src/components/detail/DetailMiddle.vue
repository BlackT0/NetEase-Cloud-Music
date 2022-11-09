<template>
  <div class="detail-mittle">
    <img :src="image" alt="">
  </div>
</template>

<script>
export default {
  name: 'DetailMiddle',
  components: '',
  props: ['image'],
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
.detail-mittle {
  position: fixed;
  top: 81px;
  z-index: 0;
  width: 100%;

  img {
    width: 100%
  }
}
</style>