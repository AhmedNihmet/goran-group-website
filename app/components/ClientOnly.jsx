import { useEffect, useState } from "react";

let hydrating = true;
const ClientOnly = ({ children, fallback = null }) => {
  const [hydrated, setHydrated] = useState(() => !hydrating);

  useEffect(() => {
    hydrating = false;
    setHydrated(true);
  }, []);

  return hydrated ? <>{children()}</> : <>{fallback}</>;
};

export default ClientOnly;
