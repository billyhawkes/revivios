import React from "react";

interface Props {
	msg: string;
}

const Error = ({ msg }: Props) => {
	return (
		<span
			role="alert"
			className="bg-background p-2 rounded border-t-4 border-error mt-8"
		>
			{msg}
		</span>
	);
};

export default Error;
