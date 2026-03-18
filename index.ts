interface User {
    name: string;
    id: number;
}

const newUser: User = {
    name: "Saulo",
    id: 1,
}

console.log(`Residente: ${newUser.name}`);