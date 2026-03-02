import { AlarmCheck, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaPhone,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <section className=" relative flex flex-col gap-3 bg-black text-slate-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 mx-4 gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg md:text-xl font-bold mb-2">ET Creative</h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, cupiditate?
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <Link href="#">
                <FaTelegram className="text-xl" />
              </Link>
              <Link href="#">
                <FaFacebook className="text-xl" />
              </Link>
              <Link href="#">
                <FaYoutube className="text-xl" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg md:text-xl font-bold mb-2">Navgation</h2>
            <div className="flex flex-col gap-2 text-sm">
              <p>
                <Link href="#" className="text-slate-400">
                  Home
                </Link>
              </p>
              <p>
                <Link href="#" className="text-slate-400">
                  Product
                </Link>
              </p>
              <p>
                <Link href="#" className="text-slate-400">
                  About Us
                </Link>
              </p>
              <p>
                <Link href="#" className="text-slate-400">
                  Contact Us
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-lg md:text-xl mb-2">Contact Us</h2>
            <p className="text-slate-400 text-sm">
              Lorem ipsum dolor sit amet consectetur.
            </p>
            <p className="flex items-center gap-2 text-sm text-slate-400">
              <FaPhone size={18} /> +251900000000000
            </p>
            <p className="flex items-center gap-2 text-sm text-slate-400">
              <FaEnvelope size={18} /> test@gmail.com
            </p>
            <p className="flex items-center gap-2 text-sm text-slate-400">
              <AlarmCheck size={18} /> 24/7 - Available Anytime
            </p>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 text-slate-400 py-6 px-4 text-sm bottom-0 w-full">
        <div className="flex flex-col text-center justify-center">
          <p>©2025 ET Creative. All right Revised</p>
        </div>
      </div>
    </section>
  );
}
