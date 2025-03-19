import { CardContent } from "@/components/ui/card";

import { Card } from "@/components/ui/card";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Gmail", Inbox: 100, Spam: 0, Unreceived: 0, Total: 5 },
  { month: "Outlook", Inbox: 50, Spam: 50, Unreceived: 0, Total: 5 },
  { month: "Yahoo", Inbox: 70, Spam: 20, Unreceived: 10, Total: 5 },
  { month: "AOL", Inbox: 90, Spam: 10, Unreceived: 0, Total: 5 },
  { month: "iCloud", Inbox: 50, Spam: 50, Unreceived: 0, Total: 5 },
  { month: "GMX", Inbox: 100, Spam: 0, Unreceived: 0, Total: 5 },
  { month: "ProtonMail", Inbox: 100, Spam: 0, Unreceived: 0, Total: 5 },
];

const chartConfig = {
  Inbox: {
    label: "Inbox",
    color: "#86efac",
  },
  Spam: {
    label: "Spam",
    color: "#ef4444",
  },
  Unreceived: {
    label: "Unreceived",
    color: "#eab308",
  },
} satisfies ChartConfig;

export function EmailPlacementChart({
  chartData,
}: {
  chartData: {
    month: string;
    Inbox: number;
    Spam: number;
    Unreceived: number;
    Total: number;
  }[];
}) {
  return (
    <Card className="w-full ">
      <CardContent className="p-3">
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              domain={[0, 100]}
              unit="%"
              allowDataOverflow={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => (
                    <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                        <span className="font-normal text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                  )}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="Inbox"
              stackId="a"
              fill="#22c55e"
              radius={[0, 0, 4, 4]}
              barSize={60}
            />
            <Bar
              dataKey="Spam"
              stackId="a"
              fill="#ef4444"
              radius={[0, 0, 0, 0]}
              barSize={60}
            />
            <Bar
              dataKey="Unreceived"
              stackId="a"
              fill="#eab308"
              radius={[4, 4, 0, 0]}
              barSize={60}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
