type Props = {
	date: number;
	current: boolean;
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const DateItem = ({ date, current, onClick }: Props) => {
	return (
		<div
			onClick={onClick}
			className={`flex justify-center items-center w-8 h-8 rounded cursor-pointer ${
				current ? "bg-primary" : "hover:bg-lightbackground"
			}`}
		>
			{date}
		</div>
	);
};

export default DateItem;
