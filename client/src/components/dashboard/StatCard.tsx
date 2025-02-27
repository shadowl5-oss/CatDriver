import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string | number;
  change: string | number;
  changeType?: "positive" | "negative" | "neutral";
  timeFrame?: string;
  icon: string;
  iconBgColor?: string;
};

export default function StatCard({
  title,
  value,
  change,
  changeType = "positive",
  timeFrame = "past 30d",
  icon,
  iconBgColor = "primary",
}: StatCardProps) {
  const getChangeColor = () => {
    if (changeType === "positive") return "text-green-500";
    if (changeType === "negative") return "text-red-500";
    return "text-gray-400";
  };

  // Format change value to always include + for positive values
  const formattedChange = () => {
    if (typeof change === "number") {
      return change > 0 ? `+${change}%` : `${change}%`;
    }
    return change;
  };

  const iconClass = icon.startsWith("fa-") ? `fas ${icon}` : icon;

  return (
    <Card className="card-hover transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-sm mb-1">{title}</p>
            <p className="text-2xl font-mono font-medium text-foreground">{value}</p>
            <div className="flex items-center mt-2">
              <span className={getChangeColor()}>{formattedChange()}</span>
              <span className="text-muted-foreground text-xs ml-1">{timeFrame}</span>
            </div>
          </div>
          <div className={`bg-${iconBgColor} bg-opacity-20 p-3 rounded-lg`}>
            <i className={`${iconClass} text-${iconBgColor} text-xl`}></i>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
