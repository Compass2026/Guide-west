/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, RefObject } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  Shield,
  Mountain,
  ChevronDown,
  Check,
  Star,
  MapPin,
  Calendar,
  ChevronRight,
  X,
} from "lucide-react";
import HuntPlanner from "./components/HuntPlanner";

/* ─── SCROLL REVEAL HOOK ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─── NAV SCROLL HOOK ────────────────────────────────────────── */
function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

/* ─── PARALLAX HOOK ──────────────────────────────────────────── */
function useParallax(ref: RefObject<HTMLDivElement | null>, speed = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const offset = -rect.top * speed;
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, speed]);
}

/* ─── DATA ───────────────────────────────────────────────────── */
const HUNTS = [
  {
    id: "elk",
    label: "Unit 40 Elk & Deer",
    title: "The Unit 40 Trophy Elk & Deer Expedition",
    gmu: "GMU 40",
    duration: "5–7 Days · Fully Guided 1:1",
    rate: "85%",
    rateLabel: "Harvest Rate",
    image: "/photos/hero_elk_canyon.png",
    difficulty: "Strenuous",
    vouchers: true,
    terrain: "Rugged Canyons & Pinyon-Juniper Escarpments",
    description:
      "Unit 40 is globally recognized as an elite sanctuary for massive Rocky Mountain bulls and heavy-framed Mule Deer. Standard access is heavily restricted by private land borders. Our unique river access and permitted private easements allow us to position clients in absolute trophy corridors where mature game escapes heavy pressure.",
    highlights: [
      "Exclusive private ranch borders & roadless public canyons",
      "Custom mountain camps with gourmet meals by dedicated camp cooks",
      "Hyper-personalized spotting with pre-season trail camera telemetry",
      '330"+ bulls consistently encountered in restricted corridors',
    ],
  },
  {
    id: "sheep",
    label: "Desert Bighorn Sheep",
    title: "The Desert Bighorn Once-in-a-Lifetime Quest",
    gmu: "Units S56 / S62",
    duration: "10 Days · Guided 2:1 Support",
    rate: "100%",
    rateLabel: "Perfect Harvest Record",
    image: "/photos/bighorn_sheep_cliffs.png",
    difficulty: "High-Strenuous",
    vouchers: false,
    terrain: "Vertical Red Rock Cliffs & Arid Canyonlands",
    description:
      "A Colorado Desert Bighorn Sheep tag is arguably the most coveted hunting license in North America. When you hold an S56 or S62 tag, compromise is not an option. We deploy multiple spotting teams, high-powered optics systems, and river-float corridors to pinpoint trophy-class rams. We boast a flawless 100% harvest history on these once-in-a-lifetime pursuits.",
    highlights: [
      "Multi-point spotters working parallel telemetry lines",
      "Custom river-raft extraction rigs for remote canyon retrieval",
      "45+ combined years tracking Colorado's red rock rams",
      "Complete logistics, basecamp, and pack-out included",
    ],
  },
  {
    id: "river",
    label: "Gunnison River Float Hunts",
    title: "Gunnison River Wilderness Float Hunts",
    gmu: "GMU 41 / GMU 421",
    duration: "5 Days · Raft & Jetboat Basecamp",
    rate: "88%",
    rateLabel: "Harvest Rate",
    image: "/photos/gunnison_river_canyon.png",
    difficulty: "Moderate",
    vouchers: true,
    terrain: "Deep River Gorges, BLM Islands & Cottonwood Bottoms",
    description:
      "As late-season snows push trophy bulls and heavy deer down from the Grand Mesa, they concentrate in mild, vertical canyons along the Gunnison and Colorado river corridors. While other hunters face impassable mountain roads, we deploy by water — placing clients inside high-success zones surrounded by pristine canyon walls.",
    highlights: [
      "Navigate inaccessible river canyons by commercial raft",
      "Heated mobile riverbed wall tents with generator power",
      "Access untouched BLM islands with zero road trails",
      "Over-the-counter & landowner vouchers available",
    ],
  },
];

const ADVANTAGES = [
  {
    icon: <Mountain className="w-5 h-5" />,
    title: "Surgical GMU Specialization",
    metric: "Units 40, 41, 421, S56, S62",
    body: "We don't scout Colorado — we master specific terrain. Our operations are strictly confined to premier units where our guides have lived, tracked, and scouted for decades.",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 17l9-9 9 9" />
        <path d="M3 12l9-9 9 9" />
      </svg>
    ),
    title: "Exclusive River-Corridor Access",
    metric: "Jetboat & Raft Fleet",
    body: "We bypass congested trailheads entirely. Using commercial-grade jetboats and custom rafts, we navigate the Colorado and Gunnison rivers into roadless public sanctuaries.",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Unrivaled Harvest Performance",
    metric: "85% – 100% Success",
    body: "Consistently achieving 85% on trophy Elk & Mule Deer and maintaining a perfect 100% record on once-in-a-lifetime Desert Bighorn Sheep tags.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Bypass the Draw — Landowner Vouchers",
    metric: "Guaranteed Tag Access",
    body: "Missed the Colorado draw? We hold direct partnerships and exclusive allocations of private landowner vouchers. Skip multi-year wait lists with immediate, guaranteed premium tags.",
  },
];

