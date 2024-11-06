import Layout from "@/components/BackOfficeLayout";
import ItemCardGrid from "@/components/ItemCardGrid";
import NewAddonCategoryDialog from "@/components/NewAddonCategory";
import { useAppSelector } from "@/store/hooks";
import { NewAddonCategoryPayload } from "@/type/addonCategory";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import ClassIcon from "@mui/icons-material/Class";

const AddonCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [NewAddonCategory, setNewAddonCategory] =
    useState<NewAddonCategoryPayload>({
      name: "",
      isRequired: true,
      menuIds: [],
    });
  const { addonCategories } = useAppSelector((state) => state.AddonCategory);
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
            Creat New Addon Category
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {" "}
        {addonCategories.map((item) => {
          return (
            <ItemCardGrid
              icon={<ClassIcon />}
              title={item.name}
              href={`/backoffice/addon-category/${item.id}`}
              isAvailable={true}
            />
          );
        })}
      </Box>
      <NewAddonCategoryDialog
        open={open}
        setOpen={setOpen}
        NewAddonCategory={NewAddonCategory}
        setNewAddonCategory={setNewAddonCategory}
      />
    </Box>
  );
};
export default AddonCategory;
