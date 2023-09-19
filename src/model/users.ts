
export interface UserData {
    name: string;
    surname: string;
    email: string;
    phone: string;
    city: string;
    street: string,
}

export interface People {
    id: number,
    name: string,
    username: string,
    email: string,
    phone: string,
    address: {
        street: string,
        city: string,
    }
}

