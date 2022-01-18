import { Ref, ComputedRef } from 'vue';

export interface IWeekModel {
  monday: IDayModel | undefined;
  tuesday: IDayModel | undefined;
  wednesday: IDayModel | undefined;
  thursday: IDayModel | undefined;
  friday: IDayModel | undefined;
  saturday: IDayModel | undefined;
  sunday: IDayModel | undefined;
  [key: string]: IDayModel | undefined;
}

export interface IDayModel {
  day: Date;
  hours: Ref<number>;
}

export interface IInputModel {
  [key: number]: {
    [key: string]: IDayModel;
  };
}
