import { Box, Divider, List, ListItem, ListItemButton } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import EggIcon from "@mui/icons-material/Egg";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import TableBarIcon from "@mui/icons-material/TableBar";
import Link from "next/link";

const SideBar = () => {
  const sidebarItems = [
    {
      id: 1,
      label: "Orders",
      icon: <LocalMallIcon />,
      route: "/backoffice/order",
    },
    {
      id: 2,
      label: "Menu Categories",
      icon: <CategoryIcon />,
      route: "/backoffice/menu-category",
    },
    {
      id: 3,
      label: "Menus",
      icon: <LocalDiningIcon />,
      route: "/backoffice/menu",
    },
    {
      id: 4,
      label: "Addon Categories",
      icon: <ClassIcon />,
      route: "/backoffice/addon-category",
    },
    {
      id: 5,
      label: "Addons",
      icon: <EggIcon />,
      route: "/backoffice/addon",
    },
    {
      id: 6,
      label: "Tables",
      icon: <TableBarIcon />,
      route: "/backoffice/table",
    },
    {
      id: 7,
      label: "Locations",
      icon: <LocationOnIcon />,
      route: "/backoffice/location",
    },
  ];
  return (
    <Box
      sx={{ width: 300, height: "100vh", backgroundColor: "#EEEEEE" }}
      role="presentation"
    >
      <List>
        {sidebarItems.map((items, index) => (
          <Link href={items.route} key={items.id}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{items.icon}</ListItemIcon>
                <ListItemText primary={items.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <Link href={"/backoffice/setting"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Setting"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default SideBar;
