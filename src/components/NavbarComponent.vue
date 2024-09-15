<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="../assets/logo_inocod.png" alt="Logo" />
    </div>

    <ul :class="['navbar-menu', { active: isMenuOpen }]">
      <template v-if="isLoggedIn">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/articles">Blogs</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </template>
    </ul>

    <div :class="['navbar-actions', { active: isMenuOpen }]">
      <template v-if="!isLoggedIn">
        <router-link to="/login" class="btn">Sign In</router-link>
        <router-link to="/register" class="btn-inverse">Sign Up</router-link>
      </template>
      <template v-else>
        <button @click="handleLogout" class="btn">Log Out</button>
      </template>
    </div>

    <div class="menu-toggle" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </nav>
</template>


<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'NavbarComponent',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: {
    ...mapState(['isLoggedIn']),
  },
 methods: {
  ...mapActions(['logout']),
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  },
  handleLogout() {
    this.logout();
    this.$router.push({ name: 'LoginPage' });
  },
},
};
</script>

<style scoped>
/* General styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

.navbar-logo img {
  width: 120px;
}

.navbar-menu {
  display: flex;
  gap: 20px;
  list-style-type: none;
}

.navbar-menu li {
  margin: 0;
}

.navbar-menu a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 16px;
}

.navbar-actions {
  display: flex;
  gap: 10px;
}

.navbar-actions .btn {
  padding: 10px 20px;
  border: 1.5px solid black;
  border-radius: 20px;
  background-color: white;
  color: #000;
  text-decoration: none;
  font-weight: 600;
}

.navbar-actions .btn-inverse {
  padding: 10px 20px;
  border: 1.5px solid black;
  border-radius: 20px;
  background-color: black;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.navbar-actions .btn:hover {
  background-color: black;
  color: #fff;
}

.navbar-actions .btn-inverse:hover {
  background-color: white;
  color: #000;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background-color: #333;
  margin-bottom: 4px;
  transition: all 0.3s;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }

  .navbar-actions {
    display: none;
  }

  .menu-toggle {
    display: flex;
    z-index: 10;
  }

  .navbar-menu.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 20px;
  }

  .navbar-menu li {
    margin-bottom: 10px;
  }

  .navbar-actions.active {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
