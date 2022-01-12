<template>
  <q-page padding>
    <div class="q-gutter-md row">
      <div class="q-gutter-md">
        <div class="monthpicker">
          <div class="monthpicker-header">
            <q-btn
              dense
              flat
              icon="chevron_left"
              round
              @click="changeYear(false)"
            ></q-btn>
            {{ currentDate.getFullYear() }}
            <q-btn
              dense
              flat
              icon="chevron_right"
              round
              @click="changeYear(true)"
            ></q-btn>
          </div>
          <div class="monthpicker-months">
            <q-btn
              :key="month.getTime()"
              v-for="month in displayedMonths"
              :label="
                month.toLocaleDateString('de-DE', {
                  month: 'short',
                })
              "
              no-caps
              no-outline
              no-ripple
              rounded
            ></q-btn>
          </div>
        </div>
      </div>

      <div class="q-gutter-md col row">
        <div v-for="day in allDaysOfMonth" :key="day.getTime()">
          <div class="flex-break q-py-md" v-if="day.getDay() === 0">
            {{
              day.toLocaleDateString('de-DE', {
                weekday: 'short',
                day: '2-digit',
              })
            }}
          </div>
          <div v-else>
            {{
              day.toLocaleDateString('de-DE', {
                weekday: 'short',
                day: '2-digit',
              })
            }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect, watch, computed } from 'vue';
import {
  getMonday,
  getSunday,
  getWeek,
  getAllDaysOfMonth,
} from 'src/services/date-utils';

export default defineComponent({
  name: 'Timekeeping',
  setup() {
    const currentDate = ref(new Date());
    const currentDateAsString = ref(currentDate.value.toDateString());
    const monday = getMonday(currentDate.value);
    const sunday = getSunday(currentDate.value);
    const week = getWeek(monday, sunday);
    const currentYear = currentDate.value.getFullYear();

    //
    // const selectedMonth = ref(currentDate.value.getMonth());

    console.log(week);
    // const currentWeek = ref(new Date().get)

    // watch(
    //   currentDateAsString,
    //   (currentDateAsString, prevCurrentDateAsString) => {
    //     console.log(currentDateAsString);
    //   }
    // );

    const displayedMonths = computed(() => {
      const months: Date[] = [];

      for (let i = 0; i < 12; i++) {
        months.push(new Date(currentDate.value.getFullYear(), i));
      }

      return months;
    });

    const changeYear = (up: boolean) => {
      if (up) {
        const tempDate = new Date(currentDate.value);
        tempDate.setMonth(tempDate.getMonth() + 12);
        currentDate.value = tempDate;
      } else {
        const tempDate = new Date(currentDate.value);
        tempDate.setMonth(tempDate.getMonth() - 12);
        currentDate.value = tempDate;
      }
    };

    const allDaysOfMonth = getAllDaysOfMonth(currentDate.value);

    return {
      displayedMonths,
      changeYear,
      currentDate,
      allDaysOfMonth,
    };
  },
});
</script>
<style lang="scss">
.flex-break {
  flex: 1 0 100% !important;
}

.monthpicker {
  width: 250px;
}

.monthpicker-current {
  font-weight: bold;
}

.monthpicker-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.monthpicker-months {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.monthpicker-months .q-btn {
  box-shadow: none;
  margin: 5px 0;
  width: 30%;
}
</style>
