import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
    console.log(event);
  };

  return (
    <ToggleButtonGroup
    color="primary"
    value={alignment}
    exclusive
    onChange={handleChange}
    aria-label="Platform"
  >
    <ToggleButton value="StatsPage">StatsPage</ToggleButton>
    <ToggleButton value="BudgetPage">BudgetPage</ToggleButton>
    <ToggleButton value="NotePage">NotePage</ToggleButton>
  </ToggleButtonGroup>
  );
}
