import Layout from "@/components/BackOfficeLayout";
import OrderCard from "@/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateOrder } from "@/store/slices/OrderSlice";
import { OrderItem } from "@/type/order";
import { formatOrders } from "@/utils/general";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import { useEffect, useState } from "react";

const Order = () => {
  const { addons } = useAppSelector((state) => state.Addon);
  const { item } = useAppSelector((state) => state.Order);
  const { menus } = useAppSelector((state) => state.Menu);
  const { tables } = useAppSelector((state) => state.Table);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<ORDERSTATUS>(ORDERSTATUS.PENDING);
  const [filteredOrders, setFilteredOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (item.length) {
      const filteredOrder = formatOrders(item, addons, menus, tables).filter(
        (orderItem) => orderItem.status === value
      );
      setFilteredOrders(filteredOrder);
    }
  }, [item, value]);

  const handleOrderStatuUpdate = (itemId: string, status: ORDERSTATUS) => {
    dispatch(updateOrder({ itemId, status }));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ToggleButtonGroup
          color="primary"
          value={value}
          exclusive
          onChange={(evt, value) => setValue(value)}
        >
          <ToggleButton value={ORDERSTATUS.PENDING}>
            {ORDERSTATUS.PENDING}
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COOKING}>
            {ORDERSTATUS.COOKING}
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COMPLETE}>
            {ORDERSTATUS.COMPLETE}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {filteredOrders.map((orderItem) => {
          return (
            <OrderCard
              key={orderItem.itemId}
              orderItem={orderItem}
              isAdmin
              handleOrderStatuUpdate={handleOrderStatuUpdate}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Order;
