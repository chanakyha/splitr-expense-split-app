import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

const Login = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button onClick={() => signIn("google")}>Login using Google</Button>

      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default Login;

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.name) {
    return {
      redirect: {
        destination: "/",
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
