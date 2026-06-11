// src/hooks/useApi.js
import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

/**
 * Hook pour un appel API automatique au montage.
 * @param {string} path - Route API ex: '/api/manga'
 * @param {object} options - { skip: bool } pour retarder l'appel
 */
export function useApi(path, options = {}) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(!options.skip);
  const [error, setError]     = useState(null);
  const abortRef              = useRef(null);

  const fetch = useCallback(async (overridePath) => {
    const target = overridePath || path;
    if (!target) return;

    setLoading(true);
    setError(null);

    try {
      const result = await api.get(target);
      setData(result);
    } catch (err) {
      setError(err.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    if (!options.skip && path) {
      fetch();
    }
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [path, options.skip]);

  return { data, loading, error, refetch: fetch };
}

/**
 * Hook pour un appel API manuel (POST, PUT, DELETE).
 * @param {function} apiFn - Fonction async qui fait l'appel
 */
export function useApiMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const mutate = useCallback(async (apiFn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn(...args);
      return result;
    } catch (err) {
      setError(err.message || 'Erreur');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { mutate, loading, error };
}
