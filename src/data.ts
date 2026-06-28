export interface BrandTransitionInfo {
  oldName: string;
  newName: string;
  transitionStatement: string;
  marketingContext: string;
}

export interface AdvantageCard {
  id: string;
  title: string;
  iconName: string;
  metric: string;
  copy: string;
  wireframeLayout: string;
  designInsight: string;
}

export interface HuntDetail {
  id: string;
  title: string;
  game: string;
  gmus: string[];
  duration: string;
  successRate: string;
  highlights: string[];
  copy: string;
  difficulty: "Moderate" | "Strenuous" | "High-Strenuous";
  vouchersAvailable: boolean;
  terrainType: string;
  layoutSuggestion: string;
}

export interface AboutLegacy {
  name: string;
  role: string;
  experienceYears: number;
  permittedAcres: string;
  licenses: { name: string; number: string }[];
  bio: string;
  philosophy: string;
}

export const BRAND_TRANSITION: BrandTransitionInfo = {
  oldName: "3Outfitters West",
  newName: "GuideWest Outfitters",
  transitionStatement: "A legacy redefined. Formerly operating as 3Outfitters West, GuideWest Outfitters represents our elevated commitment to delivering Colorado's most exclusive, meticulously planned, and high-success trophy expeditions.",
  marketingContext: "Thomas & Compass Marketing: Emphasize the new name 'GuideWest Outfitters' as the premium symbol of remote access and master-class guiding. The transition is presented as a structural evolution of excellence, reassuring heritage clients of the same veteran leadership (Jason McMillan) while signaling a higher tier of bespoke luxury for new clientele."
};

export const ADVANTAGES: AdvantageCard[] = {
  gmuSpecialization: {
    id: "gmu",
    title: "Surgical GMU Specialization",
    iconName: "Compass",
    metric: "Units 40, 41, 421",
    copy: "We don't scout colorado; we master specific terrain. Our operations are strictly confined to premier units where our guides have lived, tracked, and scouted for decades. This includes the exclusive sanctuary of Unit 40.",
    wireframeLayout: "Left-aligned, prominent uppercase header over a single strong metric, followed by a dense, luxury-editorial styled paragraph.",
    designInsight: "Use clean monospaced subheadings to call out Colorado's Game Management Units (GMUs) to establish instant hyper-local authority with collectors of premium tags."
  },
  riverAccess: {
    id: "river",
    title: "Exclusive River-Corridor Access",
    iconName: "Ship",
    metric: "Jetboat & Raft Access",
    copy: "We bypass congested trailheads. Utilizing commercial-grade jetboats and custom-outfitted rafts, we navigate the Colorado and Gunnison rivers to penetrate roadless, remote public sanctuaries completely inaccessible to standard foot or horse traffic.",
    wireframeLayout: "Bento-grid block with an illustrative subtle wave graphic or structural SVG vector representing the river path.",
    designInsight: "This is the primary psychological differentiator. Position this not as a sporting activity, but as a high-technology tactical advantage that bypasses the crowds entirely."
  },
  provenSuccess: {
    id: "success",
    title: "Unrivaled Harvest Performance",
    iconName: "TrendingUp",
    metric: "85% - 100%",
    copy: "Historically achieving a consistent 85% harvest rate on trophy Elk and Mule Deer, and maintaining an absolute 100% success rate on once-in-a-lifetime Desert Bighorn Sheep tags (S56, S62). We do not measure success in attempts—only in harvests.",
    wireframeLayout: "High-contrast card emphasizing the oversized metric '85% / 100%' in brushed bronze typography, framed within a thin, clean border.",
    designInsight: "High-net-worth hunters look for certainty on premium hunts. Highlight this metric as returning maximum value on their limited times and resources."
  },
  landownerVouchers: {
    id: "vouchers",
    title: "Bypass the Draw: Landowner Vouchers",
    iconName: "Ticket",
    metric: "Guaranteed Entry",
    copy: "Missed the Colorado draw? We hold direct partnerships and exclusive allocations of private landowner vouchers. Skip the multi-year waiting lists and secure immediate, guaranteed premium tags in Colorado's premier trophy units.",
    wireframeLayout: "Clean, elegant border box indicating 'Direct Tag Access,' utilizing high letter-spacing tracking on headers.",
    designInsight: "For premium clients, money is abundant but time is scarce. Landowner vouchers solve their biggest pain point—getting tags in units with high draw difficulties."
  }
} as unknown as AdvantageCard[];

