import axios from "axios";
import { useEffect, useState } from "react";

type Total = {
  monthTotalIncome: number;
  monthTotalExpense: number;
  monthTotalAmount: number;
};
type TotalReportProps = {
  month: number;
  year: number;
  userId: string;
};

const TotalReport = (props: TotalReportProps) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

  const apiTransactions = `https://fintrackbackend.onrender.com/transaction/${props.year}/${props.month}/total?userId=${props.userId}`;

  useEffect(() => {
    console.log("useEffect runs");
    axios
      .get<Total>(apiTransactions)
      .then((response) => {
        const { data } = response;
        if (data) {
          setIncome(data.monthTotalIncome);
          setExpense(data.monthTotalExpense);
          setTotal(data.monthTotalAmount);
        } else {
          console.error("transactions:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  });

  return (
    <div>
      <div className="inc-exp-tot">
        <div>
          <p className="transactions-text">Income</p>
          <p className="income-amount">${income}</p>
        </div>
        <div>
          <p className="transactions-text">Expense</p>
          <p className="expense-amount">${expense}</p>
        </div>
        <div>
          <p className="transactions-text">Total</p>
          <p className="total-amount">${total}</p>
        </div>
      </div>
    </div>
  );
};
export default TotalReport;
