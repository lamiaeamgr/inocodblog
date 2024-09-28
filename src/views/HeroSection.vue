<template>
  <div class="hero-section">
    <div class="text-container">
      <span
        v-for="(letter, index) in animatedText"
        :key="index"
        class="letter"
        :style="{ transitionDelay: `${index * 0.1}s` }"
      >{{ letter }}</span>
    </div>
    <div class="floating-objects">
      <div v-for="i in 20" :key="i" class="triangle" ref="triangles"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'HeroSection',
  setup() {
    const animatedText = ref("Welcome  to  Our  Blog".split('')); // Added spaces between words
    const triangles = ref([]);

    onMounted(() => {
      const letters = document.querySelectorAll('.letter');
      letters.forEach((letter, index) => {
        let startX = 0;
        let startY = 0;
        const randomDirection = Math.floor(Math.random() * 4);
        
        switch (randomDirection) {
          case 0: // From top-left
            startX = -100; 
            startY = -100; 
            break;
          case 1: // From top-right
            startX = 100; 
            startY = -100; 
            break;
          case 2: // From bottom-left
            startX = -100; 
            startY = 100; 
            break;
          case 3: // From bottom-right
            startX = 100; 
            startY = 100; 
            break;
        }

        gsap.fromTo(
          letter,
          {
            x: startX, 
            y: startY, 
            scale: 0, 
            opacity: 0, 
          },
          {
            x: 0, 
            y: 0, 
            scale: 1, 
            opacity: 1, 
            duration: 1,
            ease: "back.out(1.7)", 
            delay: index * 0.1, 
            onComplete: () => {
              gsap.to(letter, {
                scale: 1.5, 
                duration: 0.5,
                ease: "power1.out" 
              });
            },
            onReverseComplete: () => {
              gsap.set(letter, { scale: 1, opacity: 1 }); 
            }
          }
        );
      });

      // Animate triangles
      const triangleElements = document.querySelectorAll('.triangle');
      triangleElements.forEach((triangle) => {
        gsap.set(triangle, {
          position: 'absolute',
          rotation: Math.random() * 360,
          scale: Math.random() * 0.5 + 0.5,
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`
        });

        gsap.to(triangle, {
          y: "random(-50vh, 50vh)", 
          x: "random(-50vw, 50vw)", 
          duration: 5 + Math.random() * 5, 
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          opacity: 0.5, // Slight opacity for blurriness effect
          stagger: {
            amount: 1,
            from: "random"
          }
        });
      });
    });

    return {
      animatedText,
      triangles
    };
  }
};
</script>

<style scoped>
.hero-section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
  position: relative; 
}

.text-container {
  perspective: 1000px; 
  display: flex; 
  flex-wrap: wrap; 
  z-index: 1; 
}

.letter {
  font-size: 4rem; 
  color: white;
  display: inline-block; 
  margin: 0 10px; /* Increased margin for more spacing */
  font-weight: 600; 
  text-transform: uppercase; 
  will-change: transform, opacity; 
  font-family: 'Poppins', sans-serif; 
}

.floating-objects {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none; 
}

.triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid rgba(173, 216, 230, 0.7); /* Light blue */
  filter: blur(2px); /* Blur effect */
}

.triangle:nth-of-type(odd) {
  border-bottom-color: rgba(255, 182, 193, 0.7); /* Light pink for odd triangles */
}
</style>
