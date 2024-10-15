<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <h1 class="text-h3">Welcome to LogicSoft CRUD App</h1>
      <p class="text-subtitle1">Manage your customers and projects with ease</p>
      <div class="q-mt-md">
        <q-btn to="/customers" color="primary" label="Manage Customers" class="q-mr-sm" />
        <q-btn to="/projects" color="secondary" label="Manage Projects" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage'
});
</script>
