export const questions = [
	{
		question: "Retrieve the names of all worlds within Mario's universe.",
		response: [
			{
				world_id: 1,
				world_name: "Mushroom Kingdom",
				world_level: 1,
			},
			{
				world_id: 2,
				world_name: "Desert Land",
				world_level: 3,
			},
			{
				world_id: 3,
				world_name: "Sky Land",
				world_level: 5,
			},
		],
	},
	{
		question:
			"Gather the character names, distinguishing between allies and enemies.",
		response: [
			{
				character_id: 1,
				character_name: "Mario",
				character_health: 100,
				character_level: 1,
				character_status: "Ally",
			},
			{
				character_id: 2,
				character_name: "Luigi",
				character_health: 95,
				character_level: 1,
				character_status: "Ally",
			},
			{
				character_id: 3,
				character_name: "Bowser",
				character_health: 120,
				character_level: 5,
				character_status: "Enemy",
			},
			{
				character_id: 4,
				character_name: "Goomba",
				character_health: 20,
				character_level: 1,
				character_status: "Enemy",
			},
			{
				character_id: 5,
				character_name: "Toad",
				character_health: 50,
				character_level: 2,
				character_status: "Ally",
			},
		],
	},
	{
		question: "Identify all of Mario's allies from the characters table.",
		response: [
			{
				character_id: 1,
				character_name: "Mario",
				character_health: 100,
				character_level: 1,
				character_status: "Ally",
			},
			{
				character_id: 2,
				character_name: "Luigi",
				character_health: 95,
				character_level: 1,
				character_status: "Ally",
			},
			{
				character_id: 5,
				character_name: "Toad",
				character_health: 50,
				character_level: 2,
				character_status: "Ally",
			},
		],
	},
	{
		question:
			"Locate items in Mario's inventory labeled with the 'Heal' property.",
		response: [
			{
				inventory_id: 1,
				character_id: 1,
				item_name: "Mushroom",
				item_property: "Heal",
				item_value: 20,
			},
		],
	},
	{
		question:
			"Arrange the names of enemies by their levels, determining the sequence for defeating them.",
		response: [],
	},
];
