import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeSnackBar } from "@/store/slices/AppSnackBar";
import { Alert, Box, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

const SnackBar = () => {
  const { type, open, message } = useAppSelector((state) => state.SnackBar);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(closeSnackBar());
    }, 3000);
  }, [message]);
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        message="I love snacks"
      >
        <Alert
          variant="filled"
          severity={type}
          onClose={() => dispatch(closeSnackBar())}
          sx={{
            width: "100%",
            bgcolor: type === "error" ? "#EE4266" : "#1B9C85",
            color: "#ffff",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Snackbar;
