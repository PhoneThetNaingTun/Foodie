import { ReactNode, useEffect } from "react";
import TopBar from "./TopBar";
import { Box } from "@mui/material";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/AppSlice";
import SnackBar from "./SnackBar";

interface Prop {
  children?: ReactNode;
}

const BackOfficeLayout = ({ children }: Prop) => {
  const { data } = useSession();
  const { init } = useAppSelector((state) => state.App);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData());
    }
  }, [init]);
  return (
    <Box sx={{ backgroundColor: "#FBF9F1", height: "100vh" }}>
      <TopBar />

      <Box sx={{ display: "flex", height: "92%" }}>
        {data && <SideBar />}
        <Box
          sx={{
            padding: "20px",
            width: "100%",
            overflow: "scroll",
          }}
        >
          {children}
        </Box>
      </Box>
      <SnackBar />
    </Box>
  );
};

export default BackOfficeLayout;
