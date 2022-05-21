import {
  ITimeCalulatorStore,
  IConfigurationStore,
  ITimekeeperStore,
} from './../models/store-model';
import { defineStore } from 'pinia';
import { IData, IDayModel } from 'src/models/month-model';
import { CustomWindow } from 'src/models/custom-window';

declare const window: CustomWindow;

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
      isAutoSave: false,
      autoSaveTimeSeconds: 15,
    } as IConfigurationStore),
  getters: {
    convertAutoSaveTimeToSeconds(): number {
      return this.autoSaveTimeSeconds * 1000;
    },
  },
  actions: {
    async saveConfiguration() {
      try {
        const {
          yearlyVacationDays,
          weeklyHoursWorking,
          isAutoSave,
          autoSaveTimeSeconds,
        } = this;
        const output = JSON.stringify({
          weeklyHoursWorking,
          yearlyVacationDays,
          isAutoSave,
          autoSaveTimeSeconds,
        });
        await window?.fileHandler.writeFile('./configuration.json', output);
        console.debug('Wrote configuration.json successfully');
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
});

export const useTimekeepingStore = defineStore('timekeepingStore', {
  state: () =>
    ({
      currentDate: new Date(),
      data: {},
    } as ITimekeeperStore),
  actions: {
    async saveData() {
      const { data } = this;
      try {
        await window?.fileHandler.writeFile(
          './data.json',
          JSON.stringify(data)
        );
        console.log('Successfully saved data');
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
  getters: {
    calculateOverallOvertime() {
      const { calculatedWeekOvertime } = calculateAdditionalInfos(this.data);
      if (calculatedWeekOvertime === 0) return 0;

      return calculatedWeekOvertime % 1 === 0
        ? calculatedWeekOvertime
        : Number(
            (Math.round(calculatedWeekOvertime * 100) / 100).toFixed(2)
          ).toLocaleString('de-DE');
    },
    calculateRestVactionDays() {
      const { calculatedRestVacation } = calculateAdditionalInfos(this.data);
      if (calculatedRestVacation === 0) return 0;

      const dayHoursMustWork = useConfigurationStore().weeklyHoursWorking / 5;
      const daysRest =
        useConfigurationStore().yearlyVacationDays -
        calculatedRestVacation / dayHoursMustWork;

      return daysRest % 1 === 0
        ? daysRest
        : Number((Math.round(daysRest * 100) / 100).toFixed(2)).toLocaleString(
            'de-DE'
          );
    },
  },
});

const calculateAdditionalInfos = (data: IData) => {
  let calculatedWeekOvertime = 0;
  let calculatedRestVacation = 0;

  const keyYears = Object.keys(data);
  keyYears.forEach((year: string) => {
    const months = data[year as unknown as number];
    const keyMonths = Object.keys(months);
    keyMonths.forEach((month: string) => {
      const cws = months[month];
      const keyCws = Object.keys(cws);
      keyCws.forEach((cw: string) => {
        const cwData = cws[cw as unknown as number];
        const calculatedWeek = calculateWeek(cwData);
        calculatedWeekOvertime += calculatedWeek.weekSumOvertime;
        calculatedRestVacation += calculatedWeek.weekSumVacation;
      });
    });
  });

  return { calculatedWeekOvertime, calculatedRestVacation };
};

const calculateWeek = (cw: { [key: string]: IDayModel }) => {
  let weekSumOvertime = 0;
  let weekSumVacation = 0;

  const dayKeys = Object.keys(cw);
  dayKeys.forEach((day: string) => {
    if (cw[day].vacation === true) {
      weekSumVacation += cw[day].hours
        ? parseFloat(cw[day].hours as unknown as string)
        : 0;
    }

    weekSumOvertime += cw[day].hours
      ? parseFloat(cw[day].hours as unknown as string)
      : 0;
  });

  const daysWithoutWeekend = dayKeys.filter((day) => day !== 'sunday' && day !== 'saturday');

  if (daysWithoutWeekend.length < 5) {
    return {
      weekSumOvertime:
        weekSumOvertime === 0
          ? 0
          : weekSumOvertime -
            (useConfigurationStore().weeklyHoursWorking / 5) * daysWithoutWeekend.length,
      weekSumVacation,
    };
  }

  return {
    weekSumOvertime:
      weekSumOvertime === 0
        ? 0
        : weekSumOvertime - useConfigurationStore().weeklyHoursWorking,
    weekSumVacation,
  };
};
