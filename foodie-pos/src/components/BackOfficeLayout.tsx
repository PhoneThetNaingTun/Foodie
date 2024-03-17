import { ReactNode } from "react";
import TopBar from "./TopBar";
import { Box } from "@mui/material";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import SnackBar from "./SnackBar";

interface Prop {
  children?: ReactNode;
}

const Layout = ({ children }: Prop) => {
  const { data } = useSession();
  return (
    <Box sx={{ backgroundColor: "#FBF9F1", height: "100vh" }}>
      <TopBar />

      <Box sx={{ display: "flex", height: "92%" }}>
        {data && <SideBar />}
        <Box sx={{ padding: "20px", width: "100%" }}>{children}</Box>
      </Box>
      <SnackBar />
    </Box>
  );
};

export default Layout;
