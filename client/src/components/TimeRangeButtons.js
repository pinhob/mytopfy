export const TimeRangeButtons = ({ activeRange, setActiveRange }) => {
  return (
    <ul>
      <ol
        className={activeRange === "short" ? "active" : ""}
      >
        <button onClick={() => setActiveRange("short")} >
          Últimas 4 semanas
        </button>
      </ol>
      <ol
        className={activeRange === "medium" ? "active" : ""}
      >
        <button onClick={() => setActiveRange("medium")} >
          Últimos 6 meses
        </button>
      </ol>
      <ol
        className={activeRange === "long" ? "active" : ""}
      >
        <button onClick={() => setActiveRange("long")} >
          Todos
        </button>
      </ol>
    </ul>
  );
};
