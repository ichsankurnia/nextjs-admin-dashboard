import { MouseEvent } from "react";

type Props = {
	message?: string,
	data?: any,
	onSubmit?: void,
	onClose: (e: MouseEvent<HTMLElement>) => void
};

const FormModal = ({ onClose }: Props) => {
	return <>
		<div className="modal-form">
			<div className="modal-form-outside" onClick={onClose} />
			{/* <!-- Modal content --> */}
			<div className="w-11/12 md:w-6/12 bg-white rounded-lg shadow dark:bg-gray-700 z-50">
				<div className="flex justify-end p-2">
					<button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
						onClick={onClose}
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
					</button>
				</div>
				<form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
					<h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
					<div>
						<label htmlFor="email" className="label-form">Your email</label>
						<input type="email" name="email" id="email" className="input-form" placeholder="name@company.com" required />
					</div>
					<div>
						<label htmlFor="password" className="label-form">Your password</label>
						<input type="password" name="password" id="password" placeholder="••••••••" className="input-form" required />
					</div>
					<div className="flex justify-between">
						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800" required />
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="remember" className="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
							</div>
						</div>
						<a href="#" className="text-sm text-indigo-600 hover:underline dark:text-indigo-500">Lost Password?</a>
					</div>
					<button type="submit" className="btn-primary w-full">Login to your account</button>
					<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
						Not registered? <a href="#" className="text-indigo-600 hover:underline dark:text-indigo-500">Create account</a>
					</div>
				</form>
			</div>
		</div>
	</>
};

export default FormModal;