const TERRITORIES = [
  {
    id: "unit40",
    name: "Unit 40",
    subtitle: "The Trophy Sanctuary",
    acres: "325,000+ Permitted BLM Acres",
    area: "475,000 Total Acres (750 sq. miles)",
    elevation: "4,560 ft – 9,700 ft",
    species: "Mule Deer & Elk",
    difficulty: "Mild to Moderate Terrain",
    tagType: "Preference Points Required",
    boundaries: {
      north: "Colorado River",
      east: "US-South Highway 50",
      south: "Colorado 141 and Dolores River",
      west: "Utah State Border"
    },
    description: "Located on the western slope of Colorado in Mesa County, southwest of Grand Junction, Unit 40 is globally renowned for massive Rocky Mountain bulls and heavy-framed Mule Deer. Standard access is heavily restricted by private land borders, but our permits allow us to operate in premium roadless corridors where game escapes heavy pressure."
  },
  {
    id: "units41_421",
    name: "Units 41 & 421",
    subtitle: "Grand Mesa Slopes & Bottomlands",
    acres: "869 Square Miles Combined",
    area: "BLM, National Forest & Leased Ranches",
    elevation: "5,400 ft – 11,236 ft",
    species: "Elk & Mule Deer",
    difficulty: "Moderate to Strenuous",
    tagType: "OTC Available (2nd & 3rd Rifle Elk)",
    boundaries: {
      north: "Battlement Mesa Range",
      east: "Grand Mesa National Forest",
      south: "Gunnison River",
      west: "Grand Junction Corridor"
    },
    description: "Situated on the north side of the Grand Mesa, just east of Grand Junction. A large river bottom runs through the units with mountains climbing several thousand feet off the valley floor. We lease key private properties to bypass landlocked BLM areas, providing access to massive elk populations with easier-to-draw licenses."
  },
  {
    id: "units_s56_s62",
    name: "Units S56 & S62",
    subtitle: "Desert Bighorn Sheep Canyons",
    acres: "Exclusive River-Corridor Permits",
    area: "Colorado & Gunnison River Canyons",
    elevation: "4,600 ft – 7,500 ft",
    species: "Desert Bighorn Sheep",
    difficulty: "High-Strenuous (Vertical Cliffs)",
    tagType: "Once-in-a-Lifetime Draw",
    boundaries: {
      north: "Colorado River Canyons",
      east: "Gunnison River Gorges",
      south: "Red Rock Rim Escarpments",
      west: "Utah Canyonlands Border"
    },
    description: "Managed strictly for Desert Bighorn Sheep hunting. We hold exclusive river outfitter permits that enable us to access these roadless, vertical canyon walls via commercial-grade jetboat and custom rafts. This unique tactical water entry has helped us maintain a flawless 100% success rate to date."
  }
];

