import { useEffect, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  SlotInfo,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DayDetail from "./DayDetail";
import Header from "../ReusedComponents/Header";
import axios from "axios";
import TotalReport from "../ReusedComponents/TotalReport";
import CustomToolbar from "./CustomToolbar";
import "./CalenderPage.css";
import AddNewTransactoinButton from "../ReusedComponents/AddNewTransactoinButton";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

interface CalenderPageProps {
  userId: string;
}

type Transaction = {
  amount: number;
  description: string;
  date: Date;
  userId: string;
  categoryId: string;
  accountId: string;
};
type Event = {
  title: string;
  start: Date;
  end: Date;
  category: string;
};

type DayReport = {
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
  transactionDate: string;
  allTransactions: Transaction[];
};

export interface Row {
  date: string;
  category: string;
  description: string;
  amount: number;
}

interface TableDay {
  rows: Row[];
  date: string;
}

const convertTransactionsToEvents = (dayreports: DayReport[]): Event[] => {
  return dayreports.flatMap((dayreport) => {
    const date = new Date(dayreport.transactionDate);

    const createEvent = (title: string, category: string): Event => ({
      title,
      start: date,
      end: date,
      category,
    });

    const events: Event[] = [];

    if (dayreport.totalIncome !== 0) {
      events.push(createEvent(dayreport.totalIncome.toString(), "Income"));
    }

    if (dayreport.totalExpense !== 0) {
      events.push(createEvent(dayreport.totalExpense.toString(), "Expense"));
    }

    if (dayreport.totalExpense !== 0 && dayreport.totalIncome !== 0) {
      events.push(createEvent(dayreport.totalAmount.toString(), "Total"));
    }

    return events;
  });
};

const eventStyleGetter = (event: Event) => {
  const color = getCategoryColor(event.category);
  return {
    style: {
      backgroundColor: color,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "none",
      outline: "none",
      display: "block",
    },
  };
};

const getCategoryColor = (category: string) => {
  const colorMap: any = {
    Income: "#004369",
    Expense: "#DB1F48",
    Total: "#36454F",
  };

  return colorMap[category] || "#4CAF50";
};

export const CalenderPage = (props: CalenderPageProps) => {
  const [modalState, setModalState] = useState(false);
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [transactionDataExpense, setTransactionDataExpense] = useState<
    DayReport[]
  >([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [addNewTransaction, setAddNewTransaction] = useState(false);

  const updateTransactions = (update: boolean) => {
    setAddNewTransaction(update);
  };

  const changeMonth = (arrowFunction: string) => {
    if (arrowFunction == "PREV") {
      setMonth((prevMonth) => (prevMonth == 1 ? 12 : prevMonth - 1));
      setYear((prevYear) => (month == 1 ? prevYear - 1 : prevYear));
    }

    if (arrowFunction == "NEXT") {
      setMonth((prevMonth) => (prevMonth == 12 ? 1 : prevMonth + 1));
      setYear((prevYear) => (month == 12 ? prevYear + 1 : prevYear));
    }
  };

  const apiTransactions = `https://fintrackbackend.onrender.com/transaction/calendar/${year}/${month}?userId=${props.userId}`;

  useEffect(() => {
    console.log("useEffect runs");
    axios
      .get<DayReport[]>(apiTransactions)
      .then((response) => {
        const { data } = response;

        if (Array.isArray(data)) {
          setTransactionDataExpense(data);
          const events: Event[] = convertTransactionsToEvents(data);
          setEventsData(events);
          console.log("events:", events);
        } else {
          console.error("transactions:", data);
        }
        setAddNewTransaction(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [year, month, addNewTransaction]);

  const handleModalClose = () => {
    setModalState(false);
  };

  const formatDate = (date: Date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const [tableDay, setTableDay] = useState<TableDay>();

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    console.log(slotInfo.start);
    const selectedDate = slotInfo.start;
    const dayReport = transactionDataExpense.filter(
      (x) => x.transactionDate == formatDate(selectedDate)
    )[0];
    setTableDay(convertDayReportToTableDay(dayReport));

    console.log("tableday:", tableDay);
    // setSelectedDate(selectedDate);
    setModalState(true);
  };

  const convertDayReportToTableDay = (dayReport: DayReport): TableDay => {
    const rows: Row[] = dayReport.allTransactions.map((transaction) => ({
      date: formatDate(transaction.date),
      category: transaction.categoryId,
      description: transaction.description,
      amount: transaction.amount,
    }));

    return {
      rows,
      date: dayReport.transactionDate,
    };
  };

  return (
    <>
      <Header />
      {modalState && (
        <DayDetail
          table={tableDay}
          openModal={true}
          onClose={handleModalClose}
        />
      )}
      <TotalReport month={month} year={year} userId={props.userId} />
      <Calendar
        views={["month"]}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        selectable={true}
        style={{ height: "100vh" }}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: (props) => (
            <CustomToolbar changeMonth={changeMonth} {...props} />
          ),
        }}
      />
      <AddNewTransactoinButton
        userId={props.userId}
        updateTransactions={updateTransactions}
      />
    </>
  );
};

export default CalenderPage;
