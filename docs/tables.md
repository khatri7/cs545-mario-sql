Characters Table:
character_id
character_name
character_health
character_level
character_status

Inventory Table:
inventory_id
character_id
item_name
item_property
item_value

Worlds Table:
world_id
world_name
world_level

| character_id | character_name | character_health | character_level | character_status |
| 1 | Mario | 100 | 1 | Ally |
| 2 | Luigi | 95 | 1 | Ally |
| 3 | Bowser | 120 | 5 | Enemy |
| 4 | Goomba | 20 | 1 | Enemy |
| 5 | Toad | 50 | 2 | Ally |

| inventory_id | character_id | item_name | item_property | item_value |
| 1 | 1 | Mushroom | Heal | 20 |
| 2 | 1 | Fire Flower | Damage | 30 |
| 3 | 2 | Super Star | Power-Up | 50 |
| 4 | 3 | Poison Mushroom | Poison | -15 |
| 5 | 4 | Coin | Collectible | 1 |

| world_id | world_name | world_level |
| 1 | Mushroom Kingdom | 1 |
| 2 | Desert Land | 3 |
| 3 | Sky Land | 5 |
