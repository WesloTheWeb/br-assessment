<template>
  <form class="user-form">
    <section>
      <div v-for="field in fields" :key="field.id">
        <!-- Name and number -->
        <label :for="field.id">{{ field.label }}</label>
        <input v-if="field.type === 'text' || field.type === 'number'" :type="field.type" :name="field.id"
          v-model="field.value" @blur="handleBlur(field)" />
        <div class="error-message" v-if="field.id === 'fullName' && !isFullNameValid && field.touched">
          Full name should be at least 3 characters long.
        </div>

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
    <ActionButton @click="submitForm" title="submit" />
  </form>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import ActionButton from '../ActionButton/ActionButton.vue';
import { FieldOption, Field, UserData } from '../../interfaces/FieldInterfaces';

export default defineComponent({
  name: 'UserForm',
  components: {
    ActionButton
  },
  data(): UserData {
    return {
      // OPTION API generate fields
      fields: [
        {
          id: 'fullName',
          label: 'Full Name',
          type: 'text',
          value: '',
          touched: false
        },
        {
          id: 'phoneNumber',
          label: 'Phone Number',
          type: 'number',
          value: 0
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
  },
  methods: {
    handleBlur(field: Field) {
      field.touched = true;
    },
    submitForm() {
      const formData: { [key: string]: any } = {};
      this.fields.forEach(field => {
        formData[field.id] = field.value;
      });
      this.$store.dispatch('updateUserInput', formData);

      this.$emit('formSubmitted');
    }
  },
  computed: {
    // Typing of our computed value, need to make sure TS understands string.
    isFullNameValid(this: UserData): boolean {
      const fullNameField = this.fields.find(el => el.id === 'fullName');
      return (typeof fullNameField?.value === 'string') && fullNameField.value.length >= 3;
    },
    isPhoneNumberValid(this: UserData): boolean {
      const phoneNumberField = this.fields.find(el => el.id === 'phoneNumber');
      return typeof phoneNumberField?.value === 'number' && /^\d+$/.test(phoneNumberField.value.toString());
    },
    isGenderValid(this: UserData) {
      const genderField = this.fields.find(el => el.id === 'gender');
      return genderField && genderField.value !== '';
    },
    descriptionCharsLeft(this: UserData): number {
      const descriptionField = this.fields.find(el => el.id === 'description');
      return (typeof descriptionField?.value === 'string') ? 500 - descriptionField.value.length : 500;
    },
    isDescriptionValid(this: UserData) {
      const descriptionField = this.fields.find(el => el.id === 'description');
      const charsLeft = (typeof descriptionField?.value === 'string') ? 500 - descriptionField.value.length : 500;
      return charsLeft >= 0;
    }
  }
});

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './UserForm.scss';
</style>