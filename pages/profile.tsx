import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut, useSession } from "next-auth/react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-center my-5 font-bold text-lg">Your Profile</h1>
      <div className="m-5">
        <Card className="cursor-pointer ">
          <CardHeader className="flex flex-row items-center gap-3">
            <Image
              alt="avatar"
              width={1000}
              height={1000}
              className="w-14 h-14 rounded-full border-2 shadow-lg"
              src={session?.user?.image!}
            />
            <div className="flex flex-col">
              <CardTitle>{session?.user?.name}</CardTitle>
              <CardDescription>{session?.user?.email}</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <h1 className="text-center my-5 font-bold text-lg">Status</h1>
        <Card className="cursor-pointer ">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <CardTitle className="text-md">Pending Due</CardTitle>
            </div>
            <h1>0</h1>
          </CardHeader>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <CardTitle className="text-md">Trips Count</CardTitle>
            </div>
            <h1>0</h1>
          </CardHeader>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <CardTitle className="text-md">Debtors</CardTitle>
            </div>
            <h1>0</h1>
          </CardHeader>
        </Card>
        <Button
          onClick={() => signOut()}
          className="w-full my-5"
          variant={"destructive"}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
