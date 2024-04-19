import { Box } from "@mui/material";
import { useRouter } from "next/router";
import BackOfficeLayout from "./BackOfficeLayout";
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

const Layout = ({ children }: Prop) => {
  const router = useRouter();
  const { tableId } = router.query;
  const backOfficeLayout = router.pathname.includes("backoffice");
  const orederLayout = tableId;

  if (backOfficeLayout) {
    return <BackOfficeLayout>{children}</BackOfficeLayout>;
  }
  if (orederLayout) {
    return <Box>{children}</Box>;
  }
  return <Box></Box>;
};

export default Layout;
