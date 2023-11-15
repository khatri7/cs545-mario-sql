import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Field, Form, Formik } from "formik";
import { isValidSelectQuery } from "./utils/helpers";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_PROJECT_URL,
	import.meta.env.VITE_SUPABASE_PUBLIC_KEY
);

function App() {
	async function executeQuery(query) {
		try {
			const parsedQuery = isValidSelectQuery(query);
			const tableName = parsedQuery.from[0]?.table;
			const columns = parsedQuery.columns
				?.map((column) => column?.expr?.column)
				.join(", ");
			const { data } = await supabase.from(tableName).select(columns);
			console.log(data);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div>
			<Formik
				initialValues={{
					query: "",
				}}
				onSubmit={async (values) => {
					try {
						await executeQuery(values.query.trim());
					} catch (e) {
						console.error(e);
					}
				}}
			>
				{() => (
					<Form>
						<Field type="text" name="query" />
						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default App;
