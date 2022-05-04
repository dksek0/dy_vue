import { createWebHistory, createRouter } from "vue-router";

import Weather from "./pages/Weather.vue";
import Cocktail from "./pages/Cocktail.vue";


const routes = [
  {
    path: "/weather",
    component: Weather,
    name: 'Weather',
    props: true,
    // true로 설정하면 데이터를 props로도 받음.
  },
  {
    path: "/cocktail",
    component: Cocktail,
    name: 'Cocktail',
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;