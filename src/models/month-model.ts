import { Ref } from 'vue';

export interface IWeekModel {
  monday: IDayModelRef | undefined;
  tuesday: IDayModelRef | undefined;
  wednesday: IDayModelRef | undefined;
  thursday: IDayModelRef | undefined;
  friday: IDayModelRef | undefined;
  saturday: IDayModelRef | undefined;
  sunday: IDayModelRef | undefined;
  [key: string]: IDayModelRef | undefined;
}

export interface IDayModelRef {
  day: Date;
  hours: Ref<number>;
}

export interface IDayModel {
  day: Date;
  hours: number;
}

export interface IOutputModel {
  [key: number]: {
    [key: string]: IDayModel;
  };
}

export interface IInputModel {
  [key: number]: {
    [key: string]: IDayModelRef;
  };
}

export interface IData {
  year: number;
  months: IOutputMonth;
}

interface IOutputMonth {
  [key: string]: IOutputModel;
}
