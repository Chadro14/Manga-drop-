// src/components/common/Avatar.jsx

export default function Avatar({ src, name = '', size = 36, onClick }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: onClick ? 'pointer' : 'default',
    background: src ? 'transparent' : '#DBEAFE',
    border: '2px solid #E2E8F0',
    fontSize: size * 0.36,
    fontWeight: 600,
    color: '#2563EB',
    fontFamily: 'Inter, sans-serif',
    userSelect: 'none',
  };

  return (
    <div style={style} onClick={onClick} aria-label={name || 'avatar'}>
      {src ? (
        <img
          src={src}
          alt={name || 'avatar'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.dataset.fallback = 'true';
          }}
        />
      ) : (
        <span>{initials || '?'}</span>
      )}
    </div>
  );
}
