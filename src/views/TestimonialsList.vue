<template>
  <div class="testimonial-list">
    <div v-if="loading" class="loading">Loading testimonials...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!loading && testimonials.length" class="testimonial-parent">
      <div ref="testimonialContainer" class="testimonial-container">
        <transition-group name="fade" tag="div">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            class="testimonial-box"
            :ref="`testimonialBox${testimonial.id}`"
            :style="getRandomPositionStyle(index)"
          >
            <div class="notification">
              <div class="notification-header">
                <img
                  :src="require(`@/assets/${testimonial.image}`)"
                  alt="User Image"
                  class="user-image"
                />
                <div class="user-info">
                  <h3 class="user-name">{{ testimonial.nom }}</h3>
                  <p class="message-date">{{ formattedDate(testimonial.date) }}</p>
                </div>
              </div>
              <p class="message-content">{{ testimonial.message }}</p>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'TestimonialList',
  data() {
    return {
      testimonials: [],
      loading: true,
      error: null,
    };
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

        // Randomize order of testimonials
        if (this.testimonials.length) {
          this.testimonials = this.shuffleArray(this.testimonials);
          this.$nextTick(() => {
            this.setupScrollTrigger();
          });
        }
      } catch (err) {
        this.error = 'Failed to load testimonials. Please try again later.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    setupScrollTrigger() {
      const testimonialsSection = this.$refs.testimonialContainer;
      gsap.fromTo(
        testimonialsSection,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: testimonialsSection,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            once: true,
          },
        }
      );

      this.testimonials.forEach((testimonial) => {
        const testimonialBox = this.$refs[`testimonialBox${testimonial.id}`];
        if (testimonialBox) {
          gsap.fromTo(
            testimonialBox[0],
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: testimonialBox[0],
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                onEnter: () => this.stopFloatingAnimation(testimonialBox[0]),
                once: true,
              },
            }
          );
          this.startFloatingAnimation(testimonialBox[0]); // Start the floating animation before the scroll trigger
        }
      });
    },
    getRandomPositionStyle(index) {
      // Random positioning styles
      const positions = [
        { left: '0%', top: '10%' },   // Top left
        { right: '0%', top: '33.5%' },  // Right middle
        { left: '0%', bottom: '15%' }, // Bottom left
      ];
      return {
        position: 'absolute',
        ...positions[index % positions.length],
      };
    },
    startFloatingAnimation(el) {
      gsap.to(el, {
        y: '+=20', // Float up by 20px
        duration: 2,
        repeat: -1,
        yoyo: true, // Yoyo effect for floating
        ease: 'power1.inOut',
      });
    },
    stopFloatingAnimation(el) {
      gsap.killTweensOf(el); // Stop the floating animation
    },
    formattedDate(date) {
      return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
</script>

<style scoped>
.testimonial-parent {
  position: relative;
  height: 100vh;
}

.testimonial-container {
  position: relative;
  height: 100%;
}

.testimonial-box {
  width: 80%;
  margin-bottom: 20px;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-box:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.notification {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  background-color: rgba(177, 177, 177, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notification-header {
  display: flex;
  align-items: center;
}

.user-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  flex-grow: 1;
}

.user-name {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}

.message-date {
  font-size: 12px;
  color: #888888;
  text-align: left;
}

.message-content {
  margin-top: 8px;
  text-align: left;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
