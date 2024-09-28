<template>
  <div class="HomePage">
    <HeroSection />
    <section class="recent-articles" ref="recentArticles">
      <!-- Conditional rendering of ArticlesList -->
      <h2>Recent Articles</h2>
      <ArticlesList v-if="articles.length > 0" />
      <p v-else>Loading articles...</p>
    </section>

    <section class="testimonials" ref="testimonialsSection">
      <!-- Conditional rendering of TestimonialsList -->
      <h2>Testimonials</h2>
      <TestimonialsList v-if="testimonials.length > 0" />
      <p v-else>Loading testimonials...</p>
    </section>

    <section class="partners">
      <h2>Our Partners</h2> <!-- Added h2 for partners -->
      <!-- Rendering PartnersList -->
      <PartnersList />
    </section>
  </div>
</template>

<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './HeroSection.vue';
import ArticlesList from './ArticlesList.vue';
import TestimonialsList from './TestimonialsList.vue';
import PartnersList from './PartnersList.vue';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'HomePage',
  components: {
    HeroSection,
    ArticlesList,
    TestimonialsList,
    PartnersList,
  },
  data() {
    return {
      articles: [],
      testimonials: [],
    };
  },
  created() {
    this.fetchArticles();
    this.fetchTestimonials();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await fetch('http://localhost:3000/api/articles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched articles:', data);
        this.articles = data.slice(0, 3);
        console.log('Limited articles:', this.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    },
    async fetchTestimonials() {
      try {
        const response = await fetch('http://localhost:3000/api/temoignages');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.testimonials = data; // Corrected assignment
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Handle error (e.g., display a message to the user)
      }
    },
    animateOnScroll() {
      // Animate the recent articles section
      gsap.from(this.$refs.recentArticles.children, {
        y: 50,
        opacity: 0,
        duration: 3,
        stagger: 0.2, // Stagger effect for articles
        scrollTrigger: {
          trigger: this.$refs.recentArticles,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate testimonials section
      gsap.from(this.$refs.testimonialsSection.children, {
        y: 50,
        opacity: 0,
        duration: 3,
        stagger: 0.2, // Stagger effect for testimonials
        scrollTrigger: {
          trigger: this.$refs.testimonialsSection,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    },
  },
  mounted() {
    this.animateOnScroll(); // Call the animation function on mounted
  },
};
</script>

<style scoped>
.recent-articles,
.testimonials,
.partners {
  margin-top: 20px;
}

h2 {
  font-size: 2.5rem; /* Adjust this value for bigger size */
  color: white; /* Set text color to white */
}

.articles-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.article-item {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  width: 30%;
}

.article-image {
  max-width: 100%;
  height: auto;
}

a {
  text-decoration: none;
  color: #007BFF;
}
</style>
