<template>
  <form class="user-form">
    <section>
      <div v-for="field in fields" :key="field.id">
        <!-- Name and number -->
        <label :for="field.id">{{ field.label }}</label>
        <input v-if="field.type === 'text' || field.type === 'number'" :type="field.type" :name="field.id"
          v-model="field.value" />
        <!-- references -->
        <div v-else-if="field.type === 'checkbox'" class="reference-group">
          <div v-for="option in field.options" :key="option.value">
            <label :for="option.value">{{ option.label }}</label>
            <input type="checkbox" :id="option.value" :value="option.value" v-model="field.value" />
          </div>
        </div>
        <!-- gender select -->
        <select v-else-if="field.type === 'select'" :name="field.id" v-model="field.value">
          <option v-for="option in field.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <!-- textbox -->
        <textarea v-else-if="field.type === 'textarea'" :name="field.id" v-model="field.value"></textarea>
      </div>
    </section>
    <ActionButton title="submit" />
  </form>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import ActionButton from '../ActionButton/ActionButton.vue';

export default defineComponent({
  name: 'UserForm',
  components: {
    ActionButton
  },
  data() {
    return {
      // OPTION API generate fields
      // TODO: Add validation later
      fields: [
        {
          id: 'fullName',
          label: 'Full Name',
          type: 'text',
          value: ''
        },
        {
          id: 'phoneNumber',
          label: 'Phone Number',
          type: 'number',
          value: ''
        },
        {
          id: 'reference',
          label: 'Reference',
          type: 'checkbox',
          value: [],
          options: [
            { label: 'Online Ad', value: 'Online Ad' },
            { label: 'Recommendation', value: 'Recommendation' },
            { label: 'Referral', value: 'Referral' },
            { label: 'Other', value: 'Other' }
          ]
        },
        {
          id: 'gender',
          label: 'Gender',
          type: 'select',
          value: 'Male',
          options: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Other', value: 'Other' },
          ]
        },
        {
          id: 'description',
          label: 'Description',
          type: 'textarea',
          value: ''
        }
      ]
    }
  }
});

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './UserForm.scss';
</style>