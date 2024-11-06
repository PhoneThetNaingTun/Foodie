import { Box, Button, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Prop {
  quantity: number;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

const quantitySelector = ({
  quantity,
  handleQuantityDecrease,
  handleQuantityIncrease,
}: Prop) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "50%",
        mb: 1,
      }}
    >
      <Button
        onClick={handleQuantityDecrease}
        sx={{
          bgcolor: "#3A9ADE",
          color: "#fff",
          width: "fit-content",
          ":hover": { bgcolor: "#3A5AD3" },
        }}
      >
        -
      </Button>
      <Typography>{quantity}</Typography>
      <Button
        onClick={handleQuantityIncrease}
        sx={{
          bgcolor: "#3A9ADE",
          color: "#fff",
          width: "fit-content",
          ":hover": { bgcolor: "#3A5AD3" },
        }}
      >
        +
      </Button>
    </Box>
  );
};
export default quantitySelector;
