const opt = {
	database: "Postgresql",
};

const parser = new Parser();

export function isValidSelectQuery(query) {
	try {
		const parsedQuery = parser.astify(query, opt);
		return parsedQuery[0].type === "select";
	} catch (error) {
		console.error(`Error parsing query: ${error.message}`);
		return false;
	}
}
