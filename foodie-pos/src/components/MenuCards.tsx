import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { menu } from "@prisma/client";
import Link from "next/link";

interface Prop {
  menu: menu;
  href: string | object;
  isAvailable?: boolean;
}

const MenuCards = ({ menu, href, isAvailable }: Prop) => {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        marginRight: "15px",
        marginBottom: "20px",
      }}
    >
      <Card
        title={isAvailable === false ? "Unavailable" : ""}
        sx={{
          width: { xs: 150, sm: 220 },
          height: { xs: 150, sm: 220 },
          pb: { xs: 2 },

          opacity: isAvailable === false ? 0.4 : 1,

          borderRadius: "100px 5px 5px 5px",
        }}
      >
        <CardMedia
          sx={{ height: { xs: 100, sm: 140 }, objectFit: "contain" }}
          image={menu.assetUrl || ""}
        />
        <CardContent>
          <Box sx={{ textAlign: "center" }}>
            {" "}
            <Typography>{menu.name}</Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            {" "}
            <Typography>{menu.price}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCards;
