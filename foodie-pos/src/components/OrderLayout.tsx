import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/AppSlice";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface Prop {
  children: ReactNode;
}

const OrderLayout = ({ children }: Prop) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tableId } = router.query;
  useEffect(() => {
    if (tableId) {
      dispatch(fetchAppData({ tableId: Number(tableId) }));
    }
  }, [tableId]);
  return (
    <Box sx={{ overflow: "scroll", height: "100vh", bgcolor: "#FBF9F1" }}>
      {children}
    </Box>
  );
};

export default OrderLayout;
