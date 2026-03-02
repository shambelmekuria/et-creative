import { SaleChart } from "@/components/dashboard/chart";
import Count from "@/components/dashboard/count";
export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold">Dashboard</p>
        <p className="text-sm  text-muted-foreground">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
        <div className="grid auto-rows-min gap-4 sm:grid-cols-2  ">
        <Count/>
        </div>
        <div>
        <SaleChart/>
        </div>
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
