<template>
  <div class="HomePage">
    <header>
      <div>
        <h1>Welcome to Our Blog</h1>
        <p>Discover the latest articles and stay updated with our blog.</p>
      </div>
    </header>

    <section class="recent-articles">
      <!-- Conditional rendering of ArticlesList -->
      <ArticlesList v-if="articles.length > 0"/>
      <p v-else>Loading articles...</p>
    </section>

    <section class="testimonials">
      <!-- Conditional rendering of TestimonialsList -->
      <TestimonialsList v-if="testimonials.length > 0"/>
      <p v-else>Loading testimonials...</p>
    </section>

    <section class="partners">
      <!-- Rendering PartnersList -->
      <PartnersList />
    </section>
  </div>
</template>

<script>
import ArticlesList from './ArticlesList.vue'; 
import TestimonialsList from './TestimonialsList.vue'; 
import PartnersList from './PartnersList.vue'; // Import the PartnersList component

export default {
  name: 'HomePage',
  components: {
    ArticlesList,
    TestimonialsList,
    PartnersList // Register the PartnersList component
  },
  data() {
    return {
      articles: [],
      testimonials: []
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
    }
  }
};
</script>

<style scoped>
.HomePage {
  padding: 20px;
  background-color: white;
}

header {
  text-align: center;
  color: white;
  font-size: 1.5em;
  margin-bottom: 20px;
  height: 80vh;
  background-image: url('~@/assets/Hero.jpg'); /* Corrected path */
  background-size: cover;
  background-position: center;
}

header > div {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
}

.recent-articles {
  margin-top: 20px;
}

.testimonials {
  margin-top: 20px;
}

.partners {
  margin-top: 20px;
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
