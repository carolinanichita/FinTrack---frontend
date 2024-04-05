import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import './TabelDay.css'
import { Row } from './Daily';

const ccyFormat = (num: number) => {
  if (!isNaN(num)) {
    return `${num.toFixed(2)}`;
  }
  return '';
}

interface TabelDayProps {
  table: {
    date: string;
    rows: Row[];
  };
  dateProp: string;
}


const TabelDay = ({ table, dateProp }: TabelDayProps) => {
  const { rows } = table || { rows: [] };
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  if (!table || !table.rows) {
    console.log("No table or table rows, bro!");
    return (
      <div>
        No transactions available for {dateProp}
      </div>
    )
  }

  useEffect(() => {
    let income = 0;
    let expense = 0;

    rows.forEach((row) => {
      if (row.amount > 0) {
        income += row.amount;
      } else {
        expense += Math.abs(row.amount);
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
  }, [rows]);

  return (
    <>
      <TableContainer component={Paper} className="daily-table">
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}>
                {dateProp}
              </TableCell>
              <TableCell align="center" colSpan={1}>
                <p>Total daily income</p>
                <p className="income-amount">${ccyFormat(totalIncome)}</p>
              </TableCell>
              <TableCell align="right">
                <p>total daily expense</p>
                <p>${ccyFormat(totalExpense)}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell colSpan={2} align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell colSpan={1}>{row.categoryName || 'Unknown Category'}</TableCell>
                <TableCell align='center'>{row.description}</TableCell>
                <TableCell colSpan={2} align="right">${ccyFormat(row.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TabelDay