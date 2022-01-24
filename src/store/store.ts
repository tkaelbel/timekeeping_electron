import {
  ITimeCalulatorStore,
  IConfigurationStore,
  ITimekeeperStore,
} from './../models/store-model';
import { defineStore } from 'pinia';
import { IDayModel } from 'src/models/month-model';

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
    calculateOverallOvertime() {
      const overallData = this.data;

      let overallOvertime = 0;

      const keyYears = Object.keys(overallData);
      keyYears.forEach((year: string) => {
        const months = overallData[year as unknown as number];
        const keyMonths = Object.keys(months);
        keyMonths.forEach((month: string) => {
          const cws = months[month];
          const keyCws = Object.keys(cws);
          keyCws.forEach((cw: string) => {
            const cwData = cws[cw as unknown as number];
            overallOvertime = overallOvertime + calculateWeekOvertime(cwData);
          });
        });
      });

      return overallOvertime;
    },
  },
});

const calculateWeekOvertime = (cw: { [key: string]: IDayModel }) => {
  let weekSum = 0;

  const dayKeys = Object.keys(cw);
  dayKeys.forEach((day: string) => {
    weekSum += cw[day].hours
      ? parseFloat(cw[day].hours as unknown as string)
      : 0;
  });

  return weekSum === 0
    ? 0
    : weekSum - useConfigurationStore().weeklyHoursWorking;
};
