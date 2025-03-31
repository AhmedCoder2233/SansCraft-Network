"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouseRef.current.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < mouseRef.current.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            const dx = this.baseX - this.x;
            this.x += dx / 10;
          }
          if (this.y !== this.baseY) {
            const dy = this.baseY - this.y;
            this.y += dy / 10;
          }
        }
        this.draw();
      }
    }

    // Initialize particles
    const init = () => {
      particlesRef.current = [];
      const particleCount = Math.floor(window.innerWidth / 10);
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push(new Particle(x, y));
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle) => particle.update());
      requestAnimationFrame(animate);
    };

    // Handle mouse movement
    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.x;
      mouseRef.current.y = event.y;
      mouseRef.current.radius = (canvas.height / 80) * (canvas.width / 80);
    };

    // Handle resize
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    // Event listeners
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const VoteCard = ({
  index,
  link,
  color,
  icon,
}: {
  index: number;
  link: string;
  color: string;
  icon: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const title = `Vote Link ${index + 1}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl p-8 shadow-2xl backdrop-blur-lg bg-gray-900/70 border border-gray-700/50 flex flex-col items-center justify-center text-center cursor-pointer group"
      style={{
        background: `linear-gradient(135deg, ${color}20, ${color}05)`,
        boxShadow: `0 10px 30px -10px ${color}40`,
      }}
    >
      {/* Floating icon */}
      <motion.div
        className="text-5xl mb-6"
        animate={{
          y: isHovered ? [0, -10, 0] : [0, -5, 0],
          rotate: isHovered ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 0.6 },
        }}
        style={{ color }}
      >
        {icon}
      </motion.div>

      {/* Title with shine effect */}
      <motion.h3
        className="text-2xl font-bold text-white mb-3 relative overflow-hidden"
        animate={{
          backgroundPosition: isHovered ? "200% 0" : "100% 0",
        }}
        transition={{ duration: 1.5, ease: "linear" }}
        style={{
          background: `linear-gradient(90deg, white, ${color}, white)`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {title}
      </motion.h3>

      {/* Subtle description */}
      <p className="text-gray-400 text-sm mb-4">Click to vote now</p>

      {/* Animated button */}
      <motion.div
        className="relative overflow-hidden rounded-full mt-2"
        animate={{
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered ? `0 0 20px ${color}` : `0 0 10px ${color}40`,
        }}
      >
        <div
          className="px-6 py-2 text-sm font-medium rounded-full"
          style={{
            background: color,
            color: "white",
          }}
        >
          Vote Now
        </div>
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          animate={{
            opacity: isHovered ? 0.2 : 0,
            x: isHovered ? "100%" : "-100%",
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* Particle burst on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                initial={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 0,
                  background: color,
                }}
                animate={{
                  x: Math.cos(i * 45 * (Math.PI / 180)) * 40,
                  y: Math.sin(i * 45 * (Math.PI / 180)) * 40,
                  scale: [0, 1, 0],
                  opacity: [1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                style={{
                  width: 8,
                  height: 8,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const RewardItem = ({
  icon,
  name,
  color,
}: {
  icon: string;
  name: string;
  color: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center p-4 rounded-xl backdrop-blur-sm bg-gray-900/70 border border-gray-700/30"
      style={{ boxShadow: `0 4px 15px ${color}30` }}
    >
      <motion.div
        className="text-4xl mb-3"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ color }}
      >
        {icon}
      </motion.div>
      <span className="text-white font-medium">{name}</span>
      <span className="text-xs text-gray-400 mt-1">Voting Reward</span>
    </motion.div>
  );
};

const VotingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const voteLinks = [
    {
      link: "https://www.minecraftiplist.com/server/SansCraft-36319/vote",
      color: "#4CAF50",
      icon: "🌍",
    },
    {
      link: "https://minecraft.buzz/vote/12393",
      color: "#2196F3",
      icon: "🏆",
    },
    {
      link: "https://bestmcservers.org/server-sanscraft.3426",
      color: "#FF5722",
      icon: "🖥️",
    },
    {
      link: "https://topg.org/minecraft-servers/server-668444#vote",
      color: "#9C27B0",
      icon: "🪐",
    },
    {
      link: "https://minecraft.menu/server-sanscraft.3874/vote",
      color: "#FFC107",
      icon: "📋",
    },
    {
      link: "https://minecraft-serverlist.com/server/1870/vote",
      color: "#E91E63",
      icon: "🔗",
    },
    {
      link: "https://minecraft-servers.gg/server/6454-6454-sanscraft-top",
      color: "#00BCD4",
      icon: "🤝",
    },
    {
      link: "https://minecraft-server-list.com/server/508213/vote/",
      color: "#8BC34A",
      icon: "📜",
    },
  ];

  const rewards = [
    { icon: "💰", name: "In-Game Cash", color: "#FFD700" },
    { icon: "🎁", name: "Mystery Boxes", color: "#FF5722" },
    { icon: "✨", name: "Exclusive Items", color: "#9C27B0" },
    { icon: "⚡", name: "XP Boost", color: "#00BCD4" },
    { icon: "🔑", name: "Crate Keys", color: "#4CAF50" },
    { icon: "👕", name: "Cosmetics", color: "#2196F3" },
  ];

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-10">
      <Head>
        <title>Vote for SansCraft Network</title>
        <meta
          name="description"
          content="Help SansCraft grow by voting for our server!"
        />
      </Head>

      {/* Background with Tailwind */}
      <div className="fixed inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat z-0" />
      <a href="/" className="text-blue-500 hover:underline fixed top-4 left-4">
        ← Back To Home
      </a>
      {/* Particle Background */}
      <ParticleBackground />

      {/* Loading Screen */}
      {isMounted && isLoading && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: 2, ease: "linear" },
                  scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                }}
                className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full"
              />
              <motion.div
                animate={{
                  rotate: -360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: 3, ease: "linear" },
                  scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                }}
                className="absolute inset-0 border-4 border-purple-500 border-b-transparent rounded-full"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                textShadow: [
                  "0 0 8px rgba(255,255,255,0)",
                  "0 0 8px rgba(255,255,255,0.3)",
                  "0 0 8px rgba(255,255,255,0)",
                ],
              }}
              transition={{
                delay: 0.3,
                duration: 1,
                textShadow: { repeat: Infinity, duration: 2 },
              }}
              className="mt-8 text-4xl font-bold text-white"
            >
              Preparing Vote Portal...
            </motion.h1>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Main Content */}
      {!isLoading && (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4 z-10 overflow-hidden">
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-center mb-12 relative"
          >
            <motion.h1
              animate={{
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.3)",
                  "0 0 20px rgba(100,200,255,0.5)",
                  "0 0 10px rgba(255,255,255,0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Vote For Rewards
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            >
              Support{" "}
              <span className="text-blue-300 font-semibold">
                SansCraft Network
              </span>{" "}
              and earn amazing rewards!
            </motion.p>
          </motion.div>

          {/* Vote Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-full max-w-6xl px-4 mb-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {voteLinks.map((vote, index) => (
                <VoteCard
                  key={index}
                  index={index}
                  link={vote.link}
                  color={vote.color}
                  icon={vote.icon}
                />
              ))}
            </div>
          </motion.div>

          {/* Rewards Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="w-full max-w-5xl px-4"
          >
            <div className="text-center mb-8">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                animate={{
                  textShadow: [
                    "0 0 8px rgba(255,255,255,0.3)",
                    "0 0 15px rgba(100,200,255,0.5)",
                    "0 0 8px rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
                  Amazing Voting Rewards
                </span>
              </motion.h2>
              <p className="text-lg text-gray-300">
                Get these exclusive rewards when you vote daily!
              </p>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              {rewards.map((reward, index) => (
                <RewardItem
                  key={index}
                  icon={reward.icon}
                  name={reward.name}
                  color={reward.color}
                />
              ))}
            </motion.div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <p className="text-gray-400 mb-4">
                All rewards are delivered automatically when you vote!
              </p>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="fixed bottom-6 left-0 right-0 text-center"
          >
            <p className="text-gray-500 text-sm">
              Thank you for supporting{" "}
              <span className="text-blue-400 font-semibold">
                SansCraft Network
              </span>{" "}
              - play.sanscraft.net
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VotingPage;
