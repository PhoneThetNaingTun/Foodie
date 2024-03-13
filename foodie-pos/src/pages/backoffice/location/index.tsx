import Layout from "@/components/BackOfficeLayout";
import NewLocationDialog from "@/components/NewLocation";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Location = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0D9276",
              "&:hover": { backgroundColor: "#0D8376" },
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            Creat New Location
          </Button>
        </Box>
      </Box>
      <NewLocationDialog open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Location;
