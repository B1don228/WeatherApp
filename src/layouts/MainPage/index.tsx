import { Typography } from "@mui/material";
import { CreateWeatherCard } from "../../components/CreateWeatherCard";
import { WeatherCard } from "../../components/WeatherCard";

import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { ReducersType } from "../../redux/reducers";
import { useDebounce } from "../../hooks/useDebounce";
import { LoadingProvider } from "../../components/LoadingProvider";

export const MainPage = () => {
  const CITIES = useSelector((state: ReducersType) => state.cityReducer.cities);
  const { searchValue } = useSelector(
    (state: ReducersType) => state.cityReducer
  );

  const { isLoading } = useDebounce(searchValue);

  return (
    <LoadingProvider isLoading={isLoading}>
      <div className={styles.container}>
        {CITIES.filter(({ city }) =>
          city.toLowerCase().includes(searchValue.toLowerCase())
        ).length === 0 ? (
          <Typography variant="h6">There is nothing here.</Typography>
        ) : (
          CITIES.filter(({ city }) =>
            city.toLowerCase().includes(searchValue.toLowerCase())
          ).map(({ city, id }) => <WeatherCard key={id} city={city} />)
        )}
        {!searchValue && <CreateWeatherCard />}
      </div>
    </LoadingProvider>
  );
};
