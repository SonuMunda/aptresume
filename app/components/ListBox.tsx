import * as React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface ListBoxProps {
  classname: string;
  title: string;
  items: string[];
  icon: React.ElementType;
  iconColor?: string;
}

export default function ListBox({
  classname,
  title,
  items,
  icon: Icon = () => null,
  iconColor = "text-gray-800",
}: ListBoxProps) {
  return (
    <Box
      className={`${classname} bg-gray-50 p-6 border border-gray-300 rounded-md shadow`}
    >
      <Typography
        variant="h6"
        className="uppercase"
        sx={{ color: "text.primary", fontWeight: "bold" }}
      >
        {title}
      </Typography>

      <List dense>
        {items.map((item) => (
          <ListItem key={item} disableGutters>
            <ListItemIcon>
              <Icon className={iconColor} />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
