<template>
  <div>
    <!--3.使用子组件-->
    <!--主页头部-->
    <my-header></my-header>
    <!--主页导航栏-->
    <tabbar></tabbar>
    <!--播放界面-->
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
//@代表src
// 1.导入组件
import MyHeader from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import Player from "@/views/Player"

export default {
  name: 'App',
  components: {
    // 2.注册子组件
    MyHeader,
    Tabbar,
    Player
  },
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
<!--scoped只对本页有效-->
<style scoped lang="scss">

</style>
