import { useEffect, useState } from "react";
import ky from "ky-universal";
import { YearQuarter } from "../shared/model/Course";
import { defaultQuarter } from "../constants/api";

function useQuarter() {
  const [quarter, setQuarter] = useState<YearQuarter>(defaultQuarter);

  useEffect(() => {
    const fetchQuarter = async () => {
      const { default: quarterStr } = await ky(
        "https://api.codetabs.com/v1/proxy?quest=https://web.gogaucho.app/api/sche/getQuarter"
      ).json();
      setQuarter(YearQuarter.fromString(quarterStr) ?? defaultQuarter);
    };

    fetchQuarter();
  }, []);

  return quarter;
}

export default useQuarter;
