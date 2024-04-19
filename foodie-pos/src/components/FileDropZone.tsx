import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";

interface Prop {
  onDrop: (files: File[]) => void;
}

const FileDropZone = ({ onDrop }: Prop) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "1px dotted black",
        p: 2,
        borderRadius: 1,
        mt: 2,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop Your Image File Here</p>
      ) : (
        <p>Drop file here or click to select</p>
      )}
    </Box>
  );
};

export default FileDropZone;
