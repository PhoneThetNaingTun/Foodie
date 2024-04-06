import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Prop {
  icon: ReactNode;
  title: string;
  href: string;
  isAvailable?: boolean;
  subTitle?: string;
}

const ItemCard = ({ icon, title, href, isAvailable, subTitle }: Prop) => {
  return (
    <Link href={href}>
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          cursor: "pointer",
          m: 2,
          opacity: isAvailable ? 1 : 0.4,
        }}
      >
        <Box
          sx={{
            flexBasis: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          {icon}
        </Box>
        <Box sx={{ flexBasis: "60%" }}>
          <Typography sx={{}} variant="h4">
            {title}
          </Typography>
          {subTitle && <Typography>{subTitle}</Typography>}
        </Box>
      </Paper>
    </Link>
  );
};

export default ItemCard;
