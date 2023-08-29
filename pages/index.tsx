import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

import ExpenseMed from "@/public/images/expense-med.png";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="p-5">
        <h1 className="text-3xl font-semibold">Welcome to Splitr</h1>
        <p className="text-gray-500">
          A simple way to split your expenses with friends
        </p>
        <Image
          src={ExpenseMed}
          className="w-72 my-5 mx-auto dark:invert"
          alt="expense-med-image"
        />
        <div className="grid grid-cols-1 gap-4 my-5 w-full">
          <BlockCards
            redirect="/trips"
            title="View Trips"
            description="Card Description"
          />
          <BlockCards
            redirect="/add-trip"
            title="Add New Trip"
            description="Card Description"
          />
          <BlockCards
            redirect="/pending"
            title="Due Pending"
            description="Card Description"
          />
        </div>
      </div>
    </main>
  );
}

interface BlockCardsProps {
  title: string;
  description: string;
  redirect: string;
}

const BlockCards = ({ title, description, redirect }: BlockCardsProps) => {
  return (
    <Link href={redirect}>
      <Card className="cursor-pointer group hover:scale-[1.005] ease-out duration-200 transition-all active:scale-[0.995]">
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <ArrowRight className="group-hover:-translate-x-5 ease-out duration-200 group-active:translate-x-0 transition-all" />
        </CardHeader>
      </Card>
    </Link>
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
