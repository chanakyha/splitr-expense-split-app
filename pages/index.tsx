import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Header from "@/components/header";
import ExpenseMed from "@/public/images/expense-med.png";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Home({ session }: any) {
  return (
    <main>
      <Header />
      <div className="p-5">
        <h1 className="text-3xl font-semibold">Welcome to Splitr</h1>
        <p className="text-gray-500">
          A simple way to split your expenses with friends
        </p>
        <Image
          src={ExpenseMed}
          className="w-72 my-5 mx-auto"
          alt="expense-med-image"
        />
        <div className="grid grid-cols-1 gap-4 my-5 w-full">
          <Card>
            <CardHeader>
              <CardTitle>View Trips</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Add New Trip</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Due Pending</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  );
}

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
