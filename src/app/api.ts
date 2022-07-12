import { City, actions } from './citiesSlice';
import type { AppDispatch } from './store';

export const fetchCityByName = async (name: string, dispatch: AppDispatch) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=a853f9c2e779e38c0703aa0973f8c4cb`)
        .then(data => data.json())
        .then(data => {
            if (data.id)
                dispatch(actions.refresh(data))
            else if (data.message)
                alert(data.message)
        });
}

export const fetchCityById = async (id: string, dispatch: AppDispatch) => {
    dispatch(actions.loading(id));
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=a853f9c2e779e38c0703aa0973f8c4cb`)
        .then(data => data.json())
        .then(data => dispatch(actions.refresh(data)));
}

export const fetchManyCities = async (ids: (number | string)[], dispatch: AppDispatch) => {
    fetch(`https://api.openweathermap.org/data/2.5/group?id=${ids.join(',')}&units=metric&appid=a853f9c2e779e38c0703aa0973f8c4cb`)
        .then(data => data.json())
        .then(data => {
            data.list.forEach((item: City) => dispatch(actions.refresh(item)));
        })
}