<template>
  <q-page padding>
    <div class="q-gutter-md row">
      <q-input
        type="text"
        filled
        v-model="store.startTime"
        label="Arbeitsstart"
        mask="##:##"
      ></q-input>
      <q-input
        type="text"
        filled
        v-model="store.breakTime"
        label="Pause"
        mask="##:##"
      ></q-input>
      <q-input
        type="text"
        filled
        v-model="store.endTime"
        label="Arbeitsende"
        mask="##:##"
      ></q-input>
      <div class="q-pt-md">
        <span class="q-pr-sm text-h6">{{ calculateTime ? calculateTime : 0}} </span>
        <span>Arbeitszeit (in Stunden)</span>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { subHours, subMinutes } from 'date-fns';
import { useTimeCalculatorStore } from 'src/store/store';

export default defineComponent({
  name: 'TimeCalculator',
  setup() {

    const store = useTimeCalculatorStore();

    const startTime = ref<string>();
    const breakTime = ref<string>();
    const endTime = ref<string>();

    const getDateFromInput = (time: string): Date => {
      const date = new Date();
      const splittedTime = time.split(':');
      if (splittedTime && splittedTime.length > 1) {
        date.setHours(splittedTime[0] as unknown as number);
        date.setMinutes(splittedTime[1] as unknown as number);
      }

      return date;
    };

    const calculateTime = computed(() => {
      if (store.startTime && store.breakTime && store.startTime) {
        const dateEndTime = getDateFromInput(store.endTime);
        const dateBreakTime = getDateFromInput(store.breakTime);
        const dateStartTime = getDateFromInput(store.startTime);

        let temp = subMinutes(dateEndTime, dateBreakTime.getMinutes());
        temp = subMinutes(temp, dateStartTime.getMinutes());
        temp = subHours(temp, dateBreakTime.getHours());
        temp = subHours(temp, dateStartTime.getHours());

        const hour = temp.getHours();
        const minutesInHours = temp.getMinutes() / 60;
        return (Math.round((hour + minutesInHours) * 100) / 100).toLocaleString('de-DE');
      }
      return undefined;
    });

    return {
      store,
      calculateTime,
      startTime,
      breakTime,
      endTime,
    };
  },
});
</script>
<style lang="scss">

</style>
