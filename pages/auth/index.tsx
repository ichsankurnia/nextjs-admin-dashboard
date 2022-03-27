import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import { setCookie } from "../../utils/helpers";

type Props = {};

const index = (props: Props) => {
  const router = useRouter()

  useEffect(() => {
    setCookie('token', '', 1, 946684800)
    localStorage.clear()

    router.replace('/auth/login')
  })

  return <Loader />;
};

export default index;
