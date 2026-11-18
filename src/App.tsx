import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinned, CalendarDays, Clock3, Heart, ChevronDown, Download, ExternalLink } from "lucide-react";
import { weddingDetails } from "./config/wedding";
import WelcomeScreen from "./components/WelcomeScreen";
import OrnateFrame from "./components/OrnateFrame";
import Countdown from "./components/Countdown";
import FloatingElements from "./components/FloatingElements";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Play background audio on direct user click/interaction
    setAudioStarted(true);
  };

  // Generate and download ICS file on-the-fly with 0 external dependencies
  const downloadIcs = () => {
    const { icsCalendar, bride, groom } = weddingDetails;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Nikkah Invitation//Arshiya and Hazim//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:nikkah-arshiya-hazim-2026",
      "DTSTAMP:20260101T000000Z",
      // Start/End are specified as UTC or as local with TZID.
      // Using Asia/Kolkata (IST) for correctness:
      "DTSTART;TZID=Asia/Kolkata:20261226T110000",
      "DTEND;TZID=Asia/Kolkata:20261226T150000",
      `SUMMARY:${icsCalendar.title}`,
      `DESCRIPTION:${icsCalendar.description} Bride: ${bride.name} (${bride.parents}). Groom: ${groom.name} (${groom.parents}).`,
      `LOCATION:${icsCalendar.location}`,
      "SEQUENCE:0",
      "STATUS:CONFIRMED",
      "TRANSP:OPAQUE",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${icsCalendar.title.replace(/\s+/g, "_")}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF5EE] text-[#5C4028] overflow-x-hidden font-sans select-none selection:bg-[#D4AF6A]/20 selection:text-[#5C4028]">
      {/* 1. Interactive Welcome Cover / Sliding Panels */}
      <AnimatePresence>
        {!isOpen && (
          <WelcomeScreen onOpen={handleOpenInvitation} isOpen={isOpen} />
        )}
      </AnimatePresence>

      {/* 2. Audio Player & Floating Elements - activated once opened */}
      {isOpen && (
        <>
          <FloatingElements />
          <AudioPlayer shouldPlay={audioStarted} />
        </>
      )}

      {/* 3. Main Digital Invitation Content Container */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="w-full max-w-lg mx-auto flex flex-col items-center px-4 py-8 md:py-12 gap-12"
      >
        {/* PANEL 1: HERO / THE MAIN CARD */}
        <section className="w-full min-h-[92svh] flex flex-col justify-center items-center py-4">
          <OrnateFrame>
            {/* Arabic Calligraphy Header */}
            <motion.div
              dir="rtl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-arabic text-[#B88B4A] mb-4 pt-4 text-center leading-[1.8] whitespace-nowrap"
            >
              {weddingDetails.arabicHeader}
            </motion.div>

            {/* Opening Invite Lines */}
            <div className="flex flex-col gap-1.5 my-2">
              <span className="font-serif text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#7D6249] font-semibold">
                {weddingDetails.openingLine}
              </span>
              <span className="font-script text-[#B88B4A] text-lg md:text-xl italic">
                {weddingDetails.openingLineItalic}
              </span>
            </div>

            {/* Main Title "Nikkah" */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="nikkah-title font-script text-5xl md:text-6xl gold-text-gradient font-bold normal-case my-4 py-1"
            >
              {weddingDetails.mainTitle}
            </motion.h2>

            {/* Bride Details */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col gap-1 my-2 max-w-[280px]"
            >
              <h3 className="couple-name text-3xl md:text-4xl gold-text-gradient leading-tight py-1">
                <span>A</span><span>rshiya S Banu</span>
              </h3>
              <p className="text-[10px] md:text-xs text-[#7D6249] uppercase tracking-wider leading-relaxed">
                {weddingDetails.bride.parents}
              </p>
            </motion.div>

            {/* Connecting Heart Icon */}
            <div className="flex items-center justify-center gap-2 my-2.5">
              <div className="h-[0.5px] w-8 bg-[#D4AF6A]/50" />
              <Heart className="w-3.5 h-3.5 text-[#B88B4A] fill-[#D4AF6A]/30 animate-pulse" />
              <div className="h-[0.5px] w-8 bg-[#D4AF6A]/50" />
            </div>

            {/* Groom Details */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col gap-1 my-2 max-w-[280px] pb-4"
            >
              <h3 className="font-script normal-case text-3xl md:text-4xl gold-text-gradient leading-tight py-1">
                {weddingDetails.groom.name}
              </h3>
              <p className="text-[10px] md:text-xs text-[#7D6249] uppercase tracking-wider leading-relaxed">
                {weddingDetails.groom.parents}
              </p>
            </motion.div>

            {/* Scroll Down Indicator */}
            <div className="flex flex-col items-center gap-1 mt-auto pt-4 animate-bounce">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#7D6249] font-medium font-sans">
                Scroll for details
              </span>
              <ChevronDown className="w-4 h-4 text-[#B88B4A]" />
            </div>
          </OrnateFrame>
        </section>

        {/* PANEL 2: EVENT DETAILS & COUNTDOWN */}
        <section className="w-full min-h-[92svh] flex flex-col justify-center items-center py-6">
          <OrnateFrame>
            {/* Live Countdown Component */}
            <Countdown />

            {/* Event Cards Frame */}
            <div className="w-full flex flex-col gap-4 mt-2 px-2 max-w-[340px]">
              {/* Date Card */}
              <div className="flex items-center gap-4 p-3.5 bg-[#F3E7D8]/50 border border-[#D4AF6A]/20 rounded-xl text-left shadow-sm">
                <div className="shrink-0 p-2.5 bg-[#FAF5EE] border border-[#D4AF6A]/30 rounded-lg text-[#B88B4A]">
                  <CalendarDays className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-[#7D6249] font-bold font-sans">
                    Date
                  </span>
                  <span className="font-serif text-sm font-bold text-[#5C4028] leading-tight mt-0.5">
                    {weddingDetails.date}
                  </span>
                </div>
              </div>

              {/* Time Card */}
              <div className="flex items-center gap-4 p-3.5 bg-[#F3E7D8]/50 border border-[#D4AF6A]/20 rounded-xl text-left shadow-sm">
                <div className="shrink-0 p-2.5 bg-[#FAF5EE] border border-[#D4AF6A]/30 rounded-lg text-[#B88B4A]">
                  <Clock3 className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-[#7D6249] font-bold font-sans">
                    Time
                  </span>
                  <span className="font-serif text-sm font-bold text-[#5C4028] leading-tight mt-0.5">
                    {weddingDetails.time}
                  </span>
                </div>
              </div>

              {/* Venue Card */}
              <div className="flex items-start gap-4 p-3.5 bg-[#F3E7D8]/50 border border-[#D4AF6A]/20 rounded-xl text-left shadow-sm">
                <div className="shrink-0 p-2.5 bg-[#FAF5EE] border border-[#D4AF6A]/30 rounded-lg text-[#B88B4A] mt-0.5">
                  <MapPinned className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-[#7D6249] font-bold font-sans">
                    Venue
                  </span>
                  <span className="font-serif text-xs font-bold text-[#5C4028] leading-relaxed mt-0.5">
                    {weddingDetails.venue}
                  </span>
                </div>
              </div>
            </div>

            {/* Venue Map */}
            <div className="w-full max-w-[340px] px-2 mt-4">
              <iframe
                title="MTP Convention Centre location"
                src="https://www.google.com/maps?q=MTP+Convention+Centre+Trikaripur+Kasargod+Kerala&output=embed"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-56 md:h-64 rounded-xl border border-[#D4AF6A]/70 shadow-sm"
              />
            </div>

            {/* Quick Actions Panel */}
            <div className="w-full flex flex-col gap-2.5 mt-6 max-w-[340px] px-2 pb-4">
              {/* Maps Integration */}
              <a
                href="https://share.google/ObErdmOPbMdCPGg68P"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FAF5EE] hover:bg-[#F3E7D8] text-[#5C4028] border-1.5 border-[#B88B4A] py-3 rounded-xl font-serif text-xs uppercase tracking-widest font-bold shadow-sm cursor-pointer transition-all duration-300 active:scale-[0.99] outline-none"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#B88B4A]" />
                Open Google Maps
              </a>

              {/* Calendar Integration dropdown buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={weddingDetails.gcalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#B88B4A] to-[#D4AF6A] text-[#FAF5EE] hover:brightness-[0.96] py-3 px-1 rounded-xl font-serif text-[10px] uppercase tracking-widest font-bold shadow-sm cursor-pointer transition-all duration-300 active:scale-[0.99] outline-none"
                >
                  Google Calendar
                </a>
                <button
                  onClick={downloadIcs}
                  className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#B88B4A] to-[#D4AF6A] text-[#FAF5EE] hover:brightness-[0.96] py-3 px-1 rounded-xl font-serif text-[10px] uppercase tracking-widest font-bold shadow-sm cursor-pointer transition-all duration-300 active:scale-[0.99] outline-none"
                >
                  <Download className="w-3 h-3" />
                  Apple Calendar
                </button>
              </div>
            </div>
          </OrnateFrame>
        </section>

        {/* PANEL 3: CLOSING BLESSING & QURANIC VERSE */}
        <section className="w-full min-h-[92svh] flex flex-col justify-center items-center py-4">
          <OrnateFrame>
            {/* Arabic Quranic Verse */}
            <div className="flex flex-col items-center gap-3 my-4 max-w-[280px]">
              <span dir="rtl" className="font-arabic text-xl md:text-2xl text-[#B88B4A] font-bold leading-[1.8] text-center whitespace-nowrap">
                وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              </span>
              <span className="font-serif text-sm italic text-[#5C4028] text-center leading-relaxed">
                “And He placed between you<br />affection and mercy.”
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#7D6249] font-bold font-sans">
                Surah Ar-Rum 30:21
              </span>
            </div>

            {/* Elegant Divider Ornament */}
            <div className="flex items-center justify-center gap-2.5 my-5" aria-hidden="true">
              <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#D4AF6A]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#B88B4A]" />
              <div className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-[#D4AF6A]" />
            </div>

            {/* Closing Message */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="font-serif text-xs md:text-sm text-[#5C4028] max-w-[300px] mx-auto leading-relaxed font-semibold uppercase tracking-[0.12em] py-4 mb-4 text-center"
            >
              {weddingDetails.closingMessage}
            </motion.p>

            {/* Outer Link Footer card */}
            <div className="w-full max-w-[340px] px-2 flex flex-col items-center mt-auto pb-6 text-[#7D6249]">
              <span className="font-serif text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B88B4A]">
                With Prayers &amp; Regards
              </span>
              <span className="text-[10px] tracking-widest uppercase font-sans mt-1 text-[#7D6249] font-medium">
                The Family of Arshiya &amp; Hazim
              </span>
            </div>
          </OrnateFrame>
        </section>
      </motion.main>
    </div>
  );
}

export default App;
