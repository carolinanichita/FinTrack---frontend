import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    
    setValue(newValue);
  };

  const navigate = useNavigate();

  const navigateToDailyPage = () => {
    navigate('/daily');
  };

  const navigateToCalendarPage = () => {
    navigate('/calender');
  };

  const navigateToMonthlyPage = () => {
    navigate('/monthly');
  };

  const navigateToSettingsPage = () => {
    navigate('/settings');
  }

  return (
    <div>
      <div className='navbarcomponents'>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={<Link to="/daily">Daily</Link>} {...a11yProps(0)} onClick={navigateToDailyPage} />
              <Tab label="Calendar" {...a11yProps(1)} onClick={navigateToCalendarPage} />
              <Tab label="Monthly" {...a11yProps(2)} onClick={navigateToMonthlyPage} />
              <Tab label="Settings" {...a11yProps(3)} onClick={navigateToSettingsPage} />
            </Tabs>
          </Box>
        </Box>
      </div>
    </div>
  );
}