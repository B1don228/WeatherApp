import { Button, Card, Input, Typography } from "@mui/material";
import { COLORS } from "../../constants/COLORS";

import styles from "./styles.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions as cityActions } from "../../redux/slices/citySlice";
import { useValidateCityMutation } from "../../redux/api/cityApi";

export const CreateWeatherCard = () => {
  const [cityName, setCityName] = useState<string | null>(null);
  const [createMode, setCreateMode] = useState<boolean>(false);

  const [validateCity, { data, isSuccess, isError, isLoading }] =
    useValidateCityMutation();

  const dispatch = useDispatch();

  const changeCityName = (event: ChangeEvent<HTMLInputElement>) =>
    setCityName(event.target.value);

  const openCreateMode = () => {
    if (!createMode) setCreateMode(true);
  };

  const closeCreateMode = () => {
    setCityName("");
    setCreateMode(false);
  };

  const addCityHandler = async () => {
    validateCity(cityName!);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(cityActions.addCity({ id: Math.random(), city: data?.name! }));
      closeCreateMode();
    }
  }, [isLoading]);

  return (
    <Card
      sx={{
        marginTop: 5,
        width: "340px",
        height: 218,
        borderRadius: 4,
        color: COLORS.primary_blue,
        background: "none",
        display: "flex",
        flexDirection: "column",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid",
        borderColor: COLORS.primary_blue,
      }}
      className={styles.container}
      onClick={openCreateMode}
    >
      {!createMode ? (
        <Typography variant="h6">Add City</Typography>
      ) : (
        <div className={styles.container_add}>
          {isError && (
            <p className={styles.container_add_error}>City doesn't exist</p>
          )}
          <Input onChange={changeCityName} value={cityName} />
          <div className={styles.container_add_buttons}>
            <Button variant="outlined" color="error" onClick={closeCreateMode}>
              Cancel
            </Button>
            <Button variant="contained" onClick={addCityHandler}>
              Add
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
