import { useState } from "react";
import ConfirmModal from "../../components/modals/ConfirmModal";
import CRUDModal, { UserForm } from "../../components/modals/CRUDModal";
import DefaultModal from "../../components/modals/DefaultModal";
import FormModal from "../../components/modals/FormModal";
import DashboardLayout from "../../layouts/DashboardLayout";

type Props = {};

const ModalExample = (props: Props) => {
	const [defaultModal, showDefaultModal] = useState(false)
	const [popUpModal, showPopUpModal] = useState(false)
	const [formModal, showFormModal] = useState(false)
	const [crudModal, showCrudModal] = useState(false)

	const hanldeReceiveDataForm = (data: UserForm) => {
		console.log(data)
		showCrudModal(false)
	}

	return (
		<>
			<div className="flex flex-wrap justify-center items-center space-x-5 h-[60vh]">
				<button className="btn-primary" type="button" onClick={()=>showDefaultModal(true)}>
					Default modal
				</button>
				<button className="btn-primary" type="button" onClick={()=>showPopUpModal(true)}>
					Popup modal
				</button>
				<button className="btn-primary" type="button" onClick={()=>showFormModal(true)}>
					Form modal
				</button>
				<button className="btn-primary" type="button" onClick={()=>showCrudModal(true)}>
					Form Modal CRUD
				</button>
			</div>
			{defaultModal && <DefaultModal onClose={()=>showDefaultModal(false)} />}
			{popUpModal && <ConfirmModal message='Are you sure you want to delete this product?' onClose={()=>showPopUpModal(false)} />}
			{formModal && <FormModal onClose={()=>showFormModal(false)} />}
			{crudModal && <CRUDModal onClose={()=>showCrudModal(false)} onSubmit={hanldeReceiveDataForm} />}
		</>
	)
};

ModalExample.layout = DashboardLayout

export default ModalExample;
