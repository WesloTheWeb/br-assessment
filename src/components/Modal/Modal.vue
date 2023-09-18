<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'ModalResults',
    setup() {
        const store = useStore();
        const userInput = computed(() => store.getters.getUserInput);

        return {
            userInput
        };
    }
});
</script>