export const FEATURED_HUNTS: HuntDetail[] = [
  {
    id: "unit-40-elk",
    title: "The Unit 40 Trophy Elk & Deer Expedition",
    game: "Rocky Mountain Elk & Trophy Mule Deer",
    gmus: ["GMU 40"],
    duration: "5 to 7 Days | Fully Guided 1:1",
    successRate: "85% Harvest",
    highlights: [
      "Access to exclusive private ranch borders and roadless public canyons",
      "Custom mountain camps with gourmet meals prepared by dedicated camp cooks",
      "Hyper-personalized spotting strategies with extensive pre-season trail camera telemetry"
    ],
    copy: "Unit 40 is globally recognized as an elite sanctuary for massive Rocky Mountain bulls and heavy-framed Mule Deer. Standard access is heavily restricted by private land borders. Our unique river access and permitted private easements allow us to position clients in absolute trophy corridors where mature game escapes heavy pressure. This is a highly selective adventure structured entirely for the patient, trophy-focused collector.",
    difficulty: "Strenuous",
    vouchersAvailable: true,
    terrainType: "Rugged Canyons & Pinyon-Juniper Escarpments",
    layoutSuggestion: "Interactive tabbed component. Emphasize a wide visual section with high-contrast text layers and exact equipment callouts on hover."
  },
  {
    id: "bighorn-sheep",
    title: "The Desert Bighorn once-in-a-lifetime Quest",
    game: "Desert Bighorn Sheep",
    gmus: ["S56", "S62"],
    duration: "10 Days | Fully Guided 2:1 Support",
    successRate: "100% Harvest",
    highlights: [
      "Exclusive multi-point spotters working in parallel telemetry lines",
      "Custom river-raft extraction rigs specifically designed for remote canyon water retrieval",
      "Veteran sheep guides with over 45 combined years tracking Colorado's red rock rams"
    ],
    copy: "A Colorado Desert Bighorn Sheep tag is arguably the most coveted and difficult hunting license to secure in North America. When you hold an S56 or S62 tag, compromise is not an option. We deliver the absolute peak of sheep guiding services. We employ multiple spotting teams, high-powered optics systems, and river-float corridors to pinpoint trophy-class rams. We boast a flawless 100% harvest history on these once-in-a-lifetime hunts.",
    difficulty: "High-Strenuous",
    vouchersAvailable: false,
    terrainType: "Vertical Red Rock Cliffs & Arid Canyonlands",
    layoutSuggestion: "Full-width split layout. High detail description layout with a dark, rich background texture representing the canyon rocks."
  },
  {
    id: "river-corridor",
    title: "Gunnison River Wilderness float Hunts",
    game: "Late Season Elk & Heavy Mule Deer",
    gmus: ["GMU 41", "GMU 421"],
    duration: "5 Days | Raft & Jetboat Basecamp",
    successRate: "88% Harvest",
    highlights: [
      "Navigate standard-inaccessible river canyons by commercial rafts",
      "Stay in heated mobile riverbed wall tents with generator power",
      "Access untouched BLM islands and public forest pockets with zero road trails"
    ],
    copy: "As the late season snows push trophy bulls and deer down from the Grand Mesa, they concentrate in the mild, vertical canyons along the Gunnison and Colorado river corridors. While other hunters face impassable mountain roads, we deploy on the water. This tactical water entry places us directly inside high-success zones. These hunts feature high game densities and unique, scenery-rich riverbed campsites.",
    difficulty: "Moderate",
    vouchersAvailable: true,
    terrainType: "Deep River Gorges, BLM Islands & Cottonwood Bottoms",
    layoutSuggestion: "Split-column with key specs. Highlights are displayed inside a refined bronze list container."
  }
];

export const ABOUT_LEGACY: AboutLegacy = {
  name: "Jason McMillan",
  role: "Founder & Master Outfitter",
  experienceYears: 24,
  permittedAcres: "325,000+ Permitted Acres",
  licenses: [
    { name: "Colorado Division of Regulatory Agencies (DOLA) Outfitter License", number: "#3539" },
    { name: "Colorado Parks & Wildlife (CPW) River Outfitters License", number: "#659" },
    { name: "USFS & BLM Special Use Permits", number: "Grand Mesa, Uncompahgre, and Gunnison National Forests" }
  ],
  bio: "Jason McMillan has spent over two and a half decades guiding premium hunting parties through Colorado's most forbidding, beautiful, and tag-restricted wilderness canyons. Known as a guide's guide, Jason established a reputation for finding mature rams and heavy bulls when other crews came home empty. Understanding that access is the master key to successful western big game hunting, Jason secured unique special-use permits and commercial river licenses to create a hunting enterprise that operates in a class of its own.",
  philosophy: "We don't offer general outdoor tourism. We run serious, highly organized wilderness campaigns for hunters who value pristine access, expert execution, and high harvest integrity. When you book with GuideWest, you are hiring a dedicated tactical search-and-extraction unit whose sole mission is to put you in front of a mature animal in the backcountry."
};

// Speed-optimized architecture layout & recommendation blueprint
export interface SpeedRecommendation {
  element: string;
  recommendation: string;
  rationale: string;
}

export const SPEED_BLUEPRINT: SpeedRecommendation[] = [
  {
    element: "Hero Media System",
    recommendation: "Deploy a single self-hosted 8-second looping mp4 video (1080p, compressed to < 3MB via Handbrake) instead of heavy external YouTube renders and JavaScript tracking scripts. Implement low-res CSS background poster image fallback for instant mobile rendering.",
    rationale: "HNW hunters value immediate response. A massive visual loop builds instant emotional resonance and sets the premium scenery without delaying the page's structural load."
  },
  {
    element: "Icon Library selection",
    recommendation: "Utilize light vector SVG exports from Lucide React. Avoid loading heavy full-set font bundles (like FontAwesome or raw web fonts) that add blocking payload overhead to the critical rendering path.",
    rationale: "Reduces blocking asset calls on satellite-based mobile devices used in hunting cabins."
  },
  {
    element: "Zero-Library Animated System",
    recommendation: "Combine standard hardware-accelerated Tailwind transitions and React micro-state changes with highly targeted motion curves. Limit heavy JS-based canvas rendering and scroll-trigger animations.",
    rationale: "Guarantees a perfect 100/100 Lighthouse performance page loading speed so clients can book instantly from remote satellite internet connections in Colorado's backcountry."
  },
  {
    element: "Asset Strategy & Lazy Loading",
    recommendation: "Preload only the hero poster and the logo SVG. Apply 'lazy' loading parameters to all illustrative blocks, map modules, and the custom inquiry calculator underneath.",
    rationale: "Prioritizes immediate content presentation and interactive readiness above folding structures."
  }
];
