import { Box } from "@mui/material";
import { useRouter } from "next/router";
import BackOfficeLayout from "./BackOfficeLayout";
import { ReactNode } from "react";
import OrderLayout from "./OrderLayout";

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
    return <OrderLayout>{children}</OrderLayout>;
  }
  return <Box>{children}</Box>;
};

export default Layout;
