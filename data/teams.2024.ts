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
        captain: undefined,
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
    {
        name: "red",
        color: "bgRed",
        captain: undefined,
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
    {
        name: "blue",
        color: "bgBlue",
        captain: undefined,
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
    {
        name: "yellow",
        color: "bg-yellow-500",
        captain: undefined,
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
    {
        name: "white",
        color: "bg-white",
        captain: undefined, 
        textColor: "text-black",
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
    {
        name: "black",
        color: "bg-black",
        captain: undefined, 
        textColor: "text-white",
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
];