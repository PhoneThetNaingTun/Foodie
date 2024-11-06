import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Avatar, Box, Button, Chip, Divider, Typography } from "@mui/material";
import { Addon, Order } from "@prisma/client";
import { useRouter } from "next/router";
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { cartItem } from "@/type/cart";
import { removeItemFromCart } from "@/store/slices/CartSlice";
import { getCartTotalPrice } from "@/utils/general";
import { createOrder } from "@/store/slices/OrderSlice";
const cartDetails = () => {
  const cartItems = useAppSelector((state) => state.Cart.items);
  const { addons } = useAppSelector((state) => state.Addon);
  const router = useRouter();
  const tableId = Number(router.query.tableId);
  const dispatch = useAppDispatch();
  const renderAddon = (addon: Addon[]) => {
    if (!addon.length) return;
    return addon.map((item) => {
      return (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
            {item.name}
          </Typography>
          <Typography color={"primary"} sx={{ fontStyle: "italic" }}>
            {item.price}
          </Typography>
        </Box>
      );
    });
  };
  const deleteCartItem = (cartItem: cartItem) => {
    dispatch(removeItemFromCart(cartItem));
  };

  const handleConfirmOrder = () => {
    const isValid = tableId;
    if (!isValid) return alert("Error Occured");
    dispatch(
      createOrder({
        tableId,
        cartItems,
        onSuccess: (order: Order[]) => {
          router.push({
            pathname: `/order/order-active/${order[0].orderSeq}`,
            query: { tableId },
          });
        },
      })
    );
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          marginTop: 10,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          width: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          padding: 5,
        }}
      >
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
          Your Orders
        </Typography>
        <Box sx={{ width: "100%" }}>
          {!cartItems.length ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProductionQuantityLimitsTwoToneIcon
                sx={{ fontSize: 100, color: "grey" }}
              />
              <Typography variant="h5">Your Cart Is Empty</Typography>
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              {cartItems.map((cartItem) => {
                const { menu, addon, quantity } = cartItem;
                return (
                  <Box key={cartItem.id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      <Box sx={{ width: "20%" }}>
                        <Chip
                          label={Number(quantity)}
                          sx={{
                            mr: 1,
                            backgroundColor: "#1B9C85",
                            color: "#fff",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "space-between",
                          width: "80%",
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                              {menu.name}
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 600, margin: "0px 10px" }}
                            >
                              {menu.price}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {" "}
                            <EditIcon
                              sx={{ cursor: "pointer", color: "#1B9C85" }}
                              onClick={() =>
                                router.push({
                                  pathname: `menu/${menu.id}`,
                                  query: {
                                    ...router.query,
                                    cartItemId: cartItem.id,
                                  },
                                })
                              }
                            />
                            <DeleteIcon
                              sx={{ cursor: "pointer", color: "#1B9C85" }}
                              onClick={() => {
                                deleteCartItem(cartItem);
                              }}
                            />
                          </Box>
                        </Box>
                        <Box sx={{}}>{renderAddon(addon)}</Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Typography>Total : {getCartTotalPrice(cartItems)}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    width: "fit-content",
                    bgcolor: "#0D9276",
                    "&:hover": { backgroundColor: "#0D9250" },
                  }}
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default cartDetails;
