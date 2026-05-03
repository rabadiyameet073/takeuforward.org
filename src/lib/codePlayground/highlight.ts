import type { Lang } from "./langs";

export function highlightCode(code: string, lang: Lang): string {
  let text = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const tokens: string[] = [];
  const placeholder = (html: string) => {
    tokens.push(html);
    return `\x00${tokens.length - 1}\x00`;
  };

  text = text.replace(/(\/\*[\s\S]*?\*\/)/g, (m) =>
    placeholder(`<span class="cpl-comment">${m}</span>`),
  );

  text = text.replace(/(\/\/.*$|#.*$)/gm, (m) =>
    placeholder(`<span class="cpl-comment">${m}</span>`),
  );

  text = text.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    (m) => placeholder(`<span class="cpl-string">${m}</span>`),
  );

  const kwSets: Record<string, string[]> = {
    "C++": [
      "class",
      "public",
      "return",
      "for",
      "if",
      "int",
      "using",
      "namespace",
      "include",
      "vector",
      "unordered_map",
    ],
    Python: ["class", "def", "self", "for", "in", "if", "return", "list", "int"],
    JavaScript: ["var", "function", "const", "let", "for", "if", "return", "new"],
    Java: ["class", "public", "int", "for", "if", "return", "new", "import"],
    Go: ["func", "for", "if", "return", "range", "make", "map", "ok"],
    TypeScript: ["function", "const", "let", "for", "if", "return", "number", "new"],
  };
  const keywords = kwSets[lang] || [];
  if (keywords.length) {
    const kwRe = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
    text = text.replace(kwRe, '<span class="cpl-keyword">$1</span>');
  }

  text = text.replace(/\b(\d+)\b/g, '<span class="cpl-number">$1</span>');

  text = text.replace(
    /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    '<span class="cpl-fn">$1</span>',
  );

  text = text.replace(/\x00(\d+)\x00/g, (_, i) => tokens[Number(i)]);

  return text;
}
