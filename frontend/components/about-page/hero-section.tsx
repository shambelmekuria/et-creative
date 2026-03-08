import { Badge } from "@/components/ui/badge";
import React from "react";

export default function AboutUsHeroSecton() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 min-h-96 mb-24">
      <section className="relative max-w-6xl mx-auto pt-24 md:pt-36 mb-24">
      <div className="space-y-4 text-center max-w-md w-full  mx-auto ">
        <Badge variant="outline" className="sm:py-1.5 sm:px-3">እኛ ማን ነን?</Badge>
        <h1 className="font-bold text-3xl md:text-5xl ">ስለ እኛ</h1>
        <p>
          አዲስም ሆነ ያገለገሉ እቃዎችን በቀላሉ ይግዙ ወይም ይሽጡ። ንብረቶን ወደ ገንዘብ ይለውጡ ወይም ምርጥ ቅናሾችን ዛሬውኑ ያግኙ!
        </p>
      </div>
    </section>
    </div>
  );
}
