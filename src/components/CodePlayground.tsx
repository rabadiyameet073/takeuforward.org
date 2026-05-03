import { useState, useRef, useCallback, memo, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  ChevronDown,
  Copy,
  Check,
  ArrowRightLeft,
  Play,
  ScanSearch,
  LayoutList,
  Database,
  Zap,
  Sparkles,
  Terminal,
} from "lucide-react";
import {
  LANGUAGES,
  LANG_COLORS,
  LANG_ICONS,
  CODE_SNIPPETS,
  fileExt,
  type Lang,
} from "@/lib/codePlayground/langs";
import { highlightCode } from "@/lib/codePlayground/highlight";
import { analyzeCode } from "@/lib/codePlayground/analyze";
import { runInBrowser } from "@/lib/codePlayground/runJs";

/* ─── Language Selector ─── */
const LangSelector = memo(
  ({
    lang,
    onChange,
    disabled,
  }: {
    lang: Lang;
    onChange: (l: Lang) => void;
    disabled: boolean;
  }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setOpen((v) => !v)}
          disabled={disabled}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] hover:border-orange-500/40 hover:bg-white/[0.1] transition-all text-sm font-mono disabled:opacity-50"
          data-testid="btn-lang-selector"
        >
          <span>{LANG_ICONS[lang]}</span>
          <span className={LANG_COLORS[lang]}>{lang}</span>
          <ChevronDown
            className={`w-3 h-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
          >
            {LANGUAGES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  onChange(l);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-mono transition-all ${
                  l === lang
                    ? "bg-orange-500/15 text-orange-400"
                    : "text-gray-300 hover:bg-white/[0.06] hover:text-white"
                }`}
                data-testid={`lang-option-${l}`}
              >
                <span className="text-base">{LANG_ICONS[l]}</span>
                <span className={LANG_COLORS[l]}>{l}</span>
                {l === lang && <Check className="w-3.5 h-3.5 ml-auto text-orange-400" />}
              </button>
            ))}
          </motion.div>
        )}

        {open && (
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
        )}
      </div>
    );
  },
);
LangSelector.displayName = "LangSelector";

const kindIcon = {
  structure: LayoutList,
  data: Database,
  performance: Zap,
  style: Sparkles,
} as const;

