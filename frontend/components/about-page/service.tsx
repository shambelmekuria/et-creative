import React from "react";
import { BsCash } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DollarSign, Megaphone, ShoppingBag } from "lucide-react";

export default function Service() {
  const services = [
    {
      icon: DollarSign,
      title: "እቃዎን ይሽጡ",
      description:
        "ግለሰቦችና ንግድ ድርጅቶች የተጠቀሙ እቃዎቻቸውን ከሚፈልጉ ገዢዎች ጋር በማገናኘት ፈጣን እና ቀላል ሽያጭ እንዲፈጽሙ እናግዛለን።",
    },
    {
      icon: ShoppingBag,
      title: "የተጠቀሙ እቃዎችን ይግዙ",
      description:
        "ግለሰቦችና ንግድ ድርጅቶች ከሻጮች ጋር በማገናኘት የተጠቀሙ እቃዎችን በተመጣጣኝ ዋጋ እንዲገዙ እናግዛለን።",
    },
    {
      icon: Megaphone,
      title: "ማስታወቂያ",
      description:
        "የተጠቀሙ እቃዎች ልውውጥን በማበረታታት ቆሻሻን ለመቀነስ እና የሚያበረታታ የዘላቂ ኢኮኖሚ ስርዓትን ለመደገፍ የእቃ እንዲገዙ እና እንዲሽጡ እንረዳለን።",
    },
  ];
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800">
      <section className="max-w-4xl mx-auto w-full mb-24 px-8 py-16">
        <div className="max-w-2xl mx-auto w-full flex flex-col text-center gap-4 mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold capitalize">
            አገልግሎቶቻችን
          </h1>
          <p className="text-muted-foreground">
            እነሱ የተጠቀሙ እቃዎችን በተስማሚ ሁኔታ ለመግዛትና ለመሸጥ የምንሰጣቸው አገልግሎቶች ናቸው።
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center">
              <CardContent>
                <service.icon className="mx-auto mb-4 h-16 w-16 bg-neutral-100 dark:bg-neutral-600 p-2 rounded text-neutral-600 dark:text-neutral-50" />
              </CardContent>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {service.title}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
