
import React, { useEffect, useRef, useState } from 'react';

const COUNTER_URL =
  'https://stereochem-visitor-counter.scdrilko.workers.dev/';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const storageKey = 'stereochem3d_visitor_session_counted';
    let alreadyCounted = false;

    try {
      alreadyCounted = sessionStorage.getItem(storageKey) === '1';

      if (!alreadyCounted) {
        sessionStorage.setItem(storageKey, '1');
      }
    } catch {
      alreadyCounted = false;
    }

    fetch(COUNTER_URL, {
      method: alreadyCounted ? 'GET' : 'POST'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Counter request failed');
        }
        return response.json();
      })
      .then((data: { total_visits: number }) => {
        setCount(data.total_visits);
      })
      .catch(() => {
        if (!alreadyCounted) {
          try {
            sessionStorage.removeItem(storageKey);
          } catch {
            // Counter remains unavailable if browser storage is blocked.
          }
        }
      });
  }, []);

  if (count === null) return null;

  return (
    <div className="mt-3 text-center text-xs text-slate-500">
      Total visits: {count.toLocaleString('en-IN')}
    </div>
  );
}
