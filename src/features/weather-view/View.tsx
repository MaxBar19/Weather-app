import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CityCard } from './CityCard';
import { fetchCityByName } from '../../app/api';
import { Footer } from './Footer';

export default function View() {
    const cities = useAppSelector(state => Object.keys(state.cities), shallowEqual);

    const dispatch = useAppDispatch();
    const theme = createTheme();
    const [input, setInput] = useState('');

    const handleCityNameFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input) fetchCityByName(input, dispatch);
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Weather App
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Paper
                                data-testid = "submit"
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                                onSubmit={handleCityNameFormSubmit}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Enter city name"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cities.map(id => <CityCard id={id} key={id} />)}
                    </Grid>
                </Container>
            </main>
            <Footer />
        </ThemeProvider>
    );
}