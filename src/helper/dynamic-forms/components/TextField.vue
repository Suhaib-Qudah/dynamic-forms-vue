<script lang="ts" setup>
interface ITextField {
  name: string;
  errors?: string[];
  modelValue: string | number | boolean;
  type?: string;
  options?: object;
}

import { defineProps, defineEmits, computed, watch } from "vue";

const props = withDefaults(defineProps<ITextField>(), {
  type: "text",
  options: {},
});

const emit = defineEmits(["input", "update:modelValue"]);

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const errors = computed(() => {
  return props.errors;
});

watch(
  () => props.errors,
  (value) => {
    console.log(value);
  }
);
</script>

<template>
  <div class="input-group">
    <slot name="label">
      <label :for="name" class="input-label">{{ name }}</label>
    </slot>
    <input
      type="text"
      :name="name"
      :id="name"
      v-model="input"
      class="input-control"
      v-if="type === 'text'"
    />
    <input
      type="email"
      :name="name"
      :id="name"
      v-model="input"
      class="input-control"
      v-if="type === 'email'"
    />
    <input
      type="password"
      :name="name"
      :id="name"
      v-model="input"
      class="input-control"
      v-if="type === 'password'"
    />
    <input
      type="number"
      :name="name"
      :id="name"
      v-model="input"
      class="input-control"
      v-if="type === 'number'"
    />
    <input
      type="tel"
      :name="name"
      :id="name"
      v-model="input"
      class="input-control"
      v-if="type === 'tel'"
    />
    <slot name="errors">
      <div class="input-error">
        <p v-if="errors.length > 0">{{ errors[0] }}</p>
      </div>
    </slot>
  </div>
</template>

<style lang="scss">
.input {
  &-group {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    flex-direction: column;
  }
  &-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #020202;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &-control {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    width: 100%;

    &:focus {
      outline: none;
      border-color: #000;
    }
  }
  &-error {
    color: #c10b0b;
  }
}
</style>
