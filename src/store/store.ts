import { defineStore } from 'pinia';
import { IStore } from '../models/store-model';

export const useStore = defineStore('main', {
  state: () => ({ weeklyWorkHours: 0, yearlyVacationDays: 0 } as IStore),
});
