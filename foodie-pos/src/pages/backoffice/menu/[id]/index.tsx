import Layout from "@/components/BackOfficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { menu, menuCategory } from "@prisma/client";

import { useEffect, useState } from "react";
import { UpdateMenuPayload } from "@/type/menu";

const MenuDetail = () => {
  const [updatedMenuData, setUpdatedMenuData] = useState<UpdateMenuPayload>();
  const [selected, setSelected] = useState<number[]>([]);
  const router = useRouter();
  const menuId = Number(router.query.id);
  const { menus } = useAppSelector((state) => state.Menu);
  const { menuCategories } = useAppSelector((state) => state.MenuCategory);
  const menu = menus.find((item) => item.id === menuId);
  const { menuMenuCategories } = useAppSelector(
    (state) => state.MenuMenuCategory
  );
  const selectedMenuCategoryIds = menuMenuCategories
    .filter((item) => item.menuId === menuId)
    .map((item) => {
      const menuCategory = menuCategories.find(
        (menuCategory) => menuCategory.id === item.menuCategoryId
      ) as menuCategory;
      return menuCategory.id;
    });
  useEffect(() => {
    if (menu) {
      setUpdatedMenuData(menu);
      setSelected(selectedMenuCategoryIds);
    }
  }, [menu]);

  if (!updatedMenuData) {
    return (
      <Layout>
        <Typography>Menu Not Found</Typography>
      </Layout>
    );
  }
  return (
    <Layout>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 500,
            justifyContent: "center",
            backgroundColor: "#eef3e9",
            padding: 3,
            borderRadius: 5,
            backdropFilter: "2px 2px black",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 3, fontFamily: "monospace" }}
          >
            Eidt Menu Detail
          </Typography>
          <TextField
            variant="outlined"
            label="name"
            value={updatedMenuData?.name}
            onChange={(event) => {
              setUpdatedMenuData({
                ...updatedMenuData,
                name: event.target.value,
              });
            }}
          />
          <TextField
            variant="outlined"
            value={updatedMenuData.price}
            label="price"
            onChange={(event) => {
              setUpdatedMenuData({
                ...updatedMenuData,
                price: Number(event.target.value),
              });
            }}
          />
          <FormControl>
            <InputLabel>Menu Category</InputLabel>
            <Select
              multiple
              value={selected}
              onChange={(event) => {
                const selectedMenuCategories = event.target.value as number[];
                setSelected(selectedMenuCategories);
              }}
              renderValue={() => {
                return selected
                  .map((itemId) =>
                    menuCategories.find((item) => item.id === itemId)
                  )
                  .map((item) => item?.name)
                  .join(", ");
              }}
              input={<OutlinedInput label="Menu Categories" />}
            >
              {menuCategories.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    <Checkbox checked={selected.includes(item.id)} />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Layout>
  );
};

export default MenuDetail;
