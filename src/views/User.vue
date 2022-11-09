<template>
  <transition appear>
    <div class="user">
      <UserHeader @switchNum="getSwitchNum"></UserHeader>
      <UserBottom :switchNum="switchNum"></UserBottom>
    </div>
  </transition>
</template>

<script>
import UserHeader from "@/components/User/UserHeader";
import UserBottom from "@/components/User/UserBottom"

export default {
  name: 'User',
  components: {UserHeader, UserBottom},
  data() {
    return {
      switchNum: 0
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getSwitchNum(num) {
      this.switchNum = num;
    }
  }
};
</script>

<style scoped lang="scss">
.user {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f4f4f4;
}

.v-enter {
  transform: translateX(100%);
}

.v-enter-to {
  transform: translateX(0%);
}

.v-enter-active {
  transition: transform 0.5s;
}

.v-leave {
  transform: translateX(0%);
}

.v-leave-to {
  transform: translateX(100%);
}

.v-leave-active {
  transition: transform 0.5s;
}
</style>