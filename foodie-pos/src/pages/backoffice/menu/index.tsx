import Layout from "@/components/BackOfficeLayout";
import NewMenuDialog from "@/components/NewMenuDialog";
import { NewMenuPayload } from "@/type/menu";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [newMenu, setNewMenu] = useState<NewMenuPayload>({
    name: "",
    price: 0,
  });
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
            Creat New Menu
          </Button>
        </Box>
      </Box>
      <NewMenuDialog
        open={open}
        setOpen={setOpen}
        newMenu={newMenu}
        setNewMenu={setNewMenu}
      />
    </Layout>
  );
};

export default Menu;
