export type todoStateType = {
  todo: todoType[];
  categories: string[];
  priorities: string[];
  search: string;
  filter: filterType;
  sort: sortType;
  trash: trashType[];
};

export type todoType = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  category: string;
  date: string;
};

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

export type filterType = {
  priorities: string[];
  categories: string[];
  from_date: string;
  to_date: string;
};

export type sortType = {
  order: string;
  sortBy: string;
};
