export default function FeedbackBanner({ type, message }) {
  if (!message) return null;

  const styles = {
    correct: { background: '#2d6a4f', color: '#d8f3dc' },
    incorrect: { background: '#6b2737', color: '#ffd6d6' },
    info: { background: '#1d3557', color: '#a8dadc' },
  };

  return (
    <div style={{ ...styles[type] ?? styles.info, padding: '12px 16px', borderRadius: '6px', margin: '12px 0' }}>
      {message}
    </div>
  );
}
