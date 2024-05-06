import MenuCards from "@/components/MenuCards";
import OrderLayout from "@/components/OrderLayout";
import { useAppSelector } from "@/store/hooks";
import { Box, Tab, Tabs } from "@mui/material";
import { menuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const orderApp = () => {
  const { isReady, ...router } = useRouter();
  const query = router.query;
  const tableId = query.tableId as string;
  const { menuCategories } = useAppSelector((state) => state.MenuCategory);

  const { menus } = useAppSelector((state) => state.Menu);
  const { menuMenuCategories } = useAppSelector(
    (state) => state.MenuMenuCategory
  );
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<menuCategory>();
  const [value, setValue] = useState<Number>(0);
  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);
  useEffect(() => {
    if (isReady && !tableId) {
      router.push("/");
    }
  }, [isReady]);
  const menusRightNow = () => {
    const menuIds = menuMenuCategories
      .filter((item) => item.menuCategoryId === selectedMenuCategory?.id)
      .map((item) => item.menuId);
    const Menus = menus.filter((item) => menuIds.includes(item.id));
    return Menus.map((item) => {
      const href = { pathname: `/order/menu/${item.id}`, query };
      return <MenuCards key={item.id} menu={item} href={href} />;
    });
  };

  return (
    <Box>
      <Box>
        <Tabs
          TabIndicatorProps={{
            style: { background: "#1B9C85" },
          }}
          value={value}
          onChange={(event, value) => setValue(value)}
          sx={{
            pb: 1,

            ".Mui-selected": {
              color: "#1B9C85",
              fontWeight: "bold",
            },
          }}
        >
          {" "}
          {menuCategories.map((item) => {
            return (
              <Tab
                key={item.id}
                label={item.name}
                onClick={() => setSelectedMenuCategory(item)}
              />
            );
          })}
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          px: 2,
        }}
      >
        {menusRightNow()}
      </Box>
    </Box>
  );
};

export default orderApp;
