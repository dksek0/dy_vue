<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input @input="search" />
    <div class="post-header" v-for="(a, i) in follower" :key="{ i }">
      <div
        class="profile"
        :style="`background: url(${a.image}) no-repeat center`"
      ></div>
      <span class="profile-name">{{ a.name }}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs, ref, reactive, watch, computed } from "vue";
import axios from "axios";
// import {useStore} from 'vuex';

export default {
  name: "mypage",
  props: {
    one: Number,
  },
  setup(props) {
    // methods, computed, watch 만들 수 있고 hook 도 걸 수 있음
    // setup(){} 내에 작성하는 건 crated() hook 안에 작성하는 것과 비슷함

    let follower = ref([]);
    // ref() 란 reference data type 으로 취급하겠다는 뜻
    // 즉 같은 값을 참조함으로써 실시간으로 그 값을 공유하겠다는 것
    // 보통 숫자, 문자 같은 primitive data type을 담음

    let test = reactive({ name: "Kim" });
    // 보통 array, object 같은 reference data type을 담음
    test;

    let { one } = toRefs(props);
    // props 또한 ref 해주는 것
    console.log(one.value);

    watch(one, () => {
      console.log(one);
    });

    // let store = useStore();
    // console.log(store.state.name)

    // function search(e) {
    //   let searchResult = follower.value;
    //   for (let i = 0; i < searchResult.length; i++) {
    //     if (searchResult[i].name.includes(e.target.value)) {
    //       console.log(searchResult[i].name);
    //       follower.value = searchResult;
    //     }
    //   }
    // }

    onMounted(() => {
      axios.get("/follower.json").then((a) => {
        follower.value = a.data;

        // let result = computed(() => {
        //   return follower.value.length;
        // });
        // console.log(result.value);
      });
    });

    return { follower };
  },
  // data() {
  //   return
  // }
};
</script>
<style scoped>
.post-header {
  text-align: left;
}
.profile {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>