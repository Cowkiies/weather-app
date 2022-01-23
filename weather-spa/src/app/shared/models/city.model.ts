export interface City {
    id?: number;
    name: string;
    fullName: string;
    state: string;
    country: string;
    coord: {
        lon: number;
        lat: number
    }
}
