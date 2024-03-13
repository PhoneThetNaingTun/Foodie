import Layout from "@/components/BackOfficeLayout";
import { Box, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";

const logIn = () => {
  return (
    <Layout>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "35%",
            height: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderLeft: "2px solid #40A2E3",
            borderBottom: "2px solid #40A2E3",
            borderRight: "2px solid #0D9276",
            borderTop: "2px solid #0D9276",
          }}
        >
          {" "}
          <Button
            variant="contained"
            onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
            sx={{
              padding: "20px 30px",
              backgroundColor: "#40A2E3",
              "&:hover": { bgcolor: "#0c6b56" },
            }}
          >
            <GoogleIcon sx={{ marginRight: "30px" }} /> LogIn With Google
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default logIn;
