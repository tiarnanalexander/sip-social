import React from "react";

/**
 * Custom Tina fields for picking a photo, used in place of a plain
 * `options: photoOptions` string field.
 *
 * Why this exists: a plain `options` list has to be baked into the Tina
 * schema itself, so every time Zoe uploads a new photo (which adds an entry
 * to lib/content/photo-manifest.json), the schema's hash changes - and that
 * hash has to match what's registered with Tina Cloud or the Vercel build
 * fails ("local Tina schema doesn't match remote Tina schema"). These
 * components instead fetch the current photo list themselves, at runtime in
 * the browser - so the schema field is just a plain string (or list of
 * strings) with a custom editor, and never changes shape no matter how many
 * photos exist. See scripts/generate-photo-manifest.js for where
 * public/photo-manifest.json (fetched below) comes from.
 *
 * Two components, because Tina hands a list-type string field's custom `ui`
 * component the WHOLE array as `input.value` (not one input per item) -
 * there's no per-item override for a plain string list, so the list variant
 * below implements its own add/remove UI around the same picker.
 */

type ManifestEntry = { alt: string };
type Manifest = Record<string, ManifestEntry>;

// Module-level cache: the manifest doesn't change while the admin tab is
// open, and several photo-picker fields can be on screen at once (e.g. the
// homepage's two-photo picker), so there's no reason to re-fetch per field.
let manifestCache: Promise<Manifest> | null = null;
function loadManifest(): Promise<Manifest> {
  if (!manifestCache) {
    manifestCache = fetch("/photo-manifest.json")
      .then((res) => {
        if (!res.ok) throw new Error(`photo-manifest.json: ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        manifestCache = null; // allow a retry on the next render
        throw err;
      });
  }
  return manifestCache;
}

function useManifest() {
  const [manifest, setManifest] = React.useState<Manifest | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    loadManifest()
      .then((m) => {
        if (!cancelled) setManifest(m);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load the photo list. Try refreshing the page.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { manifest, error };
}

function Thumb({ photoKey }: { photoKey: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/photos/${photoKey}-square.jpg`}
      alt=""
      style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
    />
  );
}

function PickerList({
  manifest,
  onPick,
  excluding,
}: {
  manifest: Manifest;
  onPick: (key: string) => void;
  excluding?: string[];
}) {
  const [query, setQuery] = React.useState("");
  const entries = Object.entries(manifest)
    .filter(([key]) => !excluding?.includes(key))
    .sort(([a], [b]) => a.localeCompare(b));
  const q = query.trim().toLowerCase();
  const filtered = q
    ? entries.filter(([key, entry]) => key.includes(q) || entry.alt.toLowerCase().includes(q))
    : entries;

  return (
    <div>
      <input
        type="text"
        placeholder="Search photos by name…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "6px 10px",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          fontSize: 13,
          marginBottom: 6,
        }}
      />
      <div style={{ maxHeight: 220, overflowY: "auto", border: "1px solid #e5e7eb", borderRadius: 6 }}>
        {filtered.length === 0 && (
          <p style={{ padding: 10, fontSize: 13, color: "#6b7280" }}>No photos match &quot;{query}&quot;.</p>
        )}
        {filtered.map(([key, entry]) => (
          <button
            type="button"
            key={key}
            onClick={() => onPick(key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "6px 10px",
              border: "none",
              borderBottom: "1px solid #f3f4f6",
              background: "transparent",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <Thumb photoKey={key} />
            <span style={{ fontSize: 13, color: "#111827" }}>{entry.alt || key}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Single-value picker (e.g. a hero photo, a portrait) -------------------

type SingleInput = { value: string; onChange: (value: string) => void };

export function PhotoPickerInput({ input }: { input: SingleInput }) {
  const { manifest, error } = useManifest();

  if (error) return <p style={{ color: "#b91c1c", fontSize: 13 }}>{error}</p>;
  if (!manifest) return <p style={{ color: "#6b7280", fontSize: 13 }}>Loading photos…</p>;

  const selected = input.value ? manifest[input.value] : undefined;

  return (
    <div>
      {input.value && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
            padding: 8,
            border: "1px solid #e5e7eb",
            borderRadius: 6,
          }}
        >
          {selected && <Thumb photoKey={input.value} />}
          <span style={{ fontSize: 13, color: "#374151" }}>
            {selected ? selected.alt : input.value}
            {!selected && " (not found in the current photo list)"}
          </span>
        </div>
      )}
      <PickerList manifest={manifest} onPick={input.onChange} />
    </div>
  );
}

// --- List picker (e.g. "Two Photos", three bio images) ---------------------

type ListInput = { value: string[] | undefined; onChange: (value: string[]) => void };

export function PhotoPickerListInput({ input }: { input: ListInput }) {
  const { manifest, error } = useManifest();
  const [adding, setAdding] = React.useState(false);
  const value = input.value ?? [];

  if (error) return <p style={{ color: "#b91c1c", fontSize: 13 }}>{error}</p>;
  if (!manifest) return <p style={{ color: "#6b7280", fontSize: 13 }}>Loading photos…</p>;

  const remove = (key: string) => input.onChange(value.filter((v) => v !== key));
  const add = (key: string) => {
    input.onChange([...value, key]);
    setAdding(false);
  };

  return (
    <div>
      {value.map((key) => {
        const entry = manifest[key];
        return (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
              padding: 8,
              border: "1px solid #e5e7eb",
              borderRadius: 6,
            }}
          >
            {entry && <Thumb photoKey={key} />}
            <span style={{ fontSize: 13, color: "#374151", flex: 1 }}>
              {entry ? entry.alt : key}
              {!entry && " (not found in the current photo list)"}
            </span>
            <button
              type="button"
              onClick={() => remove(key)}
              style={{
                border: "none",
                background: "transparent",
                color: "#b91c1c",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Remove
            </button>
          </div>
        );
      })}

      {adding ? (
        <PickerList manifest={manifest} onPick={add} excluding={value} />
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          style={{
            width: "100%",
            padding: "8px 10px",
            border: "1px dashed #d1d5db",
            borderRadius: 6,
            background: "transparent",
            cursor: "pointer",
            fontSize: 13,
            color: "#374151",
          }}
        >
          + Add a photo
        </button>
      )}
    </div>
  );
}
