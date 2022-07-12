import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { shallowEqual } from "react-redux";
import { Box, Card, CardContent, Container, CssBaseline, Grid, Typography } from "@mui/material";

export const DetailView = () => {
    let { id } = useParams();

    const city = useAppSelector(state => state.cities, shallowEqual);

    if (id) {
        const weather = city[id].weather && city[id].weather?.[0] ? city[id].weather?.[0] : undefined

        return (
            <Card>
                <CardContent>
                    <div>
                        <CardContent>
                            <Box display="flex" flexDirection="row">
                                <Box p={1}>
                                    <Typography variant="h2" color="textPrimary">
                                        {city[id].name}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {city[id].coord?.lon}, {city[id].coord?.lat}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardContent>
                            <Box display="flex" flexDirection="row-reverse">
                                <Box p={0} display="flex" flexDirection="row">
                                    {weather ? <img alt="Weather is down" src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}></img> : <span>No image</span>}
                                    <Typography variant="h4" color="textPrimary" mt={4}>
                                        Temp: {city[id].main?.temp}
                                        <span>&#176;</span>
                                        {"C"}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardContent>
                            <Box display="flex" flexDirection="row">
                                <Box p={1}>
                                    <Typography variant="h6" color="textPrimary">
                                        Humidity: {city[id].main?.humidity} %
                                    </Typography>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="h6" color="textPrimary">
                                        pressure: {city[id].main?.pressure} pa
                                    </Typography>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="h6" color="textPrimary">
                                        wind: {city[id].wind?.speed} km/h
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return <p>Error</p>
}