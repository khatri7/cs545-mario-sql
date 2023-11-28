const opt = {
	database: "Postgresql",
};

const parser = new Parser();

export function isValidSelectQuery(query) {
	const parsedQuery = parser.astify(query, opt);
	if (parsedQuery[0].type !== "select") throw new Error("Invalid Query");
	return parsedQuery[0];
}

export function extractConditions(whereClause, conditions = {}) {
	if (
		whereClause !== null &&
		typeof whereClause === "object" &&
		whereClause.type === "binary_expr"
	) {
		const { left, right } = whereClause;

		if (left.type === "column_ref") {
			conditions[left.column] = right.value;
		}

		if (left.hasOwnProperty("left")) {
			extractConditions(left, conditions);
		}
		if (right.hasOwnProperty("left")) {
			extractConditions(right, conditions);
		}
	}

	return conditions;
}
