<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{ personalizedname }}</h3>
    </div>
    <div class="personalized-list">
      <div class="item" v-for="(v, i) in list" :key="i" @click="re(v.id)">
        <img v-lazy='v.picUrl' alt=""/>
        <p>{{ v.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'Personalized',
  components: '',
  props: ['list', 'personalizedname', 'type'],
  data() {
    return {};
  },
  created() {

  },
  mounted() {

  },
  methods: {
    re(id) {
      this.$emit('re', id, this.type)
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';

.personalized {
  font-size: $font_size_large;

  .personalized-top {
    margin: 27px 0;
    width: 100%;
    height: 60px;
    border-bottom: 2px solid #e6e6e6;

    h3 {
      height: 60px;
      margin-left: 15px;
      padding-left: 15px;
      color: #6d5c63;
      font-size: 33px;
      font-weight: bold;
      border-left: 5px solid #000;
    }
  }

  .personalized-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;

    .item {
      margin-left: 35px;
      width: 200px;

      img {
        width: 200px;
        height: 200px;
        border-radius: 12px;
      }

      p {
        font-family: '楷体';
        text-align: center;
        font-size: 26px;
        @include clamp(2)
      }
    }
  }
}
</style>