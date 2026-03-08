import Footer from "@/components/common/footer";
import HeroSection from "@/components/index/hero-section";
import FAQs from "@/components/index/faqs";
import FeaturedProduct from "@/components/index/feature-product";
import axios from "axios";
import { DJANGO_BASE_URL } from "@/config/defualt";
import CTA from "../components/about-page/cta";

export default async function Home() {
  let data =null
 try{
   const res = await axios.get(`${DJANGO_BASE_URL}/api/index`);
   data = res.data;
 }
 catch(error){
    console.error("Error fetching data:", error);
 }
  return (
    <div>
      <HeroSection />
      <FeaturedProduct data={data} />
      <FAQs />
      <CTA/>
      <Footer />
    </div>
  );
}
