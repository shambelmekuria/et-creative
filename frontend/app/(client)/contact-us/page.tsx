"use client";
import { HeroHeader } from "@/components/common/header";
import Footer from "@/components/common/footer";
import ContactGrid from "../../../components/contact-page/contact-grid";
import ContactHeroSection from "../../../components/contact-page/contact-hero";
import { motion } from "motion/react";

export default function ContactPage() {
  return (
    <>
      <HeroHeader />
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="min-h-screen"
      >
        <ContactHeroSection />
        <ContactGrid />
      </motion.div>
      <Footer />
    </>
  );
}
