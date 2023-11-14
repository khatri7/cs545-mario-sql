import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Field, Form, Formik } from "formik";
import { isValidSelectQuery } from "./utils/helpers";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_PROJECT_URL,
	import.meta.env.VITE_SUPABASE_PUBLIC_KEY
);

function App() {
	return (
		<div>
			<Formik
				initialValues={{
					query: "",
				}}
				onSubmit={(values) => {}}
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
