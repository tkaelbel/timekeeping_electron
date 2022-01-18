export interface IStore {
    weeklyWorkHours: number;
    yearlyVacationDays: number;

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