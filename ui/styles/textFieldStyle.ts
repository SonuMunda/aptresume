import { indigo } from "@mui/material/colors";

export const textFieldStyle = {
  "& .MuiFilledInput-root": {
    "&:after": {
      borderColor: indigo[500],
    },
  },

  "& .MuiInputLabel-root": {
    color: indigo[500],
    borderColor: indigo[500],
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: indigo[500],
  },
  "& .MuiInputBase-root.MuiFilledInput-root": {
    borderRadius: 2,
    borderColor: indigo[500],
  },

  "& .MuiFormHelperText-root": {
    minHeight: "1.25em",
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "red",
  },
};
