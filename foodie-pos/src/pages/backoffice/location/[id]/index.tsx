import Layout from "@/components/BackOfficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedLocation } from "@/store/slices/AppSlice";
import {
  deleteLocation,
  setLocation,
  updateLocation,
} from "@/store/slices/locationSlice";
import { UpdatedLocationPayload } from "@/type/location";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Location } from "@prisma/client";
import { useRouter } from "next/router";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useEffect, useState } from "react";
import { openSnackBar } from "@/store/slices/AppSnackBar";
import DeleteDialog from "@/components/DeleteDialog";

const LocationDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [updateData, setUpdateData] = useState<UpdatedLocationPayload>();
  const [open, setOpen] = useState<boolean>(false);
  const LocationId = Number(router.query.id);
  const { selectedLocation } = useAppSelector((state) => state.App);
  const { locations } = useAppSelector((state) => state.Location);
  const location = locations.find((item) => item.id === LocationId);

  useEffect(() => {
    if (location) {
      setUpdateData(location);
    }
  }, [location]);
  if (!updateData) {
    return (
      <Box>
        <Typography>Location Not Found</Typography>
      </Box>
    );
  }
  const handleUpdateLocation = () => {
    updateData &&
      dispatch(
        updateLocation({
          ...updateData,
          onSuccess: () => {
            dispatch(
              openSnackBar({ type: "success", message: "Updated Successfully" })
            );
            router.push("/backoffice/location");
          },
          onError: () => {
            dispatch(openSnackBar({ type: "error", message: "Error Occured" }));
          },
        })
      );
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/backoffice/location");
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#0D9276",
            "&:hover": { backgroundColor: "#0D9250" },
          }}
        >
          <ReplyIcon sx={{ mb: "1px", mr: "3px" }} /> Back
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 4 }}>
        <Box
          sx={{
            backgroundColor: "#eef3e9",
            flexBasis: "30%",
            borderRadius: "10px",
            height: 250,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 3,
              fontFamily: "monospace",
              padding: "30px",
              fontWeight: "800",
            }}
          >
            Turn On To Choose This Location
          </Typography>
          <FormControlLabel
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "40px",
            }}
            control={
              <Switch
                size="medium"
                checked={selectedLocation?.id === LocationId}
                onChange={() => {
                  if (location) {
                    localStorage.setItem(
                      "selectedLocation",
                      String(location.id)
                    );
                    dispatch(setSelectedLocation(location));
                  }
                }}
              />
            }
            label={`Select This Location (${location?.name})`}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "#eef3e9",
            borderRadius: "10px",
            flexBasis: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            {" "}
            <Typography
              variant="h5"
              sx={{ textAlign: "center", mb: 3, fontFamily: "monospace" }}
            >
              Edit Location Detail
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 4,
              padding: "40px",
            }}
          >
            <TextField
              defaultValue={location?.name}
              variant="outlined"
              label="Location Name"
              onChange={(event) => {
                setUpdateData({ ...updateData, name: event.target.value });
              }}
            />
            <TextField
              defaultValue={location?.street}
              variant="outlined"
              label="Street"
              onChange={(event) => {
                setUpdateData({ ...updateData, street: event.target.value });
              }}
            />
            <TextField
              defaultValue={location?.township}
              variant="outlined"
              label="Township"
              onChange={(event) => {
                setUpdateData({ ...updateData, township: event.target.value });
              }}
            />
            <TextField
              defaultValue={location?.city}
              variant="outlined"
              label="City"
              onChange={(event) => {
                setUpdateData({ ...updateData, city: event.target.value });
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              width: "80%",
              paddingBottom: 4,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#cc3333",
                "&:hover": { backgroundColor: "#CC0000" },
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0D9276",
                "&:hover": { backgroundColor: "#0D9250" },
              }}
              onClick={handleUpdateLocation}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        message="Are You Sure You Want To Delete This Location?"
        handleDelete={() => {
          dispatch(
            deleteLocation({
              id: LocationId,
              onSuccess: () => {
                dispatch(
                  openSnackBar({
                    type: "success",
                    message: "Location Deleted Successfully",
                  })
                );
                router.push("/backoffice/location");
              },
            })
          );
        }}
      />
    </Box>
  );
};

export default LocationDetail;
