import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { COLORS } from "../../constants/COLORS";
import { MdDeleteOutline } from "react-icons/md";

import styles from "./styles.module.scss";
import { memo, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions as cityActions } from "../../redux/slices/citySlice";
import { useGetCityQuery } from "../../redux/api/cityApi";
import { LoadingProvider } from "../LoadingProvider";
import { getWeatherImage } from "../../utils/weatherIcon/weatherFunc";

interface IWeatherCardProps {
  city: string;
}

export const WeatherCard = memo(({ city }: IWeatherCardProps) => {
  const { data, isLoading, isError, refetch } = useGetCityQuery(city);
  const [refetched, setRefetched] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateHandler = () => {
    if (!isLoading) {
      navigate(`/${city.replace(/\s+/g, "")}`);
    }
  };

  const deleteHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch(cityActions.removeCity(city));
  };

  const refetchHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (refetched) return;
    refetch();
    setRefetched(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setRefetched(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [refetched]);

  return (
    <Card
      sx={{
        marginTop: 5,
        width: "340px",
        borderRadius: 4,
        color: "white",
        background: COLORS.primary_blue_gradient,
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
      className={styles.container}
      onClick={navigateHandler}
    >
      <LoadingProvider isLoading={isLoading}>
        <div className={styles.container_delete} onClick={deleteHandler}>
          <MdDeleteOutline size={25} color="white" />
        </div>
        <CardContent>
          <Box display={"flex"} alignItems={"center"} width={"100%"}>
            <Box display={"flex"} flexDirection={"column"}>
              <CardMedia
                component="img"
                image={getWeatherImage(data?.weather[0].main!)}
                alt="Weather"
                width={90}
                height={110}
                sx={{ maxWidth: 200 }}
              />
              <Typography variant="h6">
                {city}, {data?.sys.country}
              </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>{data?.weather[0].main}</Typography>
              <Typography>Wind speed: {data?.wind.speed} m/s</Typography>
              <Typography>Max temp:{data?.main.temp_max}°F</Typography>
            </Box>
          </Box>

          <Button variant="contained" onClick={refetchHandler}>
            {!refetched && !isLoading && !isError && "Refresh Weather"}
            {isLoading && "Refetching..."}
            {refetched && !isLoading && !isError && "Refetched"}
            {isError && "Oops, try again"}
          </Button>
        </CardContent>
      </LoadingProvider>
    </Card>
  );
});
