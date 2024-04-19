import Layout from "@/components/BackOfficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Box,
  Button,
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
import ReplyIcon from "@mui/icons-material/Reply";
import { menu, menuCategory } from "@prisma/client";
import DeleteDialog from "@/components/DeleteDialog";
import { useEffect, useState } from "react";
import { UpdateMenuPayload } from "@/type/menu";
import BackButton from "@/components/BackButton";
import { DeleteMenu, updateMenu } from "@/store/slices/menuSlice";
import { openSnackBar } from "@/store/slices/AppSnackBar";

const MenuDetail = () => {
  const [updatedMenuData, setUpdatedMenuData] = useState<UpdateMenuPayload>();
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const menuId = Number(router.query.id);
  const { menus } = useAppSelector((state) => state.Menu);
  const { menuCategories } = useAppSelector((state) => state.MenuCategory);
  const menu = menus.find((item) => item.id === menuId);
  const { menuMenuCategories } = useAppSelector(
    (state) => state.MenuMenuCategory
  );
  const { selectedLocation } = useAppSelector((state) => state.App);
  const { disableLocationMenus } = useAppSelector(
    (state) => state.DisableLocationMenu
  );
  const isAvailable = disableLocationMenus.find(
    (item) => item.MenuId === menuId && item.locationId === selectedLocation?.id
  )
    ? false
    : true;
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
  useEffect(() => {
    if (updatedMenuData) {
      setUpdatedMenuData({
        ...updatedMenuData,
        locationId: selectedLocation?.id,
        isAvailable,
        menuCategoryIds: selected,
      });
    }
  }, [selected]);
  if (!updatedMenuData) {
    return (
      <Box>
        <Typography>Menu Not Found</Typography>
      </Box>
    );
  }
  const handleMenuUpdate = () => {
    console.log(updatedMenuData);
    updatedMenuData &&
      dispatch(
        updateMenu({
          ...updatedMenuData,
          onSuccess: () => {
            dispatch(
              openSnackBar({ type: "success", message: "Updated Successfully" })
            );
            router.push("/backoffice/menu");
          },
        })
      );
  };
  return (
    <Box>
      <BackButton route="menu" />
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
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
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
          <FormControl sx={{ mb: 2 }}>
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
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                defaultChecked={isAvailable}
                onChange={(event, value) => {
                  setUpdatedMenuData({
                    ...updatedMenuData,
                    isAvailable: value,
                  });
                }}
              />
            }
            label="Available"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#cc3333",
                "&:hover": { backgroundColor: "#CC0000" },
              }}
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0D9276",
                "&:hover": { backgroundColor: "#0D9250" },
              }}
              onClick={handleMenuUpdate}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        message={"Are You Sure You Want To Delete This Menu?"}
        handleDelete={() => {
          dispatch(
            DeleteMenu({
              id: menuId,
              onSuccess: () => {
                dispatch(
                  openSnackBar({
                    type: "success",
                    message: "Menu Deleted Successfully!",
                  })
                );
              },
              onError: () => {
                dispatch(
                  openSnackBar({ type: "error", message: "Error Occured" })
                );
              },
            })
          );
          setOpen(false);
          router.push("/backoffice/menu");
        }}
      />
    </Box>
  );
};

export default MenuDetail;
