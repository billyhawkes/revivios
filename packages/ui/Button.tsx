import * as React from "react";

type Props = {
	ghost?: boolean;
};

const Button = ({ ghost }: Props) => {
	return (
		<button
			className={
				`py-2 px-4 rounded` +
				(ghost
					? "border-primary border-2 hover:bg-primary hover:bg-opacity-5"
					: "bg-primary  hover:bg-opacity-90")
			}
		>
			Button
		</button>
	);
};

export default Button;
