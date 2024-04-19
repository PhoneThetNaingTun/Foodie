import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddon } from "@/store/slices/AddonSlice";
import { openSnackBar } from "@/store/slices/AppSnackBar";
import { NewAddonPayload } from "@/type/addon";
import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newAddon: NewAddonPayload;
  setNewAddon: Dispatch<SetStateAction<NewAddonPayload>>;
}
const NewAddonDialog = ({ open, setOpen, newAddon, setNewAddon }: Prop) => {
  const { addonCategories } = useAppSelector((state) => state.AddonCategory);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    setNewAddon({ ...newAddon, AddonCategoryId: selected });
  }, [selected]);
  const handleCreateAddon = () => {
    if (!selected) {
      dispatch(
        openSnackBar({
          type: "error",
          message: "Must Choose One Addon Category",
        })
      );
    }
    const isValid = newAddon.name && newAddon.price !== undefined;
    if (!isValid) return;
    newAddon.AddonCategoryId = selected;
    console.log(newAddon);
    dispatch(
      createAddon({
        ...newAddon,
        onSuccess: () => {
          dispatch(
            openSnackBar({
              type: "success",
              message: "Create Addon Successfully",
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
      <DialogTitle>NewAddonDialog</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="Name"
          variant="outlined"
          onChange={(event) =>
            setNewAddon({ ...newAddon, name: event.target.value })
          }
          sx={{ mt: 2 }}
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          onChange={(event) =>
            setNewAddon({ ...newAddon, price: Number(event.target.value) })
          }
          sx={{ mt: 2 }}
        />
        <FormControl sx={{ width: "100%", mt: 2 }}>
          <InputLabel>Addon Categories</InputLabel>
          <Select
            input={<OutlinedInput label="Addon Category" />}
            value={selected}
            onChange={(event) => {
              setSelected(Number(event.target.value));
            }}
          >
            {addonCategories.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
          onClick={handleCreateAddon}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NewAddonDialog;
