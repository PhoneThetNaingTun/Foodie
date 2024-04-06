import Layout from "@/components/BackOfficeLayout";
import NewMenuDialog from "@/components/NewMenuDialog";
import { config } from "@/config";
import { useAppSelector } from "@/store/hooks";
import { NewMenuPayload } from "@/type/menu";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ItemCardGrid from "@/components/ItemCardGrid";

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [newMenu, setNewMenu] = useState<NewMenuPayload>({
    name: "",
    price: 0,
    menuCategoryId: [],
  });
  const { menus } = useAppSelector((state) => state.Menu);

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
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {menus.map((item) => {
          return (
            <ItemCardGrid
              key={item.id}
              icon={<LocalDiningIcon />}
              title={item.name}
              price={item.price}
              href={`/backoffice/menu/${item.id}`}
            />
          );
        })}
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
