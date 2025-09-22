import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
    h1: { fontSize: "2.25rem" },
    h2: { fontSize: "1.875rem" },
    h3: { fontSize: "1.5rem" },
    h4: { fontSize: "1.25rem" },
    h5: { fontSize: "1.125rem" },
    h6: { fontSize: "1rem" },
    body1: { fontSize: "1.2rem" },
    body2: { fontSize: "1rem" },
    caption: { fontSize: "0.75rem" },
  },
});

export default theme;
