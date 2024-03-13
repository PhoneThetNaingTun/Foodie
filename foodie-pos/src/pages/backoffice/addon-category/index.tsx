import Layout from "@/components/BackOfficeLayout";
import NewAddonCategoryDialog from "@/components/NewAddonCategory";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const AddonCategory = () => {
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
            Creat New Addon Category
          </Button>
        </Box>
      </Box>
      <NewAddonCategoryDialog open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default AddonCategory;
