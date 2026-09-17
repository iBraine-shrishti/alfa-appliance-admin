import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiLink, FiX, FiCheck, FiCode, FiEye } from "react-icons/fi";

const TEXT_COLORS = [
  "#000000",
  "#0f172a",
  "#2563eb",
  "#059669",
  "#dc2626",
  "#d97706",
  "#7c3aed",
  "#475569",
];

const BG_COLORS = [
  "transparent",
  "#fef08a", // Yellow
  "#bbf7d0", // Green
  "#bfdbfe", // Blue
  "#fbcfe8", // Pink
  "#fed7aa", // Orange
  "#e2e8f0", // Grey
];

const RichTextField = ({
  label,
  placeholder = "Write description here...",
  value = "",
  onChange,
  minHeight = "160px",
}) => {
  const editorRef = useRef(null);
  const isInternalChangeRef = useRef(false);
  const containerRef = useRef(null);

  // Raw HTML/text toggle
  const [isRawMode, setIsRawMode] = useState(false);

  // Dropdown states
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);
  const [showTextColorMenu, setShowTextColorMenu] = useState(false);
  const [showBgColorMenu, setShowBgColorMenu] = useState(false);
  const [showAlignMenu, setShowAlignMenu] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const savedSelectionRangeRef = useRef(null);


  // Active state trackers
  const [currentHeading, setCurrentHeading] = useState("Normal");
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    quote: false,
    orderedList: false,
    unorderedList: false,
  });

  // Keep external value in sync with contentEditable
  useEffect(() => {
    if (editorRef.current && !isRawMode) {
      if (!isInternalChangeRef.current) {
        let htmlVal = value || "";
        // If value has newlines but no HTML tags, preserve them as <br>
        if (htmlVal && !/<[a-z][\s\S]*>/i.test(htmlVal) && htmlVal.includes("\n")) {
          htmlVal = htmlVal
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\r\n|\r|\n/g, "<br>");
        }
        if (editorRef.current.innerHTML !== htmlVal) {
          editorRef.current.innerHTML = htmlVal;
        }
      }
      isInternalChangeRef.current = false;
    }
  }, [value, isRawMode]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowHeadingMenu(false);
        setShowTextColorMenu(false);
        setShowBgColorMenu(false);
        setShowAlignMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePaste = (e) => {
    if (isRawMode) return;

    e.preventDefault();
    const plainText = e.clipboardData?.getData("text/plain") || "";
    const htmlText = e.clipboardData?.getData("text/html") || "";

    let contentToInsert = "";

    // If clipboard has rich HTML with tables or structured lists, preserve that HTML cleanly
    if (htmlText && (htmlText.includes("<table") || htmlText.includes("<ul") || htmlText.includes("<ol"))) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        doc.querySelectorAll("script, style, meta, link").forEach((el) => el.remove());
        contentToInsert = doc.body.innerHTML;
      } catch {
        contentToInsert = "";
      }
    }

    // If not rich HTML table/list, or for plain text (e.g. copied Currys specs or any multi-line document):
    if (!contentToInsert && plainText) {
      const escaped = plainText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      // Strictly convert newlines to <br> so all line breaks are retained
      contentToInsert = escaped.replace(/\r\n|\r|\n/g, "<br>");
    }

    if (contentToInsert) {
      const success = document.execCommand("insertHTML", false, contentToInsert);
      if (!success) {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          range.deleteContents();
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = contentToInsert;
          const frag = document.createDocumentFragment();
          let node;
          while ((node = tempDiv.firstChild)) {
            frag.appendChild(node);
          }
          range.insertNode(frag);
        }
      }
      handleInput();
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      isInternalChangeRef.current = true;
      onChange(editorRef.current.innerHTML);
      checkActiveStates();
    }
  };

  const checkActiveStates = () => {
    try {
      setActiveFormats({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strike: document.queryCommandState("strikeThrough"),
        orderedList: document.queryCommandState("insertOrderedList"),
        unorderedList: document.queryCommandState("insertUnorderedList"),
      });

      const block = document.queryCommandValue("formatBlock");
      if (block) {
        const cleanBlock = block.toLowerCase().replace(/[<>]/g, "");
        if (cleanBlock === "h1") setCurrentHeading("Heading 1");
        else if (cleanBlock === "h2") setCurrentHeading("Heading 2");
        else if (cleanBlock === "h3") setCurrentHeading("Heading 3");
        else if (cleanBlock === "h4") setCurrentHeading("Heading 4");
        else setCurrentHeading("Normal");
      } else {
        setCurrentHeading("Normal");
      }
    } catch {
      // queryCommandState might fail on some elements
    }
  };

  const exec = (command, val = null) => {
    if (isRawMode) return;
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, val);
      handleInput();
    }
  };

  const selectHeading = (type) => {
    if (isRawMode) return;
    setCurrentHeading(type);
    setShowHeadingMenu(false);
    if (editorRef.current) {
      editorRef.current.focus();
      if (type === "Heading 1") {
        document.execCommand("formatBlock", false, "<h1>");
      } else if (type === "Heading 2") {
        document.execCommand("formatBlock", false, "<h2>");
      } else if (type === "Heading 3") {
        document.execCommand("formatBlock", false, "<h3>");
      } else if (type === "Heading 4") {
        document.execCommand("formatBlock", false, "<h4>");
      } else {
        document.execCommand("formatBlock", false, "<p>");
      }
      handleInput();
    }
  };

  const handleBlockquote = () => {
    if (isRawMode) return;
    exec("formatBlock", "<blockquote>");
  };

  const handleOpenLinkModal = () => {
    if (isRawMode) return;
    // Save current text selection so link can be applied accurately
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
    setLinkInput("");
    setShowLinkModal(true);
  };

  const handleApplyLink = () => {
    if (!linkInput.trim()) {
      setShowLinkModal(false);
      return;
    }
    if (editorRef.current) {
      editorRef.current.focus();
      // Restore selection
      if (savedSelectionRangeRef.current) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedSelectionRangeRef.current);
      }
      const url =
        linkInput.startsWith("http://") || linkInput.startsWith("https://")
          ? linkInput
          : `https://${linkInput}`;
      document.execCommand("createLink", false, url);
      handleInput();
    }
    setShowLinkModal(false);
  };

  const handleClearFormat = () => {
    exec("removeFormat");
    selectHeading("Normal");
  };

  return (
    <div ref={containerRef} className="flex flex-col">
      {label && (
        <label className="mb-2 block text-xs font-bold tracking-wider text-slate-500">
          {label}
        </label>
      )}

      <div className="rounded border border-slate-200 bg-white transition-colors focus-within:border-blue-600">
        {/* Toolbar matching image.png */}
        <div className="relative flex flex-wrap items-center gap-1 border-b border-slate-200 bg-[#f8fafc] px-2.5 py-1.5 text-slate-700 select-none">
          {/* 1. Format / Heading Dropdown */}
          <div className="relative mr-1">
            <button
              type="button"
              onClick={() => {
                setShowHeadingMenu(!showHeadingMenu);
                setShowTextColorMenu(false);
                setShowBgColorMenu(false);
                setShowAlignMenu(false);
              }}
              className="flex items-center justify-between gap-1.5 rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-xs hover:bg-slate-50 cursor-pointer min-w-[84px]"
            >
              <span>{currentHeading}</span>
              <FiChevronDown size={11} className="text-slate-400" />
            </button>

            {/* Heading Menu Popover matching image.png */}
            {showHeadingMenu && (
              <div className="absolute left-0 top-full z-40 mt-1 w-44 rounded-md border border-slate-200 bg-white py-1 shadow-xl">
                <button
                  type="button"
                  onClick={() => selectHeading("Heading 1")}
                  className="block w-full px-3 py-1.5 text-left text-2xl font-bold text-slate-900 hover:bg-slate-50 cursor-pointer leading-tight"
                >
                  Heading 1
                </button>
                <button
                  type="button"
                  onClick={() => selectHeading("Heading 2")}
                  className="block w-full px-3 py-1.5 text-left text-xl font-bold text-slate-800 hover:bg-slate-50 cursor-pointer leading-tight"
                >
                  Heading 2
                </button>
                <button
                  type="button"
                  onClick={() => selectHeading("Heading 3")}
                  className="block w-full px-3 py-1.5 text-left text-base font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer leading-tight"
                >
                  Heading 3
                </button>
                <button
                  type="button"
                  onClick={() => selectHeading("Heading 4")}
                  className="block w-full px-3 py-1.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer leading-tight"
                >
                  Heading 4
                </button>
                <button
                  type="button"
                  onClick={() => selectHeading("Normal")}
                  className="block w-full px-3 py-1.5 text-left text-xs font-normal text-slate-600 hover:bg-slate-50 cursor-pointer leading-tight"
                >
                  Normal
                </button>
              </div>
            )}
          </div>

          {/* 2. Bold (B) */}
          <button
            type="button"
            onClick={() => exec("bold")}
            title="Bold"
            className={`flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors ${
              activeFormats.bold ? "bg-slate-200 text-blue-600 font-extrabold" : "font-bold text-slate-700"
            }`}
          >
            <span className="font-serif text-sm">B</span>
          </button>

          {/* 3. Italic (I) */}
          <button
            type="button"
            onClick={() => exec("italic")}
            title="Italic"
            className={`flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors ${
              activeFormats.italic ? "bg-slate-200 text-blue-600 font-bold" : "font-serif italic font-semibold text-slate-700"
            }`}
          >
            <span className="font-serif italic text-sm">I</span>
          </button>

          {/* 4. Underline (U) */}
          <button
            type="button"
            onClick={() => exec("underline")}
            title="Underline"
            className={`flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors ${
              activeFormats.underline ? "bg-slate-200 text-blue-600 font-bold" : "text-slate-700"
            }`}
          >
            <span className="font-serif underline font-bold text-sm">U</span>
          </button>

          {/* 5. Strikethrough (S) */}
          <button
            type="button"
            onClick={() => exec("strikeThrough")}
            title="Strikethrough"
            className={`flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors ${
              activeFormats.strike ? "bg-slate-200 text-blue-600 font-bold" : "text-slate-700"
            }`}
          >
            <span className="font-serif line-through font-bold text-sm">S</span>
          </button>

          {/* 6. Blockquote (”) */}
          <button
            type="button"
            onClick={handleBlockquote}
            title="Quote"
            className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors font-serif font-black text-base text-slate-700 leading-none"
          >
            ”
          </button>

          {/* 7. Numbered list (1 2 3 =) */}
          <button
            type="button"
            onClick={() => exec("insertOrderedList")}
            title="Numbered list"
            className={`flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors ${
              activeFormats.orderedList ? "bg-slate-200 text-blue-600" : "text-slate-700"
            }`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <text x="2" y="7" fontSize="7" fontWeight="bold" fill="currentColor" stroke="none">1</text>
              <text x="2" y="13" fontSize="7" fontWeight="bold" fill="currentColor" stroke="none">2</text>
              <text x="2" y="19" fontSize="7" fontWeight="bold" fill="currentColor" stroke="none">3</text>
            </svg>
          </button>

          {/* 8. Bullet list (: =) */}
          <button
            type="button"
            onClick={() => exec("insertUnorderedList")}
            title="Bullet list"
            className={`flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors ${
              activeFormats.unorderedList ? "bg-slate-200 text-blue-600" : "text-slate-700"
            }`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="9" y1="6" x2="20" y2="6" />
              <line x1="9" y1="12" x2="20" y2="12" />
              <line x1="9" y1="18" x2="20" y2="18" />
              <circle cx="4" cy="6" r="1.5" fill="currentColor" />
              <circle cx="4" cy="12" r="1.5" fill="currentColor" />
              <circle cx="4" cy="18" r="1.5" fill="currentColor" />
            </svg>
          </button>

          {/* 9. Text Color (A with underline) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowTextColorMenu(!showTextColorMenu);
                setShowHeadingMenu(false);
                setShowBgColorMenu(false);
                setShowAlignMenu(false);
              }}
              title="Text Color"
              className="flex h-7 w-7 flex-col items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors"
            >
              <span className="text-xs font-extrabold text-slate-800 leading-none">A</span>
              <span className="mt-0.5 h-0.5 w-3.5 rounded-full bg-slate-900" />
            </button>

            {showTextColorMenu && (
              <div className="absolute left-0 top-full z-40 mt-1 rounded-md border border-slate-200 bg-white p-2 shadow-xl">
                <p className="mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Text Color
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {TEXT_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        exec("foreColor", c);
                        setShowTextColorMenu(false);
                      }}
                      className="h-5 w-5 rounded-full border border-slate-300 transition-transform hover:scale-115"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 10. Background / Highlight Color (A with shaded box) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowBgColorMenu(!showBgColorMenu);
                setShowHeadingMenu(false);
                setShowTextColorMenu(false);
                setShowAlignMenu(false);
              }}
              title="Highlight / Background Color"
              className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors"
            >
              <span className="rounded bg-amber-200/80 px-1 py-0.2 text-xs font-bold text-slate-900 leading-none border border-amber-300">
                A
              </span>
            </button>

            {showBgColorMenu && (
              <div className="absolute left-0 top-full z-40 mt-1 rounded-md border border-slate-200 bg-white p-2 shadow-xl">
                <p className="mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Highlight Color
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {BG_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        exec("hiliteColor", c);
                        setShowBgColorMenu(false);
                      }}
                      className="h-5 w-5 rounded border border-slate-300 text-[10px] flex items-center justify-center transition-transform hover:scale-115"
                      style={{ backgroundColor: c }}
                    >
                      {c === "transparent" ? "✕" : ""}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 11. Text Alignment (≡) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowAlignMenu(!showAlignMenu);
                setShowHeadingMenu(false);
                setShowTextColorMenu(false);
                setShowBgColorMenu(false);
              }}
              title="Align Text"
              className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors text-slate-700"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="15" y2="12" />
                <line x1="3" y1="18" x2="18" y2="18" />
              </svg>
            </button>

            {showAlignMenu && (
              <div className="absolute left-0 top-full z-40 mt-1 flex flex-col gap-1 rounded-md border border-slate-200 bg-white p-1.5 shadow-xl text-xs">
                <button
                  type="button"
                  onClick={() => {
                    exec("justifyLeft");
                    setShowAlignMenu(false);
                  }}
                  className="flex items-center gap-2 rounded px-2 py-1 text-left hover:bg-slate-50 cursor-pointer"
                >
                  Align Left
                </button>
                <button
                  type="button"
                  onClick={() => {
                    exec("justifyCenter");
                    setShowAlignMenu(false);
                  }}
                  className="flex items-center gap-2 rounded px-2 py-1 text-left hover:bg-slate-50 cursor-pointer"
                >
                  Align Center
                </button>
                <button
                  type="button"
                  onClick={() => {
                    exec("justifyRight");
                    setShowAlignMenu(false);
                  }}
                  className="flex items-center gap-2 rounded px-2 py-1 text-left hover:bg-slate-50 cursor-pointer"
                >
                  Align Right
                </button>
                <button
                  type="button"
                  onClick={() => {
                    exec("justifyFull");
                    setShowAlignMenu(false);
                  }}
                  className="flex items-center gap-2 rounded px-2 py-1 text-left hover:bg-slate-50 cursor-pointer"
                >
                  Justify
                </button>
              </div>
            )}
          </div>

          {/* 12. Link (🔗) */}
          <button
            type="button"
            onClick={handleOpenLinkModal}
            title="Insert Link"
            className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors text-slate-700"
          >
            <FiLink size={14} />
          </button>

          {/* 13. Remove format (Tx) */}
          <button
            type="button"
            onClick={handleClearFormat}
            disabled={isRawMode}
            title="Clear formatting"
            className={`flex h-7 w-7 items-center justify-center rounded hover:bg-slate-200/70 cursor-pointer transition-colors text-slate-700 ${
              isRawMode ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            <span className="font-serif font-bold text-xs">
              T<sub className="text-[9px] -bottom-0.5">x</sub>
            </span>
          </button>

          {/* 14. Raw Text / Code Mode Toggle */}
          <div className="ml-auto flex items-center pl-2 border-l border-slate-200">
            <button
              type="button"
              onClick={() => setIsRawMode(!isRawMode)}
              title={isRawMode ? "Switch to Visual Editor" : "Switch to Raw Text & HTML Mode"}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
                isRawMode
                  ? "bg-blue-600 text-white shadow-xs hover:bg-blue-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {isRawMode ? (
                <>
                  <FiEye size={13} />
                  <span>Visual Mode</span>
                </>
              ) : (
                <>
                  <FiCode size={13} />
                  <span>Raw Mode &lt;/&gt;</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal / Dialog for Inserting Link */}
        {showLinkModal && !isRawMode && (
          <div className="flex items-center gap-2 border-b border-blue-100 bg-blue-50/70 px-3 py-2">
            <FiLink size={14} className="text-blue-600 shrink-0" />
            <input
              type="text"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApplyLink();
              }}
              placeholder="Paste or type URL (e.g. https://example.com)..."
              className="w-full rounded border border-slate-300 bg-white px-2.5 py-1 text-xs text-navy-950 outline-none focus:border-blue-600"
              autoFocus
            />
            <button
              type="button"
              onClick={handleApplyLink}
              className="flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-500 cursor-pointer"
            >
              <FiCheck size={12} /> Apply
            </button>
            <button
              type="button"
              onClick={() => setShowLinkModal(false)}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <FiX size={14} />
            </button>
          </div>
        )}

        {/* Editable Content Area */}
        {isRawMode ? (
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-amber-200 bg-amber-50/80 px-3.5 py-1.5 text-[11px] text-amber-800">
              <span>
                <strong>Raw Mode:</strong> Paste any content, raw technical specs, or HTML code directly. Line breaks and spacing are preserved 100% as typed.
              </span>
              <span className="font-mono text-[10px] font-semibold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
                Raw Text / HTML
              </span>
            </div>
            <textarea
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={8}
              className="w-full p-4 font-mono text-xs text-slate-800 bg-slate-50/50 outline-none resize-y border-0 focus:ring-0 leading-relaxed"
              style={{ minHeight, maxHeight: "550px" }}
            />
          </div>
        ) : (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onPaste={handlePaste}
            onInput={handleInput}
            onKeyUp={checkActiveStates}
            onMouseUp={checkActiveStates}
            data-placeholder={placeholder}
            className="rich-text-editor-content p-4 outline-none text-sm text-navy-950 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
            style={{
              minHeight,
              maxHeight: "550px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RichTextField;


