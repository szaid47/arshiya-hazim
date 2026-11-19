import React from "react";
import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import { weddingDetails } from "../config/wedding";

interface WelcomeScreenProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpen, isOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isOpen ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#FAF5EE]"
    >
      {/* Background Ornaments */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        {/* Subtle grid of Islamic geometric patterns */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="islamic-grid-welcome" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#B88B4A" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="3" fill="none" stroke="#B88B4A" strokeWidth="0.5" />
              <path d="M0 30 H60 M30 0 V60" stroke="#B88B4A" strokeWidth="0.25" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-grid-welcome)" />
        </svg>
      </div>

      {/* Dimmed Couple Photo Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="couple-background-left absolute inset-y-0 left-0 w-[58%] overflow-hidden">
          <img src="/couple-portrait-1.jpeg" alt="" className="h-full w-full object-cover object-[50%_24%] blur-[3px] scale-[1.04]" />
        </div>
        <div className="couple-background-right absolute inset-y-0 right-0 w-[58%] overflow-hidden">
          <img src="/couple-portrait-2.jpeg" alt="" className="h-full w-full object-cover object-[50%_24%] blur-[3px] scale-[1.04]" />
        </div>
        <div className="absolute inset-0 bg-[#FAF5EE]/55" />
      </div>

      {/* Left Curtain / Panel */}
      <motion.div
        initial={{ x: 0 }}
        animate={isOpen ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#F3E7D8]/85 border-r border-[#D4AF6A]/30 shadow-2xl"
      />

      {/* Right Curtain / Panel */}
      <motion.div
        initial={{ x: 0 }}
        animate={isOpen ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#F3E7D8]/85 border-l border-[#D4AF6A]/30 shadow-2xl"
      />

      {/* Center Royal Seal Envelope Frame */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isOpen ? { scale: 0.8, opacity: 0, y: -50 } : { scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-sm w-[90%] mx-auto bg-[#FAF5EE] p-8 md:p-10 rounded-2xl border-2 border-[#B88B4A] shadow-[0_20px_50px_rgba(92,64,40,0.15)] text-center gold-double-border"
      >
        {/* Arabic Calligraphy Header */}
        <div dir="rtl" className="text-xl md:text-2xl font-arabic text-[#B88B4A] mb-6 tracking-wide select-none text-center leading-[1.7]">
          {weddingDetails.arabicHeader}
        </div>

        {/* Small subtitle */}
        <p className="text-xs uppercase tracking-[0.25em] text-[#7D6249] mb-4 font-sans font-medium">
          YOU ARE CORDIALLY INVITED TO THE NIKKAH OF
        </p>

        {/* Beautiful Typography for Names */}
        <h1 className="flex flex-col gap-2 my-6">
          <span className="font-script bride-name text-4xl md:text-5xl gold-text-gradient font-bold leading-none py-1 select-none">
            <span className="bride-initial">A</span><span>rshiya S Banu</span>
          </span>
          <span className="font-script text-2xl text-[#7D6249] select-none">
            &amp;
          </span>
          <span className="font-script normal-case text-4xl md:text-5xl gold-text-gradient font-bold leading-none py-1 select-none">
            {weddingDetails.groom.name}
          </span>
        </h1>

        {/* Border ornament */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF6A]" />
          <div className="w-2 h-2 rounded-full rotate-45 border border-[#B88B4A] bg-[#FAF5EE]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF6A]" />
        </div>

        {/* Date */}
        <p className="font-serif text-sm uppercase tracking-[0.15em] text-[#5C4028] mb-8 font-medium">
          {weddingDetails.date}
        </p>

        {/* Trigger Button */}
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          animate={{ boxShadow: ["0 0 0 0 rgba(184,139,74,0.4)", "0 0 0 12px rgba(184,139,74,0)", "0 0 0 0 rgba(184,139,74,0)"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#B88B4A] to-[#D4AF6A] hover:from-[#9C7235] hover:to-[#B88B4A] text-[#FAF5EE] px-6 py-3.5 rounded-full font-serif text-xs uppercase tracking-[0.2em] font-bold shadow-lg cursor-pointer transition-all duration-300 outline-none focus:ring-2 focus:ring-[#D4AF6A]/50 focus:ring-offset-2"
        >
          <MailOpen className="w-4 h-4" />
          Tap to Open
        </motion.button>

        {/* Music indicator */}
        <p className="text-[10px] text-[#7D6249] tracking-wider uppercase mt-4 select-none font-sans font-medium">
          Music will play upon opening
        </p>
      </motion.div>
    </motion.div>
  );
};
export default WelcomeScreen;
