//import library UI
import { Tag } from "@chakra-ui/react";

//import data type
import { todoType } from "../../type";

//import styling
import {
  completedStatusTagVariant,
  pendingStatusTagVariant,
  tagPriorityVariant,
} from "../style";

//import func util
import getDateNow from "../../util/getDateNow";

const StatusTag = ({
  todoItem,
  py = 2,
  px = 4,
  variant = "both",
}: {
  todoItem: todoType;
  py?: string | number;
  px?: string | number;
  variant?: string;
}) => {
  return (
    <Tag
      variant={
        todoItem.completed
          ? variant === "both"
            ? completedStatusTagVariant()
            : "completed"
          : todoItem.date < getDateNow()
          ? variant === "both"
            ? tagPriorityVariant("tinggi")
            : "danger"
          : pendingStatusTagVariant()
      }
      py={py}
      px={px}
      fontSize={"xs"}
    >
      {todoItem.completed
        ? "DONE"
        : todoItem.date < getDateNow()
        ? "OVERDUE"
        : "PENDING"}
    </Tag>
  );
};

export default StatusTag;
