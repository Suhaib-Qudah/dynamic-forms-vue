<script lang="ts" setup>
import { ref, onMounted } from "vue";
interface ITextField {
  name: string;
  errors?: string[];
  modelValue: string | number | boolean;
  type?: string;
  options?: object;
  iteams:
    | string[]
    | number[]
    | boolean[]
    | {
        label: string;
        value: string | number | boolean;
      }[];
}

import { defineProps, defineEmits, computed, watch } from "vue";

const props = withDefaults(defineProps<ITextField>(), {
  type: "text",
  options: {},
});

const emit = defineEmits(["input", "update:modelValue"]);
const showSelect = ref(false);
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

const showDialog = () => {
  showSelect.value = !showSelect.value;
};

onMounted(() => {
  document.addEventListener("click", (e) => {
    if (e.target?.classList?.contains("select-button")) {
      //calculate the position of the select button and set the position of the select wrapper
      //select the next div the have class input-select-container

    } else {
      showSelect.value = false;
    }
  });
});
</script>

<template>
  <div class="input-group">
    <slot name="label">
      <div>
        <label
          for="select"
          @click="showDialog"
          class="input-label select-button"
        >
          Select
        </label>
      </div>
    </slot>
    <div class="input-select-container">
      <!-- div as label -->

      <!-- overlay div that have the list iteams -->
      <transition name="select">
        <div v-if="showSelect" class="input-select-wrapper">
          <template v-for="item in iteams" key="option">
            <div :data-value="typeof item === 'object' ? item.value : item">
              <span for="select" class="input-label">
                {{
                  //check if option is object or not
                  typeof item === "object" ? item.label : item
                }}
              </span>
            </div>
          </template>
        </div>
      </transition>
    </div>
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

  &-select {
    &-wrapper {
      position: absolute;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 1px;
      width: 100%;
      z-index: 1;
      top: 0;
      left: 0;
    }
    &-container {
      position: relative;
      width: 100%;
    }
  }
}

.select-enter-active,
.select-leave-active {
  transition: all 0.3s ease;
}

.select-enter,
.select-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.select-enter-to,
.select-leave {
  opacity: 1;
  transform: translateY(0);
}
</style>
