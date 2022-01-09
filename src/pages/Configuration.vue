<template>
  <q-page padding>
    <div class="q-gutter-md column">
      <div class="q-gutter-md">
        <q-input
          type="text"
          filled
          v-model="weeklyHoursWorking"
          label="Weekly working hours"
          style="width: 250px; padding-bottom: 32px"
          mask="###"
        />

        <q-input
          type="text"
          filled
          v-model="yearlyVacationDays"
          label="Yearly vacation days"
          style="width: 250px; padding-bottom: 32px"
          mask="###"
        />

        <div>
          <q-btn
            label="Apply configuration"
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Configuration',
  setup() {
    const weeklyHoursWorking = ref<number>();
    const yearlyVacationDays = ref<number>();

    const onApply = () => {
      console.log('hello');
    };

    return {
      weeklyHoursWorking,
      yearlyVacationDays,
      onApply,
    };
  },
});
</script>
