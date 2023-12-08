import React from "react";

const Question = ({ question }) => {
	return (
		<div className="dialogue-balloon">
			<div className="dialogue-content">
				<p>{question}</p>
			</div>
		</div>
	);
};

export default Question;
