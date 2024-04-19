import { Box, Button } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useRouter } from "next/router";

interface Prop {
  route: string;
}

const BackButton = ({ route }: Prop) => {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <Button
        variant="contained"
        onClick={() => {
          router.push(`/backoffice/${route}`);
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
  );
};

export default BackButton;
