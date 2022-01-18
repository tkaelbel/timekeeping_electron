import { IWeekModel } from './../models/month-model';
import { ref } from 'vue';
const getCurrentYear = () => {
  return new Date().getFullYear();
};

const getWeek = (monday: Date, sunday: Date): Array<Date> => {
  const week: Date[] = [];
  week.push(new Date(monday));
  for (let i = 0; i < 6; i++) {
    week.push(new Date(monday.setDate(monday.getDate() + 1)));
  }
  return week;
};

// const getMonth = () => {};

const getMonday = (date: Date) => {
  const day = date.getDay();
  const monday = date.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(date.setDate(monday));
};

const getSunday = (monday: Date) => {
  return new Date(monday.setDate(monday.getDate() + 6));
};

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getLastDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const getAllDaysOfMonth = (date: Date) => {
  const tempDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const allDays: Map<number, IWeekModel> = new Map();

  while (date.getMonth() === tempDate.getMonth()) {
    const weekNumber = getWeekNumber(tempDate);

    if (!allDays.get(weekNumber)) {
      allDays.set(weekNumber, {
        monday: undefined,
        tuesday: undefined,
        wednesday: undefined,
        thursday: undefined,
        friday: undefined,
        saturday: undefined,
        sunday: undefined,
      });
    }

    const week = allDays.get(weekNumber);
    const dayName = tempDate
      .toLocaleDateString('en-EN', { weekday: 'long' })
      .toLowerCase();
    if (week) {
      week[dayName] = {
        day: new Date(tempDate),
        hours: ref(0),
      };
    }

    tempDate.setDate(tempDate.getDate() + 1);
  }

  return allDays;
};

const getWeekNumber = (date: Date) => {
  const tdt = new Date(date.valueOf());
  const dayn = (date.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  const firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tdt.valueOf()) / 604800000);
};

export {
  getMonday,
  getSunday,
  getWeek,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getAllDaysOfMonth,
};
