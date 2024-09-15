<template>
  <footer class="footer">
    <div class="footer-content">
      <img src="../assets/logo_inocod.png" alt="Inocod Logo" class="logo" />
      <p>© 2024 Inocod. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  background-color: #151717;
  color: white;
  text-align: center;
  padding: 20px;
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  margin:20px 0 0 0;
  box-sizing: border-box;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 150px;
  margin-bottom: 10px;
}
</style>
