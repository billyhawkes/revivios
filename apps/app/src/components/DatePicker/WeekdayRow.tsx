import { DAYS } from "../../services/date";

const WeekdayRow = () => {
	return (
		<div className="flex">
			{DAYS.map((day, index) => (
				<div key={index} className="flex justify-center items-center w-8 h-8">
					{day}
				</div>
			))}
		</div>
	);
};

export default WeekdayRow;
