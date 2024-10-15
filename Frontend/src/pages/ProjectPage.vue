<template>
  <q-page padding>
    <h1>Projects</h1>
    <ProjectForm @submit="createProject" />
    <q-table
      :rows="projects"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round color="primary" icon="edit" @click="editProject(props.row)" />
          <q-btn flat round color="negative" icon="delete" @click="deleteProject(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Project, projectService } from 'src/services/projectService';
import ProjectForm from 'src/components/ProjectForm.vue';

export default defineComponent({
  name: 'ProjectPage',
  components: { ProjectForm },
  setup() {
    const projects = ref<Project[]>([]);
    const loading = ref(false);

    const columns = [
      { name: 'id', label: 'ID', field: 'id' },
      { name: 'name', label: 'Name', field: 'name' },
      { name: 'description', label: 'Description', field: 'description' },
      { name: 'customerId', label: 'Customer ID', field: 'customerId' },
      { name: 'actions', label: 'Actions', field: 'actions' },
    ];

    const fetchProjects = async () => {
      loading.value = true;
      try {
        const response = await projectService.getAll();
        projects.value = response.data;
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        loading.value = false;
      }
    };

    const createProject = async (project: Project) => {
      try {
        await projectService.create(project);
        await fetchProjects();
      } catch (error) {
        console.error('Error creating project:', error);
      }
    };

    const editProject = async (project: Project) => {
      try {
        if (project.id) {
          await projectService.update(project.id, project);
          await fetchProjects();
        }
      } catch (error) {
        console.error('Error updating project:', error);
      }
    };

    const deleteProject = async (id: number) => {
      try {
        await projectService.delete(id);
        await fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    };

    onMounted(fetchProjects);

    return {
      projects,
      loading,
      columns,
      createProject,
      editProject,
      deleteProject,
    };
  },
});
</script>
