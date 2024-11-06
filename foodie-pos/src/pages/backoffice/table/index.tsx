import Layout from "@/components/BackOfficeLayout";
import ItemCardGrid from "@/components/ItemCardGrid";
import NewTableDialog from "@/components/NewTableDialog";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import TableBarIcon from "@mui/icons-material/TableBar";
import { NewTablePayload } from "@/type/table";

const Table = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { tables } = useAppSelector((state) => state.Table);
  const { selectedLocation } = useAppSelector((state) => state.App);
  const [newTable, setNewTable] = useState<NewTablePayload>({
    name: "",
    locationId: selectedLocation?.id,
  });
  const handleQRImagePrint = (assetUrl: string) => {
    const imageWindow = window.open("");
    imageWindow?.document.write(
      `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print();window.close()" /></body></html>`
    );
  };
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
            Creat New Table
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {tables.map((item) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={item.id}
            >
              {" "}
              <ItemCardGrid
                icon={<TableBarIcon />}
                title={item.name}
                href={`/backoffice/table/${item.id}`}
                isAvailable={true}
              />
              <Button
                onClick={() => handleQRImagePrint(item.assetUrl)}
                variant="contained"
                sx={{
                  width: "fit-content",
                  backgroundColor: "#0D9276",
                  "&:hover": { backgroundColor: "#0D8376" },
                }}
              >
                Print Qr
              </Button>
            </Box>
          );
        })}
      </Box>
      <NewTableDialog
        open={open}
        setOpen={setOpen}
        newTable={newTable}
        setNewTable={setNewTable}
      />
    </Box>
  );
};

export default Table;
