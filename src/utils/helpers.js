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

export function areDeeplyEqual(obj1, obj2) {
	if (obj1 === obj2) return true;

	if (Array.isArray(obj1) && Array.isArray(obj2)) {
		if (obj1.length !== obj2.length) return false;

		return obj1.every((elem, index) => {
			return areDeeplyEqual(elem, obj2[index]);
		});
	}

	if (
		typeof obj1 === "object" &&
		typeof obj2 === "object" &&
		obj1 !== null &&
		obj2 !== null
	) {
		if (Array.isArray(obj1) || Array.isArray(obj2)) return false;

		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);

		if (
			keys1.length !== keys2.length ||
			!keys1.every((key) => keys2.includes(key))
		)
			return false;

		for (let key in obj1) {
			console.log(obj1[key], obj2[key]);
			let isEqual = areDeeplyEqual(obj1[key], obj2[key]);
			if (!isEqual) {
				return false;
			}
		}

		return true;
	}

	return false;
}
