import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSnackBar } from "@/store/slices/AppSnackBar";
import { addMenu, createMenu } from "@/store/slices/menuSlice";
import { NewMenuPayload } from "@/type/menu";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FileDropZone from "./FileDropZone";
import { uploadAsset } from "@/store/slices/AppSlice";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMenu: NewMenuPayload;
  setNewMenu: React.Dispatch<React.SetStateAction<NewMenuPayload>>;
}
const NewMenuDialog = ({ open, setOpen, newMenu, setNewMenu }: Prop) => {
  const { isLoading } = useAppSelector((state) => state.Menu);
  const [imageFile, setImageFile] = useState<File>();
  const dispatch = useAppDispatch();
  const { menuCategories } = useAppSelector((state) => state.MenuCategory);
  const handleCreate = async () => {
    const isValid = newMenu.name;
    if (!newMenu.menuCategoryId.length) {
      return dispatch(
        openSnackBar({
          type: "error",
          message: "Must Choose At Least One Menu Category",
        })
      );
    }
    if (!isValid) return;
    if (imageFile) {
      dispatch(
        uploadAsset({
          file: imageFile,
          onSuccess: (assetUrl) => {
            newMenu.assetUrl = assetUrl;
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
                  dispatch(
                    openSnackBar({ type: "error", message: "Erroe Occured!" })
                  );
                },
              })
            );
          },
        })
      );
    }
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
            sx={{ mb: 3 }}
          />
          <FormControl sx={{ widdth: "100%" }}>
            <InputLabel>Menu Categories</InputLabel>
            <Select
              input={<OutlinedInput label="Menu Category" />}
              value={newMenu.menuCategoryId}
              multiple
              onChange={(event) => {
                setNewMenu({
                  ...newMenu,
                  menuCategoryId: event.target.value as number[],
                });
              }}
              renderValue={() => {
                const selectedMenuCategory = newMenu.menuCategoryId.map((id) =>
                  menuCategories.find((item) => item.id === id)
                );
                return selectedMenuCategory
                  .map((item) => item?.name)
                  .join(", ");
              }}
            >
              {menuCategories.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    <Checkbox
                      checked={newMenu.menuCategoryId.includes(item.id)}
                    />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FileDropZone onDrop={(files) => setImageFile(files[0])} />
          {imageFile && (
            <Chip
              sx={{ mt: 2 }}
              label={imageFile.name}
              onDelete={() => setImageFile(undefined)}
            />
          )}
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
