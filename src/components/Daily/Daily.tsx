import Header from "../ReusedComponents/Header";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./Daily.css";
import { Button } from "@mui/material";
import { useState } from "react";
import Transaction from "../ReusedComponents/Transaction";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TabelDay from "./TabelDay";
import GeneralYearMonthPicker from "../ReusedComponents/GeneralYearMonthPicker";
import axios from "axios";

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

interface TransactionProps {
  userId: string;
}

const Daily = (props: TransactionProps) => {
  const [tableDays, setTableDays] = useState<TableDay[]>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date: string) => {
    // setSelectedDate(date);

    const [selectedYear, selectedMonth] = date.split("-");

    const apiUrlTransactions = `https://fintrackbackend.onrender.com/transaction/${selectedYear}/${selectedMonth}?userId=${props.userId}`;

    axios
      .get(apiUrlTransactions)
      .then((response) => {
        const transactions = response.data;

        transactions.forEach((transaction: any) => {
          transactions[transaction.categoryId] = transaction.categoryName;
        });

        setTableDays(transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };

  const addRowToTableByDay = (newRow: Row) => {
    const existingTable = tableDays.find((table) => table.date === newRow.date);

    if (existingTable) {
      const updatedTable = {
        ...existingTable,
        rows: [...existingTable.rows, newRow],
      };

      const updatedTableDays = tableDays.map((table) =>
        table.date === newRow.date ? updatedTable : table
      );

      setTableDays(updatedTableDays);
    } else {
      setTableDays([...tableDays, { date: newRow.date, rows: [newRow] }]);
    }

    handleClose();
  };

  return (
    <div>
      <Header />
      <GeneralYearMonthPicker onChangeDate={handleDateChange} />
      <div className="inc-exp-tot">
        <div>
          <p className="transactions-text">Income</p>
          <p className="income-amount">0</p>
        </div>
        <div>
          <p className="transactions-text">Expense</p>
          <p className="expense-amount">0</p>
        </div>
        <div>
          <p className="transactions-text">Total</p>
          <p className="total-amount">0</p>
        </div>
      </div>
      <div>
        <div className="plus-btn">
          <Button variant="outlined" onClick={handleClickOpen}>
            <AddCircleOutlineIcon></AddCircleOutlineIcon>
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Transaction</DialogTitle>
            <DialogContent>
              <Transaction
                onTransactionSave={(newRow: any) => {
                  addRowToTableByDay(newRow);
                }}
                id={props.userId}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {tableDays.map((table, index) => (
        <TabelDay dateProp={table.date} key={index} table={table} />
      ))}
    </div>
  );
};

export default Daily;
