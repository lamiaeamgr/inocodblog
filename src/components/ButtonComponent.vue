<template>
  <button class="button-submit">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.button-submit {
  margin: 20px 0 10px 0;
  background-color: #151717;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
}

.button-submit:hover {
  background-color: white;
  border: black solid 2px;
  color: black;
}
</style>
