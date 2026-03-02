import Footer from "@/components/common/footer";
import { HeroHeader } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import MissionVission from "./mission-vission";
import AboutUsHeroSecton from "./hero-section";
import OurValue from "./our-value";
import CTA from "./cta";

export default function AboutPage() {
  return (
    <>
      <HeroHeader />
      <div className="min-h-screen">
        <AboutUsHeroSecton />
        <MissionVission />
        <OurValue />
        <CTA />
      </div>
      <Footer />
    </>
  );
}
