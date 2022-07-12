import React from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { shallowEqual } from "react-redux";
import { actions } from "../../app/citiesSlice";
import { fetchCityById } from '../../app/api';
import { Link } from "react-router-dom";

export const CityCard = ({ id }: { id: string }) => {
    const city = useAppSelector(s => s.cities[id], shallowEqual);
    const dispatch = useAppDispatch();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {city.name}
                    </Typography>
                    {city.loading && <Typography>Loading...</Typography>}
                    {!city.loading && <Typography>
                        Temperature: {city.main?.feels_like}<br />
                        Wind: {city.wind?.speed}<br />
                        General: {city.weather && city.weather[0]?.main}<br />
                    </Typography>}
                </CardContent>
                <CardActions>
                    <Link to={`/${city.id}`}>View</Link>
                    <Button size="small" onClick={() => fetchCityById(id, dispatch)}>Refresh</Button>
                    <Button size="small" onClick={() => dispatch(actions.delete(id))}>Delete</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}