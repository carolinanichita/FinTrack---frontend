import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Pie from './Pie'

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log(event);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Incone" value="1" />
            <Tab label="Expense" value="2" />
          </TabList>
        
        <TabPanel value="1">
        <Pie />
        </TabPanel>
        <TabPanel value="2">
        <Pie />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
