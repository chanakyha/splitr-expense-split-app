import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const Pendings = () => {
  return <div>Pendings</div>;
};

export default Pendings;

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
