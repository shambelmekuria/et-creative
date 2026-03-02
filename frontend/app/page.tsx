import Footer from "@/components/common/footer";
import HeroSection from "@/components/index/hero-section";
import FAQs from "@/components/index/faqs";
import FeaturedProduct from "@/components/index/feature-product";
import axios from "axios";
import { DJANGO_BASE_URL } from "@/config/defualt";
import CTA from "./(client)/about/cta";

export default async function Home() {
  const res = await axios.get(`${DJANGO_BASE_URL}/api/index`);
  return (
    <div>
      <HeroSection />
      <FeaturedProduct data={res.data} />
      <FAQs />
      <CTA/>
      <Footer />
    </div>
  );
}
