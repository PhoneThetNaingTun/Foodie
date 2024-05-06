import BackButton from "@/components/BackButton";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSnackBar } from "@/store/slices/AppSnackBar";
import { updateTable } from "@/store/slices/TableSlice";
import { UpdatedTablePayload } from "@/type/table";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TableDetails = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [updatedDataTable, setUpdatedDataTable] =
    useState<UpdatedTablePayload>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tableId = Number(router.query.id);
  const { tables } = useAppSelector((state) => state.Table);
  const table = tables.find((item) => item.id === tableId);

  useEffect(() => {
    if (table) {
      setUpdatedDataTable(table);
    }
  }, [table]);

  if (!updatedDataTable) {
    return (
      <Box>
        <Typography>No Table Found</Typography>
      </Box>
    );
  }

  const handleUpdateTable = () => {
    updatedDataTable &&
      dispatch(
        updateTable({
          ...updatedDataTable,
          onSuccess: () => {
            dispatch(
              openSnackBar({
                type: "success",
                message: "Table Updated Successfully",
              })
            );
            router.push("/backoffice/table");
          },
        })
      );
  };
  return (
    <Box>
      <BackButton route="table" />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 500,
            justifyContent: "center",
            backgroundColor: "#eef3e9",
            padding: 3,
            borderRadius: 5,
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 3, fontFamily: "monospace" }}
          >
            Edit Table Detail
          </Typography>
          <TextField
            variant="outlined"
            label="Table Name"
            defaultValue={updatedDataTable?.name}
            color="success"
            onChange={(event) => {
              setUpdatedDataTable({
                ...updatedDataTable,
                name: event.target.value,
              });
            }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
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
              onClick={handleUpdateTable}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        message="Are You Sure You Want To Delete This Table?"
        handleDelete={() => {}}
      />
    </Box>
  );
};

export default TableDetails;
