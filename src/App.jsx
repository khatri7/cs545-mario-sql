import React, { useEffect, useReducer, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Field, Form, Formik } from "formik";
import {
	areDeeplyEqual,
	extractConditions,
	isValidSelectQuery,
} from "./utils/helpers";
import "./App.css";
import mario from "./assets/images/mario.png";
import king from "./assets/images/king.png";
import {
	Container,
	Paper,
	Typography,
	Button,
	Box,
	TextField,
	TextareaAutosize,
} from "@mui/material";
import { questions } from "./utils/questions";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_PROJECT_URL,
	import.meta.env.VITE_SUPABASE_PUBLIC_KEY
);

const driverObj2 = driver({
	animate: false,
	smoothScroll: false,
	showProgress: false,
	showButtons: ["next"],
	overlayColor: 'none',
	steps: [
	  { element: '.mario',popover: { description: 'Dialogue 1' } },
	  { element: '.king', popover: { description: 'Dialogue 2' } },
	]
});

const driverObj = driver({
	showProgress: true,
	smoothScroll: false,
	steps: [
	  { popover: { title: 'Welcome to MarioSQL', description: 'This is a fun way to learm basic SQL queries' } },
	  { element: '.form', popover: { title: 'Welcome to MarioSQL', description: 'You can write your queries here' } },
	  { element: '.output-box', popover: { title: 'Welcome to MarioSQL', description: 'You will be able to see the output here' } },
	  { popover: { title: 'Lets get started', description: 'There are 7 levels in this game. The dificulty will increase as you progress!' } },
	],
});


// driverObj.drive();
driverObj2.drive();



function App() {
	const sqlTerm = useRef();

	const [questionNumber, setQuestionNumber] = useState(1);

	async function executeQuery(query) {
		try {
			const parsedQuery = isValidSelectQuery(query);
			const tableName = parsedQuery.from[0]?.table;
			const columns = parsedQuery.columns
				?.map((column) => column?.expr?.column)
				.join(", ");
			let conditions = {};
			if (parsedQuery.where) conditions = extractConditions(parsedQuery.where);
			const { data } = await supabase
				.from(tableName)
				.select(columns)
				.match(conditions || {});
			const isMatch = areDeeplyEqual(
				data || [],
				questions[questionNumber - 1].response
			);
			let htmlTable = "<p>0 rows returned</p>";
			if (data?.length && data.length > 0) {
				const headers = Object.keys(data[0]).map(
					(keyName) => `<th>${keyName}</th>`
				);
				const tRows = data.map((character) => {
					const rowData = Object.values(character).map(
						(val) => `<td>${val}</td>`
					);
					return `<tr>${rowData.join("")}</tr>`;
				});
				htmlTable = `<table><thead><tr>${headers.join(
					""
				)}</tr></thead><tbody>${tRows.join("")}</tbody></table>`;
			}
			if (sqlTerm.current) {
				sqlTerm.current.innerHTML += htmlTable;
				sqlTerm.current.scrollTop = sqlTerm.current.scrollHeight;
			}
			if (!isMatch) {
				sqlTerm.current.innerHTML +=
					"<p style='color: red; margin-top: -5rem;'>That doesn't look right!</p>";
			} else {
				sqlTerm.current.innerHTML +=
					"<p style='color: green; margin-top: -5rem;'>Awesome!</p>";
				setQuestionNumber(questionNumber + 1);
			}
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className="background">
			<Container
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					minHeight: "100vh",
					width: "100%",
					padding: 0,
					maxWidth: "none",
				}}
			>
				<img src={mario} alt="Mario" className="mario" />
				<Typography variant="h3" sx={{ fontWeight: "bold" }}>
					Mario SQL
				</Typography>
				<Box
					elevation={3}
					ref={sqlTerm}
					sx={{
						p: 4,
						backgroundColor: "black",
						color: "white",
						width: "100%",
						minHeight: "200px",
						height: "15rem",
						maxWidth: "500px",
						overflow: "scroll",
						display: "flex",
						flexDirection: "column",
						gap: "5rem",
					}}
					className="output-box"
				/>
				<Box
					sx={{
						width: "100%",
						maxWidth: "500px",
						mt: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						padding: 0,
					}}
					elevation={3}
				>
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
						{({ isSubmitting }) => (
							<Form className="form">
								<Field
									//   as={TextField}
									className="input"
									name="query"
									label="Enter SQL Query"
									placeholder="SELECT...  Enter your SQL Query"
								/>
								<Button
									variant="contained"
									color="primary"
									type="submit"
									fullWidth
									disabled={isSubmitting}
									sx={{
										mt: 2,
										width: "100%",
									}}
								>
									Submit
								</Button>
							</Form>
						)}
					</Formik>
				</Box>
				<img src={king} alt="King" className="king"/>
			</Container>
		</div>
	);
}

export default App;
