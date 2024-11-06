import { Box, Chip, Typography } from "@mui/material";
import { Addon, AddonCategory } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import AddonOrderPage from "./AddonOrderPage";

interface Props {
  addonCategories: AddonCategory[];
  selectedAddons: Addon[];
  setSelectedAddons: Dispatch<SetStateAction<Addon[]>>;
}

const AddonCategoriesOrderPage = ({
  addonCategories,
  selectedAddons,
  setSelectedAddons,
}: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      {addonCategories.map((item) => {
        return (
          <Box
            key={item.id}
            sx={{
              mb: 4,
              bgcolor: "#ffff",
              p: 3,
              borderRadius: 1,
              backgroundColor: "rgb(251, 251, 251)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" sx={{ userSelect: "none" }}>
                {item.name}
              </Typography>
              <Chip
                label={item.isRequired ? "Is Required" : "Optional"}
                sx={{ userSelect: "none" }}
              />
            </Box>
            <Box>
              <AddonOrderPage
                addonCategoryId={item.id}
                selectedAddons={selectedAddons}
                setSelectedAddons={setSelectedAddons}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AddonCategoriesOrderPage;
