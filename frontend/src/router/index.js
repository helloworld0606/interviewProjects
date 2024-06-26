import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/loginPage.vue"; 
import Home from "../components/HelloWorld.vue"; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    props: route => ({ msg: 'Welcome to Home Page!', id: route.query.id || 'No ID provided' }) 
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const publicPages = ['/login'];
  const authRequired = to.matched.some(record => record.meta.requiresAuth);

  if (authRequired && !isLoggedIn) {
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    });
  } else if (isLoggedIn && publicPages.includes(to.path)) {
    
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;
