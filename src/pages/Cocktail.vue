<template>
  <div>
    <div class="ani-wrapper">
      <div class="circle"></div>
      <div class="cocktail-wrap" v-for="(a, i) in cocktail" :key="{ i }">
        <div
          class="rec"
          :style="`background-image: url(${a.strDrinkThumb})`"
          @click="modal(i)"
        ></div>
      </div>
      <div class="detail-wrap" v-if="modalView == true">
        <span><strong>Drink</strong>{{ cocktail[modalActive].strDrink }}</span>
        <span
          ><strong>Category</strong
          >{{ cocktail[modalActive].strCategory }}</span
        >
        <span
          ><strong>Instructions</strong
          >{{ cocktail[modalActive].strInstructions }}</span
        >
        <span
          ><strong>Ingredient</strong
          >{{ cocktail[modalActive].strIngredient }}</span
        >
        <button class="close" @click="modalView = false">
          <img src="../assets/close.png" alt="close modal" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import cocktail from "../../public/cocktail.json";

export default {
  name: "Cocktail",
  data() {
    return {
      inputValue: 0,
      fileUrl: "",
      cocktail,
      modalView: false,
      modalActive: 0,
    };
  },
  props: {
    cur: Boolean,
  },
  methods: {
    modal(i) {
      this.modalView = true;
      this.modalActive = i;
    },
    cirAni() {
      var circle = gsap.timeline();
      ScrollTrigger.create({
        animation: circle,
        trigger: ".wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: ".circle",
        pinSpacing: false,
      });
      circle.fromTo(".circle", { scale: 1 }, { scale: 5 });
    },
    recAni() {
      const cocktailCard = gsap.utils.toArray(".rec");
      cocktailCard.forEach((card) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 95",
            end: "bottom top",
            scrub: true,
            // markers: true,
          },
          x: 200,
        });
      });
    },
    curWeather() {
      if (this.cur == false) {
        this.cocktail = this.cocktail.slice(3, 6);
      } else {
        this.cocktail = this.cocktail.slice(0, 3);
      }
    },
  },
  created: function () {
    this.curWeather();
    // Dom에 그려주기 전에 기온에 따라 다른 cocktail Array를 먼저 담아 줌
  },
  mounted: function () {
    this.recAni();
    this.cirAni();
  },
  updated: function () {
    this.recAni();
    // 모달이 열리고 난 뒤 recAni 함수가 동작하지 않는 상황 해결
  },
};
</script>

<style>
.ani-wrapper {
  position: relative;
  min-height: 100vh;
}
.circle {
  display: inline-block;
  position: absolute;
  width: 200px;
  height: 200px;
  margin-top: 20vh;
  margin-left: -100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
}
.cocktail-wrap {
  position: relative;
}
.rec {
  display: block;
  width: 50%;
  height: 0;
  margin: 30px auto;
  padding-bottom: 70%;
  border-radius: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: 0.1s;
}
.rec:hover {
  box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.5);
}
.detail-wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 30px;
  border-radius: 30px;
  background-color: #f3f3f3;
  box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.4);
}
.detail-wrap span {
  display: block;
  text-align: left;
  margin: 12px 0;
  letter-spacing: -0.3px;
}
.detail-wrap strong {
  display: inline-block;
  margin-right: 12px;
  font-style: italic;
}
.detail-wrap button {
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.detail-wrap button img {
  width: 100%;
}
</style>
