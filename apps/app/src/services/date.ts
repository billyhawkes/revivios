import dayjs, { Dayjs } from "dayjs";

export const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

// Days of month array
export const getMonthArray = (date: Dayjs) => {
	const year = date.year();
	const month = date.month();

	let dates = [];
	for (let i = 0; i < date.day(); i++) {
		dates.push(null);
	}
	for (let i = 1; i <= date.daysInMonth(); i++) {
		dates.push(dayjs(`${year}-${month + 1}-${i}`));
	}
	return dates;
};
