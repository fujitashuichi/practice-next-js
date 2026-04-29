import { useEffect, useState } from "react";

export const useTimeKeeper = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const checkTime = () => setTime(new Date());
    const timerId = setInterval(() => {
      checkTime();
    }, 5 * 60 * 1000);
    checkTime();

    return () => clearInterval(timerId);
  }, []);


  return { time }
}
