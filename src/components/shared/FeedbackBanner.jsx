export default function FeedbackBanner({ type, message }) {
  if (!message) return null;

  const styles = {
    correct:   { background: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0' },
    incorrect: { background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' },
    info:      { background: '#EBF0FF', color: '#1E40AF', border: '1px solid #BFDBFE' },
  };

  return (
    <div style={{ ...styles[type] ?? styles.info, padding: '12px 16px', borderRadius: '8px', margin: '12px 0', fontSize: '14px', lineHeight: 1.5 }}>
      {message}
    </div>
  );
}
