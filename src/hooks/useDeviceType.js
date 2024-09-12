import { useState, useEffect } from "react";

// Define breakpoints for phone and tablet views
const PHONE_BREAKPOINT = 600; // width in pixels
const TABLET_BREAKPOINT = 1024; // width in pixels

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType);

  function getDeviceType() {
    if (typeof window !== "undefined") {
      if (window.matchMedia(`(max-width: ${PHONE_BREAKPOINT}px)`).matches)
        return "phone";
      else if (window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`).matches)
        return "tablet";
      else return "desktop";
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    if (typeof window !== "undefined")
      window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
