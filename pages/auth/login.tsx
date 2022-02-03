import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorField from "../../components/ErrorField";

type Props = {};

interface DataForm {
	email: string,
	password: string
}

const login = (props: Props) => {
	const router = useRouter()
	
	useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard')
  }, [])

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<DataForm>({ criteriaMode: "all" });

	const onSubmitForm: SubmitHandler<DataForm> = (data) => {
		console.log(data)
		
		// Do a fast client-side transition to the already prefetched dashboard page
		router.push('/dashboard')
	}

	return (
		<>
			<div className="bg-[#eee] min-h-screen flex justify-center items-center font-poppins">
				<div className="relative w-[1366px] h-[768px]">

					<div className="absolute top-0 left-0 w-full md:w-1/2 h-full z-10">
						<div className="bg-white w-full h-full md:px-24 px-8 py-10 rounded-tl-xl rounded-bl-xl flex flex-col text-gray-600 text-sm">
							<div className="w-20 h-20 mb-5 relative">
								<Image src='/next-logo.png' alt="" layout='fill' objectFit='fill' /* objectFit='cover' */ />
							</div>

							<div>
								<h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Sign in to your account</h1>
								<p className="mt-1 md:mt-2">
									Or{' '}
									<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
										start your 14-day free trial
									</a>
								</p>
							</div>

							<div className="mt-7 md:mt-8">
								<p className="font-semibold mb-1.5">Sign in with</p>
								<div className="flex items-center space-x-3">
									<button className="w-1/3 flex justify-center items-center border-[1.5px] border-gray-400 rounded-md text-lg md:text-2xl py-1 text-gray-500 hover:text-white hover:bg-indigo-600 hover:border-transparent">
										<i className="ri-google-fill"></i>
									</button>
									<button className="w-1/3 flex justify-center items-center border-[1.5px] border-gray-400 rounded-md text-lg md:text-2xl py-1 text-gray-500 hover:text-white hover:bg-indigo-600 hover:border-transparent">
										<i className="ri-github-fill"></i>
									</button>
									<button className="w-1/3 flex justify-center items-center border-[1.5px] border-gray-400 rounded-md text-lg md:text-2xl py-1 text-gray-500 hover:text-white hover:bg-indigo-600 hover:border-transparent">
										<i className="ri-facebook-circle-fill"></i>
									</button>
								</div>
							</div>

							<div className="mt-8 flex flex-col items-center">
								<span className="h-[1px] w-full bg-gray-300"></span>
								<p className="bg-white px-3 -mt-3">Or continue with</p>
							</div>

							<form onSubmit={handleSubmit(onSubmitForm)} className="mt-5 space-y-5">
								<div>
									<label className="font-semibold" htmlFor="email-address">Email address</label>
									<input id="email-address" type="text" autoComplete="email" className="text-input"
										 {...register("email", {
											required: "Email is required.",
											pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													message: "Invalid email address."
											}
									})} />
									<ErrorField errors={errors} name='email' />
								</div>
								<div>
									<label className="font-semibold" htmlFor="password">Password</label>
									<input id="password" type="password" autoComplete="current-password" className="text-input"
										 {...register("password", {
											required: "Password is required.",
											minLength: { value: 5, message: "Password must exceed 4 characters."}
									})}/>
									<ErrorField errors={errors} name='password' />
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
										<label htmlFor="remember-me" className="ml-2 block font-medium cursor-pointer">Remember me</label>
									</div>
									<div className=" flex items-center text-indigo-600 hover:text-indigo-500">
										<i className="ri-lock-fill text-base"></i>
										<a href="#" className="font-medium ml-1">Forgot your password?</a>
									</div>
								</div>

								<button type='submit' className="btn-submit" >
									Sign in
								</button>
							</form>

						</div>
					</div>

					<div className="hidden md:block h-full w-full top-0 left-0 z-0">
						<Image src='/cover.jpeg' alt="" layout='fill' /* objectFit='fill' */ objectFit='cover' className='rounded-xl' />
					</div>

				</div>
			</div>
		</>
	)
};

export default login;
