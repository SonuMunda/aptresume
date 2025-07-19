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
    <Box className={`${classname}`}>
      <Typography variant="h4" component={"h4"} sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>

      <List dense>
        {items.map((item) => (
          <ListItem key={item} disableGutters disablePadding>
            <ListItemIcon>
              <Icon className={`${iconColor}`} />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
