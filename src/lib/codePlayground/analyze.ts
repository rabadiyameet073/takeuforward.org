import type { Lang } from "./langs";

export type SuggestionKind = "structure" | "data" | "performance" | "style";

export interface CodeSuggestion {
  id: string;
  kind: SuggestionKind;
  label: string;
  detail: string;
  line?: number;
}

function lineOf(code: string, index: number): number {
  return code.slice(0, index).split("\n").length;
}

/** Lightweight static hints — no AST; safe heuristics per language. */
export function analyzeCode(code: string, lang: Lang): CodeSuggestion[] {
  const out: CodeSuggestion[] = [];
  const lines = code.split("\n");
  const lower = code.toLowerCase();

  const push = (
    id: string,
    kind: SuggestionKind,
    label: string,
    detail: string,
    line?: number,
  ) => out.push({ id, kind, label, detail, line });

  // ── Generic ──
  if (code.length > 8000) {
    push("len", "structure", "Long file", "Consider splitting into smaller functions or modules for readability.");
  }
  const longLine = lines.findIndex((l) => l.length > 120);
  if (longLine >= 0) {
    push("long-line", "style", "Long line", "Break long lines (~120 cols) for easier review and diffs.", longLine + 1);
  }
  if (/\bTODO\b|\bFIXME\b/.test(code)) {
    const i = code.search(/\b(TODO|FIXME)\b/);
    push("todo", "structure", "TODO / FIXME", "Track open work items before submitting.", lineOf(code, i));
  }

  // ── Two-sum / interview patterns (all langs) ──
  const braceNested =
    /for\s*\([^)]+\)\s*\{[^}]*for\s*\([^)]+\)/s.test(code);
  const pyNested =
    lang === "Python" &&
    lines.filter((l) => /^\s*for\s+/.test(l)).length >= 2;
  const nestedFor = braceNested || pyNested;
  const hasMapLike =
    /\b(Map|Set|unordered_map|HashMap|dict\b|\{\}|\[\])/i.test(code) ||
    /\b(mp|seen|store|memo)\b/.test(lower);
  if (nestedFor && !hasMapLike) {
    push(
      "two-sum-hash",
      "performance",
      "Possible O(n²) nested loops",
      "For pair-sum problems, a hash map / dict often reduces time from O(n²) to O(n) by trading space for lookups.",
    );
  }

  // ── Language-specific ──
  if (lang === "JavaScript" || lang === "TypeScript") {
    if (/\bvar\s+/.test(code)) {
      push("js-var", "style", "Prefer const / let", "Avoid var — use const by default and let when reassigning.");
    }
    if (/[^=!]==[^=]/.test(code)) {
      push("js-eq", "style", "Loose equality", "Use === and !== to avoid coercions.");
    }
    if (/\.forEach\s*\(/.test(code) && /return\s+/.test(code)) {
      push("js-foreach", "structure", "forEach + return", "forEach ignores returned values; use for...of or a classic for loop if you need early exit.");
    }
    if (/\bnums\s*\[\s*i\s*\]\s*\+\s*nums\s*\[\s*j\s*\]/.test(code)) {
      push("js-pair", "data", "Indexing pairs", "Double loops over indices work but get verbose; a Map from value → index is idiomatic for two-sum.");
    }
  }

  if (lang === "Python") {
    if (/print\s*\(\s*["']/.test(code) && !code.includes("if __name__")) {
      push("py-main", "structure", "Top-level prints", "Guard demo prints with if __name__ == \"__main__\": in libraries.");
    }
    if (/\blist\s*\(\s*range\s*\(/.test(lower) && nestedFor) {
      push("py-range", "performance", "Nested iteration", "Sometimes enumerate + set membership or dict lookups simplify nested list scans.");
    }
  }

  if (lang === "C++") {
    if (/#include\s*<vector>/.test(code) && /int\s+\w+\s*\[\s*\d+\s*\]/.test(code)) {
      push("cpp-array", "data", "Fixed array vs vector", "Prefer std::vector for dynamic size unless the size is truly compile-time constant.");
    }
    if (/using namespace std/.test(code)) {
      push("cpp-using", "style", "using namespace std", "In headers avoid it; in cpp files it is acceptable but explicit std:: improves clarity.");
    }
    if (!/#include\s*<unordered_map>/.test(code) && /\bunordered_map\b/.test(code)) {
      push("cpp-include", "structure", "Include headers", "Ensure <unordered_map> is included when using std::unordered_map.");
    }
  }

  if (lang === "Java") {
    if (/new int\[/.test(code) && /twoSum/.test(code)) {
      push("java-arr", "data", "Returning arrays", "Returning new int[]{a,b} is fine; List.of / streams are alternatives when sizes grow.");
    }
    if (/HashMap/.test(code) && !/import java.util.HashMap/.test(code)) {
      push("java-import", "structure", "Imports", "Verify java.util.HashMap is imported.");
    }
  }

  if (lang === "Go") {
    if (/make\s*\(\s*\[\s*\]/.test(code)) {
      push("go-slice", "data", "Slices", "Prealloc with known cap can reduce reallocations: make([]int, 0, n).");
    }
  }

  // ── Positive reinforcement ──
  if (/\b(unordered_map|HashMap|map\[|Map<|dict\b|\bMap\s*\()/.test(code) && /target|diff|complement/i.test(code)) {
    push(
      "good-hash",
      "performance",
      "Hash-based lookup",
      "Nice — using a map-like structure matches the usual optimal approach for value → index tracking.",
    );
  }

  // De-dupe by id
  const seen = new Set<string>();
  return out.filter((s) => (seen.has(s.id) ? false : (seen.add(s.id), true)));
}
