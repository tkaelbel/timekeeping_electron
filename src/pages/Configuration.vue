<template>
  <q-page padding>
    <div class="q-gutter-md column">
      <div class="q-gutter-md">
        <q-input
          type="text"
          filled
          v-model="store.weeklyHoursWorking"
          label="Wochenarbeitszeit (Stunden)"
          style="width: 250px; padding-bottom: 32px"
          mask="###"
        />

        <q-input
          type="text"
          filled
          v-model="store.yearlyVacationDays"
          label="Urlaubstage"
          style="width: 250px; padding-bottom: 32px"
          mask="###"
        />

        <q-input
          type="text"
          filled
          v-model="store.autoSaveTimeSeconds"
          label="Auto. Speichern (Sekunden)"
          style="width: 250px; padding-bottom: 32px"
          mask="#####"
        />

        <div>
          <q-btn
            label="Speichern"
            type="submit"
            color="primary"
            @click="onApply"
          />
        </div>
      </div>
    </div>
  </q-page>

  <popup :show="isShown" :message="text" :is-positive="isPositive"></popup>
</template>

<script lang="ts">
import { useConfigurationStore } from 'src/store/store';
import { defineComponent, ref } from 'vue';
import { showPopup } from 'src/services/utils';

import Popup from 'components/Popup.vue';

export default defineComponent({
  name: 'Configuration',
  setup() {
    const store = useConfigurationStore();

    const isShown = ref(false);
    const text = ref('Gespeichert');
    const isPositive = ref(true);

    const onApply = async () => {
      try {
        await store.saveConfiguration();
        showPopup(isShown, text, isPositive);
      } catch (error) {
        console.error('Could not write configuration.json.');
        showPopup(isShown, text, isPositive, 'Nicht gespeichert', false);
      }
    };

    return {
      store,
      onApply,
      isShown,
      text,
      isPositive,
    };
  },
  components: { Popup },
});
</script>
