import { useState } from "react";
import { Copy, Check, FileText, LayoutTemplate, Zap, FileSignature } from "lucide-react";
import { BRAND_TRANSITION, ADVANTAGES, FEATURED_HUNTS, ABOUT_LEGACY, SPEED_BLUEPRINT } from "../data";

interface ConsolePanelProps {
  onHighlightSection: (sectionId: string) => void;
  highlightedSection: string | null;
}

export default function ConsolePanel({ onHighlightSection, highlightedSection }: ConsolePanelProps) {
  const [activeTab, setActiveTab] = useState<"copy" | "wireframe" | "speed">("copy");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="bg-[#0e100e] border border-[#2a2d2a] p-6 rounded-sm text-neutral-200 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-[#2a2d2a] pb-4">
        <div>
          <h2 className="font-display text-lg text-[#c5a059] tracking-wide flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-[#c5a059]" />
            Compass Marketing Console
          </h2>
          <p className="font-sans text-xs text-[#a1a196] mt-1">
            Blueprint & exact copywriting guide for GuideWest Outfitters.
          </p>
        </div>
        <span className="font-mono text-[10px] bg-[#161a16] border border-[#2a2d2a] px-2 py-0.5 rounded text-[#c5a059] uppercase tracking-wider">
          MARKETING HANDOVER
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-[#090a09] p-1 rounded-sm border border-[#2a2d2a]">
        <button
          onClick={() => setActiveTab("copy")}
          className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-sm transition-all ${
            activeTab === "copy"
              ? "bg-[#c5a059] text-[#0c0d0c] font-bold"
              : "text-[#8a8a7e] hover:text-white"
          }`}
          id="tab-copy"
        >
          <FileText className="w-3.5 h-3.5" />
          Copy Blueprint
        </button>
        <button
          onClick={() => setActiveTab("wireframe")}
          className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-sm transition-all ${
            activeTab === "wireframe"
              ? "bg-[#c5a059] text-[#0c0d0c] font-bold"
              : "text-[#8a8a7e] hover:text-white"
          }`}
          id="tab-wireframes"
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          Layout Guide
        </button>
        <button
          onClick={() => setActiveTab("speed")}
          className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-sm transition-all ${
            activeTab === "speed"
              ? "bg-[#c5a059] text-[#0c0d0c] font-bold"
              : "text-[#8a8a7e] hover:text-white"
          }`}
          id="tab-speed"
        >
          <Zap className="w-3.5 h-3.5" />
          Speed Plan
        </button>
      </div>

      {/* Copy tab contents */}
      {activeTab === "copy" && (
        <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {/* Brand Transition */}
          <div className="bg-neutral-950 p-4 rounded border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between pointer-events-auto">
              <h4 className="text-xs font-mono text-luxury-gold uppercase tracking-widest font-semibold">
                Brand Transition Copy Block
              </h4>
              <button
                onClick={() => handleCopy(BRAND_TRANSITION.transitionStatement, "trans")}
                className="text-neutral-400 hover:text-white transition p-1"
                title="Copy Copywriting"
                id="copy-trans"
              >
                {copiedText === "trans" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-neutral-300 italic font-serif leading-relaxed">
              "{BRAND_TRANSITION.transitionStatement}"
            </p>
            <div className="text-[10px] font-sans text-neutral-500 border-t border-neutral-800 pt-2">
              <span className="font-semibold text-luxury-bronze">Compass Context:</span> {BRAND_TRANSITION.marketingContext}
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-neutral-950 p-4 rounded border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono text-luxury-gold uppercase tracking-widest font-semibold">
                Hero Section Headline Copy
              </h4>
              <button
                onClick={() => handleCopy("THE SANCTUARY OF ROADLESS CANYONS // Colorado's Absolute Highest Success Expeditions", "hero")}
                className="text-neutral-400 hover:text-white transition p-1"
                id="copy-hero"
              >
                {copiedText === "hero" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-neutral-400">Headline:</p>
              <p className="text-sm font-display text-white font-semibold">THE SANCTUARY OF ROADLESS CANYONS</p>
              <p className="text-xs text-neutral-400 mt-2">Subheadline:</p>
              <p className="text-xs text-neutral-300 font-serif">
                Accessing Western Colorado's most restricted trophy corridors using premium river-corridor navigation, direct tag vouchers, and veteran mountain tracking.
              </p>
            </div>
          </div>

          {/* Advantages Copy blocks */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest font-semibold pl-1">
              Advantage Blocks (Four Pillars)
            </h5>
            {Object.entries(ADVANTAGES).map(([key, adv]) => (
              <div key={key} className="bg-neutral-950 p-3 rounded border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white font-sans">{adv.title}</span>
                  <button
                    onClick={() => handleCopy(`${adv.metric}\n${adv.copy}`, adv.id)}
                    className="text-neutral-400 hover:text-white transition p-1"
                    id={`copy-adv-${adv.id}`}
                  >
                    {copiedText === adv.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-luxury-gold font-mono uppercase">{adv.metric}</p>
                <p className="text-xs text-neutral-300 leading-relaxed font-serif">{adv.copy}</p>
              </div>
            ))}
          </div>

          {/* Featured Hunts Custom Copy */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest font-semibold pl-1">
              Featured Expedition Campaigns
            </h5>
            {FEATURED_HUNTS.map((hunt) => (
              <div key={hunt.id} className="bg-neutral-950 p-3 rounded border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white font-sans">{hunt.title}</span>
                  <button
                    onClick={() => handleCopy(`${hunt.title}\nGame: ${hunt.game}\nGMUs: ${hunt.gmus.join(", ")}\nSuccess: ${hunt.successRate}\n${hunt.copy}`, hunt.id)}
                    className="text-neutral-400 hover:text-white transition p-1"
                    id={`copy-hunt-${hunt.id}`}
                  >
                    {copiedText === hunt.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-[10px] grid grid-cols-2 gap-1 text-neutral-400 font-mono">
                  <div>Game: <span className="text-neutral-200">{hunt.game}</span></div>
                  <div>GMUs: <span className="text-neutral-200">{hunt.gmus.join(", ")}</span></div>
                  <div>Success: <span className="text-luxury-gold">{hunt.successRate}</span></div>
                  <div>Difficulty: <span className="text-neutral-200">{hunt.difficulty}</span></div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-serif mt-1">{hunt.copy}</p>
                <div className="pt-1.5 border-t border-neutral-900">
                  <p className="text-[9px] text-neutral-500 font-mono">HIGHLIGHTED BULLETS:</p>
                  <ul className="list-disc pl-3 text-[11px] text-neutral-400 space-y-0.5">
                    {hunt.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Legacy & Contact licenses Copy */}
          <div className="bg-neutral-950 p-4 rounded border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono text-luxury-gold uppercase tracking-widest font-semibold">
                About Founder & Licensing Copy
              </h4>
              <button
                onClick={() => handleCopy(`${ABOUT_LEGACY.name} - ${ABOUT_LEGACY.role}\n${ABOUT_LEGACY.bio}\n${ABOUT_LEGACY.philosophy}\nLicensing - DOLA License #3539 CPW Outfitters License #659`, "about_leg")}
                className="text-neutral-400 hover:text-white transition p-1"
                id="copy-about-legacy"
              >
                {copiedText === "about_leg" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-neutral-300 font-serif leading-relaxed">
              <strong>Biography:</strong> {ABOUT_LEGACY.bio}
            </p>
            <p className="text-xs text-neutral-300 font-serif leading-relaxed border-t border-neutral-900 pt-2">
              <strong>Philosophy:</strong> {ABOUT_LEGACY.philosophy}
            </p>
            <div className="text-[10px] font-mono text-neutral-500 border-t border-neutral-800 pt-2 space-y-1">
              <p>CPW Outfitters License #659</p>
              <p>Colorado DOLA License #3539</p>
              <p>325,000+ Permitted Acres (GMU 40, 41, 421)</p>
            </div>
          </div>
        </div>
      )}

      {/* Wireframe tab contents */}
      {activeTab === "wireframe" && (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          <div className="space-y-2 text-xs text-neutral-300">
            <p className="font-semibold text-luxury-gold text-xs font-sans">DESIGN DIRECTION OVERVIEW:</p>
            <p className="font-serif leading-relaxed text-xs">
              To appeal to high-net-worth (HNW) hunters, visual presentation must be extremely clean, confident, and texturally rich. Emphasize raw materials, high-contrast serif headlines, spacious tracking, and interactive maps.
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-neutral-950 p-3.5 rounded border border-neutral-800 space-y-2">
              <h5 className="text-xs font-semibold text-white font-sans flex items-center justify-between">
                <span>1. Header & Brand Statement Navigation</span>
                <span className="text-[9px] bg-luxury-gold/20 text-luxury-gold px-1.5 py-0.5 rounded uppercase font-mono">15% screen space</span>
              </h5>
              <div className="font-mono text-[10px] text-neutral-400 bg-neutral-900 p-2 rounded border border-neutral-800/50 space-y-1">
                <p className="text-luxury-gold">// WIREFRAME STRUCTURE</p>
                <p className="text-neutral-300">- TOP BANNER: Full-width dark bronze bar with sliding transition alert communicating name change ("Formerly 3Outfitters West").</p>
                <p className="text-neutral-300">- LEFT: Luxury Serif Logotype ("G | O" Monogram & GuideWest Outfitters Branding).</p>
                <p className="text-neutral-300">- RIGHT: Minimalist navigation links on right - hover active bronze border.</p>
              </div>
            </div>

            <div className="bg-neutral-950 p-3.5 rounded border border-neutral-800 space-y-2">
              <h5 className="text-xs font-semibold text-white font-sans flex items-center justify-between">
                <span>2. The Hero Canyon Chamber</span>
                <span className="text-[9px] bg-luxury-gold/20 text-luxury-gold px-1.5 py-0.5 rounded uppercase font-mono">Full fold (100vh)</span>
              </h5>
              <div className="font-mono text-[10px] text-neutral-400 bg-neutral-900 p-2 rounded border border-neutral-800/50 space-y-1">
                <p className="text-luxury-gold">// WIREFRAME STRUCTURE</p>
                <p className="text-neutral-300">- BACKGROUND: Immersive deep charcoal visual plate with parallax effect.</p>
                <p className="text-neutral-300">- FOREGROUND CONTENT: Left-aligned or Centered absolute high-contrast typography columns.</p>
                <p className="text-neutral-300">- CTA GROUP: One single prominent, highly-crafted gold border button ("REQUEST COMPREHENSIVE BRIEF") and a phone interface with Jason McMillan's direct access lines.</p>
              </div>
            </div>

            <div className="bg-neutral-950 p-3.5 rounded border border-neutral-800 space-y-2">
              <h5 className="text-xs font-semibold text-white font-sans flex items-center justify-between">
                <span>3. The Four-Pillars Grid</span>
                <span className="text-[9px] bg-luxury-gold/20 text-luxury-gold px-1.5 py-0.5 rounded uppercase font-mono">Grid 2x2 or 1x4</span>
              </h5>
              <div className="font-mono text-[10px] text-neutral-400 bg-neutral-900 p-2 rounded border border-neutral-800/50 space-y-1">
                <p className="text-luxury-gold">// WIREFRAME STRUCTURE</p>
                <p className="text-neutral-300">- CARDS: Each card must feature a custom large typographic metric badge (e.g. "GMU 40", "JETBOAT", "100%", "VOUCHERS").</p>
                <p className="text-neutral-300">- SPACING: Generous padding (P-8). Thin neutral-800 dividing lines instead of box shadows to resemble an architectural blueprint.</p>
              </div>
            </div>

            <div className="bg-neutral-950 p-3.5 rounded border border-neutral-800 space-y-2">
              <h5 className="text-xs font-semibold text-white font-sans flex items-center justify-between">
                <span>4. Featured Hunts Tabs</span>
                <span className="text-[9px] bg-luxury-gold/20 text-luxury-gold px-1.5 py-0.5 rounded uppercase font-mono">Asymmetrical Split</span>
              </h5>
              <div className="font-mono text-[10px] text-neutral-400 bg-neutral-900 p-2 rounded border border-neutral-800/50 space-y-1">
                <p className="text-luxury-gold">// WIREFRAME STRUCTURE</p>
                <p className="text-neutral-300">- LEFT COLUMN: Responsive vertical layout list with gold progress dots to switch campaigns (Elk, Sheep, River canyons).</p>
                <p className="text-neutral-300">- RIGHT COLUMN: Main content container containing big-game physical requirement scales, high-success trophy metrics, and lists of custom scouting plans.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Speed tab contents */}
      {activeTab === "speed" && (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          <div className="bg-neutral-950 p-4 rounded border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-luxury-gold">
              <Zap className="w-4 h-4 text-luxury-gold animate-pulse" />
              <h4 className="text-xs font-mono uppercase tracking-widest font-semibold">
                High-Speed Technical Execution Plan
              </h4>
            </div>
            <p className="text-xs text-neutral-300 font-serif leading-relaxed">
              HNW individuals often demand extreme performance and access information on low-bandwidth satellite links (Starlink, LTE) out in remote hunting basecamps or private jets. This plan outlines exactly how to build for Google Lighthouse 100/100 parameters.
            </p>
          </div>

          <div className="space-y-3">
            {SPEED_BLUEPRINT.map((bp, idx) => (
              <div key={idx} className="bg-neutral-950 p-3 rounded border border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white font-sans">{bp.element}</span>
                  <span className="text-[9px] text-emerald-500 font-mono">RECOMMENDED</span>
                </div>
                <p className="text-[11px] text-neutral-300 font-serif leading-relaxed">{bp.recommendation}</p>
                <p className="text-[10px] text-neutral-500 font-mono bg-neutral-950 p-1.5 rounded">{bp.rationale}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Handover summary */}
      <div className="bg-[#161a16] border border-[#2a2d2a] p-4 rounded-sm space-y-2 pointer-events-auto">
        <h4 className="text-xs font-display text-[#c5a059] uppercase tracking-wider flex items-center gap-1.5 font-bold">
          <FileSignature className="w-3.5 h-3.5 text-[#c5a059]" />
          Interactive Map & Layout Highlight
        </h4>
        <p className="text-[11px] text-[#e0e0d6] leading-relaxed font-sans">
          Click any element on the live preview screen or use the navigation headers. Sections highlighted in the console can correspond to matching sections on the website mockup. Enter parameters in the "Expedition Consult Form" at the bottom to generate customized proposal copy!
        </p>
      </div>
    </div>
  );
}
