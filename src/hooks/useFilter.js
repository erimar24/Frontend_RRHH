import { useMemo } from "react";

const useFilter = (
  filter,
  data,
  keysExtractor
) => {
  const filteredData = useMemo(() => {
    if (!data || !(Array.isArray(data))) return [];
    if (!filter) return [...data].reverse();
    return (data.filter((p) =>
      keysExtractor(p).toLowerCase().includes(filter.toLowerCase())
    ));
  }, [filter, data]);

  return { filteredData };
};

export default useFilter;