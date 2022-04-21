import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface Props {
	type: "error" | "warning";
	msg: string;
}

const Alert = ({ msg, type }: Props) => {
	return (
		<span
			role="alert"
			className="bg-background p-2 rounded border-t-4 border-error my-4 flex"
		>
			{type === "error" && (
				<FaExclamationCircle className="mr-2 mt-0.5 text-error" />
			)}
			{msg}
		</span>
	);
};

export default Alert;
