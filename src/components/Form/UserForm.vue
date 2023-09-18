<template>
  <form>

  </form>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserForm',
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