import { ITempArray } from "../../utils/types/temperature";
import { axisClasses, BarChart } from "@mui/x-charts";
import { valueFormatter } from "../../utils/tempFormater";

const chartSetting = {
  series: [{ dataKey: "temp", label: "Temperature", valueFormatter }],
  height: 300,
  sx: {
    "& .MuiChartsLegend-row": {
      display: "none",
    },
    [`& .${axisClasses.directionY} .${axisClasses.tickLabel}`]: {
      fill: "#ffffff",
    },
    [`& .${axisClasses.directionX} .${axisClasses.tickLabel}`]: {
      fill: "#ffffff",
    },
  },
};

export const CustomChart = ({ data }: ITempArray) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  const minTemp = data?.reduce(
    (min, current) => (current.temp < min ? current.temp : min),
    data[0].temp
  );
  const maxTemp = data?.reduce(
    (max, current) => (current.temp > max ? current.temp : max),
    data[0].temp
  );

  return (
    <div style={{ width: "100%" }}>
      <BarChart
        dataset={data && data}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "hour",
            tickPlacement: "middle",
            tickLabelPlacement: "middle",
          },
        ]}
        yAxis={[{ max: maxTemp + 5, min: minTemp - 5 }]}
        {...chartSetting}
      />
    </div>
  );
};
