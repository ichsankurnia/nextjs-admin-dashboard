import { useRouter } from "next/router";
import { useEffect } from "react";
import Heading from "../components/Head";

type Props = {};

const Custom404 = ({ }: Props) => {
	const router = useRouter()

	useEffect(() => {
		setTimeout(() => {
			router.replace('/')		
		}, 5000);
	}, [])

	return (
		<>
			<Heading titlePage="404" />
			<div className="h-screen flex flex-col justify-center items-center">
				<h1 className="font-semibold text-3xl">404</h1>
				<h1 className='font-semibold text-xl mb-2'>Oops. Page not found</h1>
				<p>Looks like the page you were looking for does not exist</p>
			</div>
		</>
	)
};

export default Custom404;