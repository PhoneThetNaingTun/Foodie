import Layout from "@/components/BackOfficeLayout";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SetStateAction, useEffect, useState } from "react";
import { UpdateAddonCategoryPayload } from "@/type/addonCategory";
import DeleteDialog from "@/components/DeleteDialog";
import {
  deleteAddonCategory,
  updatedAddonCategory,
} from "@/store/slices/AddonCategorySlice";
import { openSnackBar } from "@/store/slices/AppSnackBar";

const AddonCategoryDetails = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { addonCategories } = useAppSelector((state) => state.AddonCategory);
  const { menus } = useAppSelector((state) => state.Menu);
  const { menuAddonCategories } = useAppSelector(
    (state) => state.MenuAddonCategory
  );
  const { company } = useAppSelector((state) => state.Company);
  const [updateAddonCategory, setUpdateAddonCateogry] =
    useState<UpdateAddonCategoryPayload>();
  const [selected, setSelected] = useState<number[]>([]);

  const router = useRouter();
  const addonCategoryId = Number(router.query.id);
  const addonCategory = addonCategories.find(
    (item) => item.id === addonCategoryId
  );
  const selectedMenuIds = menuAddonCategories
    .filter((item) => item.AddonCategoryId === addonCategoryId)
    .map((item) => item.menuId);

  useEffect(() => {
    if (addonCategory) {
      setUpdateAddonCateogry({
        ...addonCategory,
        menuIds: selectedMenuIds,
        companyId: company?.id,
      });
      setSelected(selectedMenuIds);
    }
  }, [addonCategory]);

  useEffect(() => {
    if (updateAddonCategory) {
      setUpdateAddonCateogry({
        ...updateAddonCategory,
        menuIds: selected,
        companyId: company?.id,
      });
    }
  }, [selected]);

  if (!updateAddonCategory) {
    return (
      <Box>
        <Typography>AddonCategory Not Found</Typography>
      </Box>
    );
  }
  const handleUpdateAddonCategory = () => {
    if (!updateAddonCategory.menuIds.length) {
      dispatch(
        openSnackBar({
          type: "error",
          message: "Must Conatin At Least One Menu",
        })
      );
    }
    dispatch(
      updatedAddonCategory({
        ...updateAddonCategory,
        onSuccess: () => {
          dispatch(
            openSnackBar({
              type: "success",
              message: "Addon Category Updated Successfully",
            })
          );
          router.push("/backoffice/addon-category");
        },
        onError: () => {
          dispatch(openSnackBar({ type: "error", message: "Error Occured" }));
        },
      })
    );
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/backoffice/addon-category");
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
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 4 }}>
        <Box
          sx={{
            backgroundColor: "#eef3e9",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            {" "}
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                mb: 0.5,
                fontFamily: "monospace",
                p: 4,
              }}
            >
              Edit Addon Category Detail
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
            }}
          >
            <TextField
              variant="outlined"
              label="Addon Category Name"
              defaultValue={addonCategory?.name}
              sx={{ mb: 2 }}
              onChange={(event) =>
                setUpdateAddonCateogry({
                  ...updateAddonCategory,
                  name: event.target.value,
                })
              }
            />
            <FormControl>
              <Select
                multiple
                value={selected}
                onChange={(event) => {
                  const selectedMenus = event.target.value as number[];
                  setSelected(selectedMenus);
                }}
                renderValue={() => {
                  return selected
                    .map((itemId) => menus.find((item) => item.id === itemId))
                    .map((item) => item?.name)
                    .join(", ");
                }}
              >
                {menus.map((item) => {
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              width: "80%",
              paddingBottom: 4,
            }}
          >
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
              onClick={handleUpdateAddonCategory}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        message="Are You Sure You Want To Delete This Addon Category?"
        handleDelete={() => {
          dispatch(
            deleteAddonCategory({
              id: addonCategoryId,
              onSuccess: () => {
                dispatch(
                  openSnackBar({
                    type: "success",
                    message: "Deleted Successfully",
                  })
                );
                setOpen(false);
                router.push("/backoffice/addon-category");
              },
            })
          );
        }}
      />
    </Box>
  );
};

export default AddonCategoryDetails;
