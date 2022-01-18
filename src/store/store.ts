import {
  ITimeCalulatorStore,
  IConfigurationStore,
} from './../models/store-model';
import { defineStore } from 'pinia';
import { IStore } from '../models/store-model';

export const useStore = defineStore('main', {
  state: () => ({ weeklyWorkHours: 0, yearlyVacationDays: 0 } as IStore),
});

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
