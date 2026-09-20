import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  Bike,
  Box,
  BriefcaseBusiness,
  CarFront,
  Check,
  ChevronRight,
  Clock3,
  LocateFixed,
  MapPin,
  Navigation,
  PackageCheck,
  Route as RouteIcon,
  ShieldCheck,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Truck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { LiveTripMap } from "@/components/LiveTripMap";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mobility")({
  head: () => ({
    meta: [
      { title: "Mobility · Payroxa" },
      { name: "description", content: "Book rides, send parcels, and arrange city logistics with Payroxa Mobility." },
      { property: "og:title", content: "Payroxa Mobility" },
      { property: "og:description", content: "Book a ride, send a package, or move larger items from your Payroxa account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MobilityPage,
});

type Mode = "Ride" | "Delivery" | "Logistics";
type VehicleId = "bike" | "economy" | "comfort" | "van";

const recentPlaces = [
  { label: "Home", address: "12 Admiralty Way, Lekki Phase 1" },
  { label: "Work", address: "Eko Atlantic City, Victoria Island" },
];

const vehicles = [
  { id: "bike" as const, name: "Bike", note: "Fastest", eta: "3 min", price: 1850, icon: Bike },
  { id: "economy" as const, name: "Economy", note: "Affordable", eta: "5 min", price: 3200, icon: CarFront },
  { id: "comfort" as const, name: "Comfort", note: "Extra space", eta: "7 min", price: 4800, icon: BriefcaseBusiness },
  { id: "van" as const, name: "Van", note: "Up to 6 seats", eta: "9 min", price: 6800, icon: UsersRound },
];

const modes = [
  { id: "Ride" as const, label: "Ride", icon: CarFront },
  { id: "Delivery" as const, label: "Delivery", icon: PackageCheck },
  { id: "Logistics" as const, label: "Logistics", icon: Truck },
];

function MobilityPage() {
  const [mode, setMode] = useState<Mode>("Ride");
  const [pickup, setPickup] = useState("Current location");
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleId>("economy");
  const [scheduled, setScheduled] = useState(false);
  const [step, setStep] = useState<"plan" | "review" | "tracking">("plan");
  const [tripProgress, setTripProgress] = useState(0.36);

  const selected = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === selectedVehicle) ?? vehicles[1],
    [selectedVehicle],
  );

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setStep("plan");
    if (nextMode === "Delivery") setSelectedVehicle("bike");
    if (nextMode === "Logistics") setSelectedVehicle("van");
  };

  const swapLocations = () => {
    setPickup(destination || "Choose pickup");
    setDestination(pickup === "Current location" ? "" : pickup);
  };

  const actionLabel = mode === "Ride" ? "Choose ride" : mode === "Delivery" ? "Review delivery" : "Get logistics quote";

  if (step === "tracking") {
    const rideMilestones = [
      { label: "Ride confirmed", detail: "Your driver accepted", done: true },
      { label: "Driver en route", detail: "Arriving in 5 minutes", done: tripProgress >= 0.25 },
      { label: "Pickup", detail: pickup, done: tripProgress >= 0.6 },
      { label: "Destination", detail: destination, done: tripProgress >= 1 },
    ];
    const deliveryMilestones = [
      { label: "Courier assigned", detail: "Tobi is heading to pickup", done: true },
      { label: "Package picked up", detail: pickup, done: tripProgress >= 0.35 },
      { label: "In transit", detail: "Securely on the way", done: tripProgress >= 0.65 },
      { label: "Delivered", detail: destination, done: tripProgress >= 1 },
    ];
    const milestones = mode === "Ride" ? rideMilestones : deliveryMilestones;
    return (
      <AppShell>
        <PageHeader title={mode === "Ride" ? "Live trip" : "Track delivery"} subtitle="Trip ID · PXR-48291" back="/mobility" />
        <LiveTripMap progress={tripProgress} />
        <section className="relative -mt-4 rounded-t-3xl bg-background px-5 pb-4 pt-5">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0"><p className="text-xs font-semibold text-primary">{mode === "Ride" ? "DRIVER EN ROUTE" : "COURIER EN ROUTE"}</p><h1 className="mt-1 text-2xl font-semibold text-foreground">Arriving in 5 min</h1><p className="mt-1 text-xs text-muted-foreground">1.8 km away · Estimated 10:24 AM</p></div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">{mode === "Ride" ? "AK" : "TO"}</span>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="min-w-0 flex-1"><div className="flex items-center gap-1.5"><p className="text-sm font-semibold text-foreground">{mode === "Ride" ? "Ayo K." : "Tobi O."}</p><span className="flex items-center gap-0.5 text-xs text-warning"><Star className="h-3.5 w-3.5 fill-current" /> 4.9</span></div><p className="mt-0.5 text-xs text-muted-foreground">{mode === "Ride" ? "Toyota Corolla · LSR 428 FX" : "Honda Bike · KJA 312 QM"}</p></div>
            <Button variant="secondary" size="icon" aria-label="Message partner"><MessageCircle /></Button>
            <Button variant="secondary" size="icon" aria-label="Call partner"><Phone /></Button>
          </div>

          <div className="mt-5 flex items-center justify-between"><h2 className="text-sm font-semibold text-foreground">{mode === "Ride" ? "Trip progress" : "Delivery milestones"}</h2><span className="text-[11px] text-muted-foreground">Live updates</span></div>
          <div className="mt-3 rounded-2xl border border-border bg-card p-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.label} className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-3">
                <div className="flex flex-col items-center"><span className={cn("flex h-6 w-6 items-center justify-center rounded-full border text-background", milestone.done ? "border-success bg-success" : "border-border bg-background")} >{milestone.done && <Check className="h-3.5 w-3.5" />}</span>{index < milestones.length - 1 && <span className={cn("h-9 w-0.5", milestones[index + 1].done ? "bg-success" : "bg-border")} />}</div>
                <div className="min-w-0 pb-4"><p className={cn("text-sm font-semibold", milestone.done ? "text-foreground" : "text-muted-foreground")}>{milestone.label}</p><p className="mt-0.5 truncate text-[11px] text-muted-foreground">{milestone.detail}</p></div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3"><Button variant="outline" onClick={() => setTripProgress((value) => Math.min(1, value + 0.34))}>Simulate update</Button><Button variant="secondary" onClick={() => setStep("plan")}>End tracking</Button></div>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-success/5 p-3"><ShieldCheck className="h-5 w-5 shrink-0 text-success" /><p className="text-[11px] leading-4 text-foreground">Share trip details or contact 24/7 safety support if you need help.</p></div>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader title="Mobility" subtitle="Move people, parcels, and goods" back="/" />

      <div className="px-5">
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-secondary p-1" aria-label="Mobility service">
          {modes.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              type="button"
              variant="ghost"
              onClick={() => switchMode(id)}
              className={cn("h-11 gap-1.5 px-2 text-xs text-muted-foreground shadow-none", mode === id && "bg-background text-primary shadow-soft hover:bg-background")}
            >
              <Icon className="h-4 w-4" /> {label}
            </Button>
          ))}
        </div>
      </div>

      {step === "review" ? (
        <section className="px-5 pt-6">
          <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase text-primary">Final step</p><h2 className="mt-1 text-xl font-semibold text-foreground">Review your {mode.toLowerCase()}</h2></div><Button variant="ghost" size="sm" onClick={() => setStep("plan")}>Edit</Button></div>
          <div className="mt-5 rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-3">
              <div className="flex flex-col items-center"><span className="mt-1 h-2.5 w-2.5 rounded-full border-[3px] border-primary" /><span className="my-1 h-9 w-px border-l border-dashed border-border" /><MapPin className="h-4 w-4 text-foreground" /></div>
              <div className="min-w-0"><p className="text-[11px] text-muted-foreground">Pickup</p><p className="truncate text-sm font-medium text-foreground">{pickup}</p><div className="h-5" /><p className="text-[11px] text-muted-foreground">Destination</p><p className="truncate text-sm font-medium text-foreground">{destination}</p></div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary"><selected.icon className="h-6 w-6" /></span>
            <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-foreground">{selected.name}</p><p className="text-xs text-muted-foreground">{scheduled ? "Scheduled pickup" : `${selected.eta} away`} · {selected.note}</p></div>
            <p className="text-base font-semibold text-foreground">₦{selected.price.toLocaleString("en-NG")}</p>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-success/5 p-4"><ShieldCheck className="h-5 w-5 shrink-0 text-success" /><p className="text-xs leading-5 text-foreground">Every trip includes verified partners, live tracking, and safety support.</p></div>
          <Button className="mt-6 w-full" size="lg" onClick={() => setStep("tracking")}>{mode === "Ride" ? `Book ${selected.name}` : mode === "Delivery" ? "Request courier" : "Request quote"}</Button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">Payment will be taken from your Payroxa wallet</p>
        </section>
      ) : (
        <>
          <section className="mt-5 px-5">
            <div className="relative overflow-hidden rounded-2xl bg-secondary p-4">
              <div className="pointer-events-none absolute inset-0 opacity-60">
                <span className="absolute left-8 top-0 h-full w-px rotate-12 bg-border" /><span className="absolute right-16 top-0 h-full w-px -rotate-[18deg] bg-border" /><span className="absolute left-0 top-14 h-px w-full -rotate-6 bg-border" />
              </div>
              <div className="relative rounded-xl bg-background p-3 shadow-soft">
                <div className="grid grid-cols-[20px_minmax(0,1fr)_36px] items-center gap-2">
                  <div className="flex flex-col items-center"><LocateFixed className="h-4 w-4 text-primary" /><span className="my-1 h-7 w-px border-l border-dashed border-border" /><MapPin className="h-4 w-4 text-foreground" /></div>
                  <div className="min-w-0 divide-y divide-border">
                    <input aria-label="Pickup location" value={pickup} onChange={(event) => setPickup(event.target.value)} className="h-10 w-full bg-transparent text-sm font-medium text-foreground outline-none" />
                    <input aria-label="Destination" value={destination} onChange={(event) => setDestination(event.target.value)} placeholder={mode === "Ride" ? "Where are you going?" : "Where should we deliver?"} className="h-10 w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground" />
                  </div>
                  <Button aria-label="Swap locations" title="Swap locations" variant="secondary" size="icon" onClick={swapLocations}><ArrowDownUp className="h-4 w-4" /></Button>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="relative mt-3 bg-background" onClick={() => setPickup("Current location")}><LocateFixed className="h-3.5 w-3.5" /> Use my location</Button>
            </div>
          </section>

          {!destination && (
            <section className="mt-5 px-5">
              <h2 className="text-sm font-semibold text-foreground">Recent places</h2>
              <div className="mt-2 divide-y divide-border rounded-2xl border border-border bg-card px-4">
                {recentPlaces.map((place) => <Button key={place.label} variant="ghost" onClick={() => setDestination(place.address)} className="h-auto w-full justify-start rounded-none px-0 py-3 text-left shadow-none"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground"><MapPin className="h-4 w-4" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-foreground">{place.label}</span><span className="block truncate text-[11px] font-normal text-muted-foreground">{place.address}</span></span><ChevronRight className="h-4 w-4 text-muted-foreground" /></Button>)}
              </div>
            </section>
          )}

          {destination && (
            <section className="mt-5 px-5">
              <div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-foreground">{mode === "Ride" ? "Choose your ride" : mode === "Delivery" ? "Delivery method" : "Vehicle size"}</h2><span className="text-[11px] text-muted-foreground">8.4 km · 24 min</span></div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {vehicles.map((vehicle) => {
                  const Icon = vehicle.icon;
                  const active = selectedVehicle === vehicle.id;
                  return <Button key={vehicle.id} type="button" variant="outline" onClick={() => setSelectedVehicle(vehicle.id)} className={cn("h-auto justify-start gap-3 p-3 text-left shadow-none", active && "border-primary bg-primary-soft")}> <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground", active && "bg-background text-primary")}><Icon className="h-5 w-5" /></span><span className="min-w-0"><span className="block text-sm font-semibold text-foreground">{vehicle.name}</span><span className="block text-[10px] font-normal text-muted-foreground">{vehicle.eta} · ₦{vehicle.price.toLocaleString("en-NG")}</span></span></Button>;
                })}
              </div>
              {mode !== "Ride" && <div className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-card p-3"><Box className="h-5 w-5 text-primary" /><div className="min-w-0 flex-1"><p className="text-xs font-semibold text-foreground">{mode === "Delivery" ? "Small parcel" : "Household items"}</p><p className="text-[11px] text-muted-foreground">Add item details at the next step</p></div><ChevronRight className="h-4 w-4 text-muted-foreground" /></div>}
              <Button variant="outline" className="mt-3 w-full justify-between" onClick={() => setScheduled(!scheduled)}><span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary" /> {scheduled ? "Tomorrow · 9:00 AM" : "Schedule for later"}</span><span className="text-xs text-primary">{scheduled ? "Change" : "Add"}</span></Button>
              <Button className="mt-5 w-full" size="lg" disabled={!destination} onClick={() => setStep("review")}><RouteIcon className="h-4 w-4" /> {actionLabel}</Button>
            </section>
          )}

          <section className="mt-6 px-5">
            <div className="flex items-center gap-3 rounded-2xl bg-primary-soft p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background text-primary"><UserRound className="h-5 w-5" /></span><div><p className="text-xs font-semibold text-foreground">Safer journeys with Payroxa</p><p className="mt-0.5 text-[11px] leading-4 text-muted-foreground">Verified partners, trip sharing, and 24/7 support.</p></div></div>
            <Button variant="outline" className="mt-3 w-full justify-between" asChild>
              <Link to="/mobility-support">
                <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Problem with a trip or delivery?</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </Button>
          </section>
        </>
      )}
    </AppShell>
  );
}