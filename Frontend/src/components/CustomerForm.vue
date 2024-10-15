<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input v-model="form.name" label="Name" :rules="[val => !!val || 'Name is required']" />
    <q-input v-model="form.email" label="Email" type="email" :rules="[val => !!val || 'Email is required']" />
    <q-input v-model="form.address" label="Address" :rules="[val => !!val || 'Address is required']" />
    <q-btn type="submit" color="primary" label="Submit" />
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Customer } from 'src/services/customerService';

export default defineComponent({
  name: 'CustomerForm',
  props: {
    initialCustomer: {
      type: Object as () => Customer,
      default: () => ({ name: '', email: '', address: '' }),
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const form = ref<Customer>({ ...props.initialCustomer });

    const onSubmit = () => {
      emit('submit', form.value);
    };

    return {
      form,
      onSubmit,
    };
  },
});
</script>
