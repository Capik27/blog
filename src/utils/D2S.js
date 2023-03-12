export default function D2S(d) {
	const trueData = d.toDate(); // from timestamp at firebase
	const date = trueData.getDate();
	const month = MONTH_NAME[trueData.getMonth()];
	const hour = trueData.getHours();
	let x = trueData.getMinutes();
	const mins = x > 9 ? x : `0${x}`;

	return `(${month} ${date}) at ${hour}:${mins}`;
}

const MONTH_NAME = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];
