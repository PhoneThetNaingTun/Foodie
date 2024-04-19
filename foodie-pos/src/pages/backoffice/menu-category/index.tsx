import Layout from "@/components/BackOfficeLayout";
import ItemCard from "@/components/ItemCard";
import NewMenuCategoryDialog from "@/components/NewMenuCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import { NewMenuCategoryPayload } from "@/type/menuCategory";

const MenuCategory = () => {
  const { company } = useAppSelector((state) => state.Company);
  const { menuCategories } = useAppSelector((state) => state.MenuCategory);
  const { disableLocationMenucategories } = useAppSelector(
    (state) => state.DisableLocationMenuCategory
  );
  const { selectedLocation } = useAppSelector((state) => state.App);
  const [open, setOpen] = useState<boolean>(false);
  const [newMenuCategory, setNewMenuCategory] =
    useState<NewMenuCategoryPayload>({
      name: "",
      isAvailable: true,
      companyId: company?.id,
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
            Creat New MenuCategory
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          mt: 2,
          flexDirection: "column",
          width: "100%",
        }}
      >
        {menuCategories.map((menucategory) => {
          const isAvailable = disableLocationMenucategories.find(
            (item) =>
              menucategory.id === item.MenuCategoryId &&
              selectedLocation?.id === item.locationId
          )
            ? false
            : true;
          return (
            <ItemCard
              key={menucategory.id}
              icon={<CategoryIcon />}
              title={menucategory.name}
              href={`/backoffice/menu-category/${menucategory.id}`}
              isAvailable={isAvailable}
            />
          );
        })}
      </Box>
      <NewMenuCategoryDialog
        open={open}
        setOpen={setOpen}
        newMenuCategory={newMenuCategory}
        setNewMenuCategory={setNewMenuCategory}
      />
    </Box>
  );
};

export default MenuCategory;