export const CodePlayground = () => {
  const [currentLang, setCurrentLang] = useState<Lang>("JavaScript");
  const [userCodes, setUserCodes] = useState<Record<Lang, string>>(() => ({
    ...CODE_SNIPPETS,
  }));
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prevLang, setPrevLang] = useState<Lang | null>(null);
  const [runOut, setRunOut] = useState<{ stdout: string; stderr: string; skipped?: boolean; skipReason?: string } | null>(null);
  const [lastRunOk, setLastRunOk] = useState<boolean | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const code = userCodes[currentLang];
  const highlighted = useMemo(() => highlightCode(code, currentLang), [code, currentLang]);
  const lines = code.split("\n");
  const lineCount = lines.length;
  const suggestions = useMemo(() => analyzeCode(code, currentLang), [code, currentLang]);

  const handleLangChange = useCallback(
    (newLang: Lang) => {
      if (newLang === currentLang) return;
      setPrevLang(currentLang);
      setIsConverting(true);
      setTimeout(() => {
        setCurrentLang(newLang);
        setTimeout(() => {
          setIsConverting(false);
          setPrevLang(null);
        }, 300);
      }, 400);
    },
    [currentLang],
  );

  const handleCodeChange = useCallback((value: string) => {
    setUserCodes((prev) => ({ ...prev, [currentLang]: value }));
  }, [currentLang]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleRun = useCallback(() => {
    const result = runInBrowser(code, currentLang);
    setLastRunOk(result.skipped ? null : result.ok);
    setRunOut({
      stdout: result.stdout,
      stderr: result.stderr,
      skipped: result.skipped,
      skipReason: result.skipReason,
    });
  }, [code, currentLang]);

  const handleResetSnippet = useCallback(() => {
    setUserCodes((prev) => ({
      ...prev,
      [currentLang]: CODE_SNIPPETS[currentLang],
    }));
    setRunOut(null);
    setLastRunOk(null);
  }, [currentLang]);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 relative overflow-hidden"
      data-testid="section-code-playground"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4"
          >
            <Code2 className="w-3.5 h-3.5" /> Code lab
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3"
          >
            Write, <span className="text-primary">run</span>, and refine
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto"
          >
            One workspace: edit code, execute JavaScript/TypeScript in the browser, and get
            instant hints on structure, arrays & maps, and complexity — before you submit.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, type: "spring", stiffness: 80 }}
          className="mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/25 via-orange-500/10 to-purple-600/15 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            <div className="bg-[#0d0d0d] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
              {/* Title bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex gap-1.5 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs text-gray-500 font-mono truncate hidden sm:block">
                    {fileExt[currentLang]}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 justify-end">
                  {isConverting && prevLang && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-[10px] font-bold"
                    >
                      <ArrowRightLeft className="w-3 h-3 animate-spin" />
                      {prevLang} → {currentLang}
                    </motion.div>
                  )}

                  <LangSelector lang={currentLang} onChange={handleLangChange} disabled={isConverting} />

                  <button
                    type="button"
                    onClick={handleRun}
                    disabled={isConverting}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/90 hover:bg-primary text-primary-foreground text-xs font-bold transition-colors disabled:opacity-50"
                    data-testid="btn-run-code"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Run
                  </button>

                  <button
                    type="button"
                    onClick={handleResetSnippet}
                    disabled={isConverting}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/10 text-[11px] text-gray-400 hover:text-white hover:bg-white/[0.06] transition-colors disabled:opacity-50"
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg hover:bg-white/[0.08] text-gray-400 hover:text-white transition-all"
                    data-testid="btn-copy-code"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Editor + side panels */}
              <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:divide-x lg:divide-white/[0.06]">
                {/* Editor column */}
                <div className="relative min-h-[300px] max-h-[min(52vh,520px)] lg:max-h-[520px]">
                  {isConverting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
                      />
                      <span className="ml-3 text-primary font-mono text-sm font-bold">
                        Converting...
                      </span>
                    </motion.div>
                  )}

                  <motion.div
                    className="absolute left-0 w-full h-[1.5px] pointer-events-none z-20"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(249,115,22,0.5) 50%, transparent)",
                    }}
                    animate={{ top: ["4%", "96%", "4%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="flex overflow-auto overscroll-contain h-full max-h-[min(52vh,520px)]">
                    <div className="flex-shrink-0 py-4 pl-4 pr-2 select-none">
                      {lines.map((_, i) => (
                        <div
                          key={i}
                          className="text-[11px] sm:text-xs font-mono text-gray-600 leading-[1.75] text-right tabular-nums"
                          style={{ minWidth: "28px" }}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    <div className="flex-1 relative min-w-0 min-h-[min(280px,40vh)] py-4 pr-3 sm:pr-4">
                      <pre
                        className="pointer-events-none font-mono text-[11px] sm:text-xs leading-[1.75] whitespace-pre text-gray-300 m-0"
                        aria-hidden
                      >
                        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
                      </pre>
                      <textarea
                        value={code}
                        onChange={(e) => handleCodeChange(e.target.value)}
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="absolute inset-0 w-full h-full resize-none m-0 p-0 bg-transparent text-transparent caret-orange-400 selection:bg-primary/25 border-0 focus:ring-0 focus:outline-none font-mono text-[11px] sm:text-xs leading-[1.75] whitespace-pre"
                        style={{ tabSize: 2 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Insights column */}
                <div className="flex flex-col border-t lg:border-t-0 border-white/[0.06] bg-black/20 min-h-[220px] lg:min-h-0 lg:max-h-[520px]">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                      Output
                    </span>
                    {lastRunOk === true && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 font-mono">
                        ok
                      </span>
                    )}
                    {lastRunOk === false && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-mono">
                        error
                      </span>
                    )}
                  </div>
                  <div className="flex-1 overflow-auto px-4 py-3 font-mono text-[11px] sm:text-xs min-h-[100px] max-h-[140px] lg:max-h-none lg:flex-none border-b border-white/[0.06]">
                    {runOut?.skipped ? (
                      <p className="text-gray-400 leading-relaxed">{runOut.skipReason}</p>
                    ) : runOut ? (
                      <>
                        {runOut.stderr ? (
                          <pre className="text-red-400 whitespace-pre-wrap break-words mb-2">
                            {runOut.stderr}
                          </pre>
                        ) : null}
                        <pre className="text-gray-300 whitespace-pre-wrap break-words">
                          {runOut.stdout || "—"}
                        </pre>
                      </>
                    ) : (
                      <p className="text-gray-500">
                        Press <span className="text-primary font-semibold">Run</span> — JavaScript &
                        TypeScript execute here. Other languages: use hints and copy to your IDE.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                    <ScanSearch className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                      Code insights
                    </span>
                    <span className="text-[10px] text-gray-500 ml-auto">{suggestions.length} tips</span>
                  </div>
                  <ul className="flex-1 overflow-auto px-3 py-2 space-y-2 max-h-[200px] lg:max-h-[220px]">
                    {suggestions.length === 0 ? (
                      <li className="text-xs text-gray-500 px-1 py-2">
                        No automatic hints yet — keep coding or try a different pattern (e.g. hash map
                        for two-sum).
                      </li>
                    ) : (
                      suggestions.map((s) => {
                        const Icon = kindIcon[s.kind];
                        return (
                          <li
                            key={s.id}
                            className="flex gap-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2.5"
                          >
                            <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-gray-200 leading-snug">
                                {s.label}
                                {s.line != null ? (
                                  <span className="text-gray-500 font-mono font-normal">
                                    {" "}
                                    · L{s.line}
                                  </span>
                                ) : null}
                              </div>
                              <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                                {s.detail}
                              </p>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-2 border-t border-white/[0.08] bg-white/[0.02] flex-wrap gap-2">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500 font-mono">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  Editable · insights update as you type
                </div>
                <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-500 font-mono">
                  <span>{lineCount} lines</span>
                  <span>UTF-8</span>
                  <span className={LANG_COLORS[currentLang]}>{currentLang}</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            {LANGUAGES.map((l) => (
              <motion.button
                key={l}
                type="button"
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLangChange(l)}
                disabled={isConverting}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 disabled:opacity-50 ${
                  l === currentLang
                    ? "bg-primary/15 border-primary/40 text-primary shadow-[0_0_15px_rgba(249,115,22,0.25)]"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                }`}
                data-testid={`pill-${l}`}
              >
                <span className="mr-1.5">{LANG_ICONS[l]}</span>
                {l}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 text-xs sm:text-sm text-muted-foreground"
          >
            {[
              { icon: "▶︎", text: "Run JS / TS in browser" },
              { icon: "◇", text: "Structure & complexity hints" },
              { icon: "◎", text: "Arrays, maps & patterns" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-primary">{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .cpl-keyword { color: #ff79c6; font-weight: 600; }
        .cpl-string  { color: #f1fa8c; }
        .cpl-comment { color: #6272a4; font-style: italic; }
        .cpl-number  { color: #bd93f9; }
        .cpl-fn      { color: #8be9fd; }
      `}</style>
    </section>
  );
};
