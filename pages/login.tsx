import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

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
