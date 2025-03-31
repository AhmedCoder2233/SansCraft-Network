"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCopy, FaDiscord } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import copy from "clipboard-copy";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [discordMembers, setDiscordMembers] = useState<number | null>(null);
  const [discordOnline, setDiscordOnline] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Loading animation - only run on client
  const loadingProps = useSpring({
    from: { width: "0%" },
    to: { width: "100%" },
    config: { duration: 2500, tension: 120, friction: 14 },
    onRest: () => setIsLoading(false),
  });

  // Real Discord members fetch
  useEffect(() => {
    if (!isClient) return;

    const fetchDiscordMembers = async () => {
      try {
        const response = await fetch(
          `https://discord.com/api/v9/invites/hUdzUc4HFX?with_counts=true`
        );
        const data = await response.json();
        if (data.approximate_member_count) {
          setDiscordMembers(data.approximate_member_count);
        }
        if (data.approximate_presence_count) {
          setDiscordOnline(data.approximate_presence_count);
        }
      } catch (error) {
        console.error("Failed to fetch Discord members:", error);
        setDiscordMembers(1280);
        setDiscordOnline(320);
      }
    };

    fetchDiscordMembers();

  }, [isClient]);

  // Only render client-side content after hydration
  if (!isClient) {
    return (
      <div className="relative bg-[url('/background.jpg')] bg-cover bg-center flex flex-col items-center overflow-hidden">
        {/* Empty shell that matches the final layout */}
        <div className="w-full flex flex-col items-center mt-16 px-4 relative z-10">
          <div className="w-72 h-72 mb-8" />
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-32 h-32 mb-4" />
            ))}
          </div>
          <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="bg-gray-900 bg-opacity-80 p-4 rounded-xl flex-1 h-20" />
            <div className="bg-indigo-900 bg-opacity-80 p-4 rounded-xl flex-1 h-20" />
          </div>
          <div className="bg-black bg-opacity-50 px-6 py-3 rounded-full h-14 w-56" />
        </div>
      </div>
    );
  }

