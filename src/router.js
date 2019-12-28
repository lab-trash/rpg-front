import Vue from 'vue';
import VueRouter from 'vue-router';
import Authentication from './containers/Users/Authentication.vue';
import Game from './containers/Game/Game.vue';

import store from './store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'game',
    component: Game,
  },
  {
    path: '/compte',
    name: 'authentication',
    component: Authentication,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/**
 * Tentative de connexion de l'invocateur
 * Redirection vers l'écran d'authentication en cas de fail
 */
router.beforeEach((to, from, next) => {
  if (to.name === 'authentication' || store.getters.isAuthenticated) {
    return next();
  }

  store.dispatch('getUser')
    .then(() => {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next({ name: 'authentication' });
      }
    })
    .catch(() => {
      next({ name: 'authentication' });
    });

  return true;
});

export default router;
