"use client";

import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface GeocodeResult {
  name: string;
  lat: number;
  lng: number;
  bbox?: [number, number, number, number];
}

export function SearchBar({
  onSelect,
}: {
  onSelect: (result: GeocodeResult) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (query.length < 3) {
      return;
    }

    const id = setTimeout(() => {
      startTransition(async () => {
        try {
          const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
          const data = await res.json();
          setResults(data.results ?? []);
          setOpen(true);
        } catch {
          setResults([]);
        }
      });
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  function handleSelect(r: GeocodeResult) {
    onSelect(r);
    setQuery(r.name);
    setOpen(false);
  }

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex gap-2">
        <Input
          placeholder="Buscar endereço..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="button" variant="outline" disabled={pending}>
          {pending ? "..." : "Buscar"}
        </Button>
      </div>
      {open && results.length > 0 && (
        <ul className="bg-popover absolute z-50 mt-2 max-h-80 w-full overflow-auto rounded-md border p-1 text-sm shadow">
          {results.map((r, i) => (
            <li key={i}>
              <button
                type="button"
                className="hover:bg-accent w-full truncate rounded px-2 py-1.5 text-left"
                onClick={() => handleSelect(r)}
              >
                {r.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
