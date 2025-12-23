import React, { useState } from 'react'

interface IModal {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	showCloseIcon?: boolean;
	title?: string;
}

const Modal = (props: IModal) => {
	const { children, isOpen, onClose, title, showCloseIcon } = props;
	const [open, setOpen] = useState(isOpen);
	return (
		<div>
			{open && (
				<div className="fixed inset-0 backdrop-blur-[3px] bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
						<div className="flex justify-between items-center p-4 border-b">
							<h2 className="text-lg font-semibold">{title || 'Modal'}</h2>
							{showCloseIcon ? <button
								onClick={() => {
									setOpen(false);
									onClose();
								}}
								className="text-gray-600 cursor-pointer text-[1.4rem] hover:text-gray-800"
							>
								&times;
							</button> : null}
						</div>
						<div className="p-4">
							{children}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Modal;