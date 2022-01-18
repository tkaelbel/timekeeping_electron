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

        <div class="q-gutter-md column">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">Information</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Gesamtüberstunden:
            </q-card-section>

            <q-separator inset />

            <q-card-section> Urlaubstage Rest: </q-card-section>
          </q-card>
        </div>
        <div class="q-gutter-md column">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">Konfiguration</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Wochenarbeiszeit:
            </q-card-section>

            <q-separator inset />

            <q-card-section> Urlaubstage: </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="q-gutter-md col row">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-center">KW</th>
              <th class="text-center">Montag</th>
              <th class="text-center">Dienstag</th>
              <th class="text-center">Mittwoch</th>
              <th class="text-center">Donnerstag</th>
              <th class="text-center">Freitag</th>
              <th class="text-center">Samstag</th>
              <th class="text-center">Sonntags</th>
              <th class="text-center">Woche</th>
              <th class="text-center">Überstunden</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="weekday in allDaysOfMonth.keys()" :key="weekday">
              <td class="text-left">{{ weekday }}</td>
              <td class="text-center">
                <div v-if="allDaysOfMonth.get(weekday)?.monday?.day">
                  {{
                    allDaysOfMonth
                      .get(weekday)
                      ?.monday?.day.toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                      })
                  }}
                  <q-input
                    class="day-input"
                    type="number"
                    filled
                    v-model="inputValues[weekday].monday.hours"
                  ></q-input>
                </div>
              </td>
              <td class="text-center">
                <div v-if="allDaysOfMonth.get(weekday)?.tuesday?.day">
                  {{
                    allDaysOfMonth
                      .get(weekday)
                      ?.tuesday?.day.toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                      })
                  }}
                  <q-input
                    class="day-input"
                    type="number"
                    filled
                    v-model="inputValues[weekday].tuesday.hours"
                  ></q-input>
                </div>
              </td>
              <td class="text-center">
                <div v-if="allDaysOfMonth.get(weekday)?.wednesday?.day">
                  {{
                    allDaysOfMonth
                      .get(weekday)
                      ?.wednesday?.day.toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                      })
                  }}
                  <q-input
                    class="day-input"
                    type="number"
                    filled
                    v-model="inputValues[weekday].wednesday.hours"
                  ></q-input>
                </div>
              </td>
              <td class="text-center">
                <div v-if="allDaysOfMonth.get(weekday)?.thursday?.day">
                  {{
                    allDaysOfMonth
                      .get(weekday)
                      ?.thursday?.day.toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                      })
                  }}
                  <q-input
                    class="day-input"
                    type="number"
                    filled
                    v-model="inputValues[weekday].thursday.hours"
                  ></q-input>
                </div>
              </td>
              <td class="text-center">
                <div v-if="allDaysOfMonth.get(weekday)?.friday?.day">
                  {{
                    allDaysOfMonth
                      .get(weekday)
                      ?.friday?.day.toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                      })
                  }}
                  <q-input
                    class="day-input"
                    type="number"
                    filled
                    v-model="inputValues[weekday].friday.hours"
                  ></q-input>
                </div>
              </td>
              <td class="text-center">
                <div v-if="allDaysOfMonth.get(weekday)?.saturday?.day">
                  {{
                    allDaysOfMonth
                      .get(weekday)
                      ?.saturday?.day.toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                      })
                  }}
                  <q-input
                    class="day-input"
                    type="number"
                    filled
                    v-model="inputValues[weekday].saturday.hours"
                  ></q-input>
                </div>
              </td>
              <td class="text-center">
                <div v-if="allDaysOfMonth.get(weekday)?.sunday?.day">
                  {{
                    allDaysOfMonth
                      .get(weekday)
                      ?.sunday?.day.toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                      })
                  }}
                  <q-input
                    class="day-input"
                    type="number"
                    filled
                    v-model="inputValues[weekday].sunday.hours"
                  ></q-input>
                </div>
              </td>

              <td class="text-center">
                <div>{{ weekSums(weekday).toLocaleString('de-DE') }}</div>
              </td>
              <td class="text-center"></td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  watchEffect,
  watch,
  computed,
  reactive,
} from 'vue';
import {
  getMonday,
  getSunday,
  getWeek,
  getAllDaysOfMonth,
} from 'src/services/date-utils';
import { IInputModel } from 'src/models/month-model';

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

    const allDaysOfMonth = ref(getAllDaysOfMonth(currentDate.value));

    const inputValues = ref<IInputModel>({});
    allDaysOfMonth.value.forEach((value, index) => {
      const days = Object.keys(value);
      days.forEach((day) => {
        const weekDay = value[day];

        if (weekDay) {
          if (!inputValues.value[index]) {
            inputValues.value[index] = {
              [day]: { day: weekDay.day, hours: 0 },
            };
          } else {
            inputValues.value[index][day] = {
              day: weekDay.day,
              hours: 0,
            };
          }
        }
      });
    });

    const weekSums = (index: number) => {
      let weekSum = 0;

      const wholeWeek = inputValues.value[index];
      const keys = Object.keys(wholeWeek);
      keys.forEach((key) => {
        weekSum += wholeWeek[key].hours
          ? parseFloat(wholeWeek[key].hours as unknown as string)
          : 0;
      });

      return weekSum;
    };

    return {
      weekSums,
      inputValues,
      displayedMonths,
      changeYear,
      currentDate,
      allDaysOfMonth,
    };
  },
});
</script>
<style lang="scss">
.day-input {
  width: 80px;
}

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
