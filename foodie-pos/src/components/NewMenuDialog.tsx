import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSnackBar } from "@/store/slices/AppSnackBar";
import { addMenu, createMenu } from "@/store/slices/menuSlice";
import { NewMenuPayload } from "@/type/menu";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMenu: NewMenuPayload;
  setNewMenu: React.Dispatch<React.SetStateAction<NewMenuPayload>>;
}
const NewMenuDialog = ({ open, setOpen, newMenu, setNewMenu }: Prop) => {
  const { isLoading } = useAppSelector((state) => state.Menu);
  const dispatch = useAppDispatch();
  const handleCreate = async () => {
    const isValid = newMenu.name;
    if (!isValid) return;
    dispatch(
      createMenu({
        ...newMenu,
        onSuccess: () => {
          dispatch(
            openSnackBar({
              type: "success",
              message: "Menu Created SuccessFully",
            })
          );
          setOpen(false);
        },
        onError: () => {
          dispatch(openSnackBar({ type: "error", message: "Erroe Occured!" }));
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
      <DialogTitle>Add New Menu</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Name"
            variant="outlined"
            sx={{
              mb: "20px",
              mt: "10px",
            }}
            color="success"
            onChange={(event) =>
              setNewMenu({ ...newMenu, name: event.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            color="success"
            onChange={(event) => {
              setNewMenu({ ...newMenu, price: Number(event.target.value) });
            }}
          />
        </Box>
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
          onClick={() => {
            handleCreate();
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: "#E8F6EF" }} />
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMenuDialog;
