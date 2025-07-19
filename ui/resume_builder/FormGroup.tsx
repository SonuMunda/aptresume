import { Box, TextField } from "@mui/material";

const FormGroup = ({
  id,
  label,
  placeholder = "",
  value = "",
  type = "text",
  multiline = false,
  rows = 1,
  onChange,
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Box className="form-group flex flex-col w-full">
    <Box component="label" htmlFor={id} className="text-sm font-semibold mb-1">
      {label}
    </Box>
    <TextField
      id={id}
      name={id}
      placeholder={placeholder}
      type={type}
      variant="outlined"
      multiline={multiline}
      rows={rows}
      fullWidth
      value={value}
      onChange={onChange}
      slotProps={{
        htmlInput: {
          style: { height: "0.5rem", fontSize: "medium" },
        },
      }}
    />
  </Box>
);

export default FormGroup;