const navItems = [
  { name: "Shop", image: "/shop.png", link: "/Shop" },
  { name: "Modes", image: "/mode.png", link: "/Modes" },
  { name: "Vote", image: "/key.png", link: "/Votes" },
];

  // Supercharged snow effect with different particle types
  const ParticleBackground = () => {
    const particles = [...Array(50)].map((_, i) => {
      const size = Math.random() * 8 + 3;
      const isStar = Math.random() > 0.8;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 5;

      return (
        <motion.div
          key={i}
          className={`absolute ${
            isStar ? "text-yellow-300" : "text-white"
          } opacity-90`}
          style={{
            fontSize: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: "-20px",
            rotate: Math.random() * 360,
          }}
          animate={{
            y: `calc(640px + 20px)`,
            x: `${Math.random() * 100 - 50}px`,
            rotate: 360,
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            y: {
              duration,
              repeat: Infinity,
              ease: "linear",
              delay,
            },
            x: {
              duration: duration * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            },
            rotate: {
              duration: duration * 3,
              repeat: Infinity,
              ease: "linear",
              delay,
            },
            opacity: {
              duration: duration / 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {isStar ? "✦" : "❄"}
        </motion.div>
      );
    });

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles}
      </div>
    );
  };

  // Glow effect component
  const GlowEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-blue-500 filter blur-[80px] opacity-20"
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500 filter blur-[80px] opacity-20"
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );

  const copyToClipboard = (text: string) => {
    copy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <div className="relative bg-[url('/background.jpg')] bg-cover bg-center flex flex-col items-center overflow-hidden min-h-screen sm:h-screen">
      <ParticleBackground />
      <GlowEffect />

      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-40"
        animate={{ opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "backOut",
              }}
            >
              <Image
                src="/logo.png"
                alt="Server Logo"
                width={192}
                height={192}
                className="w-48 h-48 mb-6"
              />
            </motion.div>

            <div className="w-64 h-2.5 bg-gray-800 rounded-full overflow-hidden shadow-lg">
              <animated.div
                className="h-full bg-gradient-to-r from-emerald-400 to-blue-500"
                style={loadingProps}
              />
            </div>

            <motion.p
              className="mt-3 text-gray-300 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading the ultimate Minecraft experience...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full flex flex-col items-center -mt-10 px-4 relative z-10"
          >
            {/* Big Logo with enhanced effects */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-6"
            >
              <Image
                src="/logo.png"
                alt="Server Logo"
                width={256}
                height={256}
                className="w-64 h-64 drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]"
              />
            </motion.div>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {navItems.map((item, index) => (
                <Link key={index} href={item.link} passHref>
                  <motion.div
                    className="flex flex-col items-center cursor-pointer group"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: index * 0.15 + 0.3,
                      type: "spring",
                      stiffness: 80,
                      damping: 10,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="w-28 h-28 mb-3 relative"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 6 + index,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0, 0.8, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>
                    <motion.span
                      className="text-white text-xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                      animate={{
                        textShadow: [
                          "0 2px 4px rgba(0,0,0,0.5)",
                          "0 2px 15px rgba(74,222,128,0.8)",
                          "0 2px 4px rgba(0,0,0,0.5)",
                        ],
                      }}
                      transition={{
                        duration: 3 + index,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.3,
                      }}
                    >
                      {item.name}
                    </motion.span>
                  </motion.div>
                </Link>
              ))}
            </div>

            ;{/* Server Info and Discord - Enhanced layout */}
            <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between gap-4 mb-4">
              {/* Server IP - Left with copy animation */}
              <motion.div
                className="bg-gray-900 bg-opacity-80 p-4 rounded-xl backdrop-blur-sm border border-gray-700 flex-1 shadow-lg cursor-pointer group"
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Server IP{" "}
                      <span className="text-emerald-400 text-sm">
                        (Click to Copy)
                      </span>
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="text-emerald-400 font-mono text-base group-hover:text-emerald-300 transition-colors">
                        sanscraft.top
                      </p>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard("sanscraft.top");
                        }}
                        className="p-1.5 rounded-md bg-gray-800 hover:bg-emerald-600 transition-all relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaCopy className="text-white text-sm" />
                        <AnimatePresence>
                          {copied && (
                            <motion.span
                              className="-bottom-6 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                              initial={{ opacity: 0, y: 0 }}
                              animate={{ opacity: 1, y: -30 }}
                              exit={{ opacity: 0, y: -50 }}
                              transition={{ duration: 0.3 }}
                            >
                              Copied!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Discord - Right with real member count */}
              <motion.div
                className="bg-indigo-900 bg-opacity-80 p-4 rounded-xl backdrop-blur-sm border border-indigo-700 flex-1 shadow-lg"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                whileHover={{ y: -5 }}
              >
                <a
                  href="https://discord.com/invite/hUdzUc4HFX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between h-full"
                >
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">
                      Discord Community
                    </h3>
                    <motion.p
                      className="text-indigo-200 text-base"
                      animate={{
                        color: ["#a5b4fc", "#c7d2fe", "#a5b4fc"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    >
                      {discordMembers !== null && discordOnline !== null
                        ? `${discordMembers.toLocaleString()} members (${discordOnline.toLocaleString()} online)`
                        : "Connecting..."}
                    </motion.p>
                  </div>
                  <motion.div
                    className="p-3 rounded-xl bg-indigo-800 hover:bg-indigo-700 transition-all"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaDiscord className="text-white text-2xl" />
                  </motion.div>
                </a>
              </motion.div>
            </div>
            {/* Player Count with animation */}
            <motion.div
              className="bg-black bg-opacity-50 px-6 py-3 rounded-full backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.p
                className="text-white text-base font-medium"
                animate={{
                  textShadow: [
                    "0 0 8px rgba(255,255,255,0)",
                    "0 0 8px rgba(74,222,128,0.8)",
                    "0 0 8px rgba(255,255,255,0)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                Join{" "}
                <span className="text-emerald-400 font-bold">SansCraft</span> on
                sanscraft.top - With New Features!
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
