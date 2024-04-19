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
  return (
    <Layout>
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
      <Box>
        {tables.map((item) => {
          return (
            <ItemCardGrid
              key={item.id}
              icon={<TableBarIcon />}
              title={item.name}
              href={`/backoffice/table/${item.id}`}
              isAvailable={true}
            />
          );
        })}
      </Box>
      <NewTableDialog
        open={open}
        setOpen={setOpen}
        newTable={newTable}
        setNewTable={setNewTable}
      />
    </Layout>
  );
};

export default Table;
