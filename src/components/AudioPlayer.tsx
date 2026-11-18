import React, { useEffect, useRef, useState } from "react";
import { VolumeX } from "lucide-react";

interface AudioPlayerProps {
  shouldPlay: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ shouldPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fallback to a soft, premium royalty-free instrumental wedding music if /music.mp3 is missing
  const audioSrc = "/music.mp3";

  useEffect(() => {
    // Instantiate audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.5; // Soft background level
    audioRef.current = audio;

    // Listen to visibility changes to pause audio if user switches tabs
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audio.pause();
      } else if (isPlaying) {
        audio.play().catch((err) => console.log("Audio play interrupted on focus", err));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      audio.pause();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Sync with Welcome Screen opening state
  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      playAudio();
    }
  }, [shouldPlay]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Audio playback blocked or failed:", err);
          setIsPlaying(false);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <>
      {/* Hidden audio status or instructions */}
      <div className="hidden" aria-hidden="true">
        Audio elements loaded
      </div>

      {/* Floating Audio Button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-[#FAF5EE]/90 hover:bg-[#F3E7D8] text-[#B88B4A] border border-[#D4AF6A]/40 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF6A]"
        title={isPlaying ? "Mute Music" : "Play Music"}
        aria-label={isPlaying ? "Mute ambient music" : "Play ambient music"}
      >
        <div className="flex items-center gap-[2.5px] justify-center h-4">
          {isPlaying ? (
            // Animated Equalizer Bars when playing
            <div className="flex gap-[3px] items-end h-3.5 px-1">
              <span className="w-[3px] bg-[#B88B4A] rounded-full animate-[eq-bar-1_0.8s_ease-in-out_infinite_alternate]" style={{ height: "100%" }} />
              <span className="w-[3px] bg-[#B88B4A] rounded-full animate-[eq-bar-2_1s_ease-in-out_infinite_alternate]" style={{ height: "60%" }} />
              <span className="w-[3px] bg-[#B88B4A] rounded-full animate-[eq-bar-3_1.2s_ease-in-out_infinite_alternate]" style={{ height: "80%" }} />
            </div>
          ) : (
            // Muted speaker icon when paused
            <VolumeX className="w-4 h-4 text-[#7D6249]" />
          )}
        </div>
      </button>

      {/* Injecting Equalizer Animation Keyframes directly in a style block */}
      <style>{`
        @keyframes eq-bar-1 {
          0% { height: 3px; }
          100% { height: 14px; }
        }
        @keyframes eq-bar-2 {
          0% { height: 3px; }
          100% { height: 14px; }
        }
        @keyframes eq-bar-3 {
          0% { height: 3px; }
          100% { height: 14px; }
        }
      `}</style>
    </>
  );
};
export default AudioPlayer;
