import {
  ITimeCalulatorStore,
  IConfigurationStore,
  ITimekeeperStore,
} from './../models/store-model';
import { defineStore } from 'pinia';

export const useTimeCalculatorStore = defineStore('timeCalculator', {
  state: () =>
    ({
      breakTime: '',
      endTime: '',
      startTime: '',
    } as ITimeCalulatorStore),
});

export const useConfigurationStore = defineStore('configurationStore', {
  state: () =>
    ({
      yearlyVacationDays: 30,
      weeklyHoursWorking: 39,
    } as IConfigurationStore),
});

export const useTimekeepingStore = defineStore('timekeepingStore', {
  state: () =>
    ({
      currentDate: new Date(),
      data: {},
    } as ITimekeeperStore),
  getters: {
    getOverallOvertimeHours() {
      const weeklyHours = useConfigurationStore().weeklyHoursWorking;
      const years = Object.keys(this.data);

      let overtimeHours = 0;
      let weeks: { [key: number]: number } = {};

      years.forEach((year: string) => {
        const months = this.data[year as unknown as number];
        Object.keys(months).forEach((month: string) => {
          const cws = months[month];
          Object.keys(cws).forEach((cw: string) => {
            const days = cws[cw as unknown as number];
            Object.keys(days).forEach((day: string) => {
              const dayObj = days[day];

              overtimeHours = overtimeHours + dayObj.hours;
              if (dayObj.hours > 0) {
                weeks[cw as unknown as number] = 1;
              }
            });
          });
        });
      });

      return overtimeHours;
    },
  },
});
