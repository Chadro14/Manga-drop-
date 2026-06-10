// src/components/common/Loader.jsx

export default function Loader({ fullscreen = true, size = 36 }) {
  if (fullscreen) {
    return (
      <div className="loader-fullscreen">
        <div className="loader-spinner" style={{ '--size': `${size}px` }} />
        <style>{loaderCSS}</style>
      </div>
    );
  }

  return (
    <>
      <div className="loader-inline">
        <div className="loader-spinner" style={{ '--size': `${size}px` }} />
      </div>
      <style>{loaderCSS}</style>
    </>
  );
}

const loaderCSS = `
  .loader-fullscreen {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background);
    z-index: 999;
  }

  .loader-inline {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 0;
  }

  .loader-spinner {
    width: var(--size, 36px);
    height: var(--size, 36px);
    border: 3px solid var(--color-primary-light);
    border-top-color: var(--color-primary);
    border-radius: var(--radius-full);
    animation: loader-spin 0.7s linear infinite;
  }

  @keyframes loader-spin {
    to { transform: rotate(360deg); }
  }
`;
