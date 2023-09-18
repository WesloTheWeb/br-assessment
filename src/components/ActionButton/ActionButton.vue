<template>
    <button :disabled="isDisabled" :class="{ 'buttonProps': !isDisabled, 'disabled': isDisabled }">
        {{ title }}
    </button>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ActionButton',
    props: {
        title: {
            type: String,
            required: true
        },
        isDisabled: {
            type: Boolean,
            required: true
        }
    }
});
</script>  

<style>
@import './ActionButton.scss';
</style>