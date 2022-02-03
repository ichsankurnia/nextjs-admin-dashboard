import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {};

const index = (props: Props) => {
    const router = useRouter()

    useEffect(() => {
        router.replace('/auth/login')
    })

  return <></>;
};

export default index;
