"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQs() {
  const faqItems = [
    {
      id: 1,
      question: "እንዴት እቃ ማስገባት እችላለሁ?",
      answer:
        "ተጠቃሚ መለያዎትን ከፍተው በኋላ እቃዎትን ቀላል በፕሮፌሽናል ፖስት መስጠት ይችላሉ። ምስሎችን እና መግለጫዎችን ጨምሮ እቃዎትን በቀላሉ ማሳያ ላይ ያስቀምጡ።",
    },
    {
      id: 2,
      question: "እንዴት እቃዬን ለገዢዎች እንደምገናኘ?",
      answer:
        "የግል መልእክት ስርዓታችንን በመጠቀም ገዢዎች ጋር ቀላል እና ደህንነታዊ መወያየት ይችላሉ። ምንም የግል መረጃ ይጠፋል እና እቃዎት በቀላሉ ተገዢዎች ይደርሳል።",
    },
    {
      id: 3,
      question: "እንዴት እቃ ማግዛት እችላለሁ?",
      answer:
        "የድር ገጻችን የተጠቀሙ እቃዎችን በማሳያ ማሰብ እና በጨረታ ላይ በመግዛት ይገዙ። የሚፈልጉትን እቃ ይምረጡና የክፍያ ዘዴ ይምረጡ።",
    },
    {
      id: 4,
      question: "እንዴት እቃ ማስመሰል እችላለሁ?",
      answer:
        "ሁሉንም ማስተካከያ በመጠቀም እቃዎችዎን በፖስት ቀጥታ ይቀይሩ። መረጃን እና ምስሎችን በቀጥታ ማስተካከያ ይችላሉ።",
    },
    {
      id: 5,
      question: "እንዴት እቃዬን ቀላል እንደማግኘት እችላለሁ?",
      answer:
        "በፍላጎት የሚመረጡትን እቃ በማሰብ እና በክፍያ መንገድ በቀላሉ ማግኘት ይችላሉ። እቃዎችን ከሻጮች ጋር በቀላሉ ማየት እና መግዛት ይቻላል።",
    },
  ];

  return (
    <section className="py-16 md:py-24" id="faqs">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            ተደጋጋሚ ጥያቄዎች
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            ስለ አገልግሎቶቻችን፣ ስለ ገጻችን አጠቃቀም እና ስለ ልዩ ባህሪያቱ በተደጋጋሚ ለሚነሱ ጥያቄዎች ፈጣን እና
            የተሟላ ምላሾችን እዚህ ያግኙ።
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id.toString()}
                className="border-dashed"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-muted-foreground mt-6 px-8">
            የምትፈልጉትን አላገኙም? ወደ የደንበኛ ድጋፍ ቡድናችን
            <Link href="#" className="text-primary font-medium hover:underline ms-1">
              ይገናኙ
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
