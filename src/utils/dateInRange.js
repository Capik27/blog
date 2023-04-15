export default function dateInRange(date, range) {
	const start = new Date();
	const end = new Date();

	switch (range) {
		case "all":
			return true;
		case "year":
			end.setMonth(end.getMonth() - 12);
			break;
		case "month":
			end.setMonth(start.getMonth() - 1);
			break;
		case "week":
			end.setDate(start.getDate() - 7);
			break;
		case "day":
			end.setDate(start.getDate() - 1);
			break;
		case "hour":
			end.setTime(end.getTime() - 60 * 60 * 1000);
			break;
		default:
			return false;
	}

	if (date > start || date < end) {
		return false;
	}

	return true;
}
