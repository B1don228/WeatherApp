import { useEffect, useState } from "react";

export const useDebounce = (searchValue: string) => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchValue && !isLoading) return;
    setIsLoading(true);

    const timer = setTimeout(() => {
      setValue(searchValue!);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return { isLoading, value };
};
