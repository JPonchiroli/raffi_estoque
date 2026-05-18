'use client';

import { useEffect, useRef, useState } from 'react';
import FormInput from './FormInput';

interface AutocompleteOption {
  id: string | number;
  label: string;
  [key: string]: any;
}

interface AutocompleteInputProps {
  label?: string;
  placeholder?: string;
  onSelect: (option: AutocompleteOption) => void;
  fetchOptions: (query: string) => Promise<AutocompleteOption[]>;
  error?: string;
}

export default function AutocompleteInput({
  label,
  placeholder = 'Digite para buscar...',
  onSelect,
  fetchOptions,
  error,
}: AutocompleteInputProps) {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (value.trim()) {
        setIsLoading(true);
        try {
          const results = await fetchOptions(value);
          setOptions(results);
          setIsOpen(true);
        } catch (err) {
          setOptions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setOptions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [value, fetchOptions]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: AutocompleteOption) => {
    setValue(option.label);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div ref={containerRef} className="relative mb-4">
      <FormInput
        ref={inputRef}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={error}
        autoComplete="off"
      />
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-gray-500">Carregando...</div>
          ) : options.length > 0 ? (
            options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 transition border-b last:border-b-0"
              >
                {option.label}
              </button>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">Nenhum resultado encontrado</div>
          )}
        </div>
      )}
    </div>
  );
}
