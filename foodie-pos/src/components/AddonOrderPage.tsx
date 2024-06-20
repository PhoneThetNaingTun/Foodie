import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { Addon } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Prop {
  addonCategoryId: Number;
  selectedAddons: Addon[];
  setSelectedAddons: Dispatch<SetStateAction<Addon[]>>;
}

const AddonOrderPage = ({
  addonCategoryId,
  selectedAddons,
  setSelectedAddons,
}: Prop) => {
  const addonCategory = useAppSelector(
    (state) => state.AddonCategory.addonCategories
  ).find((item) => item.id === addonCategoryId);
  const Addons = useAppSelector((state) => state.Addon.addons).filter(
    (item) => item.AddonCategoryId === addonCategoryId
  );
  if (!addonCategory) return null;
  return (
    <Box>
      {Addons.map((addon) => {
        return (
          <Box
            key={addon.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                addonCategory.isRequired ? (
                  <Radio
                    color="success"
                    checked={
                      selectedAddons.find((item) => item.id === addon.id)
                        ? true
                        : false
                    }
                    onChange={() => {
                      const AddonIds = Addons.map((item) => item.id);
                      const others = selectedAddons.filter(
                        (item) => !AddonIds.includes(item.id)
                      );
                      setSelectedAddons([...others, addon]);
                    }}
                  />
                ) : (
                  <Checkbox
                    color="success"
                    checked={
                      selectedAddons.find((item) => item.id === addon.id)
                        ? true
                        : false
                    }
                    onChange={(evt, value) => {
                      if (value) {
                        setSelectedAddons([...selectedAddons, addon]);
                      } else {
                        const selected = selectedAddons.filter(
                          (item) => item.id !== addon.id
                        );
                        setSelectedAddons(selected);
                      }
                    }}
                  />
                )
              }
              label={addon.name}
            />
            <Typography sx={{ fontStyle: "italic" }}>{addon.price}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default AddonOrderPage;
