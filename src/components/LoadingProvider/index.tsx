import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";

interface ILoadingProviderProps {
  children: ReactNode;
  isLoading: boolean;
  isError?: boolean;
}

export const LoadingProvider = ({
  children,
  isLoading,
  isError,
}: ILoadingProviderProps) => {
  return (
    <div>
      {isError ? <>Fetch Error</> : isLoading ? <CircularProgress /> : children}
    </div>
  );
};
