"use client";
import React, { useRef } from "react";
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaEnvelope, FaPhone, FaTelegram } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, ChevronRightIcon, Copy } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HeroHeader } from "@/components/common/header";
import Footer from "@/components/common/footer";
const contactList = [
  {
    title: "የኢሜይል አድራሻ",
    icon: FaEnvelope,
    value: "shambelmekuria@gmail.com",
  },
  {
    title: "የስልክ ቁጥር",
    icon: FaPhone,
    value: "+090803493039",
  },
  {
    title: "የቴሌግራም መለያ",
    icon: FaTelegram,
    value: "shambelmekuria",
  },
  {
    title: "የሥራ ሰዓት",
    icon: MdOutlineAccessTime,
    value: "24/7 - Available Anytime",
  },
];

const formSchema = z.object({
 fullname: z
    .string()
    .min(5, "ሙሉ ስም ቢያንስ 5 ፊደላት መሆን አለበት።")
    .max(32, "ሙሉ ስም ከ 32 ፊደላት መብለጥ የለበትም።"),
    email: z
    .email("ትክክለኛ ኢሜይል ያስገቡ።")
    .min(1, "ኢሜይል ማስገባት ግዴታ ነው።"),
     subject: z
    .string()
    .min(5, "ርዕሱ ቢያንስ 5 ፊደላት መሆን አለበት።"),
  message: z
    .string()
    .min(10, "መልዕክቱ ቢያንስ 10 ፊደላት መሆን አለበት።")
    .max(100, "መልዕክቱ ከ 100 ፊደላት መብለጥ የለበትም።"),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     fullname: "",
     email:"",
     subject:"",
      message: "",
    },
  });

  const handleCopy = async(value:string) =>{
try{
        await navigator.clipboard.writeText(value);
      toast.success("Copied")
}
catch{
  toast.error("Failed to copy")
}
    
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("data", data);
  }
  return (
<div>
<HeroHeader/>
    <section className="max-w-6xl min-h-screen mx-auto px-4 pt-24 md:pt-36 mb-24 md:mb-36">
      <div className="flex flex-col justify-center items-center gap-6 mb-8">
        <h1 className="text-2xl md:text-4xl font-bold capitalize">
        ከእኛ ጋር ይገናኙ
        </h1>
        <p className="text-muted-foreground text-center">
         ከእርስዎ ጋር ለመነጋገር ሁልጊዜ ዝግጁ ነን። መልዕክትዎን ይላኩልን፤ በደስታ እንቀበላለን።
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-8 md:gap-12 mt-8 md:mt-24">
        <div className="flex flex-col gap-4 py-8 px-4">
          <div className="leading-relaxed flex flex-col  space-y-4 mb-4">
            <h2 className="font-bold text-2xl">የመገናኛ ዝርዝር</h2>
            <p className="text-muted-foreground">
            ለበለጠ መረጃ ወይም ቀጥታ እኛን ለማግኘት ከታች ያሉትን የመገናኛ አማራጮች ይጠቀሙ።
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {contactList.map((item, index) => {
              const Icon = item.icon;
              return (
                <Item variant="outline" key={index}>
                  <ItemMedia variant="icon" className="h-12 w-12">
                    <Icon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="text-base">{item.title}</ItemTitle>
                    <ItemDescription >{item.value}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button size="icon-sm" variant="ghost" onClick={()=>handleCopy(item.value)}>
                      <Copy />
                    </Button>
                  </ItemActions>
                </Item>
              );
            })}
          </div>
          <Item variant="outline" size="sm" asChild>
            <a href="#">
              <ItemMedia>
                <BadgeCheckIcon className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>የቴሌግራም ቻናላችንን ይቀላቀሉ</ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </a>
          </Item>
        </div>
        <div>
          <Card className="rounded-l-lgapp/contact/page.tsx shadow-xs py-8 px-4">
            <CardHeader className="leading-relaxed flex flex-col space-y-4 mb-4">
              <CardTitle className="text-2xl font-bold capitalize">
               መልዕክት ይላኩ
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
              ጥያቄ ወይም አስተያየት ካለዎት እባክዎ መልዕክትዎን እዚህ ያስቀምጡልን።
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="fullname"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="fullname">ሙሉ ስም</FieldLabel>
                        <Input
                          {...field}
                          id="fullname"
                          aria-invalid={fieldState.invalid}
                          placeholder="ስም ያስገቡ"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">ኢሜይል</FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="ኢሜይል ያስገቡ"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="subject"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="subject">ጉዳዩ</FieldLabel>
                        <Input
                          {...field}
                          id="subject"
                          aria-invalid={fieldState.invalid}
                          placeholder="ጉዳዩን ያስገቡ"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="message"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="message">መልዕክት</FieldLabel>
                        <Textarea
                        {...field}
                          id="textarea-message"
                          placeholder="መልዕክትዎን ያስገቡ"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter>
              <Field orientation="vertical">
                <Button type="submit" form="contact-form" size="lg">
                  ላክ
                </Button>
              </Field>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
    <Footer/>
</div>
  );
}
