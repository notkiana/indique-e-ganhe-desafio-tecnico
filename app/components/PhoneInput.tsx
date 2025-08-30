'use client';
import { useState } from 'react';

/**
 * Campo simples que mantém somente dígitos e
 * exibe uma máscara básica (ex.: (11) 98888-7777).
 * A API receberá somente dígitos (sem formatação).
 */
export default function PhoneInput({
  value,
  onChange,
  id,
  required,
  placeholder = '(DDD) 9XXXX-XXXX',
}: {
  value: string;
  onChange: (v: string) => void;
  id: string;
  required?: boolean;
  placeholder?: string;
}) {
  const [display, setDisplay] = useState(value);

  function onlyDigits(s: string) {
    return s.replace(/\D+/g, '');
  }

  function formatBR(digits: string) {
    if (digits.length <= 10) {
      return digits.replace(/(\d{0,2})(\d{0,4})(\d{0,4}).*/, (m, a, b, c) => {
        return [a && `(${a})`, b, c && `-${c}`].filter(Boolean).join(' ');
      });
    }
    return digits.replace(/(\d{0,2})(\d{0,5})(\d{0,4}).*/, (m, a, b, c) => {
      return [a && `(${a})`, b, c && `-${c}`].filter(Boolean).join(' ');
    });
  }

  return (
    <input
      id={id}
      className="input"
      placeholder={placeholder}
      required={required}
      value={display}
      onChange={(e) => {
        const raw = onlyDigits(e.target.value);
        setDisplay(formatBR(raw));
        onChange(raw);
      }}
    />
  );
}
