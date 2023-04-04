interface FootballProps {
  x: number;
  y: number;
}

const FootballField = ({ x, y }: FootballProps) => {
  return (
    <svg
      width={x}
      height={y}
      viewBox={`0 0 ${x} ${y}`}
      stroke="white"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width={x} height={y} fill="green" />
      <rect
        id="mainRect"
        x="10"
        y="10"
        width={x - 20}
        height={y - 20}
        fill="green"
        stroke="white"
        strokeWidth="1"
      />

      <circle
        id="central-circle"
        cx={x / 2}
        cy={y / 2}
        r="32"
        stroke="white"
        strokeWidth="1"
        fillOpacity="0"
      />
      <circle
        id="central-circle-little"
        cx={x / 2}
        cy={y / 2}
        r="1"
        stroke="white"
        fill="white"
      />

      <circle
        id="circle-left"
        cx={50}
        cy={y / 2}
        r="32"
        stroke="white"
        strokeWidth="1"
        fillOpacity="0"
      />
      <circle
        id="circle-right"
        cx={x - 50}
        cy={y / 2}
        r="32"
        stroke="white"
        strokeWidth="1"
        fillOpacity="0"
      />

      <rect
        id="rect-left"
        x="10"
        y={y / 2 - 75}
        width="60"
        height="150"
        fill="green"
        stroke="white"
        strokeWidth="1"
      />
      <rect
        id="small-rect-left"
        x="10"
        y={y / 2 - 33}
        width="21"
        height="66"
        fill="green"
        stroke="white"
        strokeWidth="1"
      />

      <rect
        id="rect-right"
        x={x - 70}
        y={y / 2 - 75}
        width="60"
        height="150"
        fill="green"
        stroke="white"
        strokeWidth="1"
      />
      <rect
        id="small-rect-right"
        x={x - 31}
        y={y / 2 - 33}
        width="21"
        height="66"
        fill="green"
        stroke="white"
        strokeWidth="1"
      />

      <circle
        id="circle-penalty-left"
        cx="50"
        cy={y / 2}
        r="1"
        stroke="white"
        fill="white"
      />
      <circle
        id="circle-penalty-right"
        cx={x - 50}
        cy={y / 2}
        r="1"
        stroke="white"
        fill="white"
      />

      <line
        id="central-line"
        x1={x / 2}
        y1="10"
        x2={x / 2}
        y2={y - 10}
        stroke="white"
        fill="white"
        strokeWidth="1"
      />
    </svg>
  );
};

export default FootballField;
