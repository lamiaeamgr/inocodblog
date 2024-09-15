<template>
  <div id="app">
    <NavbarComponent /> <!-- Your navigation bar component -->
    <router-view /> <!-- This is where routed components will be rendered -->
    
  </div>
 <FooterComponent />
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue'; 

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent
  }
}
</script>

<style>
/* Global styles can go here */
#app {
  text-align: center;
  margin-top: 15px;
  font-family: "Bebas Neue", cursive;
  margin: 15px 0 0 0;
}
</style>

