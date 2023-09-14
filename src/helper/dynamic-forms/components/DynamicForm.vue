<script lang="ts" setup>
import { defineProps, computed } from "vue";
import TextField from "@/components/dynamic-form/TextField.vue";
interface props {
  form: any;
}
const props = defineProps<props>();
const emits = defineEmits(["submit"]);
const keys = computed(() => Object.keys(props.form?.controls));

const submit = () => {
  if (!props.form.validate()) {
    console.log("Form is invalid");
    return;
  }
  console.log("Form is valid");
  emits("submit", props.form.value);
};
</script>

<template>
  <form @submit.prevent="submit">
    <template v-for="key in keys" :key="key">
      <TextField
        v-model="props.form.controls[key].value"
        :name="key"
        :placeholder="key"
        :errors="props.form.controls[key].errors"
        :options="props.form.controls[key].options"
        :type="props.form.controls[key]?.options?.type"
      />
    </template>
    <button type="submit">Submit</button>
  </form>
</template>
