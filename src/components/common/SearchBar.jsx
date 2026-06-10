// src/components/common/SearchBar.jsx
import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  placeholder = 'Rechercher un manga…',
  onSearch,
  onChange,
  defaultValue = '',
  autoFocus = false,
}) {
  const [value, setValue] = useState(defaultValue);

  function handleChange(e) {
    setValue(e.target.value);
    onChange?.(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch?.(value.trim());
  }

  function handleClear() {
    setValue('');
    onChange?.('');
    onSearch?.('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') handleClear();
  }

  return (
    <>
      <form className="searchbar" onSubmit={handleSubmit} role="search">
        <Search size={16} color="var(--color-text-light)" strokeWidth={2} />
        <input
          type="search"
          className="searchbar__input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          aria-label={placeholder}
        />
        {value && (
          <button
            type="button"
            className="searchbar__clear"
            onClick={handleClear}
            aria-label="Effacer"
          >
            <X size={14} color="var(--color-text-light)" strokeWidth={2} />
          </button>
        )}
      </form>

      <style>{`
        .searchbar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 0 12px;
          height: 44px;
          transition: border-color 0.15s;
        }
        .searchbar:focus-within {
          border-color: var(--color-primary);
        }
        .searchbar__input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 15px;
          color: var(--color-text);
          outline: none;
          min-width: 0;
        }
        .searchbar__input::placeholder {
          color: #CBD5E1;
        }
        .searchbar__input::-webkit-search-cancel-button {
          display: none;
        }
        .searchbar__clear {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: var(--radius-full);
          background: var(--color-border);
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .searchbar__clear:hover {
          background: #CBD5E1;
        }
      `}</style>
    </>
  );
}
