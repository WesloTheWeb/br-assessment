<template>
  <h1>BR Intake Form</h1>
  <UserForm />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserForm from './components/Form/UserForm.vue';

export default defineComponent({
  name: 'App',
  components: {
    UserForm
  }
});
</script>
<style lang="scss">
@import './styles/main.scss';
</style>
