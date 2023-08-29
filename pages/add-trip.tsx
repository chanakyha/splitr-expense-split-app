import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const AddTrip = () => {
  return (
    <div>
      <h1 className="text-center">Add New Trip</h1>
    </div>
  );
};

export default AddTrip;

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
