import { Users, MapPin, Building2, Globe } from "lucide-react";
import { getStats } from "@/lib/data";

export function StatsBar() {
  const stats = getStats();

  const items = [
    { icon: Users, label: "Empreendedores", value: stats.total },
    { icon: MapPin, label: "Cidades", value: stats.cidades },
    { icon: Building2, label: "Cooperativas", value: stats.cooperativas },
    { icon: Globe, label: "Estados", value: stats.estados },
  ];

  return (
    <section className="bg-[var(--suave)] border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col items-center text-center gap-1">
            <Icon className="h-5 w-5 text-[var(--verde-sicredi)]" />
            <span className="text-2xl font-bold text-[var(--verde-sicredi)]">{value}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
