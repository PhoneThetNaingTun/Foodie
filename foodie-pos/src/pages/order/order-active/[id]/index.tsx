import OrderCard from "@/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { refreshOrder } from "@/store/slices/OrderSlice";
import { formatOrders } from "@/utils/general";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ActiveOrder = () => {
  const router = useRouter();
  const orderSeq = router.query.id;
  const { addons } = useAppSelector((state) => state.Addon);
  const { menus } = useAppSelector((state) => state.Menu);
  const { tables } = useAppSelector((state) => state.Table);
  const { item } = useAppSelector((state) => state.Order);

  const orderItems = formatOrders(item, addons, menus, tables);
  const tableId = Number(router.query.tableId);
  const table = tables.find((table) => table.id === tableId);
  const dispatch = useAppDispatch();
  let intervalId: number;

  useEffect(() => {
    if (orderSeq) {
      intervalId = window.setInterval(handleRefreshOrder, 10000);
    }
    return () => {
      window.clearInterval(intervalId);
    };
  }, [orderSeq]);

  const handleRefreshOrder = () => {
    dispatch(refreshOrder({ orderSeq: String(orderSeq) }));
  };

  if (!item.length) return null;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 3,
          borderRadius: 15,
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          top: { xs: 0, md: -220, lg: -280 },
          mt: 10,
        }}
      >
        <Typography
          sx={{
            color: { xs: "success.main", md: "info.main" },
            fontSize: { xs: 20, md: 25 },
          }}
        >
          Table: {table?.name}
        </Typography>
        <Typography
          sx={{
            color: { xs: "success.main", md: "info.main" },
            fontSize: { xs: 20, md: 25 },
          }}
        >
          Total price: {item[0].totalPrice}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          top: { md: -200 },
        }}
      >
        {orderItems.map((orderItem) => {
          return (
            <OrderCard
              key={orderItem.itemId}
              orderItem={orderItem}
              isAdmin={false}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default ActiveOrder;
