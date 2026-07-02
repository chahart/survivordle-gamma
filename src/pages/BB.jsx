import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LAUNCH = new Date("2026-07-09T04:00:00Z"); // Wed Jul 8 11pm CT (UTC-5)

function getTimeLeft() {
  const diff = LAUNCH - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

const BB_CSS = `
  .bb-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 1.2rem;
    padding: 2rem 1rem;
    text-align: center;
  }

  .bb-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 12vw, 7rem);
    line-height: 1;
    display: inline-flex;
    align-items: center;
    gap: 0;
  }

  .bb-title-left {
    background: linear-gradient(to right, #1a6fbf 0%, #5aaedd 60%, #b8e4f5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    vertical-align: middle;
  }

  .bb-title-eye {
    font-size: clamp(3.5rem, 13vw, 8rem);
    line-height: 1;
    display: inline-block;
    -webkit-text-fill-color: initial;
    vertical-align: middle;
    margin: 0 0.02em;
  }

  .bb-title-right {
    background: linear-gradient(to right, #b8e4f5 0%, #5aaedd 40%, #1a6fbf 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    vertical-align: middle;
  }

  .bb-coming-soon {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.2rem, 4vw, 2rem);
    letter-spacing: 0.2em;
    color: var(--text2);
  }

  .bb-countdown {
    display: flex;
    gap: 1.5rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .bb-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 3.5rem;
  }

  .bb-unit-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2rem, 8vw, 3.5rem);
    line-height: 1;
    color: var(--text);
  }

  .bb-unit-label {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text3);
    margin-top: 0.25rem;
  }

  .bb-divider {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2rem, 8vw, 3.5rem);
    line-height: 1;
    color: var(--text4);
    align-self: flex-start;
    padding-top: 0;
  }

  .bb-back-link {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: var(--text3);
    text-decoration: none;
  }

  .bb-back-link:hover {
    color: var(--text2);
  }
`;

export default function BB() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{BB_CSS}</style>
      <div className="bb-page">
        <div className="bb-title">
          <span className="bb-title-left">BIG BR</span>
          <span className="bb-title-eye">👁</span>
          <span className="bb-title-right">THERDLE</span>
        </div>
        <div className="bb-coming-soon">Coming Soon</div>

        {timeLeft ? (
          <div className="bb-countdown">
            <div className="bb-unit">
              <span className="bb-unit-value">{String(timeLeft.days).padStart(2, "0")}</span>
              <span className="bb-unit-label">Days</span>
            </div>
            <span className="bb-divider">:</span>
            <div className="bb-unit">
              <span className="bb-unit-value">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="bb-unit-label">Hours</span>
            </div>
            <span className="bb-divider">:</span>
            <div className="bb-unit">
              <span className="bb-unit-value">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="bb-unit-label">Minutes</span>
            </div>
            <span className="bb-divider">:</span>
            <div className="bb-unit">
              <span className="bb-unit-value">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="bb-unit-label">Seconds</span>
            </div>
          </div>
        ) : (
          <div className="bb-coming-soon">Now Live!</div>
        )}

        <Link to="/" className="bb-back-link">← Back to Survivordle</Link>
      </div>
    </>
  );
}
