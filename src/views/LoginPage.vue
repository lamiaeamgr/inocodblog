<template>
  <div class="form-parent">
    <form class="form" @submit.prevent="handleLogin">
      <InputComponent label="Email" placeholder="Enter your Email" v-model="email">
        <template #icon>
          <!-- Optional SVG for Icon -->
        </template>
      </InputComponent>

      <InputComponent label="Password" placeholder="Enter your Password" type="password" v-model="password">
        <template #icon>
          <!-- Optional SVG for Icon -->
        </template>
      </InputComponent>

      <div class="flex-row">
        <div>
          <input type="checkbox" id="remember-me" v-model="rememberMe" />
          <label for="remember-me">Remember me</label>
        </div>
        <span class="span">Forgot password?</span>
      </div>

      <ButtonComponent @click="handleLogin">Log In</ButtonComponent>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p class="p">Don't have an account? <span class="span" @click="redirectToRegister">Sign Up</span></p>
    </form>
  </div>
</template>

<script>
import InputComponent from '../components/InputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    InputComponent,
    ButtonComponent,
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      // Clear previous messages
      this.errorMessage = '';

      // Get the list of users
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Find the user with matching credentials
      const user = users.find(
        user => user.email === this.email && user.password === this.password
      );

      if (user) {
        // Handle successful login (e.g., redirect to ArticlesList)
        console.log('User logged in:', user);

        // Store user information to simulate authentication
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to ArticlesList page
        
        await this.login();
        this.$router.push({ name: 'ArticlesList' });
        this.$nextTick(() => this.$forceUpdate()); 
      } else {
        this.errorMessage = 'Invalid email or password.';
      }
    },
    ...mapActions(['login']),
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    redirectToRegister() {
      // Redirect to the register page
      this.$router.push({ name: 'RegisterPage' });
    }
  },
};
</script>

<style scoped>
.form-parent {
  display: flex;
  justify-content: center;
  width: 100%;  
  padding: 0;    
  margin: 0;     
}
.form {
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 10px;
  background-color: #ffffff;
  padding: 30px;
  width: 450px;
  border-radius: 20px;
}

.flex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.span {
  font-size: 14px;
  color: #2d79f3;
  cursor: pointer;
}
</style>
