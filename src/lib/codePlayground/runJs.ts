import type { Lang } from "./langs";

export interface RunResult {
  ok: boolean;
  stdout: string;
  stderr: string;
  /** When language cannot execute in the browser */
  skipped?: boolean;
  skipReason?: string;
}

/** Naive TS → JS for in-browser run (sufficient for typical solution snippets). */
function stripTypescriptForRun(src: string): string {
  let s = src.replace(/^\s*export\s+/gm, "");
  s = s.replace(/interface\s+\w+\s*\{[^}]*\}\s*/gs, "");
  s = s.replace(/type\s+\w+\s*=\s*[^;]+;\s*/g, "");
  s = s.replace(/new Map<number,\s*number>\s*\(\s*\)/g, "new Map()");
  s = s.replace(/:\s*number\[\]/g, "");
  s = s.replace(/:\s*Map<number,\s*number>/g, "");
  s = s.replace(/:\s*number/g, "");
  s = s.replace(/as\s+const/g, "");
  s = s.replace(/!(\.|\[|\)|;|,|\s)/g, "$1");
  s = s.replace(/!(\s*;)/g, "$1");
  s = s.replace(/mp\.get\(diff\)!/g, "mp.get(diff)");
  s = s.replace(/\)\s*:\s*number\[\]\s*\{/g, ") {");
  s = s.replace(/\)\s*:\s*void\s*\{/g, ") {");
  return s;
}

export function runInBrowser(code: string, lang: Lang): RunResult {
  if (lang !== "JavaScript" && lang !== "TypeScript") {
    return {
      ok: true,
      stdout: "",
      stderr: "",
      skipped: true,
      skipReason:
        "In-browser Run uses the JavaScript engine. Switch to JavaScript or TypeScript to execute here, or copy your code to a local compiler for C++, Python, Java, or Go.",
    };
  }

  const runnable = lang === "TypeScript" ? stripTypescriptForRun(code) : code;

  const logs: string[] = [];
  const errs: string[] = [];

  const sandboxConsole = {
    log: (...args: unknown[]) => {
      logs.push(
        args
          .map((a) =>
            typeof a === "object" ? JSON.stringify(a) : String(a),
          )
          .join(" "),
      );
    },
    error: (...args: unknown[]) => {
      errs.push(args.map(String).join(" "));
    },
    warn: (...args: unknown[]) => {
      logs.push("[warn] " + args.map(String).join(" "));
    },
  };

  try {
    const wrapped = `
      "use strict";
      const console = arguments[0];
      ${runnable}

      if (typeof twoSum === "function") {
        console.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)));
      }
    `;
    const fn = new Function("console", wrapped);
    fn(sandboxConsole);

    const stdout = logs.join("\n");
    const stderr = errs.join("\n");
    const hint =
      !stdout && !stderr
        ? "\n(no console output — add console.log(...) or define twoSum for a sample run)"
        : "";

    return {
      ok: true,
      stdout: stdout + hint,
      stderr,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      stdout: logs.join("\n"),
      stderr: msg,
    };
  }
}
