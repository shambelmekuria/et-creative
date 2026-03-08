"use client";
import { DJANGO_BASE_URL } from "@/config/defualt";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion, stagger } from "motion/react";
export default function FeaturedProduct({ data }: any) {
  const [amount, setAmount] = useState<number | string >(0.5);
  useEffect(() => {
    const mediaQuery = window.matchMedia("max-width:760px");
    const handleAmount = () => {
      setAmount(mediaQuery ? 0.2 : "some");
    };
    handleAmount();
  }, []);
  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: stagger(0.5),
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 40, filter:"blur(20px)" },
    show: {
      opacity: 1,
      y: 0,
     
      filter:"blur(0px)",
      transition: { duration: 0.6 },
    },
  };
  return (
    <section className="max-w-6xl mx-auto px-8 my-4 md:my-12">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="flex flex-col gap-2"
      >
        <motion.div className="space-y-2" variants={item}>
          <h1 className="text-2xl font-bold">በቅርብ የወጡ ምርቶች</h1>
          <p className="text-muted-foreground">
            በቅርብ ወደ ገበያ የገቡ ጥራታቸውን የጠበቁ ምርቶችን እዚህ ያገኛሉ። ወቅታዊ እና ተመራጭ የሆኑ ዕቃዎችን
            ቀድመው ይሸምቱ።
          </p>
        </motion.div>
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10"
        >
          {data.recent_product.map((item: any, index: any) => (
            <Link href="/demo" key={index}>
              <Card className="gap-3  pt-0">
                <div className="relative aspect-video w-full">
                  <Image
                    src={
                      item.featured_image
                        ? `${DJANGO_BASE_URL}${item.featured_image}`
                        : "/hero.png"
                    }
                    alt={item.name}
                    className="object-cover "
                    fill
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-normal text-lg">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="font-bold text-xl text-black dark:text-white">
                    {item.price} ብር
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center justify-start  gap-2  text-muted-foreground">
                    <MapPin size={16} />
                    {item.saler_location}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
