import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  handleDelete: () => void;
}

const DeleteDialog = ({ open, setOpen, message, handleDelete }: Prop) => {
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: "black" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{
              backgroundColor: "#CC3333",
              "&:hover": { backgroundColor: "#CC0000" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteDialog;
