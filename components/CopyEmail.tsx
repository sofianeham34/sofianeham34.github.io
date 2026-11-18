"use client";

import { useState } from "react";

export function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="email">
      <a href={`mailto:${email}`} className="email-addr">
        {email}
      </a>
      <button type="button" className="btn" onClick={onCopy} aria-live="polite">
        {done ? `✓ ${copied}` : copy}
      </button>
    </div>
  );
}
