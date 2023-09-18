import { Store } from 'vuex';
import type { StateType } from '@/store/index';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<StateType>;
    }
}
