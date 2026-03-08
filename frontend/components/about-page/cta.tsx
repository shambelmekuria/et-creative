import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";

export default function CTA() {
  return (
    <div className="bg-purple-600 text-white min-h-40 py-12 px-8 text-center my-24">
      <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
        <h1 className="font-bold text-2xl md:text-4xl">
          ወደ ተለግራም ማህበራችን ይቀላቀሉ
        </h1>
        <p>እኛ በተስማሚ ሁኔታ ለመገናኘት እና የእቃ ግዢና ሽያጭ ድጋፍ ይሰጣል።</p>
        <div>
          <Button
            size="lg"
            className="bg-white text-black rounded-sm hover:bg-neutral-100"
          >
            አሁን ጎብኝ <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </div>
  );
}
