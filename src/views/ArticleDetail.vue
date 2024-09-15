<template>
<div  id="back">
<router-link to="/articles">
<svg width="4%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M12 8L8 12M8 12L12 16M8 12H16M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
</router-link></div>
  <div class="article-detail" v-if="article">
    <h1>{{ article.titre }}</h1>
    <p><strong>Auteur:</strong> {{ article.auteur }}</p>
    <p><strong>Date de publication:</strong> {{ article.date_publication }}</p>
    <img :src="require(`@/assets/${article.image}`)" :alt="article.titre" />
    <p>{{ article.contenu }}</p>
  </div>
  <div v-else>
    <p>Article not found</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'ArticleDetail',
  setup() {
    const route = useRoute();
    const article = ref(null);

    const fetchArticle = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/articles/${id}`); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        article.value = data;
      } catch (error) {
        console.error('Error fetching article:', error);
        article.value = null;
      }
    };

    onMounted(() => {
      fetchArticle(route.params.id);
    });

    return { article };
  }
};
</script>

<style scoped>
#back{
  text-align: start;
  width: 100%;
  text-decoration: none;
  padding: 15px;
    color: black !important
}


.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.article-detail img {
  max-width: 100%;
  height: auto;
}

.article-detail h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.article-detail p {
  margin-bottom: 1rem;
}
</style>
