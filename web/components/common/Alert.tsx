import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

export enum AlertType {
	Error,
}

interface Props {
	type: AlertType;
	msg: string;
}

const Alert = ({ msg, type }: Props) => {
	return (
		<span
			role="alert"
			className="bg-background p-2 rounded border-t-4 border-error mt-8 flex"
		>
			{type === AlertType.Error && (
				<FaExclamationCircle className="mr-2 mt-0.5 text-error" />
			)}
			{msg}
		</span>
	);
};

export default Alert;
