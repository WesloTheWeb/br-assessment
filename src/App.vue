<template>
  <h1>BR Intake Form</h1>
  <UserForm @formSubmitted="handleFormSubmit" />
  <ModalResults v-if="showModal" @closeModal="closeModalHandler" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserForm from './components/Form/UserForm.vue';
import ModalResults from './components/Modal/Modal.vue';

export default defineComponent({
  name: 'App',
  components: {
    UserForm,
    ModalResults
  },
  setup() {
    const showModal = ref(false);

    const handleFormSubmit = () => {
      showModal.value = true;
    };

    return {
      showModal,
      handleFormSubmit
    };
  },
  methods: {
    closeModalHandler() {
      this.showModal = false;
    }
  }
});
</script>
<style lang="scss">
@import './styles/main.scss';
</style>
