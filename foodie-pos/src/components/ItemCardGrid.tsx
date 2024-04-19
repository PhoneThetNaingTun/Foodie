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
  image?: string | null;
}

const ItemCardGrid = ({
  icon,
  title,
  price,
  href,
  isAvailable,
  subTitle,
  image,
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
          justifyContent: "space-between",
          flexDirection: "column",
          opacity: isAvailable ? 1 : 0.5,
          m: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {image ? (
            <Box
              component="img"
              sx={{
                height: "100%",
                width: { xs: "100%", md: "100%" },
              }}
              alt={title}
              src={image}
            />
          ) : (
            icon
          )}
        </Box>
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
