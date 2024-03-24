export interface SelectableTeam {
    name: string;
    color: string;
    captain: string;
    textColor?: string;
    members: string[]
}

export const teams2024: SelectableTeam[] = [
    {
        name: "Equipo Verde",
        color: "bg-green-500",
        captain: "Pendiente",
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
    {
        name: "Equipo Rojo",
        color: "bg-red-500",
        captain: "Pendiente",
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
    {
        name: "Equipo Azul",
        color: "bg-blue-500",
        captain: "Pendiente",
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
    {
        name: "Equipo Amarillo",
        color: "bg-yellow-500",
        captain: "Pendiente",
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
    {
        name: "Equipo Blanco",
        color: "bg-white",
        captain: "Pendiente", 
        textColor: "text-black",
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
    {
        name: "Equipo Negro",
        color: "bg-black",
        captain: "Pendiente", 
        textColor: "text-white",
        members: ["1. ", "2. ", "3. ", "4. ", "5. ", "6. ", "7. ", "8. "]
    },
];