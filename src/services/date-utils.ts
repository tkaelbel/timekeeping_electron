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
}

const getLastDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

const getAllDaysOfMonth = (date: Date) => {
    const tempDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const allDays: Date[] = [];
    while(date.getMonth() === tempDate.getMonth()){
        allDays.push(new Date(tempDate));
        tempDate.setDate(tempDate.getDate() + 1);
    }

    return allDays;
}

export { getMonday, getSunday, getWeek, getFirstDayOfMonth, getLastDayOfMonth, getAllDaysOfMonth };
