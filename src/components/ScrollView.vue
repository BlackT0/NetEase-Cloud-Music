<template>
  <!-- ref用以获取wrapper的dom元素 -->
  <div id="wrapper" ref='wrapper'>
    <!-- 由于内部的内容不确定，所以放一个插槽在这，谁要使用iscroll再添加进来 -->
    <slot></slot>
  </div>
</template>


<script>
import IScroll from '../api/iscroll-probe'

export default {
  name: 'scrollView',
  components: '',
  data() {
    return {};
  },
  created() {

  },
  mounted() {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mousewheel: true,
      scrollbars: false,
      probeType: 3,
      scrollX: false,
      scrollY: true,
      // disablePointer: true,
      // disableTouch: false,
      // disableMouse: true
    })
    // 创建一个观察者的对象
    let observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh()
    })
    // 2.告诉观察者对象观察什么内容
    const config = {
      childList: true, // 观察目标子节点的变化，添加或者删除
      subtree: true, // 默认为 false，设置为 true 可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    // 3.告诉观察者对象需要观察谁，观察什么内容
    /**
     * 参数1：告诉观察者对象需要观察谁
     * 参数2：告诉观察者对象观察什么内容
     */
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    scrolling(fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y);
      })
    },
    scrollTo(x, y, time) {
      this.iscroll.scrollTo(x, y, time);
    },
    refresh() {
      this.iscroll.refresh()
    }
  }
};
</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
  height: 100%;
}
</style>