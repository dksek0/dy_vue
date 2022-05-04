<template>
  <div class="menu">
    <div><router-link to="weather">Weather</router-link></div>
    <div><router-link to="cocktail">Cocktail</router-link></div>
  </div>

  <!-- 16도 이상일 경우 .warm 클래스가 추가되어 bg가 변경 됨 -->
  <router-view
    :class="cur != false ? 'wrapper warm' : 'wrapper'"
    :cur="cur"
    @updateCur="updateCur"
  />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      cur: false,
    };
  },
  methods: {
    updateCur(cur) {
      // Weather.vue에서 해당 메서드 호출하여
      // 기온이 16도 이상이면 this.cur를 true로 변경
      this.cur = cur;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  background: url(/src/assets/bg.jpg) no-repeat center / cover;
  min-height: 100vh;
}
.wrapper {
  width: 100%;
  min-height: 100vh;
  padding: 110px 20px 20px;
  background: url(/src/assets/bg.jpg) no-repeat center / cover;
  overflow: hidden;
}
.wrapper.warm {
  background-image: url(/src/assets/bg_warm.jpg);
  background-color: rgba(0, 0, 0, 0.2);
}
.menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
}
.menu > div {
  display: inline-block;
  vertical-align: top;
  margin: 24px 12px;
}
.menu > div > a {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.3);
  color: #333;
  font-size: 24px;
  text-decoration: none;
  font-weight: 500;
  transition: 0.2s;
  background-color: #f1f1f1;
  color: #555;
}
.menu > div > a:hover {
  color: #222;
  box-shadow: 0 8px 18px 0 rgba(0, 0, 0, 0.3);
  background-color: #f8f8f8;
}
</style>
