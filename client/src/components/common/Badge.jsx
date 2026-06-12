// src/components/common/Badge.jsx

const BADGE_STYLES = {
  NOUVEAU: {
    background: '#DBEAFE',
    color: '#1D4ED8',
    label: 'NOUVEAU',
  },
  HOT: {
    background: '#FEE2E2',
    color: '#DC2626',
    label: 'HOT',
  },
  COMPLET: {
    background: '#D1FAE5',
    color: '#059669',
    label: 'COMPLET',
  },
  'TOP 10': {
    background: '#FEF9C3',
    color: '#B45309',
    label: 'TOP 10',
  },
};

export default function Badge({ type }) {
  const style = BADGE_STYLES[type];
  if (!style) return null;

  return (
    <span
      className="badge"
      style={{
        background: style.background,
        color: style.color,
      }}
    >
      {style.label}
    </span>
  );
}

/*
  CSS à ajouter dans votre fichier CSS global ou un Badge.css :

  .badge {
    display: inline-block;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 2px 7px;
    border-radius: 4px;
    text-transform: uppercase;
    line-height: 1.6;
    white-space: nowrap;
  }
*/
