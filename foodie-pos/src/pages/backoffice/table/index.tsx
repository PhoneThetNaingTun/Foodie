import Layout from "@/components/BackOfficeLayout";
import NewTableDialog from "@/components/NewTableDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Table = () => {
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
            Creat New Table
          </Button>
        </Box>
      </Box>
      <NewTableDialog open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Table;
