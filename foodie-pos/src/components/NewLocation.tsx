import { useAppDispatch } from "@/store/hooks";
import { openSnackBar } from "@/store/slices/AppSnackBar";
import { addLocation, createNewLocaion } from "@/store/slices/locationSlice";
import { NewLocationPayload } from "@/type/location";
import {
  Avatar,
  Button,
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
import { Dispatch, SetStateAction, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newLocation: NewLocationPayload;
  setNewLocation: Dispatch<SetStateAction<NewLocationPayload>>;
}
const NewLocationDialog = ({
  open,
  setOpen,
  newLocation,
  setNewLocation,
}: Prop) => {
  const dispatch = useAppDispatch();
  const handleCreateLocation = async () => {
    const isValid =
      newLocation.name &&
      newLocation.city &&
      newLocation.street &&
      newLocation.township;
    if (!isValid) return;
    dispatch(
      createNewLocaion({
        ...newLocation,
        onSuccess: () =>
          dispatch(
            openSnackBar({
              type: "success",
              message: "Menu Created Successfully",
            })
          ),
        onError: () => {
          dispatch(openSnackBar({ type: "error", message: "Error Occured" }));
        },
      })
    );
    setOpen(false);
  };
  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <DialogTitle>Create New Location</DialogTitle>
      <DialogContent
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}
      >
        <TextField
          variant="outlined"
          color="success"
          onChange={(event) =>
            setNewLocation({ ...newLocation, name: event.target.value })
          }
          label="Location Name"
          sx={{ mt: 1 }}
        />
        <TextField
          variant="outlined"
          label="Street"
          color="success"
          onChange={(event) =>
            setNewLocation({ ...newLocation, street: event.target.value })
          }
          sx={{ mt: 1 }}
        />
        <TextField
          variant="outlined"
          label="Town Ship"
          color="success"
          onChange={(event) =>
            setNewLocation({ ...newLocation, township: event.target.value })
          }
          sx={{ mt: 1 }}
        />
        <TextField
          variant="outlined"
          color="success"
          label="City"
          onChange={(event) =>
            setNewLocation({ ...newLocation, city: event.target.value })
          }
          sx={{ mt: 1 }}
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
          onClick={handleCreateLocation}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NewLocationDialog;
