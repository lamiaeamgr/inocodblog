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
#app {
  text-align: center;
  font-family: 'Poppins', sans-serif;
}
</style>

