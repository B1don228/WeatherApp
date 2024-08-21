import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { COLORS } from "../../constants/COLORS";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaTemperatureQuarter } from "react-icons/fa6";

import styles from "./styles.module.scss";

import {
  useGetCityQuery,
  useGetTemperatureCityQuery,
} from "../../redux/api/cityApi";
import { getWeatherImage } from "../../utils/weatherIcon/weatherFunc";
import { LoadingProvider } from "../../components/LoadingProvider";
import { createTempArray } from "../../utils/tempArray";
import { CustomChart } from "../../components/CustomChart";
import { formatDate } from "../../utils/date";
import { useSelector } from "react-redux";
import { ReducersType } from "../../redux/reducers";

export const WeatherDetailPage = () => {
  const { cities } = useSelector((state: ReducersType) => state.cityReducer);
  const { name } = useParams();

  const { data, isLoading, isError } = useGetCityQuery(name!, {
    skip: !cities.some(({ city }) => city === name),
  });
  const {
    data: tempData,
    isLoading: isLoadingTemp,
    isError: isErrorTemp,
  } = useGetTemperatureCityQuery(name!, {
    skip: !cities.some(({ city }) => city === name),
  });

  const formatedDate = formatDate();

  return (
    <Card
      sx={{
        marginTop: 5,
        background: COLORS.primary_blue_gradient,
        color: "white",
        borderRadius: 8,
      }}
      className={styles.container}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <LoadingProvider isLoading={isLoading} isError={isError || !data}>
          <Typography sx={{ textAlign: "start" }} variant="h4">
            {name} <HiOutlineLocationMarker size={25} color="white" />
          </Typography>
          <div className={styles.container_temp}>
            <div className={styles.container_temp_text}>
              <FaTemperatureQuarter size={45} color="white" />
              <div>{data?.main.temp}°F</div>
            </div>
            <CardMedia
              component="img"
              image={getWeatherImage(data?.weather[0].main!)}
              alt="Weather_image"
              width={200}
              height={200}
              sx={{ maxWidth: 280 }}
            />
          </div>
          <div className={styles.container_date}>{formatedDate}</div>
          <div className={styles.container_description}>
            <div>
              <p>Humidity</p>
              <p className={styles.gray_text}>
                {data?.main.humidity}{" "}
                <span className={styles.bold_text}>%</span>
              </p>
            </div>
            <div>
              <p>Visibility</p>
              <p className={styles.gray_text}>
                {data?.visibility! / 1000}{" "}
                <span className={styles.bold_text}>km</span>
              </p>
            </div>
            <div>
              <p>Weather</p>
              <p className={styles.gray_text}>
                {data?.weather[0].main}, {data?.weather[0].description}
              </p>
            </div>
            <div>
              <p>Wind</p>
              <p className={styles.gray_text}>
                {data?.wind.speed} <span className={styles.bold_text}>mph</span>
              </p>
            </div>
          </div>
          <div className={styles.container_description}>
            <div>
              <p>Pressure</p>
              <p className={styles.gray_text}>
                {data?.main.pressure}{" "}
                <span className={styles.bold_text}>hPa</span>
              </p>
            </div>
            <div>
              <p>Clouds</p>
              <p className={styles.gray_text}>
                {data?.clouds.all} <span className={styles.bold_text}>%</span>
              </p>
            </div>
          </div>
        </LoadingProvider>
        <LoadingProvider
          isError={isErrorTemp || !tempData}
          isLoading={isLoadingTemp}
        >
          <CustomChart data={createTempArray(tempData!)} />
        </LoadingProvider>
      </CardContent>
    </Card>
  );
};
