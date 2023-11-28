//data type for state.todo redux
export type todoStateType = {
  todo: todoType[];
  categories: string[];
  priorities: string[];
  search: string;
  filter: filterType;
  sort: sortType;
  trash: trashType[];
};

//data type for todo
export type todoType = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  category: string;
  date: string;
};

//data type for trash
export type trashType = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  category: string;
  date: string;
  deletedAt: string;
};

//data type for filter
export type filterType = {
  priorities: string[];
  categories: string[];
  from_date: string;
  to_date: string;
};

//data type for sort
export type sortType = {
  order: string;
  sortBy: string;
};
