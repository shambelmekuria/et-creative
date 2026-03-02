import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Eye, Heart, UtilityPole } from "lucide-react";
import { BsLightbulb } from "react-icons/bs";

export default function MissionVission() {
  return (
    <section className="max-w-4xl mx-auto w-full mb-24 px-8 py-16">
      <div className="max-w-2xl mx-auto w-full flex flex-col text-center  gap-4 mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold capitalize">የእኛ ታሪክ</h1>
        <p className="text-muted-foreground">
          በኢቲ-ክሪኤቲቭ (ET-Creative) እያንዳንዱ ያገለገለ እቃ የራሱ ታሪክ እና ድጋሚ ጥቅም ላይ የመዋል እድል
          እንዳለው እናምናለን። ይህንን መድረክ የፈጠርነው ሰዎች ጥራት ያላቸውን ያገለገሉ ምርቶች በፈጠራ እና በቀላል
          መንገድ እንዲገበያዩ ለማስቻል ነው። ዓላማችን ገዢዎችን እና ሻጮችን በታማኝ ማህበረሰብ ውስጥ በማገናኘት፣
          ግብይት ለሁሉም ሰው ተመጣጣኝ እና ዘላቂ እንዲሆን ማድረግ ነው።
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-8">
        <Card className="text-center">
          <CardContent>
            <CardContent>
              <div className="h-16 w-16 bg-neutral-100 dark:bg-neutral-700 rounded-md flex items-center justify-center  mx-auto">
                <Eye size={40}/>
              </div>
            </CardContent>
          </CardContent>
          <CardHeader>
            <CardTitle>ተልእኳችን</CardTitle>
            <CardDescription>
              ዓላማችን የንግድ ድርጅቶችን ማብቃት እና ደንበኞች ምርጥ ምርቶችን በተመጣጣኝ ዋጋ እንዲያገኙ ማስቻል
              ነው።
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="text-center">
          <CardContent>
            <div className="h-16 w-16 bg-neutral-100 dark:bg-neutral-700 rounded-md flex items-center justify-center mx-auto">
              <BsLightbulb size={36} />
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle>ዓላማችን</CardTitle>
            <CardDescription>
              በደንበኞች መካከል ቀጥተኛ እና ታማኝ የንግድ ልውውጥ እንዲኖር ማስቻል።
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
