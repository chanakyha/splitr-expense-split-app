import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const AddTrips = () => {
  return <div>AddTrips</div>;
};

export default AddTrips;

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
