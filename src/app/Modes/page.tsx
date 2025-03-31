"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

type MapDimension = "overworld" | "nether" | "end";
type PlayerSkin = "steve" | "alex";

interface Player {
  id: number;
  name: string;
  x: number;
  y: number;
  health: number;
  dimension: MapDimension;
  skin: PlayerSkin;
  targetX: number;
  targetY: number;
  speed: number;
  moving: boolean;
}

const ModesSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [mapView, setMapView] = useState<MapDimension>("overworld");
  const [hoveredPlayer, setHoveredPlayer] = useState<Player | null>(null);
  const animationRef = useRef<number>();

  // Initialize 4 players per dimension (total 12 players)
  const initialPlayers: Player[] = [
    // Overworld players
    {
      id: 1,
      name: "SansWarrior",
      x: 30,
      y: 60,
      health: 20,
      dimension: "overworld",
      skin: "steve",
      targetX: 30,
      targetY: 60,
      speed: 0.2,
      moving: false,
    },
    {
      id: 2,
      name: "PVP_God",
      x: 70,
      y: 70,
      health: 16,
      dimension: "overworld",
      skin: "alex",
      targetX: 70,
      targetY: 70,
      speed: 0.25,
      moving: false,
    },
    {
      id: 3,
      name: "Miner42",
      x: 50,
      y: 50,
      health: 12,
      dimension: "overworld",
      skin: "steve",
      targetX: 50,
      targetY: 50,
      speed: 0.3,
      moving: false,
    },
    {
      id: 4,
      name: "BuilderPro",
      x: 20,
      y: 80,
      health: 8,
      dimension: "overworld",
      skin: "alex",
      targetX: 20,
      targetY: 80,
      speed: 0.15,
      moving: false,
    },

    // Nether players
    {
      id: 5,
      name: "NetherLord",
      x: 25,
      y: 70,
      health: 18,
      dimension: "nether",
      skin: "steve",
      targetX: 25,
      targetY: 70,
      speed: 0.35,
      moving: false,
    },
    {
      id: 6,
      name: "BlazeKing",
      x: 75,
      y: 60,
      health: 14,
      dimension: "nether",
      skin: "alex",
      targetX: 75,
      targetY: 60,
      speed: 0.4,
      moving: false,
    },
    {
      id: 7,
      name: "GhastHunter",
      x: 40,
      y: 80,
      health: 10,
      dimension: "nether",
      skin: "steve",
      targetX: 40,
      targetY: 80,
      speed: 0.25,
      moving: false,
    },
    {
      id: 8,
      name: "PiglinTrader",
      x: 60,
      y: 40,
      health: 6,
      dimension: "nether",
      skin: "alex",
      targetX: 60,
      targetY: 40,
      speed: 0.2,
      moving: false,
    },

    // End players
    {
      id: 9,
      name: "EndKing",
      x: 40,
      y: 40,
      health: 15,
      dimension: "end",
      skin: "steve",
      targetX: 40,
      targetY: 40,
      speed: 0.3,
      moving: false,
    },
    {
      id: 10,
      name: "DragonSlayer",
      x: 60,
      y: 60,
      health: 10,
      dimension: "end",
      skin: "alex",
      targetX: 60,
      targetY: 60,
      speed: 0.35,
      moving: false,
    },
    {
      id: 11,
      name: "ShulkerPro",
      x: 30,
      y: 70,
      health: 5,
      dimension: "end",
      skin: "steve",
      targetX: 30,
      targetY: 70,
      speed: 0.2,
      moving: false,
    },
    {
      id: 12,
      name: "ElytraFlyer",
      x: 70,
      y: 30,
      health: 20,
      dimension: "end",
      skin: "alex",
      targetX: 70,
      targetY: 30,
      speed: 0.4,
      moving: false,
    },
  ];

  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  // Set new random targets for players
  const setNewTargets = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        // Only set new target if not already moving
        if (!player.moving && Math.random() > 0.7) {
          return {
            ...player,
            targetX: 20 + Math.random() * 60, // Keep within bounds
            targetY: 20 + Math.random() * 60,
            moving: true,
          };
        }
        return player;
      })
    );
  };

  // Animation loop for player movement
  const animatePlayers = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (!player.moving) return player;

        // Calculate movement
        const dx = player.targetX - player.x;
        const dy = player.targetY - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If reached target, stop moving
        if (distance < 0.5) {
          return { ...player, moving: false };
        }

        // Move toward target
        const vx = (dx / distance) * player.speed;
        const vy = (dy / distance) * player.speed;

        return {
          ...player,
          x: player.x + vx,
          y: player.y + vy,
        };
      })
    );
    animationRef.current = requestAnimationFrame(animatePlayers);
  };

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      animationRef.current = requestAnimationFrame(animatePlayers);

      // Set new targets periodically
      const targetInterval = setInterval(setNewTargets, 3000);
      return () => clearInterval(targetInterval);
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const boxPvpFeatures = [
    "🔥 Intense 1v1 combat in confined spaces",
    "⚔️ Custom knockback mechanics",
    "🏆 Ranked ladder system",
    "🎯 Precision-based hit detection",
    "💥 Special ability charges",
    "🛡️ Damage reduction when blocking",
    "⚡ Fast matchmaking (<5s queues)",
    "🌪️ Unique map hazards",
  ];

  const MapDisplay = ({ dimension }: { dimension: MapDimension }) => {
    const currentPlayers = players.filter((p) => p.dimension === dimension);

    // Generate realistic Minecraft terrain
    const generateTerrain = () => {
      const elements = [];

      if (dimension === "overworld") {
        // Grass terrain with depth
        elements.push(
          <rect
            key="ground"
            x="0"
            y="80"
            width="100"
            height="20"
            fill="#3A5F0B"
          />
        );
        // Hills with stone underneath
        elements.push(
          <path
            key="hills"
            d="M0,80 Q20,65 40,75 Q60,70 80,75 Q90,72 100,80"
            fill="#2E8B57"
            stroke="#1F5E3A"
            strokeWidth="0.5"
          />
        );
        elements.push(
          <path
            key="hills-stone"
            d="M0,85 Q20,75 40,80 Q60,78 80,80 Q90,78 100,85"
            fill="#808080"
            stroke="#606060"
            strokeWidth="0.5"
          />
        );
        // Trees with proper shading
        for (let i = 0; i < 8; i++) {
          const x = 10 + i * 11;
          elements.push(
            <g key={`tree-${i}`}>
              <rect x={x} y={75} width="2" height="10" fill="#8B4513" />
              <rect x={x - 0.5} y={75} width="3" height="1" fill="#5D4037" />
              <circle cx={x + 1} cy={68} r="5" fill="#2E7D32" />
              <circle cx={x + 2} cy={69} r="3" fill="#1B5E20" opacity="0.8" />
            </g>
          );
        }
        // Water with waves
        elements.push(
          <g key="water">
            <rect x="0" y="90" width="100" height="10" fill="#1E88E5" />
            <path
              d="M0,92 Q10,90 20,92 Q30,94 40,92 Q50,90 60,92 Q70,94 80,92 Q90,90 100,92"
              fill="#0D47A1"
              opacity="0.5"
            />
          </g>
        );
        // Stone and ore patches
        for (let i = 0; i < 12; i++) {
          const x = Math.random() * 90 + 5;
          const y = 80 + Math.random() * 10;
          const size = 2 + Math.random() * 3;
          const type = Math.random();
          const fill =
            type > 0.9 ? "#FFD700" : type > 0.7 ? "#C0C0C0" : "#808080";
          elements.push(
            <rect
              key={`ore-${i}`}
              x={x}
              y={y}
              width={size}
              height={size}
              fill={fill}
              rx="0.5"
            />
          );
        }
      } else if (dimension === "nether") {
        // Netherrack with glowing cracks
        elements.push(
          <g key="nether-floor">
            <rect x="0" y="80" width="100" height="20" fill="#6C2726" />
            {Array.from({ length: 25 }).map((_, i) => (
              <path
                key={`crack-${i}`}
                d={`M${Math.random() * 100},${80 + Math.random() * 20} 
                     L${Math.random() * 100},${80 + Math.random() * 20}`}
                stroke="#FF5722"
                strokeWidth={0.2 + Math.random() * 0.3}
                strokeLinecap="round"
              />
            ))}
          </g>
        );
        // Glowing lava rivers
        elements.push(
          <g key="lava">
            <path
              d="M0,88 Q25,83 50,88 Q75,93 100,88"
              fill="#FF5722"
              stroke="#E65100"
              strokeWidth="1"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3s"
              repeatCount="indefinite"
            />
          </g>
        );
        // Nether fortress with glow
        elements.push(
          <g key="fortress">
            <rect x="20" y="60" width="15" height="20" fill="#B71C1C" />
            <rect x="65" y="50" width="10" height="30" fill="#B71C1C" />
            {Array.from({ length: 5 }).map((_, i) => (
              <rect
                key={`window-${i}`}
                x={22 + i * 2.5}
                y="65"
                width="1.5"
                height="3"
                fill="#FF8A65"
              />
            ))}
            {/* Nether bricks */}
            <pattern
              id="netherBricks"
              patternUnits="userSpaceOnUse"
              width="4"
              height="4"
            >
              <rect width="4" height="4" fill="#B71C1C" />
              <rect width="2" height="2" fill="#8E0E0E" />
              <rect x="2" y="2" width="2" height="2" fill="#8E0E0E" />
            </pattern>
            <rect
              x="20"
              y="60"
              width="15"
              height="20"
              fill="url(#netherBricks)"
              opacity="0.7"
            />
          </g>
        );
      } else {
        // End island with proper end stone texture
        elements.push(
          <g key="end-island">
            <circle cx="50" cy="50" r="40" fill="#9E9E9E" />
            <pattern
              id="endStone"
              patternUnits="userSpaceOnUse"
              width="4"
              height="4"
            >
              <rect width="4" height="4" fill="#9E9E9E" />
              <circle cx="1" cy="1" r="0.5" fill="#BDBDBD" />
              <circle cx="3" cy="3" r="0.5" fill="#BDBDBD" />
            </pattern>
            <circle cx="50" cy="50" r="40" fill="url(#endStone)" />

            {/* Floating islands */}
            <circle cx="20" cy="20" r="12" fill="#BDBDBD" />
            <circle cx="80" cy="30" r="8" fill="#BDBDBD" />
            <circle cx="30" cy="70" r="6" fill="#BDBDBD" />

            {/* End gateway particles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <circle
                key={`particle-${i}`}
                cx={40 + Math.sin(Date.now() / 1000 + i) * 5}
                cy={40 + Math.cos(Date.now() / 1000 + i) * 5}
                r={0.3 + Math.random() * 0.7}
                fill="#7B1FA2"
                opacity="0.8"
              />
            ))}
          </g>
        );
      }

      return elements;
    };

    // Detailed player avatar with walking animation
    const PlayerAvatar = ({ player }: { player: Player }) => {
      const isMoving = player.moving;
      const walkCycle = Math.sin(Date.now() / 200) * 0.5;

      return (
        <g
          className="cursor-pointer transition-transform duration-300"
          transform={`translate(${player.x},${player.y})`}
          onMouseEnter={() => setHoveredPlayer(player)}
          onMouseLeave={() => setHoveredPlayer(null)}
        >
          {/* Shadow */}
          <ellipse
            cx="0"
            cy="3"
            rx={2 + (isMoving ? walkCycle * 0.5 : 0)}
            ry={1 - (isMoving ? Math.abs(walkCycle) * 0.3 : 0)}
            fill="rgba(0,0,0,0.3)"
          />

          {/* Body with walking animation */}
          <g transform={isMoving ? `translate(0,${walkCycle * 0.5})` : ""}>
            {player.skin === "steve" ? (
              <>
                <rect x="-1.5" y="-3" width="3" height="6" fill="#6B3E26" />
                <rect x="-1.5" y="-4" width="3" height="1" fill="#6B3E26" />
                {/* Legs with walking animation */}
                <rect
                  x="-1.5"
                  y="3"
                  width="1"
                  height="3"
                  fill="#4B2E1B"
                  transform={isMoving ? `translate(0,${-walkCycle * 0.5})` : ""}
                />
                <rect
                  x="0.5"
                  y="3"
                  width="1"
                  height="3"
                  fill="#4B2E1B"
                  transform={isMoving ? `translate(0,${walkCycle * 0.5})` : ""}
                />
              </>
            ) : (
              <>
                <rect x="-1.5" y="-3" width="3" height="6" fill="#3A5F0B" />
                <rect x="-1.5" y="-4" width="3" height="1" fill="#3A5F0B" />
                {/* Legs with walking animation */}
                <rect
                  x="-1.5"
                  y="3"
                  width="1"
                  height="3"
                  fill="#2E4A0B"
                  transform={isMoving ? `translate(0,${-walkCycle * 0.5})` : ""}
                />
                <rect
                  x="0.5"
                  y="3"
                  width="1"
                  height="3"
                  fill="#2E4A0B"
                  transform={isMoving ? `translate(0,${walkCycle * 0.5})` : ""}
                />
              </>
            )}
          </g>

          {/* Health indicator */}
          <rect x="-2.5" y="-6" width="5" height="0.8" fill="#444" rx="0.4" />
          <rect
            x="-2.5"
            y="-6"
            width={5 * (player.health / 20)}
            height="0.8"
            fill={
              player.health > 15
                ? "#4CAF50"
                : player.health > 5
                ? "#FFC107"
                : "#F44336"
            }
            rx="0.4"
          />
        </g>
      );
    };

    return (
      <div
        className={`w-full h-full ${
          dimension === "overworld"
            ? "bg-gradient-to-b from-sky-500 to-blue-900"
            : dimension === "nether"
            ? "bg-gradient-to-b from-red-900 to-black"
            : "bg-gradient-to-b from-purple-900 to-black"
        } rounded-lg relative overflow-hidden shadow-inner`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Sky/background */}
          {dimension === "overworld" && (
            <>
              <defs>
                <radialGradient id="sunGlow" cx="80%" cy="20%" r="50%">
                  <stop offset="0%" stopColor="#FFEB3B" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FFEB3B" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect x="0" y="0" width="100" height="100" fill="url(#sunGlow)" />
              <circle cx="80" cy="20" r="8" fill="#FFD700" />
              {Array.from({ length: 8 }).map((_, i) => (
                <circle
                  key={`cloud-${i}`}
                  cx={Math.random() * 100}
                  cy={Math.random() * 30}
                  r={3 + Math.random() * 2}
                  fill="rgba(255,255,255,0.7)"
                />
              ))}
            </>
          )}

          {/* Terrain */}
          {generateTerrain()}

          {/* Players */}
          <g>
            {currentPlayers.map((player) => (
              <PlayerAvatar key={player.id} player={player} />
            ))}
          </g>

          {/* Grid overlay */}
          <pattern
            id="gridPattern"
            patternUnits="userSpaceOnUse"
            width="10"
            height="10"
          >
            <path
              d="M0,0 L0,10 M0,0 L10,0"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.2"
            />
          </pattern>
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="url(#gridPattern)"
            opacity="0.3"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Loading Screen */}
      {isMounted && isLoading && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            />
            <motion.h1 className="mt-4 text-2xl font-bold text-white">
              Loading Arena...
            </motion.h1>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Main Content */}
      {!isLoading && (
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
                BoxPvP Arena
              </span>
            </h1>
            <p className="text-lg md:text-xl text-yellow-300">
              Competitive Minecraft PvP battles
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Features Section */}
            <div className="bg-gray-900/80 rounded-xl p-4 md:p-6 border-2 border-red-500">
              <h2 className="text-2xl md:text-3xl font-bold text-red-400 mb-3 md:mb-4 text-center">
                Features
              </h2>
              <ul className="space-y-2 md:space-y-3">
                {boxPvpFeatures.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start text-sm md:text-base text-gray-300"
                  >
                    <span className="text-yellow-400 mr-2 mt-1">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map Viewer */}
            <div className="bg-gray-900/80 rounded-xl p-4 md:p-6 border-2 border-blue-500">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 md:mb-4 gap-2">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-400">
                  {mapView.charAt(0).toUpperCase() + mapView.slice(1)} Map
                </h2>
                <div className="flex gap-1 sm:gap-2 flex-wrap justify-center sm:justify-end">
                  {(["overworld", "nether", "end"] as MapDimension[]).map(
                    (dim) => (
                      <button
                        key={dim}
                        onClick={() => setMapView(dim)}
                        className={`px-2 py-1 text-xs sm:text-sm rounded capitalize min-w-[80px] ${
                          mapView === dim
                            ? dim === "overworld"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : dim === "nether"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-purple-600 hover:bg-purple-700"
                            : "bg-gray-700 hover:bg-gray-600"
                        } transition-colors`}
                      >
                        {dim}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-700">
                <MapDisplay dimension={mapView} />
              </div>

              {/* Player details panel */}
              <AnimatePresence>
                {hoveredPlayer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 px-4 py-2 rounded-lg border border-gray-600 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-sm relative ${
                          hoveredPlayer.skin === "steve"
                            ? "bg-[#6B3E26]"
                            : "bg-[#3A5F0B]"
                        }`}
                      >
                        {/* Mini player preview */}
                        <div className="absolute top-0.5 left-1 w-6 h-1 bg-current" />
                        <div className="absolute top-1.5 left-1 w-6 h-4 bg-current" />
                        <div className="absolute top-5.5 left-1 w-2 h-2 bg-current" />
                        <div className="absolute top-5.5 left-3 w-2 h-2 bg-current" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          {hoveredPlayer.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-300">
                            ❤️ {hoveredPlayer.health}/20
                          </span>
                          <div className="w-16 h-2 bg-gray-700 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                hoveredPlayer.health > 15
                                  ? "bg-green-500"
                                  : hoveredPlayer.health > 5
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${(hoveredPlayer.health / 20) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {hoveredPlayer.dimension.charAt(0).toUpperCase() +
                            hoveredPlayer.dimension.slice(1)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-2 md:mt-3 text-center text-xs md:text-sm text-gray-400">
                Hover over players to see details
              </div>
            </div>
          </div>

          {/* Join Button */}
          <div className="text-center mt-6 md:mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold rounded-full text-base md:text-lg shadow-lg hover:shadow-red-500/30"
            >
              Join Server Now
            </motion.button>
            <div className="mt-1 md:mt-2 font-mono text-sm md:text-base text-green-400">
              play.sanscraft.net
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModesSection;
