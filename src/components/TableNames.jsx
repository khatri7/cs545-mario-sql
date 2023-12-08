import React from "react";

const TableNames = () => {
	return (
		<div
			style={{
				background: "black",
				position: "fixed",
				bottom: "1rem",
				color: "white",
				padding: "1rem",
				fontSize: "14px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "0.8rem",
			}}
		>
			<div>
				characters [character_id, character_name, character_health,
				character_level, character_status]
			</div>
			<div>
				inventory [inventory_id, character_id, item_name, item_property,
				item_value]
			</div>
			<div>worlds [world_id, world_name, world_level]</div>
		</div>
	);
};

export default TableNames;
