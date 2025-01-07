"use client";

import { Button } from "@/components/shadcn/button";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    <>
      <Button onClick={() => signOut()}>サインアウト</Button>
    </>
  );
};

export default Home;
