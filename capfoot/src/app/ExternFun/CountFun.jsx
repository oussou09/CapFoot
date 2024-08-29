import React, { useEffect, useState } from 'react';

function CountUp({ end, duration }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 10);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 10);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <h3 className="text-xl font-bold">{count}+</h3>

  );
}

export default CountUp;
