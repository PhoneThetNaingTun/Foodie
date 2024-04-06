import Layout from "@/components/BackOfficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdatedMenuCategoryPayload } from "@/type/menuCategory";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  DeleteMenuCategory,
  UpdateMenuCategory,
} from "@/store/slices/menuCategorySlice";
import DeleteDialog from "@/components/DeleteDialog";
import { openSnackBar } from "@/store/slices/AppSnackBar";

const MenuCategoryDetail = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const menuCategoryId = Number(router.query.id);
  const [updateData, setUpdateData] = useState<UpdatedMenuCategoryPayload>();
  const { menuCategories } = useAppSelector((state) => state.MenuCategory);
  const { isLoading, selectedLocation } = useAppSelector((state) => state.App);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );

  const { disableLocationMenucategories } = useAppSelector(
    (state) => state.DisableLocationMenuCategory
  );

  const isAvailable = disableLocationMenucategories.find(
    (item) =>
      item.MenuCategoryId === menuCategoryId &&
      selectedLocation?.id === item.locationId
  )
    ? false
    : true;

  useEffect(() => {
    if (menuCategory) {
      setUpdateData({
        ...menuCategory,
        isAvailable,
        locationId: selectedLocation?.id,
      });
    }
  }, [menuCategory]);

  if (isLoading) return;

  const handleUpdate = () => {
    updateData &&
      dispatch(
        UpdateMenuCategory({
          ...updateData,
          onSuccess: () => {
            dispatch(
              openSnackBar({ type: "success", message: "Updated Successfully" })
            );
            router.push("/backoffice/menu-category");
          },
          onError: () => {
            dispatch(openSnackBar({ type: "error", message: "Error Occur" }));
          },
        })
      );
  };
  console.log(updateData);
  if (!updateData) {
    return (
      <Layout>
        <Typography>Menu category not found</Typography>
      </Layout>
    );
  }
  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/backoffice/menu-category");
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#0D9276",
            "&:hover": { backgroundColor: "#0D9250" },
          }}
        >
          <ReplyIcon sx={{ mb: "1px", mr: "3px" }} /> Back
        </Button>
      </Box>
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
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 3, fontFamily: "monospace" }}
          >
            Edit MenuCategory Detail
          </Typography>
          <TextField
            variant="outlined"
            label="Menu Category Name"
            color="success"
            value={updateData.name}
            onChange={(event) =>
              setUpdateData({ ...updateData, name: event.target.value })
            }
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                color="success"
                defaultChecked={isAvailable}
                onChange={(event, value) => {
                  setUpdateData({ ...updateData, isAvailable: value });
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
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        message="Are You Sure You Want To Delete This Menu Category?"
        handleDelete={() => {
          dispatch(DeleteMenuCategory({ id: menuCategoryId }));
          setOpen(false);
          router.push("/backoffice/menu-category");
        }}
      />
    </Layout>
  );
};

export default MenuCategoryDetail;
