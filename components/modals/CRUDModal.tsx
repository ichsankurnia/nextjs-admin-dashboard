import { MouseEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorField from "../ErrorField";

type Props = {
	message?: string,
	data?: any,
	onSubmit: (data: UserForm) => void,
	onClose: (e: MouseEvent<HTMLElement>) => void
};

export interface UserForm {
	fullname: string,
	role: number,
	phone_number: string,
	address: string,
	password: string
}

interface UserFormExtend extends UserForm {
	confirm_password: string
}

const LIST_ROLE = [
	{ id: 1, name: 'Super Admin' },
	{ id: 2, name: 'Administrator' },
	{ id: 3, name: 'Other Role 1' },
	{ id: 4, name: 'Other Role 2' },
	{ id: 5, name: 'Other Role 3' },
]

const CRUDModal = ({ onClose, onSubmit }: Props) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue
	} = useForm<any>({ criteriaMode: "all" });

	
	const onSubmitForm: SubmitHandler<UserFormExtend> = (data: UserFormExtend) => {
		const {fullname, role, phone_number, address, password, confirm_password} = data

		if(password !== confirm_password){
			alert('password not match')
			return
		}

		const submitedData = {
			fullname, role, phone_number, address, password
		}
		
		onSubmit(submitedData)
	}

	return <>
		<div className="modal-form">
			<div className="modal-form-outside" onClick={onClose} />
			{/* <!-- Modal content --> */}
			<div className="w-11/12 md:w-3/5 bg-white rounded-lg shadow dark:bg-gray-700 z-50 overflow-y-auto" style={{ maxHeight: '90vh' }}>

				<div className="flex justify-end p-2">
					<button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
						onClick={onClose}
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmitForm)} className="px-6 pb-4 space-y-5 lg:px-8 sm:pb-6 xl:pb-8">
					<h3 className="text-xl font-medium text-gray-900 dark:text-white pb-4">Form Create User</h3>

					<div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
						<div className="w-full">
							<label htmlFor="fullname" className="label-form">Fullname</label>
							<input type="text" id="fullname" className="input-form" placeholder="Full Name" 
								{...register('fullname', {
									required: 'Fullname is required',
									maxLength: {value: 25, message: 'Fullname is too long'}
								})}
							/>
							<ErrorField errors={errors} name='fullname' />
						</div>
						<div className="w-full">
							<label htmlFor="role" className="label-form">Role</label>
							<select id="role" className="input-form" {...register('role', {required: 'Role is required'})}>
								<option value=''>- Select Role -</option>
								{LIST_ROLE.map((item, key) =>
									<option key={key} value={item.id}>{item.name.toUpperCase()}</option>
								)}
							</select>
							<ErrorField errors={errors} name='role' />
						</div>
					</div>

					<div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
						<div className="w-full">
							<label htmlFor="phone_number" className="label-form">Phone Number</label>
							<input type='tel' id="phone_number" className="input-form" placeholder="08123XXXXXXX" 
								{...register("phone_number", {
										required: "Phone number is required.",
										pattern: { value: /^\d+$/, message: "Phone number is number only." },
										minLength: { value: 10, message: "Phone number must exceed 9 characters." },
										maxLength: { value: 14, message: "Phone number too long." }
								})}
							/>
							<ErrorField errors={errors} name='phone_number' />
						</div>
						<div className="w-full">
							<label htmlFor="address" className="label-form">Address</label>
							<textarea id="address" placeholder="Jl. aaa no 123 cc ..." className="input-form" rows={3} {...register('address')} />
						</div>
					</div>

					<div className="md:flex md:space-x-10 space-y-5 md:space-y-0">
						<div className="w-full">
							<label htmlFor="password" className="label-form">Passsword</label>
							<input type="password" id="password" placeholder="••••••••" className="input-form" 
								{...register("password", {
												required: "Password is required.",
												minLength: { value: 5, message: "Password must exceed 4 characters."}
										})}
								/>
							<ErrorField errors={errors} name='password' />
						</div>
						<div className="w-full">
							<label htmlFor="confirm_password" className="label-form">Confirm Password</label>
							<input type="password" id="confirm_password" className="input-form" placeholder="••••••••" 
								{...register("confirm_password", { required: "Confirm password is required." })} />
							<ErrorField errors={errors} name='confirm_password' />
						</div>
					</div>

					{/* <!-- Modal footer --> */}
					<div className="flex items-center pt-4 space-x-4">
						<button type='submit' className="btn-primary px-7">Save</button>
						<button type='reset' className="btn-secondary" onClick={onClose}>Cancel</button>
					</div>

				</form>
			</div>
		</div>
	</>
};

export default CRUDModal;
