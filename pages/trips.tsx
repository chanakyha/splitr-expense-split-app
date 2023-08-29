import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const Trips = () => {
  return <div>Trips</div>;
};

export default Trips;

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
