export default function ScoreChart({ percentage, color = '#52b788', size = 160 }) {
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);
  const center = size / 2;

  return (
    <svg width={size} height={size} role="img" aria-label={`Pontuação: ${percentage}%`}>
      {/* track */}
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#21262d" strokeWidth={stroke} />
      {/* progress */}
      <circle
        cx={center} cy={center} r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text x={center} y={center} textAnchor="middle" dominantBaseline="central" fill="#e6edf3" fontSize={32} fontWeight="bold">
        {percentage}%
      </text>
    </svg>
  );
}
