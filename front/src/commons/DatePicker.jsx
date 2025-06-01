import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

const CustomDatePicker = ({ label, value, onChange, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        textField={(params) => <TextField {...params} fullWidth />}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;