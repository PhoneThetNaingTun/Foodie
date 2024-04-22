import Layout from "@/components/BackOfficeLayout";
import { Box, Button, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import WavingHandIcon from "@mui/icons-material/WavingHand";

const backOffice = () => {
  const { data, status } = useSession();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: 80 }}>
        <WavingHandIcon sx={{ fontSize: 80, mr: 2, color: "yellow" }} />
        Welcome {data?.user?.name}
      </Typography>
    </Box>
  );
};

export default backOffice;
