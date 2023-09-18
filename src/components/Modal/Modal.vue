<template>
  <div class="modal">
    <h2>User Submitted Data</h2>

    <div v-if="userInput">
      <div>
        <strong>Full Name:</strong> {{ userInput.fullName }}
      </div>

      <div>
        <strong>Phone Number:</strong> {{ userInput.phoneNumber }}
      </div>

      <div>
        <strong>Interests:</strong> {{ userInput.interests }}
      </div>

      <div>
        <strong>Reference:</strong>
        <ul>
          <li v-for="ref in userInput.reference" :key="ref">{{ ref }}</li>
        </ul>
      </div>
      <div>
        <strong>Description:</strong> {{ userInput.description }}
      </div>
    </div>
    <ActionButton title="Close" @click="closeModal" />
  </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import ActionButton from '../ActionButton/ActionButton.vue';

export default defineComponent({
  name: 'ModalResults',
  setup() {
    const store = useStore();
    const userInput = computed(() => store.getters.getUserInput);
    return {
      userInput
    };
  },
  components: { ActionButton },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    }
  }
});
</script>

<style>
@import './Modal.scss';
</style>
