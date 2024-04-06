import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Prop {
  icon: ReactNode;
  title: string;
  href: string;
  isAvailable?: boolean;
  subTitle?: string;
  price?: number;
}

const ItemCardGrid = ({
  icon,
  title,
  price,
  href,
  isAvailable,
  subTitle,
}: Prop) => {
  return (
    <Link href={href}>
      <Paper
        elevation={2}
        sx={{
          width: 180,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
          m: 2,
        }}
      >
        <Box> {icon}</Box>
        <Box>
          <Typography>{title}</Typography>
          {price && <Typography>{price} (Kyat)</Typography>}
          {subTitle && <Typography>{subTitle}</Typography>}
        </Box>
      </Paper>
    </Link>
  );
};

export default ItemCardGrid;
