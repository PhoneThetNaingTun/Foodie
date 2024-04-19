import { useAppDispatch } from "@/store/hooks";
import { openSnackBar } from "@/store/slices/AppSnackBar";
import { createTable } from "@/store/slices/TableSlice";
import { NewTablePayload } from "@/type/table";
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
  newTable: NewTablePayload;
  setNewTable: Dispatch<SetStateAction<NewTablePayload>>;
}
const NewTableDialog = ({ open, setOpen, newTable, setNewTable }: Prop) => {
  const dispatch = useAppDispatch();
  const handleCreateTable = () => {
    const isValid = newTable.name;
    if (!isValid) {
      return dispatch(
        openSnackBar({
          type: "error",
          message: "You Have To Put Name To Create",
        })
      );
    }
    console.log(newTable);
    dispatch(
      createTable({
        ...newTable,
        onSuccess: () => {
          dispatch(
            openSnackBar({
              type: "success",
              message: "Table Created Successfully",
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
      <DialogTitle>NewTableDialog</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          sx={{
            mb: "20px",
            mt: "10px",
          }}
          color="success"
          onChange={(event) =>
            setNewTable({ ...newTable, name: event.target.value })
          }
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
          onClick={handleCreateTable}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NewTableDialog;
