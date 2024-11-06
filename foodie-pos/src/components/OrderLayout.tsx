import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/AppSlice";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";

interface Prop {
  children: ReactNode;
}

const OrderLayout = ({ children }: Prop) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tableId } = router.query;
  const { isLoading } = useAppSelector((state) => state.App);
  useEffect(() => {
    if (tableId) {
      dispatch(fetchAppData({ tableId: Number(tableId) }));
    }
  }, [tableId]);
  return (
    <Box>
      <OrderAppHeader />
      <Box sx={{ overflow: "scroll", height: "100vh", bgcolor: "" }}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              top: 200,
            }}
          >
            <CircularProgress size={80} />
          </Box>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

export default OrderLayout;
