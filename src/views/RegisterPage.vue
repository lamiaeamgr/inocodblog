<template>
  <div class="form-parent">
    <form class="form" @submit.prevent="handleRegister">
      <InputComponent label="First Name" placeholder="Enter your First Name" v-model="firstName">
        <template #icon>
          <!-- Optional SVG for Icon -->
        </template>
      </InputComponent>

      <InputComponent label="Last Name" placeholder="Enter your Last Name" v-model="lastName">
        <template #icon>
          <!-- Optional SVG for Icon -->
        </template>
      </InputComponent>

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
      </div>

      <ButtonComponent>Sign Up</ButtonComponent>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import InputComponent from '../components/InputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';

export default {
  components: {
    InputComponent,
    ButtonComponent,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    handleRegister() {
      // Clear previous messages
      this.errorMessage = '';
      this.successMessage = '';

      // Check if all fields are filled
      if (!this.firstName || !this.lastName || !this.email || !this.password) {
        this.errorMessage = 'Please fill all fields.';
        return;
      }

      // Save the user to local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
      };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      // Show success message
      this.successMessage = 'Successfully registered!';

      // Clear form fields
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.rememberMe = false;
    },
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
  box-sizing: border-box;
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

.error {
  color: red;
}

.success {
  color: green;
}
</style>
