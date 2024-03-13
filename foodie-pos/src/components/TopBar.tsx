import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut, useSession } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

const TopBar = () => {
  const { data } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AppBar position="static" sx={{ backgroundColor: "#40A2E3", height: "8%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {data && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src="data.user?.image" sx={{ mr: "20px" }} />
            <Typography>{data.user?.name}</Typography>
          </Box>
        )}

        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Brush Script MT, Brush Script Std, cursive",
              fontSize: 35,
            }}
          >
            Yam Yam
          </Typography>
        </Box>
        {data && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" onClick={() => setOpen(true)}>
              <LogoutIcon sx={{ mr: "10px" }} />
              Log Out
            </Button>
          </Box>
        )}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Log Out</DialogTitle>
          <DialogContent>Are You Sure?</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => signOut()} variant="contained">
              LogOut
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;