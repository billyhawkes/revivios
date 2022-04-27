type Props = {
	date: number;
	current: boolean;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const DateItem = ({ date, current, onClick }: Props) => {
	return (
		<button
			onClick={onClick}
			className={`flex justify-center items-center w-8 h-8 hover:bg-lightbackground rounded cursor-pointer ${
				current && "bg-primary"
			}`}
		>
			{date}
		</button>
	);
};

export default DateItem;
