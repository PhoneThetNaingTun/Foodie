import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import AddonCategoriesOrderPage from "@/components/AddonCategories";
import { SetStateAction, useEffect, useState } from "react";
import { Addon } from "@prisma/client";
import AddonCategories from "@/components/AddonCategories";
import ReplyIcon from "@mui/icons-material/Reply";

const OrderPageMenuDetails = () => {
  const { isReady, ...router } = useRouter();
  const tableId = Number(router.query.tableId);
  const menuId = Number(router.query.id);
  const { menus } = useAppSelector((state) => state.Menu);
  const { addonCategories } = useAppSelector((state) => state.AddonCategory);
  const { menuAddonCategories } = useAppSelector(
    (state) => state.MenuAddonCategory
  );
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const menu = menus.find((item) => item.id === menuId);
  const addonCategoryIds = menuAddonCategories
    .filter((item) => item.menuId === menuId)
    .map((item) => item.AddonCategoryId);
  const filteredAddonCategories = addonCategories.filter((item) =>
    addonCategoryIds.includes(item.id)
  );
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
  }, [selectedAddons]);
  if (!isReady || !menu) return null;

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ bgcolor: "#40A2E3", width: "fit-content", m: 3 }}
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
        <Box>
          <AddonCategories
            addonCategories={filteredAddonCategories}
            selectedAddons={selectedAddons}
            setSelectedAddons={setSelectedAddons}
          />
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            disabled={isDisabled}
            variant="contained"
            sx={{
              width: "fit-content",
              bgcolor: "#0D9276",
              "&:hover": { backgroundColor: "#0D9250" },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderPageMenuDetails;
