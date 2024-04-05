
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MonthYearPicker from './MonthYearPicker';
import { useState } from 'react';

interface GeneralYearMonthPickerProps {
  onChangeDate: (date: string) => void;
}

const GeneralYearMonthPicker = (props: GeneralYearMonthPickerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentMonthYear, setCurrentMonthYear] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date: string) => {
    setCurrentMonthYear(date);
    setSelectedDate(date);
    props.onChangeDate(date);
    setOpen(false);
  };

  const handlePreviousMonth = () => {
    const currentDate = currentMonthYear ? new Date(currentMonthYear) : new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);

    const newMonthYear = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
    setCurrentMonthYear(newMonthYear);
    setSelectedDate(newMonthYear);
    props.onChangeDate(newMonthYear);

  };

  const handleNextMonth = () => {
    const currentDate = currentMonthYear ? new Date(currentMonthYear) : new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);

    const newMonthYear = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
    setCurrentMonthYear(newMonthYear);
    setSelectedDate(newMonthYear);
    props.onChangeDate(newMonthYear);

  };

  return (
    <div>
      <div className='month-year-picker'>
        <Button variant="text" onClick={handlePreviousMonth}>
          <ArrowBackIosIcon></ArrowBackIosIcon>
        </Button>
        <div>
          <Button variant="contained" onClick={handleOpen} className="choose-month-btn" >
            {selectedDate ? selectedDate : 'Choose Month'}
          </Button>
          <MonthYearPicker open={open} onClose={handleClose} onDateChange={handleDateChange} />
        </div>
        <Button variant="text" onClick={handleNextMonth}><ArrowForwardIosIcon></ArrowForwardIosIcon></Button>
      </div>
    </div>
  )
}

export default GeneralYearMonthPicker