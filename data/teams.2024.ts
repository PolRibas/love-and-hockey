export interface SelectableTeam {
    name: string;
    color: string;
    captain?: string;
    textColor?: string;
    members: string[]
}

export const teams2024: SelectableTeam[] = [
    {
        name: "green",
        color: "bg-green-500",
        captain: 'Mica Conte',
        members: ["1. ---", "2. ---", "3. ---", "4. ---", "5. ---", "6. ---", "7. ---", "8. ---"]
    },
    {
        name: "red",
        color: "bgRed",
        captain: 'Lucas Valero',
        members: ["1. ---", "2. ---", "3. ---", "4. ---", "5. ---", "6. ---", "7. ---", "8. ---"]
    },
    {
        name: "blue",
        color: "bgBlue",
        captain: 'Candela Liz',
        members: ["1. ---", "2. ---", "3. ---", "4. ---", "5. ---", "6. ---", "7. ---", "8. ---"]
    },
    {
        name: "yellow",
        color: "bg-yellow-500",
        captain: 'Alex Fernandez',
        members: ["1. ---", "2. ---", "3. ---", "4. ---", "5. ---", "6. ---", "7. ---", "8. ---"]
    },
    {
        name: "white",
        color: "bg-white",
        captain: 'Rochi Pierini', 
        textColor: "text-black",
        members: ["1. ---", "2. ---", "3. ---", "4. ---", "5. ---", "6. ---", "7. ---", "8. ---"]
    },
    {
        name: "black",
        color: "bg-black",
        captain: 'Andres Orellana', 
        textColor: "text-white",
        members: ["1. ---", "2. ---", "3. ---", "4. ---", "5. ---", "6. ---", "7. ---", "8. ---"]
    },
];