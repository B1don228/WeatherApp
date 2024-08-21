import {
  Autocomplete,
  Button,
  CircularProgress,
  styled,
  TextField,
} from "@mui/material";
import { SyntheticEvent } from "react";

import { HiOutlineSearch } from "react-icons/hi";

import { COLORS } from "../../constants/COLORS";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../redux/reducers";
import { useDebounce } from "../../hooks/useDebounce";
import { actions as cityActions } from "../../redux/slices/citySlice";
import { useNavigate } from "react-router-dom";

const CustomTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: COLORS.primary_blue,
      transition: "all ease-in-out 300ms",
    },
    "&:hover fieldset": {
      borderColor: COLORS.primary_blue_hover,
      transform: "scale(1.02)",
    },
    "&.Mui-focused fieldset": {
      borderColor: COLORS.primary_blue,
    },
  },
  "& .MuiInputLabel-root": {
    color: COLORS.primary_blue,
    "&:hover": {
      color: COLORS.primary_blue,
    },
  },
  "& .MuiInputBase-input": {
    color: COLORS.primary_blue,
    width: "100%",
  },
}));

export const Header = () => {
  const searchCity = useSelector(
    (state: ReducersType) => state.cityReducer.searchValue
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading } = useDebounce(searchCity!);

  const citiesData = useSelector(
    (state: ReducersType) => state.cityReducer.cities
  );

  const changeSearchCityInput = (
    _event: SyntheticEvent,
    value: string,
    _reason: string
  ) => {
    dispatch(cityActions.changeSearchValue(value));
  };

  const navigateMainPageHandler = () => {
    navigate("/");
  };

  const clickSearchHandler = () => {
    navigate(`/${searchCity}`);
  };

  return (
    <header className={styles.container}>
      <div className={styles.container_title} onClick={navigateMainPageHandler}>
        Weather App
      </div>
      <div className={styles.container_search}>
        <Autocomplete
          disablePortal
          clearOnBlur={false}
          id="combo-box-demo"
          options={citiesData.map((item) => item.city)}
          sx={{
            width: {
              xs: "100%",
              sm: 400,
            },
            "& .MuiAutocomplete-popupIndicator": {
              display: "none",
            },
          }}
          onInputChange={changeSearchCityInput}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              value={searchCity!}
              label="Search City"
            />
          )}
        />
        <Button
          variant="contained"
          disabled={
            !searchCity ||
            !citiesData.some(({ city }) => city === searchCity) ||
            isLoading
          }
          onClick={clickSearchHandler}
        >
          {isLoading ? (
            <CircularProgress color="primary" size={25} />
          ) : (
            <HiOutlineSearch size={25} color="white" />
          )}
        </Button>
      </div>
    </header>
  );
};
