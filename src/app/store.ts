import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import citiesSlice, { NameWeather } from './citiesSlice'
import { fetchManyCities } from './api'

interface LocalStorageState {
    name: string
    id: number
}

let preloadedState: { cities: NameWeather } = { cities: {} };
try {
    const serialisedState = localStorage.getItem('data');
    if (serialisedState) {
        const data = JSON.parse(serialisedState) as LocalStorageState[];
        for (const item of data)
            preloadedState.cities[item.id] = { id: item.id, name: item.name, loading: true };
    }
} catch {
}

export const store = configureStore({
    reducer: combineReducers({
        cities: citiesSlice.reducer,
    }),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
    try {
        const data: LocalStorageState[] = Object.values(store.getState().cities).map(({ name, id }) => ({ name, id }));
        localStorage.setItem('data', JSON.stringify(data))
    } catch { }
})

const ids = Object.keys(preloadedState.cities);
if (ids.length > 0)
    fetchManyCities(ids, store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
