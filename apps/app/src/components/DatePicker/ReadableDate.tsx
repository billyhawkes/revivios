import dayjs from "dayjs";
import { MONTHS } from "../../services/date";

type Props = {
	date: Date;
};

const ReadableDate = ({ date }: Props) => {
	const overdue = dayjs(date).isBefore(dayjs().startOf("day"));

	return (
		<div className={`flex items-center pt-1 ${overdue && "text-error"}`}>
			{MONTHS[dayjs(date).month()]} {dayjs(date).date()}
		</div>
	);
};

export default ReadableDate;
