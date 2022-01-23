import { IWeekModel, IOutputModel } from './month-model';

export interface ITimekeeperStore {
  currentDate: Date;
  days: IOutputModel;
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
