import { useState } from "react";
import { Check, Mail, Phone, Calendar, ArrowRight, Star, AlertCircle, Sparkles, FileText, Compass, HeartPulse } from "lucide-react";

interface HuntPlannerProps {
  onSubmitInquiry?: (data: any) => void;
}

export default function HuntPlanner({ onSubmitInquiry }: HuntPlannerProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    species: "Elk",
    tagStatus: "need-voucher",
    method: "jetboat",
    fitness: "moderate",
    budget: "premium",
    fullname: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [proposal, setProposal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep((prev: any) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev: any) => prev - 1);
  };

  const generateDynamicProposal = () => {
    setIsLoading(true);
    setTimeout(() => {
      const gmuText = formData.species === "Sheep" 
        ? "Desert Bighorn Units S56 or S62" 
        : formData.species === "Elk" 
          ? "GMU 40 (Trophy Sanctuary)" 
          : "GMU 41 and 421 River Corridors";

      const methodText = formData.method === "jetboat" 
        ? "Commercial jetboat water extraction on the Colorado River to breach roadless public sanctuaries" 
        : formData.method === "raft" 
          ? "Premium multi-day raft float camp on the Gunnison River" 
          : "Traditional custom mountain packing on horseback and remote wilderness foot tracking";

      const tagText = formData.tagStatus === "need-voucher"
        ? "utilize our direct partnership allocations to secure a private land tag voucher bypass, bypassing Colorado's limited master draw."
        : formData.tagStatus === "already-drawn"
          ? "immediately validate your drawn tag against our registered outfitter special use permits."
          : "develop a comprehensive multi-year drawing matrix strategy using weighted preference points.";

      const fitnessWarning = formData.fitness === "elite"
        ? "Excellent. Your level of conditioning unlocks our most vertical canyon sanctuaries, where mature bulls and bighorn rams escape standard pressure."
        : formData.fitness === "moderate"
          ? "Perfect. Our routes combine tactical jetboat drops with low-pressure spotting points that maximize mature spotting density without unnecessary exhaustion."
          : "Understood. We will rely heavily on boat-based canyon spotting, using cottonwood bottoms and float blinds to achieve zero horizontal strain.";

      const draftedLetter = `Dear ${formData.fullname || "Honored Client"},

Thank you for initiating this bespoke expedition brief with GuideWest Outfitters. 

Based on your profile, we have formulated a tactical blueprint for your upcoming Colorado ${formData.species} expedition. 

EXPEDITION DESIGN:
1. Target Terrain: We will concentrate our tracking parameters strictly inside ${gmuText}. This ensures mature age class specimens and zero trailhead crowding.
2. Access Mechanism: Your transport will be coordinated via ${methodText}. This completely bypasses standard public trails, positioning us in roadless zones with an absolute tactical advantage.
3. Tag Integration: To initiate the license requirements, we will ${tagText}
4. Physical Strategy: ${fitnessWarning}

YOUR NEXT STEPS FOR EXCLUSIVE RESERVATION:
We operate with strict client volume controls (maximum 12 hunters annually across all units) to preserve our unmatched 85% to 100% success metrics. 

To validate your candidacy and secure the appropriate permits, landowner vouchers, or river transport blocks, your next step is a direct consultation.

I have reserved a consultation block for you. Please contact me directly at your earliest convenience:
Direct Line: (970) 555-0190
Email: jason@guidewestoutfitters.com
Office: Grand Junction, Colorado

Sincerely,

Jason McMillan
Master Outfitter & Founder, GuideWest
DOLA License #3539 | CPW River License #659`;

      setProposal(draftedLetter);
      setIsLoading(false);
      setStep(4);
      if (onSubmitInquiry) onSubmitInquiry(formData);
    }, 1200);
  };

  return (
    <div className="bg-[#0e100e] border border-[#2a2d2a] p-8 rounded-sm text-neutral-200 shadow-2xl relative overflow-hidden max-w-3xl mx-auto scroll-mt-24" id="inquire-form-container">
      {/* Decorative mountain graphic in background */}
      <div className="absolute right-0 top-0 opacity-[0.02] pointer-events-none select-none">
        <Compass className="w-[400px] h-[400px] text-[#c5a059]" />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-[#c5a059] tracking-widest uppercase flex items-center justify-center gap-1.5 font-bold">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            Bespoke Expedition Brief
          </span>
          <h3 className="font-display text-2xl lg:text-3xl text-white tracking-wide uppercase font-bold">
            Inquire About Seasonal Availability
          </h3>
          <p className="font-serif text-sm text-[#b0b0a5] max-w-md mx-auto font-light">
            Design your custom parameters to generate an instant tactical hunt proposal from Jason McMillan.
          </p>
        </div>

        {/* Form Steps */}
        {step < 4 && (
          <div className="flex items-center justify-between border-b border-[#2a2d2a] pb-4 text-xs font-mono">
            <span className={step >= 1 ? "text-[#c5a059] font-bold" : "text-[#5a5a50]"}>1. SPECIES</span>
            <span className="text-[#5a5a50]">→</span>
            <span className={step >= 2 ? "text-[#c5a059] font-bold" : "text-[#5a5a50]"}>2. ACCESS & TAG</span>
            <span className="text-[#5a5a50]">→</span>
            <span className={step >= 3 ? "text-[#c5a059] font-bold" : "text-[#5a5a50]"}>3. CLIENT BIO</span>
          </div>
        )}

        {/* Step 1: Species & Class */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#8a8a7e]">
              Select Your Target Trophy Species:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleChange("species", "Elk")}
                className={`p-5 rounded-sm border text-left transition-all ${
                  formData.species === "Elk"
                    ? "border-[#c5a059] bg-[#161a16]"
                    : "border-[#2a2d2a] bg-transparent hover:border-[#c5a059]"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Trophy Elk</span>
                  {formData.species === "Elk" && <Check className="w-4 h-4 text-[#c5a059]" />}
                </div>
                <p className="text-xs text-[#8a8a7e] font-serif leading-relaxed mb-3 font-light">
                  Focusing on heavy mass Bulls in the high canyon corridors of GMU 40.
                </p>
                <span className="text-[10px] font-mono text-[#c5a059] bg-[#161a16] border border-[#2a2d2a] px-2 py-0.5 rounded-sm">
                  85% Success
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleChange("species", "Mule Deer")}
                className={`p-5 rounded-sm border text-left transition-all ${
                  formData.species === "Mule Deer"
                    ? "border-[#c5a059] bg-[#161a16]"
                    : "border-[#2a2d2a] bg-transparent hover:border-[#c5a059]"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Heavy Mule Deer</span>
                  {formData.species === "Mule Deer" && <Check className="w-4 h-4 text-[#c5a059]" />}
                </div>
                <p className="text-xs text-[#8a8a7e] font-serif leading-relaxed mb-3 font-light">
                  Spotting wide mature bucks in Unit 40 high escarpments and river draws.
                </p>
                <span className="text-[10px] font-mono text-[#c5a059] bg-[#161a16] border border-[#2a2d2a] px-2 py-0.5 rounded-sm">
                  88% Success
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleChange("species", "Sheep")}
                className={`p-5 rounded-sm border text-left transition-all ${
                  formData.species === "Sheep"
                    ? "border-[#c5a059] bg-[#161a16]"
                    : "border-[#2a2d2a] bg-transparent hover:border-[#c5a059]"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Desert Bighorn</span>
                  {formData.species === "Sheep" && <Check className="w-4 h-4 text-[#c5a059]" />}
                </div>
                <p className="text-xs text-[#8a8a7e] font-serif leading-relaxed mb-3 font-light">
                  S56 & S62 red canyonlands ram quest. Once-in-a-lifetime extreme pursuit.
                </p>
                <span className="text-[10px] font-mono text-[#c5a059] bg-[#161a16] border border-[#2a2d2a] px-2 py-0.5 rounded-sm">
                  100% Success
                </span>
              </button>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                className="bg-[#c5a059] text-[#0c0d0c] font-bold uppercase tracking-[0.2em] text-[11px] py-4 px-6 hover:bg-[#d4b57a] rounded-sm transition-all flex items-center gap-2"
                id="btn-step-1-next"
              >
                Proceed to Tag & Method
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Access & Tag status */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Tag access status */}
            <div className="space-y-3">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#8a8a7e] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#c5a059]" />
                License Tag Status:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleChange("tagStatus", "need-voucher")}
                  className={`p-4 rounded-sm border text-left transition-all ${
                    formData.tagStatus === "need-voucher"
                      ? "border-[#c5a059] bg-[#161a16] text-white"
                      : "border-[#2a2d2a] bg-transparent text-[#8a8a7e] hover:border-[#c5a059]"
                  }`}
                >
                  <p className="text-xs font-bold uppercase text-white mb-1">Need Landowner Voucher</p>
                  <p className="text-[11px] leading-relaxed text-[#8a8a7e] font-serif font-light">Secure a guaranteed tag allocation bypassing drawing pools.</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange("tagStatus", "already-drawn")}
                  className={`p-4 rounded-sm border text-left transition-all ${
                    formData.tagStatus === "already-drawn"
                      ? "border-[#c5a059] bg-[#161a16] text-white"
                      : "border-[#2a2d2a] bg-transparent text-[#8a8a7e] hover:border-[#c5a059]"
                  }`}
                >
                  <p className="text-xs font-bold uppercase text-white mb-1">Already Drew a Tag</p>
                  <p className="text-[11px] leading-relaxed text-[#8a8a7e] font-serif font-light">I hold the valid Colorado license tag for this GMU.</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange("tagStatus", "assistance")}
                  className={`p-4 rounded-sm border text-left transition-all ${
                    formData.tagStatus === "assistance"
                      ? "border-[#c5a059] bg-[#161a16] text-white"
                      : "border-[#2a2d2a] bg-transparent text-[#8a8a7e] hover:border-[#c5a059]"
                  }`}
                >
                  <p className="text-xs font-bold uppercase text-white mb-1">Seeking Draw Advice</p>
                  <p className="text-[11px] leading-relaxed text-[#8a8a7e] font-serif font-light">Need custom advice with application preference points.</p>
                </button>
              </div>
            </div>

            {/* Access method preference */}
            <div className="space-y-3">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#8a8a7e] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#c5a059]" />
                Preferred Access Vector:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleChange("method", "jetboat")}
                  className={`p-4 rounded-sm border text-left transition-all ${
                    formData.method === "jetboat"
                      ? "border-[#c5a059] bg-[#161a16] text-white"
                      : "border-[#2a2d2a] bg-transparent text-[#8a8a7e] hover:border-[#c5a059]"
                  }`}
                >
                  <p className="text-xs font-bold uppercase text-white mb-1">Jetboat Canopy Drops</p>
                  <p className="text-[11px] leading-relaxed text-[#8a8a7e] font-serif font-light">Use speed riverbeds to strike remote, roadless plateaus.</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange("method", "raft")}
                  className={`p-4 rounded-sm border text-left transition-all ${
                    formData.method === "raft"
                      ? "border-[#c5a059] bg-[#161a16] text-white"
                      : "border-[#2a2d2a] bg-transparent text-[#8a8a7e] hover:border-[#c5a059]"
                  }`}
                >
                  <p className="text-xs font-bold uppercase text-white mb-1">Wilderness Raft Float</p>
                  <p className="text-[11px] leading-relaxed text-[#8a8a7e] font-serif font-light">River raft mobility with scenic riverbed wall-tent bases.</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleChange("method", "horseback")}
                  className={`p-4 rounded-sm border text-left transition-all ${
                    formData.method === "horseback"
                      ? "border-[#c5a059] bg-[#161a16] text-white"
                      : "border-[#2a2d2a] bg-transparent text-[#8a8a7e] hover:border-[#c5a059]"
                  }`}
                >
                  <p className="text-xs font-bold uppercase text-white mb-1">Horseback / Foot Campaign</p>
                  <p className="text-[11px] leading-relaxed text-[#8a8a7e] font-serif font-light">Traditional steep tracking and high canyon horseback trails.</p>
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={handleBack}
                className="border border-[#2a2d2a] text-[#8a8a7e] hover:text-white font-mono text-[10px] uppercase tracking-widest px-5 py-3 rounded-sm transition-all text-left"
                id="btn-step-2-back"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-[#c5a059] text-[#0c0d0c] font-bold uppercase tracking-[0.2em] text-[11px] py-4 px-6 hover:bg-[#d4b57a] rounded-sm transition-all flex items-center gap-2"
                id="btn-step-2-next"
              >
                Proceed to Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Client BIO particulars */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-b border-[#2a2d2a] pb-2">
                <label className="text-[9px] uppercase tracking-widest text-[#5a5a50] block font-mono">Full Name</label>
                <input
                  type="text"
                  placeholder="Hon. Robert Vance"
                  value={formData.fullname}
                  onChange={(e) => handleChange("fullname", e.target.value)}
                  className="bg-transparent w-full text-sm outline-none pt-1.5 placeholder-[#3a3a30] text-[#e0e0d6] focus:text-white"
                  required
                  id="inp-fullname"
                />
              </div>

              <div className="border-b border-[#2a2d2a] pb-2">
                <label className="text-[9px] uppercase tracking-widest text-[#5a5a50] block font-mono">Direct Telephone</label>
                <input
                  type="tel"
                  placeholder="(303) 555-0199"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="bg-transparent w-full text-sm outline-none pt-1.5 placeholder-[#3a3a30] text-[#e0e0d6] focus:text-white"
                  required
                  id="inp-phone"
                />
              </div>
            </div>

            <div className="border-b border-[#2a2d2a] pb-2">
              <label className="text-[9px] uppercase tracking-widest text-[#5a5a50] block font-mono">Corporate Email Address</label>
              <input
                type="email"
                placeholder="robert@vanceholdings.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="bg-transparent w-full text-sm outline-none pt-1.5 placeholder-[#3a3a30] text-[#e0e0d6] focus:text-white"
                required
                id="inp-email"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-b border-[#2a2d2a] pb-2">
                <label className="text-[9px] uppercase tracking-widest text-[#5a5a50] block font-mono flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5 text-[#c5a059]" /> Physical Preparation Level
                </label>
                <select
                  value={formData.fitness}
                  onChange={(e) => handleChange("fitness", e.target.value)}
                  className="bg-[#0e100e] text-[#a1a196] w-full text-sm outline-none pt-1.5 appearance-none border-0 cursor-pointer"
                  id="sel-fitness"
                >
                  <option value="elite" className="bleed bg-[#0c0d0c]">Elite Gym / High Mountain Active (GMU 40 Canyons)</option>
                  <option value="moderate" className="bg-[#0c0d0c]">Moderate Backcountry Hiker (Stamina Spotting)</option>
                  <option value="basic" className="bg-[#0c0d0c]">Low Strain / Prefer Boat & Wall-Tents (Luxury Level)</option>
                </select>
              </div>

              <div className="border-b border-[#2a2d2a] pb-2">
                <label className="text-[9px] uppercase tracking-widest text-[#5a5a50] block font-mono flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#c5a059]" /> Budget Allocation Segment
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  className="bg-[#0e100e] text-[#a1a196] w-full text-sm outline-none pt-1.5 appearance-none border-0 cursor-pointer"
                  id="sel-budget"
                >
                  <option value="premium" className="bg-[#0c0d0c]">Full Luxury Guided Outfit (1:1 Service, Private Camp)</option>
                  <option value="elite_packet" className="bg-[#0c0d0c]">Landowner Voucher + Guide Complete Package (All Inclusive)</option>
                  <option value="corporate" className="bg-[#0c0d0c]">Exclusive Corporate Multi-Hunter Block (3+ hunters)</option>
                </select>
              </div>
            </div>

            <div className="border-b border-[#2a2d2a] pb-2">
              <label className="text-[9px] uppercase tracking-widest text-[#5a5a50] block font-mono">Additional Requests/Special Gear/Physical Accommodation</label>
              <textarea
                placeholder="Please note dietary preferences, special physical parameters, or specific sheep units preference here..."
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="bg-transparent w-full text-sm outline-none pt-1.5 placeholder-[#3a3a30] text-[#e0e0d6] focus:text-white h-16 resize-none"
                id="txt-notes"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={handleBack}
                className="border border-[#2a2d2a] text-[#8a8a7e] hover:text-white font-mono text-[10px] uppercase tracking-widest px-5 py-3 rounded-sm transition-all text-left"
                id="btn-step-3-back"
              >
                Back
              </button>
              <button
                onClick={generateDynamicProposal}
                className="bg-[#c5a059] text-[#0c0d0c] font-bold uppercase tracking-[0.2em] text-[11px] py-4 px-8 hover:bg-[#d4b57a] rounded-sm transition-all flex items-center gap-2"
                id="btn-step-3-submit"
              >
                {isLoading ? "Generating Custom Brief..." : "Submit Inquiry & Generate Proposal"}
                <Star className="w-4 h-4 text-[#0c0d0c]" />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Custom Proposal Output */}
        {step === 4 && proposal && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#090a09] rounded-sm p-6 lg:p-8 text-[#e0e0d6] font-serif border border-[#2a2d2a] relative shadow-lg">
              <div className="absolute right-4 top-4 text-[#8a8a7e] tracking-widest font-mono text-[9px] uppercase pointer-events-none select-none border border-[#2a2d2a] px-2 py-0.5 rounded-sm bg-[#0e100e]">
                Strictly Confidential Briefing
              </div>
              
              {/* Letterhead */}
              <div className="text-center border-b border-[#2a2d2a] pb-4 mb-6">
                <p className="font-display text-xl uppercase tracking-widest text-[#c5a059] font-bold">GUIDEWEST OUTFITTERS</p>
                <p className="font-mono text-[8px] uppercase text-[#8a8a7e] tracking-widest mt-1">
                  Colorado Wilderness Campaigns | DOLA Lic #3539 | CPW River Outfitters Lic #659
                </p>
              </div>

              {/* Body */}
              <pre className="font-serif text-sm leading-relaxed whitespace-pre-wrap text-[#e0e0d6] text-left font-light select-text selection:bg-[#c5a059] selection:text-[#0c0d0c]">
                {proposal}
              </pre>

              {/* Handover notification stamp */}
              <div className="mt-8 border-t border-[#2a2d2a] pt-4 flex flex-col md:flex-row items-center justify-between text-[#8a8a7e] text-xs font-mono">
                <span>CAMP SENT: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="text-[#c5a059] uppercase tracking-widest text-[9px] font-bold">★ Master Campaign Validated ★</span>
              </div>
            </div>

            {/* Re-plan Action */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#0e100e] p-4 border border-[#2a2d2a] rounded-sm">
              <div className="text-left font-sans">
                <p className="text-xs font-mono text-[#c5a059] font-bold tracking-widest uppercase">Want to adjust parameters?</p>
                <p className="text-[11px] text-[#8a8a7e] mt-0.5">Change preferences, game-types, or health indicators immediately.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setStep(1);
                    setProposal(null);
                  }}
                  className="border border-[#2a2d2a] hover:border-[#c5a059] text-[#8a8a7e] hover:text-white font-mono text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-sm transition-all"
                  id="btn-replan"
                >
                  Edit Brief Options
                </button>
                <a
                  href="tel:9705550190"
                  className="bg-[#c5a059] hover:bg-[#d4b57a] text-[#0c0d0c] font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-2.5 rounded-sm transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Direct Connect
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer / CPW details */}
        <div className="flex items-start gap-2 bg-[#090a09] p-4 rounded-sm border border-[#2a2d2a] mt-4 text-left">
          <AlertCircle className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
          <div className="text-[10px] text-[#8a8a7e] font-sans leading-relaxed">
            <span className="font-semibold text-white">Exclusive Client Guarantee:</span> GuideWest Outfitters holds direct USFS permits, BLM Special Use Agreements, and strict commercial river-outfitting rights. Licensing coordinates verified directly with the Colorado Parks & Wildlife Office. Submission of this form registers your interest in high-priority booking channels and places you in custom spotter queues.
          </div>
        </div>
      </div>
    </div>
  );
}
