/* eslint-disable @typescript-eslint/no-explicit-any */

//import func redux
import { createSlice } from "@reduxjs/toolkit";

//import data type
import {
  filterType,
  sortType,
  todoStateType,
  todoType,
  trashType,
} from "../../type";

//import data initialState
import { initialFilterState } from "../../util/data";

//get data localStorage todo as string
const todoDataString = localStorage.getItem("todo");
const filterDataString = localStorage.getItem("filter");
const categoriesDataString = localStorage.getItem("categories");
const sortDataString = localStorage.getItem("sort");
const trashDataString = localStorage.getItem("trash");

//variable to save localStorage data
let todoLocalStorage: todoType[] = [];
let filterLocalStorage: filterType = initialFilterState;
let categoriesLocalStorage: string[] = ["work", "personal", "family"];
let sortLocalStorage: sortType = {
  order: "asc",
  sortBy: "date",
};
let trashLocalStorage: trashType[] = [];

//localStorage data validation
if (todoDataString !== null) {
  todoLocalStorage = JSON.parse(todoDataString);
}
if (filterDataString !== null) {
  filterLocalStorage = JSON.parse(filterDataString);
}
if (categoriesDataString !== null) {
  categoriesLocalStorage = JSON.parse(categoriesDataString);
}
if (sortDataString !== null) {
  sortLocalStorage = JSON.parse(sortDataString);
}
if (trashDataString !== null) {
  trashLocalStorage = JSON.parse(trashDataString);
}

//initial state
const initialState: todoStateType = {
  todo: todoLocalStorage,
  categories: categoriesLocalStorage,
  priorities: ["tinggi", "sedang", "rendah"],
  search: "",
  filter: filterLocalStorage,
  sort: sortLocalStorage,
  trash: trashLocalStorage,
};

//create todo slice
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    //action reducer to set todo
    setTodo: (state, action) => {
      state.todo = action.payload;
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    //action reducer to add todo
    addTodo: (state, action) => {
      state.todo = [...state.todo, action.payload];
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    //action reducer to remove todo from state.todo and move it to the state.trash
    removeFromTodo: (state, action) => {
      const searchtodo = state.todo.find(
        (item) => item.id === action.payload.id
      );
      if (searchtodo) {
        const moveTodo = { ...searchtodo, deletedAt: new Date().toISOString() };
        state.trash = [...state.trash, moveTodo];
        localStorage.setItem("trash", JSON.stringify(state.trash));
      }
      const filteredTodo = state.todo.filter(
        (item: todoType) => item.id !== action.payload.id
      );
      state.todo = filteredTodo;
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    //action reducer to edit data todo
    editTodo: (state, action) => {
      const newTodo = state.todo.map((item: todoType) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return item;
      });
      state.todo = newTodo;
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    //action reducer to switch/change completed status todo
    switchIsCompleted: (state, action) => {
      const searchedTodo = state.todo.find(
        (item: todoType) => item.id === action.payload.id
      );
      if (searchedTodo) {
        searchedTodo.completed = !searchedTodo.completed;
      }
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    //action reducer to set state.search
    setSearch: (state, action) => {
      state.search = action.payload;
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    //action reducer to set state.filter
    setFilter: (state, action) => {
      state.filter = action.payload;
      localStorage.setItem("filter", JSON.stringify(state.filter));
    },

    //action reducer to set state.sort
    setSort: (state, action) => {
      state.sort = action.payload;
      localStorage.setItem("sort", JSON.stringify(state.sort));
    },

    //action reducer to set new dataTodo categories to the state.categories
    setCategories: (state, action) => {
      const dataTodo: todoType[] = action.payload;
      const newCategories = new Set(dataTodo.map((item) => item.category));
      state.categories = [...newCategories];
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    //action reducer to add new dataTodo categories to the state.categories
    addImportCategories: (state, action) => {
      const dataTodo: todoType[] = action.payload;
      const newCategories = new Set(dataTodo.map((item) => item.category));
      state.categories = [...state.categories, ...newCategories];
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    //action reducer to add new category
    addCategory: (state, action) => {
      state.categories = [...state.categories, action.payload];
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    //action reducer to restore todo from state.trash and move it to the state.todo
    restoreTodo: (state, action) => {
      const searchTodo = state.trash.find(
        (item) => item.id === action.payload.id
      );
      if (searchTodo) {
        const restoreTodo: todoType = {
          id: searchTodo.id,
          title: searchTodo.title,
          description: searchTodo.description,
          completed: searchTodo.completed,
          priority: searchTodo.priority,
          category: searchTodo.category,
          date: searchTodo.date,
        };
        state.todo = [...state.todo, restoreTodo];
        localStorage.setItem("todo", JSON.stringify(state.todo));
        const newTrash = state.trash.filter(
          (item) => item.id !== action.payload.id
        );
        state.trash = [...newTrash];
        localStorage.setItem("trash", JSON.stringify(state.trash));
      }
    },

    //action reducer to filter deleted todo from state.trash
    deleteTodoPermanently: (state, action) => {
      const filteredTrash = state.trash.filter(
        (item) => item.id !== action.payload.id
      );
      state.trash = [...filteredTrash];
      localStorage.setItem("trash", JSON.stringify(state.trash));
    },
    clearTodo: () => {
      return { ...initialState };
    },
  },
});

export const {
  setTodo,
  addTodo,
  removeFromTodo,
  editTodo,
  clearTodo,
  switchIsCompleted,
  setSearch,
  setFilter,
  setSort,
  setCategories,
  addCategory,
  addImportCategories,
  restoreTodo,
  deleteTodoPermanently,
} = todoSlice.actions;

export default todoSlice.reducer;
