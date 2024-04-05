import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';

const MonthCalendar = () => {

  return (
    <div>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
            <DemoItem>
              <DateCalendar
                defaultValue={dayjs('2023-10-01')}
                views={['month', 'year']}
                openTo="month"
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </div>
  )
}

export default MonthCalendar