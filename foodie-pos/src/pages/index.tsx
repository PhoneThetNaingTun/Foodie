import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Typography variant="h1">Land Page</Typography>
      <Link href={"/backoffice"}>Back Office</Link>
    </Box>
  );
}
