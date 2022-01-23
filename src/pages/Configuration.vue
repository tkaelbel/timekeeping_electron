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
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/

import { CustomWindow } from 'src/models/custom-window';
import { useConfigurationStore } from 'src/store/store';
import { defineComponent } from 'vue';

declare const window: CustomWindow;

export default defineComponent({
  name: 'Configuration',
  setup() {
    const store = useConfigurationStore();

    const onApply = async () => {
      try {
        const { yearlyVacationDays, weeklyHoursWorking } = store;
        const output = JSON.stringify({
          weeklyHoursWorking,
          yearlyVacationDays,
        });

        await window?.fileHandler.writeFile('./configuration.json', output);

        console.debug('Wrote configuration.json successfully');
      } catch (error) {
        console.error('Could not write configuration.json.');
      }
    };

    // TODO: automatic save

    // setTimeout(() async => {
    //   await onApply();
    // }, 5000);

    return {
      store,
      onApply,
    };
  },
});
</script>
