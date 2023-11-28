//import library UI
import { Accordion, Heading, Icon, Stack } from "@chakra-ui/react";

//import react hooks
import { useEffect, useState } from "react";

//import selector redux
import { useAppSelector } from "../../redux/store";

//import func util
import getDateNow from "../../util/getDateNow";
import { compareByDateAsc } from "../../util/sort";

//import data type
import { todoType } from "../../type";

//import styling
import { primaryColor } from "../../component/style";

//import icon
import { MdOutlineTimeline } from "react-icons/md";

//import TimelineItem accordion component
import TimelineItem from "./section/TimelineItem";

export default function TimelinePage() {
  const [dates, setDates] = useState<string[]>([]);
  const { todo } = useAppSelector((state) => state.todo);

  //get future unique date
  useEffect(() => {
    if (todo) {
      const sortedTodoByDate = todo
        .filter((item) => item.date > getDateNow())
        .sort(compareByDateAsc);
      const uniqueDates = new Set(
        sortedTodoByDate.map((item: todoType) => item.date)
      );
      setDates([...uniqueDates]);
    }
  }, [todo]);

  return (
    <Stack w="100%" pb={8}>
      <Heading
        color={primaryColor()}
        display={"flex"}
        alignItems={"center"}
        gap={4}
        mb={4}
      >
        Timeline <Icon as={MdOutlineTimeline} />
      </Heading>
      <Accordion
        allowMultiple
        w={"100%"}
        defaultIndex={[0]}
        display={"flex"}
        flexDirection={"column"}
        gap={4}
      >
        {/* TODAY */}
        <TimelineItem date={getDateNow()} />

        {/* FUTURE */}
        {dates && dates.map((item) => <TimelineItem key={item} date={item} />)}

        {/* PAST */}
        <TimelineItem date={"Past"} isPast={true} />
      </Accordion>
    </Stack>
  );
}
