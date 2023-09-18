<template>
  <form class="user-form" @submit.prevent="submitForm">
    <section>
      <div v-for="field in fields" :key="field.id">
        <!-- Name and number -->
        <label :for="field.id">{{ field.label }}</label>
        <input v-if="field.type === 'text' || field.type === 'number'" :type="field.type" :name="field.id"
          v-model="field.value" @blur="handleBlur(field)" />
        <div class="error-message" v-if="field.id === 'fullName' && !isFullNameValid && field.touched">
          Full name should be at least 3 characters long.
        </div>
        <div class="error-message" v-if="field.id === 'phoneNumber' && !isPhoneNumberValid && field.touched">
          Please enter a valid phone number.
        </div>
        
        <!-- references -->
        <div v-else-if="field.type === 'checkbox'" class="reference-group" @blur="handleBlur(field)">
          <div v-for="option in field.options" :key="option.value">
            <label :for="option.value">{{ option.label }}</label>
            <input type="checkbox" :id="option.value" :value="option.value" v-model="field.value"
              @blur="handleBlur(field)" />
          </div>
        </div>
        <div class="error-message" v-if="field.id === 'reference' && !isReferenceSelected && field.touched">
          At least one reference must be selected.
        </div>

        <!-- interest select -->
        <select v-else-if="field.type === 'select'" :name="field.id" v-model="field.value" @blur="handleBlur(field)">
          <option v-for="option in field.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <div class="error-message" v-if="field.id === 'interests' && !isInterestValid && field.touched">
          Please select an interest.
        </div>

        <!-- textbox -->
        <textarea v-else-if="field.type === 'textarea'" :name="field.id" v-model="field.value"
          :maxlength="500"></textarea>
        <div v-if="field.id === 'description'" class="char-count">{{ descriptionCharsLeft }} characters left</div>
      </div>
    </section>
    <ActionButton type="submit" title="submit" :isDisabled="!isFormValid" />
  </form>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import ActionButton from '../ActionButton/ActionButton.vue';
import { Field, UserData } from '../../interfaces/FieldInterfaces';

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
          value: '',
          touched: false
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
          id: 'interests',
          label: 'Interests',
          type: 'select',
          value: '',
          options: [
            { label: 'Snowboarding', value: 'Snowboarding' },
            { label: 'Coding', value: 'Coding' },
            { label: 'Reading', value: 'Reading' },
            { label: 'Music', value: 'Music' },
            { label: 'Hiking', value: 'Hiking' },
            { label: 'Traveling', value: 'Traveling' },
            { label: 'Photography', value: 'Photography' },
            { label: 'Painting', value: 'Painting' },
            { label: 'Gaming', value: 'Gaming' },
            { label: 'Cooking', value: 'Cooking' },
            { label: 'Cycling', value: 'Cycling' },
            { label: 'Running', value: 'Running' },
            { label: 'Swimming', value: 'Swimming' },
            { label: 'Other', value: 'Other' }
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
      console.log('Did I get clicked?')
      const formData: { [key: string]: any } = {};
      this.fields.forEach(field => {
        formData[field.id] = field.value;
      });
      this.$store.dispatch('updateUserInput', formData);

      this.$emit('formSubmitted');
    }
  },
  computed: {
    isFullNameValid(this: UserData): boolean {
      const fullNameField = this.fields.find(el => el.id === 'fullName');
      return (fullNameField?.value && typeof fullNameField.value === 'string' && fullNameField.value.length >= 3) || false;
    },
    isPhoneNumberValid(this: UserData): boolean {
      const phoneNumberField = this.fields.find(el => el.id === 'phoneNumber');
      return (phoneNumberField?.value && /^\d+$/.test(phoneNumberField.value.toString())) || false;
    },
    isReferenceSelected(this: UserData): boolean {
      const referenceField = this.fields.find(el => el.id === 'reference');
      return (referenceField?.value && Array.isArray(referenceField.value) && referenceField.value.length > 0) || false;
    },
    isInterestValid(this: UserData): boolean {
      const interestField = this.fields.find(el => el.id === 'interests');
      return (interestField?.value && interestField.value !== '') || false;
    },
    descriptionCharsLeft(this: UserData): number {
      const descriptionField = this.fields.find(el => el.id === 'description');
      return (descriptionField?.value && typeof descriptionField.value === 'string') ? 500 - descriptionField.value.length : 500;
    },
    isDescriptionValid(this: UserData): boolean {
      const descriptionField = this.fields.find(el => el.id === 'description');
      return (descriptionField?.value && typeof descriptionField.value === 'string' && (descriptionField.value as string).length > 0) || false;
    },
    isFormValid(this: UserData): boolean {
      return (this as any).isFullNameValid &&
        (this as any).isPhoneNumberValid &&
        (this as any).isReferenceSelected &&
        (this as any).isInterestValid &&
        (this as any).isDescriptionValid;
    }
  }
});

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './UserForm.scss';
</style>