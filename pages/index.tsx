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
import { ArrowRight } from "lucide-react";

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
          <BlockCards title="View Trips" description="Card Description" />
          <BlockCards title="Add New Trip" description="Card Description" />
          <BlockCards title="Due Pending" description="Card Description" />
        </div>
      </div>
    </main>
  );
}

interface BlockCardsProps {
  title: string;
  description: string;
}

const BlockCards = ({ title, description }: BlockCardsProps) => {
  return (
    <Card className="cursor-pointer group hover:scale-[1.005] ease-out duration-200 transition-all active:scale-[0.995]">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <ArrowRight className="group-hover:-translate-x-5 ease-out duration-200 group-active:translate-x-0 transition-all" />
      </CardHeader>
    </Card>
  );
};

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
