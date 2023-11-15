const opt = {
	database: "Postgresql",
};

const parser = new Parser();

export function isValidSelectQuery(query) {
	const parsedQuery = parser.astify(query, opt);
	if (parsedQuery[0].type !== "select") throw new Error("Invalid Query");
	return parsedQuery[0];
}
