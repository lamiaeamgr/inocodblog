<template>
  <label>{{ label }}</label>
  <div class="inputForm">
    <div class="input-wrapper">
      <slot name="icon"></slot>
      <input 
        :type="type" 
        :placeholder="placeholder" 
        class="input" 
        v-model="inputValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      inputValue: this.modelValue
    }
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue;
    }
  },
  methods: {
    updateValue() {
      this.$emit('update:modelValue', this.inputValue);
    }
  },
  mounted() {
    this.$watch('inputValue', this.updateValue);
  }
}
</script>

<style scoped>
.inputForm {
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.input-wrapper {
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 100%;
}

.input {
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.input:focus {
  outline: none;
}

.inputForm:focus-within {
  border: 1.5px solid #2d79f3;
}
</style>
