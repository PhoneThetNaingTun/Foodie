import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Home from "@mui/icons-material/Home";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Image from "next/image";

const OrderAppHeader = () => {
  const { isLoading } = useAppSelector((state) => state.App);
  const router = useRouter();
  const company = useAppSelector((state) => state.Company.company);
  const isHome = router.pathname === "/order";
  const isCart = router.pathname === "/order/cart";
  const isActiveOrder = router.pathname.includes("/order/active-order");
  const isCartOrActiveOrder = isActiveOrder || isCart;
  const cartItems = useAppSelector((state) => state.Cart.items);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 1,
        position: "relative",
        bgcolor: "#0099FF",
      }}
    >
      {/* <Image
        src="./orderTop.svg"
        alt="svg"
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
          position: "absolute",
          left: 0,
          top: "-100px",
          zIndex: "-1",
        }}
      /> */}
      <Box>
        <Typography
          variant="h3"
          sx={{
            flexGrow: 1,
            fontFamily: "Brush Script MT, Brush Script Std, cursive",
            fontSize: 35,
            color: "#fff",
          }}
        >
          {company?.name}
        </Typography>
      </Box>
      <Box>
        {isCartOrActiveOrder ? (
          <Home
            sx={{
              fontSize: 30,
              cursor: "pointer",
              color: "#fff",
              "&:hover": { color: "#1B9C85" },
            }}
            onClick={() => {
              router.push({
                pathname: "/order",
                query: { tableId: router.query.tableId },
              });
            }}
          />
        ) : (
          <Box sx={{ position: "relative" }}>
            <ShoppingCartCheckoutIcon
              sx={{
                fontSize: 30,
                cursor: "pointer",
                color: "#fff",
                "&:hover": { color: "#1B9C85" },
              }}
              onClick={() => {
                router.push({ pathname: "/order/cart", query: router.query });
              }}
            />

            {cartItems.length > 0 && (
              <Typography
                sx={{
                  fontSize: 15,
                  color: "#fff",
                  position: "absolute",
                  bottom: 0,
                  right: "-15px",
                  borderRadius: "50%",
                  width: "fit-content",
                  bgcolor: "#FF0000",
                  padding: "0px 8px",
                }}
              >
                {cartItems.length}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderAppHeader;
