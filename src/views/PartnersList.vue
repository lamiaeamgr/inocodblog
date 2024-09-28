<template>
  <section class="partners">

    <div v-if="partners.length > 0" class="partners-list">
      <div v-for="partner in partners" :key="partner.id" class="partner-item">
        <a :href="partner.site_web" target="_blank" rel="noopener noreferrer">
          <img :src="require(`@/assets/${partner.logo}`)" :alt="partner.nom" class="partner-logo" />
        </a>
      </div>
    </div>
    <p v-else>Loading partners...</p>
  </section>
</template>

<script>
export default {
  name: 'PartnersList',
  data() {
    return {
      partners: []
    };
  },
  async created() {
    await this.fetchPartners();
  },
  methods: {
    async fetchPartners() {
      try {
        const response = await fetch('http://localhost:3000/api/partenaires');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.partners = data;
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    }
  }
};
</script>

<style scoped>
.partners {
  padding: 20px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.partners-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.partner-item {
  flex: 1 1 calc(33.333% - 20px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.partner-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 10px;
}

@media (max-width: 1024px) {
  .partner-item {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .partner-item {
    flex: 1 1 calc(100% - 20px);
  }
}
</style>
