export default function ScoreChart({ percentage, color = '#10B981', size = 160 }) {
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);
  const center = size / 2;

  return (
    <svg width={size} height={size} role="img" aria-label={`Pontuação: ${percentage}%`}>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={stroke} />
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
      <text x={center} y={center} textAnchor="middle" dominantBaseline="central" fill="#1A1D29" fontSize={32} fontWeight="bold">
        {percentage}%
      </text>
    </svg>
  );
}
