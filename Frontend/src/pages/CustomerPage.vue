<template>
  <q-page padding>
    <h1>Customers</h1>
    <CustomerForm @submit="createCustomer" />
    <q-table
      :rows="customers"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round color="primary" icon="edit" @click="editCustomer(props.row)" />
          <q-btn flat round color="negative" icon="delete" @click="deleteCustomer(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Customer, customerService } from 'src/services/customerService';
import CustomerForm from 'src/components/CustomerForm.vue';

export default defineComponent({
  name: 'CustomerPage',
  components: { CustomerForm },
  setup() {
    const customers = ref<Customer[]>([]);
    const loading = ref(false);

    const columns = [
      { name: 'id', label: 'ID', field: 'id' },
      { name: 'name', label: 'Name', field: 'name' },
      { name: 'email', label: 'Email', field: 'email' },
      { name: 'address', label: 'Address', field: 'address' },
      { name: 'actions', label: 'Actions', field: 'actions' },
    ];

    const fetchCustomers = async () => {
      loading.value = true;
      try {
        const response = await customerService.getAll();
        customers.value = response.data;
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        loading.value = false;
      }
    };

    const createCustomer = async (customer: Customer) => {
      try {
        await customerService.create(customer);
        await fetchCustomers();
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    };

    const editCustomer = async (customer: Customer) => {
      try {
        if (customer.id) {
          await customerService.update(customer.id, customer);
          await fetchCustomers();
        }
      } catch (error) {
        console.error('Error updating customer:', error);
      }
    };

    const deleteCustomer = async (id: number) => {
      try {
        await customerService.delete(id);
        await fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    };

    onMounted(fetchCustomers);

    return {
      customers,
      loading,
      columns,
      createCustomer,
      editCustomer,
      deleteCustomer,
    };
  },
});
</script>
