import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, setDate } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusCircleIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const AddTrip = () => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [searchUser, setSearchUser] = useState<UserType>();
  const [usersData, setUsersData] = useState<UserType[]>();

  const { data: session } = useSession();

  const onAddUser = () => {
    return;
  };

  const onSearchUser = (e: any) => {
    if (!e.target.value.includes("@gmail.com")) return;
    const docRef = doc(db, "users", e.target.value);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSearchUser({
            name: data?.name,
            email: data?.email,
            image: data?.picture,
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(console.error);
  };
  return (
    <div className="p-5">
      <div>
        <h1 className="text-center font-bold text-lg">Add New Trip</h1>
        <Card className="w-full my-5">
          <CardHeader>
            <form className="flex flex-col gap-5">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Trip Name</Label>
                  <Input id="name" placeholder="Bangalore Blast" />
                </div>
              </div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Start Date</Label>
                  <CalendarInput date={fromDate} setDate={setFromDate} />
                </div>
              </div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">End Date</Label>
                  <CalendarInput date={toDate} setDate={setToDate} />
                </div>
              </div>
            </form>
          </CardHeader>
        </Card>
        <h1 className="text-center font-bold text-lg">Add Friends</h1>
        <form className="my-5 flex gap-3">
          <Input
            onChange={onSearchUser}
            id="name"
            placeholder="Enter Mail Id"
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-1">
                Add <PlusCircleIcon />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Person</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to add{" "}
                  <span className="font-bold text-foreground">
                    Chanakyha Vetri
                  </span>{" "}
                  in your Trip
                </AlertDialogDescription>
                <AlertDialogDescription>
                  (vetrichanakyha2003@gmail.com)
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>

        <CardHeader>
          <CardTitle className="mb-5">Search Result</CardTitle>
          {}
          <UserCard
            name={searchUser?.name!}
            email={searchUser?.email!}
            image={searchUser?.image!}
            searchUser={true}
          />
        </CardHeader>

        {/* <UserCard
          name={session?.user?.name!}
          image={session?.user?.image!}
          email={session?.user?.email!}
        />
        <UserCard
          name={session?.user?.name!}
          image={session?.user?.image!}
          email={session?.user?.email!}
        />
        <UserCard
          name={session?.user?.name!}
          image={session?.user?.image!}
          email={session?.user?.email!}
        />
        <UserCard
          name={session?.user?.name!}
          image={session?.user?.image!}
          email={session?.user?.email!}
        /> */}
      </div>
    </div>
  );
};

export default AddTrip;

interface UserCardProps {
  image: string;
  name: string;
  email: string;
  searchUser?: boolean;
}

const UserCard = ({ image, name, email, searchUser }: UserCardProps) => {
  return (
    <Card className="w-full my-5">
      <CardHeader>
        {/* <p className="text-destructive text-center font-medium animate-pulse">
      Atleast 1 User should be added
    </p> */}

        <div className="flex gap-3">
          <Image
            alt="user-image"
            className="w-10 h-10 rounded-full"
            src={image}
            width={1000}
            height={1000}
          />
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      {!searchUser && (
        <CardFooter>
          <Button className="w-full" variant={"destructive"}>
            Remove
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

interface CalendarInputProps {
  date: Date | undefined;
  setDate: SelectSingleEventHandler;
}

const CalendarInput = ({ date, setDate }: CalendarInputProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
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
