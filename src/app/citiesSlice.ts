import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface City {
    id: number,
    name: string,
    loading?: Boolean
    clouds?: {
        all: number
    },
    coord?: {
        lon: number,
        lat: number
    },
    dt?: number,
    main?: {
        feels_like: number,
        grnd_level?: number,
        humidity?: number,
        pressure: number,
        temp: number,
        temp_max: number,
        temp_min: number
    },
    visibility?: number,
    weather?: [{
        description: string
        icon: string
        id: Number
        main: string
    }],
    wind?: {
        speed: number,
        deg: number
    },
}

export interface NameWeather { [key: string]: City };

const initialState: NameWeather = {}

const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        refresh(state, action: PayloadAction<City>) {
            state[action.payload.id] = action.payload;
        },
        delete(state, action: PayloadAction<string>) {
            delete state[action.payload];
        },
        loading(state, action: PayloadAction<string>) {
            state[action.payload].loading = true;
        }
    }
})

export default citiesSlice;
export const actions = citiesSlice.actions;