import Footer from "@/components/common/footer";
import { HeroHeader } from "@/components/common/header";
import MissionVission from "../../../components/about-page/mission-vission";
import AboutUsHeroSecton from "../../../components/about-page/hero-section";
import CTA from "../../../components/about-page/cta";
import Service from "@/components/about-page/service";

export default function AboutPage() {
  return (
    <>
      <HeroHeader />
      <div className="min-h-screen">
        <AboutUsHeroSecton />
        <MissionVission />
        <Service/>
        <CTA />
        
      </div>
      <Footer />
    </>
  );
}
