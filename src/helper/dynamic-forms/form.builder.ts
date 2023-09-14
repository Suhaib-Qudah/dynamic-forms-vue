import { ref, computed } from 'vue';

export function useReactiveFormBuilder<T>() {
  const controls = ref<Array<any>>([]);
  const errorsArray = ref<{ key: string; errors: string[] }[]>([]);

  const validate = () => {
    errorsArray.value = [];
    // Check if all controls are valid and return true or false accordingly
    for (const key in controls.value) {
      const control = controls.value[key];
      if (!control.validate()) {
        // Check if the key is already in the errors array and add it if not
        if (!errorsArray.value.find((error) => error.key === key)) {
          errorsArray.value.push({ key, errors: control.errors });
        }
      }
    }
    return errorsArray.value.length === 0;
  };

  const errors = computed(() => {
    const retval: { [key: string]: string[] } = {};
    for (const key in controls.value) retval[key] = controls.value[key].errors;
    return retval;
  });

  const value = computed(() => {
    const retval: { [key: string]: unknown } = {};
    for (const key in controls.value) retval[key] = controls.value[key].value;
    return retval;
  });

  const keys = computed(() => Object.keys(controls.value));

  return {
    controls,
    errorsArray,
    validate,
    errors,
    value,
    keys,
  };
}


export function useReactiveFormController<T>(initialValue: unknown,  validators: Function[] = [] , moreOptions ?:{
  reset?: () => void;
  label?: string;
  placeholder?: string;
  type?: string;
}) {
  const value = ref(initialValue);
  const errors = ref<string[]>([]);
  const options = ref(moreOptions);
  const reset = () => {
    errors.value = [];
    value.value = null;
  };

  const validate = () => {
    errors.value = [];
    if (!validators || validators.length === 0) return true;
    validators.forEach((validator) => {
      const error = validator(value.value);
      if (error) {
        errors.value.push(error);
      }
    });
    console.log(errors.value);
    return errors.value.length === 0;
  };

  return {
    value,
    errors,
    options,
    reset,
    validate,
  };
}



export class Validators {
  static required(value: unknown) {
    if (!value) return "This field is required";
  }
  static minLength(length: number) {
    return (value: string) => {
      if (value.length < length)
        return `This field must be at least ${length} characters long`;
    };
  }
  static maxLength(length: number) {
    return (value: string) => {
      if (value.length > length)
        return `This field must be at most ${length} characters long`;
    };
  }
  static email(value: string) {
    // regex from https://emailregex.com/
    return value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ? null
      : "Invalid email address";
  }
}