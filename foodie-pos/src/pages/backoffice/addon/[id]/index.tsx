import Layout from "@/components/BackOfficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import {
  Box,
  Button,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateAddonPayload } from "@/type/addon";

const AddonDetails = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { addons } = useAppSelector((state) => state.Addon);
  const { addonCategories } = useAppSelector((state) => state.AddonCategory);
  const [selected, setSelected] = useState<number>();
  const addonId = Number(router.query.id);
  const addon = addons.find((item) => item.id === addonId);
  const [updatedAddonData, setUpdatedAddonData] =
    useState<UpdateAddonPayload>();
  useEffect(() => {
    if (addon) {
      setUpdatedAddonData(addon);
      setSelected(addon.AddonCategoryId);
    }
  }, [addon]);
  useEffect(() => {
    if (selected && updatedAddonData) {
      setUpdatedAddonData({ ...updatedAddonData, AddonCategoryId: selected });
    }
  }, [selected]);

  if (!updatedAddonData) {
    return (
      <Box>
        <Typography>Addon Not Found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/backoffice/addon");
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
            borderRadius: "10px",
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
              sx={{
                textAlign: "center",
                mb: 0.5,
                fontFamily: "monospace",
                p: 4,
              }}
            >
              Edit Addon Detail
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
            }}
          >
            <TextField
              variant="outlined"
              label="Addon Category Name"
              sx={{ mb: 2 }}
              defaultValue={updatedAddonData?.name}
            />
            <FormControl>
              <Select
                value={selected}
                onChange={(event) => {
                  const selected = event.target.value as number;
                  setSelected(selected);
                }}
              >
                {addonCategories.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0D9276",
                "&:hover": { backgroundColor: "#0D9250" },
              }}
              onClick={() => {}}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        message="Are You Sure You Want To Delete This Addon Category?"
        handleDelete={() => {}}
      />
    </Box>
  );
};

export default AddonDetails;
