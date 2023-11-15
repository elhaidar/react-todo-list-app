import { FiCalendar, FiHome } from "react-icons/fi";
import { filterType } from "../type";
import { v4 as uuidv4 } from "uuid";
import { IoIosStats } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineTimeline } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";

const uniqueId = uuidv4();

export const initialTodoItemState = {
  id: uniqueId,
  title: "",
  description: "",
  completed: false,
  priority: "tinggi",
  category: "work",
  date: "",
};

export const initialFilterState: filterType = {
  priorities: [],
  categories: [],
  from_date: "",
  to_date: "",
};

export const listSort = [
  {
    value: "priority",
    label: "Priority",
  },
  {
    value: "title",
    label: "Title",
  },
  {
    value: "category",
    label: "Category",
  },
  {
    value: "date",
    label: "Date",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

export const navLinks = [
  {
    title: "Home",
    href: "/",
    icon: FiHome,
  },
  {
    title: "Todo",
    href: "/todo",
    icon: FiCalendar,
  },
  {
    title: "Statistics",
    href: "/statistics",
    icon: IoIosStats,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: BiCategoryAlt,
  },
  {
    title: "Timeline",
    href: "/timeline",
    icon: MdOutlineTimeline,
  },
  {
    title: "Trash",
    href: "/trash",
    icon: BsFillTrash3Fill,
  },
];

export const priorityTagMap = new Map([
  ["tinggi", "danger"],
  ["sedang", "warning"],
  ["rendah", "primary"],
]);
