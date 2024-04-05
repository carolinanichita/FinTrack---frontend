import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


interface MonthYearPickerProps {
  open: boolean;
  onClose: () => void;
  onDateChange: (date: string) => void;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ open, onClose, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleSave = () => {
    onDateChange(selectedDate);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose Month and Year</DialogTitle>
      <DialogContent>
        <TextField
          label="Month and Year"
          type="month"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </DialogContent>
      <Button onClick={handleSave} color="primary">
        Save
      </Button>
    </Dialog>
  )
}

export default MonthYearPicker