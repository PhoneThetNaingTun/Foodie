import Layout from "@/components/BackOfficeLayout";
import ItemCard from "@/components/ItemCard";
import ItemCardGrid from "@/components/ItemCardGrid";
import NewLocationDialog from "@/components/NewLocation";
import { useAppSelector } from "@/store/hooks";
import { NewLocationPayload } from "@/type/location";
import { Box, Button, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";

const Location = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { company } = useAppSelector((state) => state.Company);
  const [newLocaion, setNewLocation] = useState<NewLocationPayload>({
    name: "",
    street: "",
    township: "",
    city: "",
    companyId: company?.id,
  });
  const { locations } = useAppSelector((state) => state.Location);
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
            Creat New Location
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        {locations.map((item) => {
          return (
            <ItemCardGrid
              icon={<LocationOnIcon />}
              title={item.name}
              href={`/backoffice/location/${item.id}`}
              isAvailable={true}
            />
          );
        })}
      </Box>
      <NewLocationDialog
        open={open}
        setOpen={setOpen}
        newLocation={newLocaion}
        setNewLocation={setNewLocation}
      />
    </Box>
  );
};

export default Location;
