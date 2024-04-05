import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function Select() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          
        </InputLabel>
        <NativeSelect
          defaultValue={1}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={2}>Weekly</option>  
          <option value={1}>Mountly</option>
          <option value={2}>Annually</option>
          <option value={2}>Period</option>
          <option value={2}>List</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

