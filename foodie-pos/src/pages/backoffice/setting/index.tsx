import Layout from "@/components/BackOfficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSnackBar } from "@/store/slices/AppSnackBar";
import { UpdateCompany } from "@/store/slices/CompanySlice";
import { updateCompanyPayload } from "@/type/company";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Setting = () => {
  const dispatch = useAppDispatch();
  const { company } = useAppSelector((state) => state.Company);
  const [updatedData, setUpdatedData] = useState<updateCompanyPayload>();
  useEffect(() => {
    if (company) {
      setUpdatedData(company);
    }
  }, [company]);

  if (!updatedData) {
    return (
      <Box>
        <Typography>Company Not Found</Typography>
      </Box>
    );
  }
  const handleUpdateCompany = () => {
    const shouldUpdate =
      company?.name === updatedData.name &&
      company.street === updatedData.street &&
      company.townShip === updatedData.townShip &&
      company.city === updatedData.city;
    if (shouldUpdate)
      return dispatch(
        openSnackBar({
          type: "error",
          message: "Details are the same.Would you like to Change?",
        })
      );
    dispatch(
      UpdateCompany({
        ...updatedData,
        onSuccess: () => {
          dispatch(
            openSnackBar({
              type: "success",
              message: "Company Updated Successfully",
            })
          );
        },
      })
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
      }}
    >
      <Box
        sx={{
          width: 500,
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          p: 5,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5">Company Address Detail</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ mb: 3 }}
            variant="outlined"
            label="Company Name"
            defaultValue={updatedData.name}
            onChange={(event) => {
              setUpdatedData({ ...updatedData, name: event.target.value });
            }}
          />
          <TextField
            sx={{ mb: 3 }}
            variant="outlined"
            label="Street"
            defaultValue={updatedData.street}
            onChange={(event) => {
              setUpdatedData({ ...updatedData, street: event.target.value });
            }}
          />
          <TextField
            sx={{ mb: 3 }}
            variant="outlined"
            label="TownShip"
            defaultValue={updatedData.townShip}
            onChange={(event) => {
              setUpdatedData({ ...updatedData, townShip: event.target.value });
            }}
          />
          <TextField
            sx={{ mb: 3 }}
            variant="outlined"
            label="City"
            defaultValue={updatedData.city}
            onChange={(event) => {
              setUpdatedData({ ...updatedData, city: event.target.value });
            }}
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={handleUpdateCompany}>
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Setting;
