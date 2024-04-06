import Layout from "@/components/BackOfficeLayout";
import { Button, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

const backOffice = () => {
  const { data, status } = useSession();
  return (
    <Layout>
      <Typography>{data?.user?.email}</Typography>
    </Layout>
  );
};

export default backOffice;
