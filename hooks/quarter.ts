import { useEffect, useState } from "react";

import { defaultQuarter } from "../constants/api";
import { APIManager } from "../api/api-manager";
import to from "await-to-js";
import { YearQuarter } from "../shared/model/YearQuarter";

function useQuarter() {
  const [quarter, setQuarter] = useState<YearQuarter>(defaultQuarter);

  useEffect(() => {
    const fetchQuarter = async () => {
      const currQuarter = await APIManager.fetchCurrentQuarter();
      const nextQuarter = currQuarter.next();

      const [err] = await to(APIManager.fetchNumClasses(nextQuarter));

      setQuarter(err ? currQuarter : nextQuarter);
    };

    fetchQuarter();
  }, []);

  return quarter;
}

export default useQuarter;
