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
    days: undefined
  } as unknown as ITimekeeperStore),
});
