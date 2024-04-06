import { useAppDispatch } from "@/store/hooks";
import { openSnackBar } from "@/store/slices/AppSnackBar";
import {
  addMenuCategory,
  createNewMenuCategory,
} from "@/store/slices/menuCategorySlice";
import { NewMenuCategoryPayload } from "@/type/menuCategory";
import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { type } from "os";
import { Dispatch, SetStateAction, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMenuCategory: NewMenuCategoryPayload;
  setNewMenuCategory: Dispatch<SetStateAction<NewMenuCategoryPayload>>;
}
const NewMenuCategoryDialog = ({
  open,
  setOpen,
  newMenuCategory,
  setNewMenuCategory,
}: Prop) => {
  console.log(newMenuCategory);
  const dispatch = useAppDispatch();
  const handleCreateNewMenuCategory = () => {
    const isValid = newMenuCategory.name;
    if (!isValid) return;
    dispatch(
      createNewMenuCategory({
        ...newMenuCategory,
        onSuccess: () => {
          dispatch(
            openSnackBar({
              type: "success",
              message: "New Menu Category Created Successfully",
            })
          );
          setOpen(false);
        },
        onError: () => {
          dispatch(openSnackBar({ type: "error", message: "Error Occured" }));
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
      <DialogTitle>Create New Menu Category</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          variant="outlined"
          label="Name"
          color="success"
          sx={{ mt: 1, "&:hover": { border: "green" } }}
          onChange={(event) => {
            setNewMenuCategory({
              ...newMenuCategory,
              name: event.target.value,
            });
          }}
        ></TextField>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: teal[900],
                "&.Mui-checked": {
                  color: teal[900],
                },
              }}
              checked={newMenuCategory.isAvailable}
              onChange={(event, value) => {
                setNewMenuCategory({
                  ...newMenuCategory,
                  isAvailable: value,
                });
              }}
            />
          }
          label="Available"
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
          onClick={handleCreateNewMenuCategory}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NewMenuCategoryDialog;