/* ─── MAIN APP ───────────────────────────────────────────────── */
export default function App() {
  const [activeHuntId, setActiveHuntId] = useState("elk");
  const [activeTerritoryId, setActiveTerritoryId] = useState("unit40");
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const scrolled = useNavScroll();
  const activeHunt = HUNTS.find((h) => h.id === activeHuntId)!;
  const activeTerritory = TERRITORIES.find((t) => t.id === activeTerritoryId)!;

  useReveal();

  return (
    <div style={{ background: "#0a0a0b", minHeight: "100vh", color: "#f4f0e8", display: "flex", flexDirection: "column", width: "100%", overflowX: "hidden" }}>

      {/* ── NAVIGATION ─────────────────────────────────────────── */}
      <nav className={`site-nav ${scrolled ? "scrolled" : ""}`} id="top-nav">
        <a href="#hero" className="nav-logo-link">
          <img 
            src="/photos/GuideWest Outfitters.webp" 
            alt="GuideWest Outfitters Logo" 
            className="nav-logo-img"
          />
        </a>

        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          {["The Advantage", "Where We Hunt", "Expeditions", "The Outfitter", "Contact"].map((label) => {
            const hrefs = ["#advantage", "#where-we-hunt", "#expeditions", "#outfitter", "#contact"];
            const idx = ["The Advantage", "Where We Hunt", "Expeditions", "The Outfitter", "Contact"].indexOf(label);
            return (
              <a key={label} href={hrefs[idx]} className="nav-link">
                {label}
              </a>
            );
          })}
          <button onClick={() => setIsPlannerOpen(true)} className="btn-gold" style={{ padding: "12px 28px", cursor: "pointer" }}>
            <span>Inquire</span>
          </button>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="hero-parallax" id="hero">
        {/* Ken Burns cinematic zoom hero image */}
        <img
          src="/photos/hero_action.png"
          alt="GuideWest hunters glassing a trophy bull elk at sunrise over Colorado canyon"
          className="hero-img-kenburns"
          fetchPriority="high"
        />
        <div className="hero-overlay" />

        {/* Hero Content */}
        <div className="hero-content" style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ maxWidth: "720px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: "1px solid rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.08)",
              padding: "8px 16px", marginBottom: "28px",
              animation: "fadeIn 1.5s 0.4s both"
            }}>
              <Mountain className="w-3.5 h-3.5" style={{ color: "#e0c278" }} />
              <span style={{ fontFamily: "Cinzel, serif", fontSize: "11px", fontWeight: "600", letterSpacing: "0.3em", color: "#e0c278", textTransform: "uppercase" }}>
                GMU 40 Elite Permitted Outfitter · Since 2001
              </span>
            </div>

            <h1 className="headline-xl" style={{ marginBottom: "24px", animation: "fadeUp 1.4s 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
              Your Trophy<br />
              <span className="gold-italic">Awaits in the Canyons.</span>
            </h1>

            <p className="body-text" style={{ fontSize: "17px", maxWidth: "560px", marginBottom: "40px", animation: "fadeUp 1.4s 0.8s cubic-bezier(0.16,1,0.3,1) both", color: "#f4f0e8" }}>
              At first light, we position you on the rim of roadless canyon systems that other crews cannot reach. Gain exclusive, permit-backed river entry to Western Colorado's most restricted game corridors and experience our historic bighorn success.
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-0 border-t border-b border-[rgba(201,168,76,0.25)] py-6 mb-10" style={{
              animation: "fadeUp 1.4s 1s cubic-bezier(0.16,1,0.3,1) both"
            }}>
              {[
                { value: "85%", label: "Elk & Deer Harvest" },
                { value: "100%", label: "Bighorn Success" },
                { value: "325K", label: "Permitted Acres" },
              ].map((stat, i) => (
                <div key={i} style={{
                  textAlign: "center", padding: "0 24px",
                  borderRight: i < 2 ? "1px solid rgba(201,168,76,0.18)" : "none"
                }}>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.6rem", fontWeight: 300, color: "#c9a84c", lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: "Cinzel, serif", fontSize: "10.5px", fontWeight: "500", letterSpacing: "0.25em", color: "rgba(244,240,232,0.75)", textTransform: "uppercase", marginTop: "8px" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", animation: "fadeUp 1.4s 1.2s cubic-bezier(0.16,1,0.3,1) both" }}>
              <button onClick={() => setIsPlannerOpen(true)} className="btn-gold" style={{ cursor: "pointer" }}>
                <span>Request Expedition Brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="tel:9706231834" className="btn-outline">
                <Phone className="w-3.5 h-3.5" />
                <span>Call Jason: (970) 623-1834</span>
              </a>
            </div>

            {/* License badge */}
            <div style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "8px", animation: "fadeIn 1.5s 0.7s both" }}>
              <Shield className="w-3.5 h-3.5" style={{ color: "rgba(201,168,76,0.65)" }} />
              <span style={{ fontFamily: "Cinzel, serif", fontSize: "10px", fontWeight: "500", letterSpacing: "0.2em", color: "rgba(244,240,232,0.6)", textTransform: "uppercase" }}>
                CPW River Outfitter #659 · Colorado DOLA Outfitter License #3539
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          animation: "fadeIn 2s 1.2s both",
          zIndex: 10,
        }}>
          <span style={{ fontFamily: "Cinzel, serif", fontSize: "10px", fontWeight: "500", letterSpacing: "0.3em", color: "rgba(244,240,232,0.7)", textTransform: "uppercase" }}>
            Scroll
          </span>
          <ChevronDown className="w-4 h-4" style={{ color: "rgba(201,168,76,0.6)", animation: "fadeUp 1s 0s infinite alternate" }} />
        </div>
      </section>

      {/* ── STAT BAR ───────────────────────────────────────────── */}
      <div className="stat-bar">
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[
              "CPW Licensed River Outfitter #659",
              "Colorado DOLA License #3539",
              "USFS & BLM Special Use Permits",
              "Grand Mesa · Uncompahgre · Gunnison Nat'l Forests",
              "24 Years Guiding Trophy Hunters",
            ].map((item, i) => (
              <span key={`a-${i}`} className="ticker-item">
                {item}
              </span>
            ))}
            {[
              "CPW Licensed River Outfitter #659",
              "Colorado DOLA License #3539",
              "USFS & BLM Special Use Permits",
              "Grand Mesa · Uncompahgre · Gunnison Nat'l Forests",
              "24 Years Guiding Trophy Hunters",
            ].map((item, i) => (
              <span key={`b-${i}`} className="ticker-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── THE ADVANTAGE ──────────────────────────────────────── */}
      <section id="advantage" style={{ padding: "120px 48px", maxWidth: "1400px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="section-label reveal" style={{ marginBottom: "20px" }}>Operational Requisites</p>
            <h2 className="headline-lg reveal reveal-delay-1" style={{ marginBottom: "24px" }}>
              The <span className="gold-italic">GuideWest</span><br />Tactical Advantage
            </h2>
            <p className="body-text reveal reveal-delay-2" style={{ marginBottom: "40px", maxWidth: "420px" }}>
              Standard outfitting depends on luck. GuideWest leverages exclusive geography, proprietary licenses, and proven metrics to deliver what others only promise.
            </p>
            <button onClick={() => setIsPlannerOpen(true)} className="btn-gold reveal reveal-delay-3" style={{ cursor: "pointer" }}>
              <span>Book Your Expedition</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {ADVANTAGES.map((adv, i) => (
              <div key={i} className={`glass-card-hover reveal reveal-delay-${i + 1}`}
                style={{ padding: "28px 32px", display: "flex", alignItems: "flex-start", gap: "20px" }}>
                <div style={{
                  width: "44px", height: "44px", flexShrink: 0,
                  border: "1px solid rgba(201,168,76,0.25)",
                  background: "rgba(201,168,76,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#c9a84c"
                }}>
                  {adv.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "Cinzel, serif", fontSize: "9px", letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "6px" }}>
                    {adv.metric}
                  </div>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.15rem", fontWeight: 400, color: "#f4f0e8", marginBottom: "8px" }}>
                    {adv.title}
                  </h3>
                  <p className="body-text" style={{ fontSize: "13px", lineHeight: "1.7" }}>{adv.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE WE HUNT ──────────────────────────────────────── */}
      <section id="where-we-hunt" style={{ padding: "120px 48px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="section-label reveal" style={{ marginBottom: "20px" }}>Operational Geography</p>
          <h2 className="headline-lg reveal reveal-delay-1">
            Western Colorado <span className="gold-italic">Territories</span>
          </h2>
          <p className="body-text reveal reveal-delay-2" style={{ maxWidth: "600px", margin: "20px auto 0", fontSize: "15px" }}>
            We operate under exclusive federal special-use permits and private leases across Colorado's premier big game corridors. Select a unit below to analyze our access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch reveal reveal-delay-3">
          {/* Sidebar selector */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {TERRITORIES.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTerritoryId(t.id)}
                className={`glass-card-hover text-left`}
                style={{
                  padding: "24px",
                  cursor: "pointer",
                  width: "100%",
                  border: activeTerritoryId === t.id ? "1px solid #c9a84c" : "1px solid rgba(201, 168, 76, 0.15)",
                  background: activeTerritoryId === t.id ? "rgba(201, 168, 76, 0.08)" : "rgba(255, 255, 255, 0.01)",
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "Cinzel, serif", fontSize: "14px", fontWeight: "600", color: activeTerritoryId === t.id ? "#c9a84c" : "#f4f0e8", letterSpacing: "0.1em" }}>
                    {t.name}
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(201, 168, 76, 0.6)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {t.id === "units_s56_s62" ? "Sheep Draw" : t.id === "units41_421" ? "OTC / Draw" : "Draw Only"}
                  </span>
                </div>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", fontStyle: "italic", color: activeTerritoryId === t.id ? "#e0c278" : "rgba(244, 240, 232, 0.65)" }}>
                  {t.subtitle}
                </div>
              </button>
            ))}
            
            {/* Tactical overlay coordinates card */}
            <div className="glass-card hidden lg:block" style={{ padding: "24px", marginTop: "12px", border: "1px solid rgba(201,168,76,0.12)" }}>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: "8px", letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "12px" }}>
                🛰️ Telemetry Coordinates
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: "monospace", fontSize: "11px", color: "rgba(244, 240, 232, 0.6)" }}>
                <div>LOC: MESA/DELTA CO, CO</div>
                <div>DATUM: WGS84</div>
                <div>GRID: 12S EH 3412 1894</div>
                <div>USFS REGION: #2 (GMUG)</div>
                <div>PERMIT STATUS: ACTIVE / SECURED</div>
              </div>
            </div>
          </div>

          {/* Details pane */}
          <div className="lg:col-span-8 glass-card" style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300, color: "#f4f0e8", margin: 0 }}>
                    {activeTerritory.name} <span className="gold-italic">{activeTerritory.subtitle}</span>
                  </h3>
                  <p style={{ fontFamily: "Cinzel, serif", fontSize: "10px", letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase", marginTop: "6px", margin: "6px 0 0" }}>
                    {activeTerritory.acres}
                  </p>
                </div>
                <div style={{ background: "rgba(201, 168, 76, 0.08)", border: "1px solid rgba(201, 168, 76, 0.3)", padding: "8px 16px" }}>
                  <span style={{ fontFamily: "Cinzel, serif", fontSize: "10px", color: "#c9a84c", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {activeTerritory.tagType}
                  </span>
                </div>
              </div>

              <div style={{ height: "1px", background: "rgba(201, 168, 76, 0.15)", marginBottom: "28px" }} />

              {/* Description */}
              <p className="body-text" style={{ marginBottom: "32px", fontSize: "14.5px" }}>
                {activeTerritory.description}
              </p>

              {/* Specifications grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginBottom: "32px" }}>
                <div>
                  <div style={{ fontFamily: "Cinzel, serif", fontSize: "8.5px", letterSpacing: "0.2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Elevations
                  </div>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", color: "#f4f0e8" }}>
                    {activeTerritory.elevation}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "Cinzel, serif", fontSize: "8.5px", letterSpacing: "0.2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Target Game
                  </div>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", color: "#f4f0e8" }}>
                    {activeTerritory.species}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "Cinzel, serif", fontSize: "8.5px", letterSpacing: "0.2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Terrain Difficulty
                  </div>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", color: "#f4f0e8" }}>
                    {activeTerritory.difficulty}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "Cinzel, serif", fontSize: "8.5px", letterSpacing: "0.2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Total Footprint
                  </div>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", color: "#f4f0e8" }}>
                    {activeTerritory.area}
                  </div>
                </div>
              </div>

              {/* Boundaries Section */}
              <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(201, 168, 76, 0.1)", padding: "24px", borderRadius: "1px" }}>
                <p style={{ fontFamily: "Cinzel, serif", fontSize: "10px", letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase", margin: "0 0 16px 0", fontWeight: "600" }}>
                  🗺️ Territory Boundaries
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="max-sm:grid-cols-1">
                  {Object.entries(activeTerritory.boundaries).map(([dir, boundary]) => (
                    <div key={dir} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "24px", height: "24px", border: "1px solid rgba(201, 168, 76, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Cinzel, serif", fontSize: "9px", color: "#c9a84c", textTransform: "uppercase", flexShrink: 0 }}>
                        {dir[0]}
                      </div>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12.5px", color: "rgba(244, 240, 232, 0.85)" }}>
                        {boundary}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginTop: "32px", flexWrap: "wrap" }}>
              <button
                onClick={() => setIsPlannerOpen(true)}
                className="btn-gold"
                style={{ cursor: "pointer" }}
              >
                <span>Plan Expedition in {activeTerritory.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── RIVER ACCESS FULL PHOTO ─────────────────────────────── */}
      <section className="full-photo-section">
        <img src="/photos/jetboat_river_access.png" alt="Jetboat navigating Colorado river canyon" loading="lazy" />
        <div className="photo-gradient" />
        <div className="absolute inset-0 flex items-center px-6 md:px-12 max-w-3xl z-10">
          <div className="reveal">
            <p className="section-label" style={{ marginBottom: "16px" }}>Exclusive Access</p>
            <h2 className="headline-lg" style={{ marginBottom: "20px" }}>
              Where the Road<br /><span className="gold-italic">Ends, We Begin</span>
            </h2>
            <p className="body-text" style={{ maxWidth: "480px", marginBottom: "32px" }}>
              We bypass every congested trailhead. Our commercial-grade jetboats and custom rafts penetrate roadless river corridors that no other outfitter can legally access — delivering you to trophy grounds your competitors will never reach.
            </p>
            <a href="#expeditions" className="btn-outline">
              <span>Explore Expeditions</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── EXPEDITIONS ────────────────────────────────────────── */}
      <section id="expeditions" style={{ padding: "120px 48px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="section-label reveal" style={{ marginBottom: "20px" }}>Trophy Campaigns</p>
          <h2 className="headline-lg reveal reveal-delay-1">
            Featured <span className="gold-italic">Expeditions</span>
          </h2>
        </div>

        {/* Hunt Tab Selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0", marginBottom: "48px", flexWrap: "wrap" }} className="reveal reveal-delay-2">
          {HUNTS.map((hunt) => (
            <button
              key={hunt.id}
              className={`hunt-tab ${activeHuntId === hunt.id ? "active" : ""}`}
              onClick={() => setActiveHuntId(hunt.id)}
              id={`hunt-tab-${hunt.id}`}
            >
              {hunt.label}
            </button>
          ))}
        </div>

        {/* Active Hunt Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[rgba(201,168,76,0.15)]">
          {/* Photo Panel */}
          <div className="photo-card" style={{ height: "520px" }}>
            <img src={activeHunt.image} alt={activeHunt.title} loading="lazy" />
            <div className="photo-card-overlay" />
            <div style={{ position: "absolute", bottom: "28px", left: "28px", zIndex: 2 }}>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: "9px", letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "8px" }}>
                {activeHunt.gmu}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)",
                  padding: "4px 10px", fontFamily: "Cinzel, serif", fontSize: "9px",
                  color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase"
                }}>{activeHunt.difficulty}</span>
                {activeHunt.vouchers && (
                  <span style={{
                    background: "rgba(76,169,76,0.1)", border: "1px solid rgba(76,169,76,0.3)",
                    padding: "4px 10px", fontFamily: "Cinzel, serif", fontSize: "9px",
                    color: "rgba(120,220,120,0.9)", letterSpacing: "0.15em", textTransform: "uppercase"
                  }}>Vouchers Available</span>
                )}
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div style={{ padding: "48px", background: "rgba(255,255,255,0.01)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <h3 className="headline-md" style={{ marginBottom: "12px" }}>{activeHunt.title}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(244,240,232,0.75)" }}>
                    <Calendar className="w-3.5 h-3.5" style={{ color: "#c9a84c" }} />
                    {activeHunt.duration}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(244,240,232,0.75)" }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: "#c9a84c" }} />
                    {activeHunt.terrain}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div className="metric-number">{activeHunt.rate}</div>
                <div style={{ fontFamily: "Cinzel, serif", fontSize: "8px", letterSpacing: "0.2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", marginTop: "4px" }}>
                  {activeHunt.rateLabel}
                </div>
              </div>
            </div>

            <div style={{ height: "1px", background: "rgba(201,168,76,0.15)", marginBottom: "24px" }} />

            <p className="body-text" style={{ marginBottom: "28px" }}>{activeHunt.description}</p>

            <div style={{ marginBottom: "32px" }}>
              <p style={{ fontFamily: "Cinzel, serif", fontSize: "10.5px", fontWeight: "500", letterSpacing: "0.25em", color: "rgba(244,240,232,0.65)", textTransform: "uppercase", marginBottom: "16px" }}>
                Included Tactical Assets
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px" }}>
                {activeHunt.highlights.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <Check className="w-4 h-4" style={{ color: "#c9a84c", flexShrink: 0, marginTop: "1px" }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400, color: "rgba(244,240,232,0.85)", lineHeight: "1.6" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={() => setIsPlannerOpen(true)} className="btn-gold" style={{ width: "100%", justifyContent: "center", cursor: "pointer" }}>
              <span>Reserve Your Season Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── BIGHORN SHEEP FULL PHOTO ────────────────────────────── */}
      <section className="full-photo-section" style={{ height: "60vh" }}>
        <img src="/photos/bighorn_sheep_cliffs.png" alt="Desert bighorn sheep on Colorado canyon cliffs" loading="lazy"
          style={{ objectPosition: "center 30%" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to left, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0.3) 50%, rgba(10,10,11,0.05) 100%)"
        }} />
        <div className="absolute inset-0 flex items-center justify-start lg:justify-end px-6 md:px-20 z-10">
          <div className="reveal text-left lg:text-right" style={{ maxWidth: "480px" }}>
            <p className="section-label mb-4 text-left lg:text-right">100% Success Rate</p>
            <h2 className="headline-lg" style={{ marginBottom: "20px" }}>
              Once-in-a-Lifetime<br /><span className="gold-italic">Desert Bighorn</span>
            </h2>
            <p className="body-text" style={{ marginBottom: "28px" }}>
              Units S56 & S62. The most coveted hunting tag in North America — and we've never missed. A perfect record earned through expert mastery of Colorado's most forbidding canyon country.
            </p>
            <button onClick={() => { setActiveHuntId("sheep"); document.getElementById("expeditions")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-gold">
              <span>View Sheep Expedition</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── THE OUTFITTER ───────────────────────────────────────── */}
      <section id="outfitter" style={{ padding: "120px 48px", maxWidth: "1400px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo + Camp */}
          <div className="reveal" style={{ position: "relative" }}>
            <div className="photo-card" style={{ height: "560px" }}>
              <img src="/photos/jason_outfitter_camp.png" alt="GuideWest luxury base camp in Colorado wilderness" loading="lazy" />
              <div className="photo-card-overlay" />
            </div>
            {/* Floating credential card */}
            <div className="glass-card" style={{
              position: "absolute", bottom: "-24px", right: "-24px",
              padding: "24px 28px", minWidth: "220px",
            }}>
              <p style={{ fontFamily: "Cinzel, serif", fontSize: "8px", letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "10px" }}>
                Licensed & Permitted
              </p>
              {[
                { label: "DOLA Outfitter", num: "#3539" },
                { label: "CPW River", num: "#659" },
                { label: "USFS/BLM SUP", num: "Active" },
              ].map((lic, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < 2 ? "1px solid rgba(201,168,76,0.1)" : "none" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(244,240,232,0.75)" }}>{lic.label}</span>
                  <span style={{ fontFamily: "Cinzel, serif", fontSize: "11px", color: "#c9a84c", letterSpacing: "0.1em" }}>{lic.num}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="section-label reveal" style={{ marginBottom: "20px" }}>The Veteran Matrix</p>
            <h2 className="headline-lg reveal reveal-delay-1" style={{ marginBottom: "8px" }}>
              Jason McMillan
            </h2>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", fontStyle: "italic", color: "#c9a84c", marginBottom: "28px" }} className="reveal reveal-delay-2">
              Founder & Master Outfitter · 24 Years
            </p>
            <p className="body-text reveal reveal-delay-2" style={{ marginBottom: "28px" }}>
              Jason McMillan has spent over two and a half decades guiding premium hunting parties through Colorado's most forbidding, beautiful, and tag-restricted wilderness canyons. Known as a guide's guide, Jason established a reputation for finding mature rams and heavy bulls when other crews came home empty.
            </p>
            <p className="body-text reveal reveal-delay-3" style={{ marginBottom: "32px" }}>
              Understanding that access is the master key to successful western big game hunting, Jason secured unique special-use permits and commercial river licenses to create a hunting enterprise that operates in a class entirely its own.
            </p>

            <div className="glass-card reveal reveal-delay-4" style={{ padding: "28px 32px", marginBottom: "32px" }}>
              <p style={{ fontFamily: "Cinzel, serif", fontSize: "9px", letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "16px" }}>
                ★ Executive Mission Philosophy
              </p>
              <p className="testimonial-quote" style={{ fontSize: "1.05rem" }}>
                "We don't offer general outdoor tourism. We run serious, highly organized wilderness campaigns for hunters who value pristine access, expert execution, and high harvest integrity."
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }} className="reveal reveal-delay-5">
              <button onClick={() => setIsPlannerOpen(true)} className="btn-gold" style={{ cursor: "pointer" }}>
                <span>Plan Your Expedition</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="tel:9706231834" className="btn-outline">
                <Phone className="w-3.5 h-3.5" />
                <span>Call Direct</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS BAND ───────────────────────────────────────── */}
      <div style={{ background: "rgba(201,168,76,0.04)", borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "64px 48px" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 text-center">
            {[
              { num: "24", unit: "Years", label: "Guiding in Colorado" },
              { num: "325K", unit: "Acres", label: "Permitted Territory" },
              { num: "100%", unit: "", label: "Bighorn Sheep Record" },
              { num: "85%", unit: "", label: "Elk & Deer Harvest" },
            ].map((stat, i) => (
              <div key={i} className="reveal metric-item" style={{
                padding: "0 24px"
              }}>
                <div className="metric-number">
                  {stat.num}<span style={{ fontSize: "1.6rem", color: "rgba(201,168,76,0.6)" }}>{stat.unit}</span>
                </div>
                <div style={{ fontFamily: "Cinzel, serif", fontSize: "10.5px", fontWeight: "500", letterSpacing: "0.25em", color: "rgba(244,240,232,0.65)", textTransform: "uppercase", marginTop: "8px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT ────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "120px 48px", maxWidth: "1400px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Info */}
          <div>
            <p className="section-label reveal" style={{ marginBottom: "20px" }}>Begin Your Expedition</p>
            <h2 className="headline-lg reveal reveal-delay-1" style={{ marginBottom: "24px" }}>
              Request Your<br /><span className="gold-italic">Custom Brief</span>
            </h2>
            <p className="body-text reveal reveal-delay-2" style={{ marginBottom: "40px" }}>
              Every GuideWest expedition is hand-crafted around your target animal, available dates, and personal goals. Submit your inquiry and Jason will personally respond within 24 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} className="reveal reveal-delay-3">
              {[
                { icon: <Phone className="w-4 h-4" />, label: "Direct Line", value: "(970) 623-1834", href: "tel:9706231834" },
                { icon: <Mail className="w-4 h-4" />, label: "Email", value: "guide@3outfitterswest.com", href: "mailto:guide@3outfitterswest.com" },
                { icon: <MapPin className="w-4 h-4" />, label: "Headquarters", value: "Grand Junction, Colorado", href: null },
              ].map((contact, i) => (
                <div key={i} className="glass-card" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c9a84c", flexShrink: 0 }}>
                    {contact.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "Cinzel, serif", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", marginBottom: "4px" }}>
                      {contact.label}
                    </div>
                    {contact.href ? (
                      <a href={contact.href} style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#f4f0e8", textDecoration: "none" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#f4f0e8")}>
                        {contact.value}
                      </a>
                    ) : (
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#f4f0e8" }}>{contact.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Gunnison river photo */}
            <div className="photo-card reveal reveal-delay-4" style={{ height: "260px", marginTop: "32px" }}>
              <img src="/photos/gunnison_river_canyon.png" alt="Gunnison River canyon aerial view" loading="lazy" />
              <div className="photo-card-overlay" />
              <div style={{ position: "absolute", bottom: "20px", left: "20px", zIndex: 2 }}>
                <span style={{ fontFamily: "Cinzel, serif", fontSize: "9px", letterSpacing: "0.22em", color: "rgba(201,168,76,0.8)", textTransform: "uppercase" }}>
                  Gunnison River Corridor · Colorado
                </span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal reveal-delay-2">
            <HuntPlanner />
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="site-footer" style={{ padding: "60px 48px 40px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
            {/* Brand */}
            <div>
              <img 
                src="/photos/GuideWest Outfitters.webp" 
                alt="GuideWest Outfitters Logo" 
                style={{ 
                  width: "125px", 
                  height: "auto", 
                  marginBottom: "16px",
                  filter: "invert(1) sepia(0.45) saturate(2.5) brightness(1.25)"
                }} 
              />
              <p className="body-text" style={{ fontSize: "12px" }}>
                Colorado's premier remote big game outfitter. Roadless canyon access, proven results, veteran guidance.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p style={{ fontFamily: "Cinzel, serif", fontSize: "9px", letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "20px" }}>
                Navigation
              </p>
              {[
                { label: "The Advantage", href: "#advantage" },
                { label: "Where We Hunt", href: "#where-we-hunt" },
                { label: "Expeditions", href: "#expeditions" },
                { label: "The Outfitter", href: "#outfitter" },
                { label: "Inquire", href: "#contact" }
              ].map((item, i) => (
                <a key={i} href={item.href} style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(244,240,232,0.65)", textDecoration: "none", marginBottom: "10px", transition: "color 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(244,240,232,0.65)")}>{item.label}</a>
              ))}
            </div>

            {/* Licensing */}
            <div>
              <p style={{ fontFamily: "Cinzel, serif", fontSize: "9px", letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "20px" }}>
                Licensing & Permits
              </p>
              <p className="body-text" style={{ fontSize: "12px", lineHeight: "1.9" }}>
                CPW River Outfitter #659<br />
                DOLA Outfitter License #3539<br />
                USFS Grand Mesa N.F.<br />
                BLM Uncompahgre Field Office<br />
                Gunnison National Forest SUP
              </p>
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontFamily: "Cinzel, serif", fontSize: "9px", letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "20px" }}>
                Contact
              </p>
              <p className="body-text" style={{ fontSize: "12px", lineHeight: "1.9" }}>
                Grand Junction, Colorado<br />
                Basecamp: Gunnison Red Gorges<br /><br />
                <a href="tel:9706231834" style={{ color: "rgba(244,240,232,0.65)", textDecoration: "none" }}>(970) 623-1834</a><br />
                <a href="mailto:guide@3outfitterswest.com" style={{ color: "rgba(244,240,232,0.65)", textDecoration: "none" }}>guide@3outfitterswest.com</a>
              </p>
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(201,168,76,0.12)", marginBottom: "28px" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(244,240,232,0.5)" }}>
              © {new Date().getFullYear()} GuideWest Outfitters. All rights reserved. Formerly 3Outfitters West. Same veteran guides, elevated access.
            </p>
            <p style={{ fontFamily: "Cinzel, serif", fontSize: "8px", letterSpacing: "0.25em", color: "rgba(201, 168, 76, 0.4)", textTransform: "uppercase" }}>
              Colorado's Premier Remote Trophy Outfitter
            </p>
          </div>
        </div>
      </footer>

      {/* ── POPUP WIZARD MODAL ────────────────────────────────────── */}
      {isPlannerOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          background: "rgba(10, 10, 11, 0.85)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}>
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: "750px",
            maxHeight: "90vh",
            overflowY: "auto",
            background: "#111114",
            border: "1px solid rgba(201, 168, 76, 0.3)",
            borderRadius: "2px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
          }} className="scroll-mt-24">
            <button 
              onClick={() => setIsPlannerOpen(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "transparent",
                border: "none",
                color: "rgba(244, 240, 232, 0.6)",
                cursor: "pointer",
                zIndex: 1010,
                transition: "color 0.2s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(244, 240, 232, 0.6)"}
              aria-label="Close Inquiry Modal"
            >
              <X className="w-6 h-6" />
            </button>
            <HuntPlanner onSubmitInquiry={() => {
              // we keep it open so they see their generated proposal letter!
            }} />
          </div>
        </div>
      )}

      {/* ── MOBILE STICKY CTA BAR ────────────────────────────────── */}
      <div className="mobile-sticky-cta" style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        background: "rgba(10, 10, 11, 0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(201, 168, 76, 0.25)",
        padding: "16px 24px",
        display: "none", // overridden in CSS media query
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.5)"
      }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: "Cinzel, serif", fontSize: "11px", color: "#e0c278", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
            2026/2027 Seasons
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(244, 240, 232, 0.65)" }}>
            Acres & Vouchers Limited
          </div>
        </div>
        <button 
          onClick={() => setIsPlannerOpen(true)}
          className="btn-gold"
          style={{ padding: "12px 24px", fontSize: "10px", margin: 0, cursor: "pointer" }}
        >
          <span>Request Brief</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
