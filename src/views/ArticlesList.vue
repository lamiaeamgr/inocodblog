<template>
<h2>Our Blogs</h2>
  <section class="articles">
  
    <article v-for="article in articles" :key="article.id">
      <div class="article-wrapper">
        <figure>
          <!-- Corrected image path -->
          <img :src="require(`@/assets/${article.image}`)" :alt="article.titre" />
        </figure>
        <div class="article-body">
          <h2>{{ article.titre }}</h2>
          <p>{{ article.resume }}</p>
          <router-link :to="{ name: 'ArticleDetail', params: { id: article.id } }" class="read-more">
            Read more
            <span class="sr-only">about {{ article.titre }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>
      </div>
    </article>
  </section>
</template>


<script>
export default {
  name: 'ArticlesList',
  data() {
    return {
      articles: []
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await fetch('http://localhost:3000/api/articles'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.articles = data;
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
  }
};
</script>

<style scoped>
.articles {
  display: grid;
  max-width: 1200px;
  margin: 20px auto; /* Center the grid container */
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

article {
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  transition: all 0.4s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

figure {
  margin: 0;
  padding: 0;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

article img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.4s ease-in-out;
}

.article-body {
  padding: 24px;
  flex: 1; /* Ensure the body takes available space */
}

h2 {
  margin: 0 0 18px 0;
  font-family: "Bebas Neue", cursive;
  font-size: 1.9rem;
  letter-spacing: 0.06em;
  color: #000;
  transition: color 0.3s ease-out;
}

.read-more {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #28666e;
  font-weight: bold;
}

.read-more:focus {
  outline: 1px dotted #28666e;
}

.read-more .icon {
  width: 24px;
  height: 24px;
  margin-left: 5px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

article:hover img {
  transform: scale(1.05);
}

article:hover h2 {
  color: #28666e;
}

article:hover .icon {
  transform: translateX(0);
  opacity: 1;
}

.sr-only:not(:focus):not(:active) {
  clip: rect(0, 0, 0, 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}

</style>
