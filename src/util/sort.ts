import { todoType } from "../type";

//compare by date asc
export const compareByDateAsc = (a: todoType, b: todoType) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
};

//compare by date desc
export const compareByDateDesc = (a: todoType, b: todoType) => {
  return compareByDateAsc(b, a);
};

//create priority order map
const priorityOrder: { [key: string]: number } = {
  rendah: 1,
  sedang: 2,
  tinggi: 3,
};

//compare by priority asc
export const compareByPriorityAsc = (a: todoType, b: todoType) => {
  const priorityA = priorityOrder[`${a.priority}`];
  const priorityB = priorityOrder[`${b.priority}`];

  if (priorityA < priorityB) {
    return -1;
  } else if (priorityA > priorityB) {
    return 1;
  } else {
    return 0;
  }
};

//compare by priority desc
export const compareByPriorityDesc = (a: todoType, b: todoType) => {
  return compareByPriorityAsc(b, a);
};

//compare by completed asc
export const compareByCompletedAsc = (a: todoType, b: todoType) => {
  if (a.completed && !b.completed) {
    return 1;
  } else if (!a.completed && b.completed) {
    return -1;
  } else {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }
};

//compare by completed desc
export const compareByCompletedDesc = (a: todoType, b: todoType) => {
  return compareByCompletedAsc(b, a);
};

//compare by alphabet asc
export const compareByAlphabetAsc = (a: todoType, b: todoType, key: string) => {
  const valueA = a[key as keyof todoType];
  const valueB = b[key as keyof todoType];

  if (typeof valueA === "string" && typeof valueB === "string") {
    return valueA.localeCompare(valueB, undefined, {
      sensitivity: "base",
    });
  }

  return 0;
};

//compare by alphabet desc
export const compareByAlphabetDesc = (
  a: todoType,
  b: todoType,
  key: string
) => {
  return compareByAlphabetAsc(b, a, key);
};
