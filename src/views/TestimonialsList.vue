<template>
  <div class="testimonial-list">
    <h2>Testimonials</h2>

    <div v-if="loading" class="loading">
      Loading testimonials...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="!loading && testimonials.length"  class="testimonial-parent">

      <transition name="slide-fade" mode="out-in">
        <div :key="currentTestimonial.id" class="testimonial-box">
          <div class="testimonial">
            <i class="fas fa-quote-right"></i>
            <span class="testimonial-text">{{ currentTestimonial.message }}</span>
            <div class="testimonial-user">
              <!-- Correct usage of v-bind for the src attribute -->
              <img :src="require(`@/assets/${currentTestimonial.image}`)" alt="user-img" class="user-img">
              <div class="user-info">
                <span class="user-name">{{ currentTestimonial.nom }}</span>
                <div class="user-job-details">
                  <span class="user-job">{{ currentTestimonial.date }}</span>
                  <!-- Assuming there's no "post" data field, you might want to remove or adapt this part -->
                  <span class="user-post"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <div class="controls">
        <Button @click="prevTestimonial">Prev</Button>
        <button @click="nextTestimonial">Next</button>
      </div>

    </div>
    
  </div>
</template>

<script>
export default {
  name: 'TestimonialList',
  data() {
    return {
      testimonials: [],
      currentIndex: 0,
      loading: true,
      error: null,
      slideshowInterval: null,
    };
  },
  computed: {
    currentTestimonial() {
      return this.testimonials[this.currentIndex];
    },
  },
  created() {
    this.fetchTestimonials();
  },
  methods: {
    async fetchTestimonials() {
      try {
        const response = await fetch('http://localhost:3000/api/temoignages'); 
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        this.testimonials = data;
        this.startSlideshow();
      } catch (err) {
        this.error = 'Failed to load testimonials. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    startSlideshow() {
      this.slideshowInterval = setInterval(() => {
        this.nextTestimonial();
      }, 5000);
    },
    stopSlideshow() {
      clearInterval(this.slideshowInterval);
    },
    prevTestimonial() {
      this.currentIndex =
        this.currentIndex === 0
          ? this.testimonials.length - 1
          : this.currentIndex - 1;
    },
    nextTestimonial() {
      this.currentIndex =
        this.currentIndex === this.testimonials.length - 1
          ? 0
          : this.currentIndex + 1;
    },
  },
  beforeUnmount() {
    this.stopSlideshow();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

.testimonial-list {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.testimonial-box {
  position: relative;
  width: fit-content;
  height: fit-content;
  padding: 20px;
  margin: 0 auto;
}

.testimonial {
  display: grid;
  grid-template-rows: 1fr 1fr;
  background-image: linear-gradient(120deg, #e0e0e0 0%, #c0c0c0 100%);
  padding: 10px 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  height: 80%; 
  width: 100%;
  margin-bottom: 20px; 
  box-sizing: border-box;

}

.fas {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  font-size: 25px;
  color: #222;
}

.testimonial-text {
  font-size: 14px; 
  line-height: 22px; 
  text-align: start;
  padding: 20px 15px; 
  width: 100%;
  color: #000; 
}

.testimonial-user {
  display: flex;
  align-items: start;
  justify-content: start;
}

.user-img {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 50px; /* Reduced width */
  height: 50px; /* Reduced height */
  border-radius: 50%;
}

.user-info {
  margin: 0 20px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  text-align: end;
}

.user-name {
  font-weight: 800;
  color: #000; /* Changed text color to black */
}

.user-job-details {
  margin: 5px 0 0 0;
  position: relative;
  display: flex;
  justify-content: center;
}

.controls {
  text-align: center;
  margin-top: 20px;
}

.controls button {
  padding: 10px 20px;
  border: none;
  background-color: #000; /* Changed button background color to black */
  color: white;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
}

.controls button:hover {
  background-color: #444; /* Changed hover color to a darker shade of black */
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.error {
  text-align: center;
  color: red;
}

.support {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 10px;
  display: flex;
}

.support a {
  margin: 0 10px;
  color: #fff;
  font-size: 1.5rem;
  transition: all 400ms ease;
}

.support a:hover {
  color: #000; /* Changed hover color to black */
}

/* Slide fade transition */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
