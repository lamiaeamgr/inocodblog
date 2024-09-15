<template>
  <div class="contact-container">
    <div class="form-section">
      <form @submit.prevent="handleSubmit">
        <InputComponent 
          v-model="name" 
          type="text" 
          label="Your Name" 
          placeholder="Enter your name"
        />
        <InputComponent 
          v-model="email" 
          type="email" 
          label="Your Email" 
          placeholder="Enter your email"
        />
        <label>Message</label>
        <textarea v-model="message" placeholder="Your Message" class="textarea"></textarea>
        <ButtonComponent>Send Message</ButtonComponent>
      </form>
    </div>
    <div class="image-section">
      <img src="../assets/contact.png" alt="Contact Us" />
    </div>
  </div>
</template>

<script>
import InputComponent from '../components/InputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';

export default {
  components: {
    InputComponent,
    ButtonComponent
  },
  data() {
    return {
      name: '',
      email: '',
      message: ''
    };
  },
  methods: {
    handleSubmit() {
      // Form submit logic
      console.log("Form submitted:", this.name, this.email,  this.message);
    }
  }
};
</script>

<style scoped>
.contact-container {
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  margin: 20px auto;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #ccc;
  flex-wrap: wrap;
}

.form-section {
  width: 50%;
  text-align: start;
}

.image-section {
  width: 40%;
  text-align: center;
}

.form-section form > * {
  margin-bottom: 15px;
}

.textarea {
  height: 100px;
  border-radius: 10px;
  padding: 10px;
  border: 1.5px solid #ecedec;
  width: 100%;
  box-sizing: border-box;
}

.textarea:focus {
  outline: none;
  border-color: #2d79f3;
}

img {
  max-width: 100%;
  border-radius: 8px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .contact-container {
    flex-direction: column;
    width: 90%;
    padding: 15px;
  }

  .form-section {
    width: 100%;
    margin-bottom: 20px;
    text-align: start;
  }

  .image-section {
    display: none;
  }
}

@media (max-width: 480px) {
  .textarea {
    height: 80px;
  }

  .contact-container {
    width: 95%;
    padding: 10px;
  }

  .form-section form > * {
    margin-bottom: 10px;
  }
}

</style>
