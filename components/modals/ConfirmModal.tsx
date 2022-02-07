import React, { MouseEvent } from "react";

type Props = {
	message: string,
	onClose: (e: MouseEvent<HTMLElement>) => void,
	onNext?: (e: MouseEvent<HTMLElement>) => void
};


const ConfirmModal: React.FC<Props> = ({ message, onClose, onNext }: Props) => {
	return <>
		<div className="modal-form">
			<div className="modal-form-outside" onClick={onClose} />

			{/* <!-- Modal content --> */}
			<div className="w-11/12 md:w-5/12 bg-white rounded-lg shadow dark:bg-gray-700 z-50">
				{/* <!-- Modal header --> */}
				<div className="flex justify-end p-2">
					<button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
						onClick={onClose}
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
					</button>
				</div>

				{/* <!-- Modal body --> */}
				<div className="p-6 pt-0 text-center">
					<svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
					<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
					<button type="button" className="btn-danger text-center mr-2" onClick={onNext}>
						Yes, I'm sure
					</button>
					<button type="button" className="btn-secondary" onClick={onClose}>No, cancel</button>
				</div>
			</div>

		</div>
	</>
};

export default ConfirmModal;
