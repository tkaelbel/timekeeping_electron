import { IData } from './month-model';

export interface ITimekeeperStore {
  currentDate: Date;
  data: IData;
}

export interface ITimeCalulatorStore {
  startTime: string;
  breakTime: string;
  endTime: string;
}

export interface IConfigurationStore {
  weeklyHoursWorking: number;
  yearlyVacationDays: number;
}
