import dayjs from "dayjs";

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

export const SHORTMONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

// Days of month array
export const getMonthArray = (date: Date): (Date | null)[] => {
	const datejs = dayjs(date);
	const year = datejs.year();
	const month = datejs.month();

	let dates = [];
	for (let i = 0; i < datejs.day(); i++) {
		dates.push(null);
	}
	for (let i = 1; i <= datejs.daysInMonth(); i++) {
		dates.push(dayjs(`${year}-${month + 1}-${i}`).toDate());
	}

	return dates;
};
