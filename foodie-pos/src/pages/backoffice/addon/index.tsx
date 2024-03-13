import Layout from "@/components/BackOfficeLayout";
import NewAddonDialog from "@/components/NewAddonDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Addon = () => {
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
            Creat New Addon
          </Button>
        </Box>
      </Box>
      <NewAddonDialog open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Addon;
