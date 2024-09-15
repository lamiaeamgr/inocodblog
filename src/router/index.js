import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ArticlesList from '../views/ArticlesList.vue';  
import ArticleDetail from '../views/ArticleDetail.vue';
import ContactForm from '../views/ContactForm.vue';      
import LoginPage from '../views/LoginPage.vue';          
import RegisterPage from '../views/RegisterPage.vue';    
import TestimonialsList from '../views/TestimonialsList.vue';  

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/articles', name: 'ArticlesList', component: ArticlesList },
  { path: '/articles/:id', name: 'ArticleDetail', component: ArticleDetail },
  { path: '/contact', name: 'ContactForm', component: ContactForm },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/register', name: 'RegisterPage', component: RegisterPage },
  { path: '/testimonials', name: 'TestimonialsList', component: TestimonialsList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Simulate an authentication check
function isLoggedIn() {
  // Replace this with your actual authentication logic
  return !!localStorage.getItem('user');  // Example: checking if a user is stored in localStorage
}

router.beforeEach((to, from, next) => {
  if (!isLoggedIn() && (to.name !== 'LoginPage' && to.name !== 'RegisterPage')) {
    // If not logged in and trying to access routes other than Login or Register, redirect to LoginPage
    next({ name: 'LoginPage' });
  } else if (isLoggedIn() && (to.name === 'LoginPage' || to.name === 'RegisterPage')) {
    // If logged in and trying to access Login or Register, redirect to ArticlesList
    next({ name: 'ArticlesList' });
  } else {
    // Allow navigation to the intended route
    next();
  }
});

export default router;
