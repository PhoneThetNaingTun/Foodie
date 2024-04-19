import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddonCategory } from "@/store/slices/AddonCategorySlice";
import { openSnackBar } from "@/store/slices/AppSnackBar";
import { NewAddonCategoryPayload } from "@/type/addonCategory";
import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { Dispatch, SetStateAction, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  NewAddonCategory: NewAddonCategoryPayload;
  setNewAddonCategory: Dispatch<SetStateAction<NewAddonCategoryPayload>>;
}
const NewAddonCategoryDialog = ({
  open,
  setOpen,
  NewAddonCategory,
  setNewAddonCategory,
}: Prop) => {
  const dispatch = useAppDispatch();
  const { menus } = useAppSelector((state) => state.Menu);

  const handleCreateAddonCategory = () => {
    if (!NewAddonCategory.menuIds.length) {
      return dispatch(
        openSnackBar({
          type: "error",
          message: "Must choose at least one Menu",
        })
      );
    }
    dispatch(
      createAddonCategory({
        ...NewAddonCategory,
        onSuccess: () => {
          dispatch(
            openSnackBar({
              type: "success",
              message: "Addon Category Created Successfully",
            })
          );
          setOpen(false);
        },
        onError: () => {
          dispatch(
            openSnackBar({
              type: "error",
              message: "Error Occured",
            })
          );
        },
      })
    );
  };
  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <DialogTitle>New Addon Category Dialog</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          variant="outlined"
          label="Name"
          onChange={(event) =>
            setNewAddonCategory({
              ...NewAddonCategory,
              name: event.target.value,
            })
          }
          sx={{
            mt: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.23)", // default
              },
              "&.Mui-focused fieldset": {
                border: "2px solid #0D9276", // focus
              },
            },
            color: "#0D9276",
          }}
        />
        <FormControl>
          <Select
            sx={{
              mt: 3,
              mb: 2,
            }}
            multiple
            value={NewAddonCategory.menuIds}
            onChange={(event) =>
              setNewAddonCategory({
                ...NewAddonCategory,
                menuIds: event.target.value as number[],
              })
            }
            renderValue={() => {
              const selectedMenu = NewAddonCategory.menuIds.map((id) =>
                menus.find((item) => item.id === id)
              );
              return selectedMenu.map((item) => item?.name).join(", ");
            }}
          >
            {menus.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  <Checkbox
                    checked={NewAddonCategory.menuIds.includes(item.id)}
                  />
                  <ListItemText primary={item.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={NewAddonCategory.isRequired}
              onChange={(event, value) =>
                setNewAddonCategory({ ...NewAddonCategory, isRequired: value })
              }
            />
          }
          label={"IsRequired"}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={() => {
            setOpen(false);
          }}
          sx={{ color: "#0D8376" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0D9276",
            "&:hover": { backgroundColor: "#0D8376" },
          }}
          onClick={handleCreateAddonCategory}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NewAddonCategoryDialog;
