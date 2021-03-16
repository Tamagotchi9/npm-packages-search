<template>
  <div>
    <label class="label" for="input">Find NPM package</label>
    <input
      class="input"
      id="input"
      type="text"
      placeholder="search all npm"
      v-model.trim="$v.value.$model"
      :class="{ 'is-invalid': $v.value.$error }"
    />
    <div class="invalid-feedback">
      <span v-if="!$v.value.minLength"
        >Input length must have at least
        {{ $v.value.$params.minLength.min }}</span
      >
    </div>
  </div>
</template>

<script>
import { minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "AppInput",

  data() {
    return {
      value: ""
    };
  },

  validations: {
    value: {
      minLength: minLength(2)
    }
  },

  methods: {
    ...mapActions({
      getPackages: "GET_PACKAGES"
    })
  },

  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.getPackages(newValue).catch(err => alert(err));
      }
    }
  }
};
</script>

<style>
.label {
  display: block;
  margin-bottom: 10px;
  font-size: 32px;
  line-height: 40px;
}
.input {
  outline: none;
  width: 100%;
  height: 50px;
  font-size: 18px;
  border: 1px solid blue;
  padding: 10px 25px;
  border-radius: 20px;
}
.invalid-feedback {
  display: block;
}
</style>
