import Layout from "@/components/BackOfficeLayout";
import ItemCardGrid from "@/components/ItemCardGrid";
import NewAddonDialog from "@/components/NewAddonDialog";
import { useAppSelector } from "@/store/hooks";
import { NewAddonPayload } from "@/type/addon";
import { Box, Button, Typography } from "@mui/material";
import EggIcon from "@mui/icons-material/Egg";

import { useState } from "react";

const Addon = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { addons } = useAppSelector((state) => state.Addon);
  const [newAddon, setNewAddon] = useState<NewAddonPayload>({
    name: "",
    price: 0,
    AddonCategoryId: undefined,
  });
  return (
    <Box>
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
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {addons.map((item) => {
          return (
            <ItemCardGrid
              key={item.id}
              icon={<EggIcon />}
              title={item.name}
              href={`/backoffice/addon/${item.id}`}
              isAvailable={true}
            />
          );
        })}
      </Box>
      <NewAddonDialog
        open={open}
        setOpen={setOpen}
        newAddon={newAddon}
        setNewAddon={setNewAddon}
      />
    </Box>
  );
};

export default Addon;
