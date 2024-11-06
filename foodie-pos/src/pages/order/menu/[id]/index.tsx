import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import AddonCategoriesOrderPage from "@/components/AddonCategories";
import { SetStateAction, useEffect, useState } from "react";
import { Addon } from "@prisma/client";
import AddonCategories from "@/components/AddonCategories";
import ReplyIcon from "@mui/icons-material/Reply";
import QuantitySelector from "@/components/QuantitySelector";
import { cartItem } from "@/type/cart";
import { nanoid } from "nanoid";
import { addItemtoCart } from "@/store/slices/CartSlice";

const OrderPageMenuDetails = () => {
  const { query, isReady, ...router } = useRouter();
  const dispatch = useAppDispatch();
  const tableId = Number(query.tableId);
  const cartItems = useAppSelector((state) => state.Cart.items);
  const menuId = Number(query.id);
  const cartItemId = query.cartItemId;
  const cartItem = cartItems.find((item) => item.id === cartItemId);
  const { menus } = useAppSelector((state) => state.Menu);
  const { addonCategories } = useAppSelector((state) => state.AddonCategory);
  const { menuAddonCategories } = useAppSelector(
    (state) => state.MenuAddonCategory
  );
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);

  const menu = menus.find((item) => item.id === menuId);
  const addonCategoryIds = menuAddonCategories
    .filter((item) => item.menuId === menuId)
    .map((item) => item.AddonCategoryId);
  const filteredAddonCategories = addonCategories.filter((item) =>
    addonCategoryIds.includes(item.id)
  );

  const handleQuantityDecrease = () => {
    const newQuantity = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newQuantity);
  };

  const handleQuantityIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  useEffect(() => {
    const isRequiredAddonCategories = filteredAddonCategories.filter(
      (item) => item.isRequired
    );
    const seletedIsRequiredAddonCategories = selectedAddons.filter(
      (selectedAddon) => {
        const addonCategoryIds = selectedAddon.AddonCategoryId;
        const addonCategory = addonCategories.find(
          (addoncategory) => addoncategory.id === addonCategoryIds
        );
        return addonCategory?.isRequired ? true : false;
      }
    );

    const isDisabled =
      isRequiredAddonCategories.length !==
      seletedIsRequiredAddonCategories.length;
    setIsDisabled(isDisabled);
  }, [selectedAddons, addonCategories]);

  useEffect(() => {
    if (cartItem) {
      const { addon, quantity } = cartItem;
      setSelectedAddons(addon);
      setQuantity(Number(quantity));
    }
  }, [cartItem]);
  const handleAddToCart = () => {
    if (!menu) return;
    const newCartItem: cartItem = {
      id: cartItem ? cartItem.id : nanoid(7),
      menu,
      addon: selectedAddons,
      quantity,
    };
    dispatch(addItemtoCart(newCartItem));
    const pathname = cartItem ? "/order/cart" : "/order";
    router.push({ pathname, query });
  };

  if (!isReady || !menu) return null;

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ bgcolor: "#1B9C85", width: "fit-content", m: 3 }}
        onClick={() => {
          router.push(`/order?tableId=${tableId}`);
        }}
      >
        <ReplyIcon sx={{ mr: 1 }} />
        Back
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          p: 10,
        }}
      >
        <Box sx={{ width: "100%", height: 300, position: "relative", mb: 4 }}>
          <Image
            src={menu.assetUrl || ""}
            alt={`${menu.name}`}
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontStyle: "italic",
            textAlign: "start",
            width: "100%",
          }}
        >
          {menu.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontStyle: "italic",
            textAlign: "start",
            width: "100%",
            mb: 4,
          }}
        >
          $ {menu.price}
        </Typography>
        <Box sx={{}}>
          <AddonCategories
            addonCategories={filteredAddonCategories}
            selectedAddons={selectedAddons}
            setSelectedAddons={setSelectedAddons}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <QuantitySelector
            quantity={quantity}
            handleQuantityIncrease={handleQuantityIncrease}
            handleQuantityDecrease={handleQuantityDecrease}
          />
          <Button
            disabled={isDisabled}
            variant="contained"
            sx={{
              width: "fit-content",
              bgcolor: "#0D9276",
              "&:hover": { backgroundColor: "#0D9250" },
            }}
            onClick={handleAddToCart}
          >
            {cartItem ? "Update cart" : "Add to cart"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderPageMenuDetails;
