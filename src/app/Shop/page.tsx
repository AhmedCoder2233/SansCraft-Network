"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaChevronDown,
  FaChevronUp,
  FaGem,
  FaBolt,
  FaFire,
  FaKey,
  FaBoxOpen,
} from "react-icons/fa";

interface RankItem {
  id: string;
  name: string;
  price: string;
  description: string;
  perks: string[];
  type: "legacy" | "seasonal";
  icon: React.ReactNode;
  color: string;
}

interface KeyItem {
  id: string;
  name: string;
  price: string;
  description: string;
  rewards: string[];
  icon: React.ReactNode;
  color: string;
}

const ShopCard = ({
  item,
  isExpanded,
  onExpand,
  onClick,
}: {
  item: RankItem | KeyItem;
  isExpanded: boolean;
  onExpand: () => void;
  onClick: () => void;
}) => {
  const isRank = "perks" in item;
  const content = isRank ? item.perks : item.rewards;
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring" }}
      className={`w-full max-w-sm bg-gray-900 bg-opacity-80 rounded-xl overflow-hidden border-2 ${
        "color" in item
          ? `border-${item.color.split(" ")[0]}`
          : "border-purple-500"
      } shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-glow`}
      style={{
        boxShadow: isExpanded
          ? `0 0 20px ${
              "color" in item
                ? item.color.split(" ")[0].replace("from-", "")
                : "purple-500"
            }`
          : "none",
      }}
    >
      <a href="/" className="text-blue-500 hover:underline fixed top-4 left-4">
        ← Back To Home
      </a>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {item.icon}
            <h3
              className={`text-2xl font-bold ${
                "color" in item
                  ? `text-${item.color.split(" ")[0]}`
                  : "text-purple-400"
              }`}
            >
              {item.name}
            </h3>
          </div>
          <span
            className={`bg-gradient-to-r ${
              "color" in item ? item.color : "from-purple-500 to-pink-600"
            } text-white px-3 py-1 rounded-full text-sm font-bold`}
          >
            {item.price}
          </span>
        </div>

        <p className="text-gray-300 mb-4">{item.description}</p>

        <button
          onClick={onExpand}
          className="flex items-center text-blue-400 text-sm mb-4 hover:text-blue-300 transition-colors"
        >
          {isExpanded ? (
            <>
              <span>Hide {isRank ? "Perks" : "Rewards"}</span>
              <FaChevronUp className="ml-1" />
            </>
          ) : (
            <>
              <span>Show All {isRank ? "Perks" : "Rewards"}</span>
              <FaChevronDown className="ml-1" />
            </>
          )}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="list-none pl-5 mb-6 text-gray-300 space-y-2">
                {content.map((line, i) => (
                  <li
                    key={i}
                    className={
                      line.startsWith("   -")
                        ? "pl-4"
                        : line.startsWith("  ")
                        ? "pl-2"
                        : ""
                    }
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClick}
          className={`w-full bg-gradient-to-r ${
            "color" in item ? item.color : "from-purple-500 to-pink-600"
          } text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all`}
        >
          <FaShoppingCart /> Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

const UsernameModal = ({
  show,
  item,
  username,
  setUsername,
  onClose,
  onPurchase,
}: {
  show: boolean;
  item: RankItem | KeyItem | null;
  username: string;
  setUsername: (val: string) => void;
  onClose: () => void;
  onPurchase: () => void;
}) => (
  <AnimatePresence>
    {show && item && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: "spring" }}
          className="bg-gray-900 bg-opacity-90 border border-gray-700 rounded-xl p-6 max-w-md w-full shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            Purchase {item.name}
          </h3>
          <p className="text-gray-300 mb-6">{item.description}</p>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">
              Enter your Minecraft username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Your Minecraft username"
            />
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onPurchase}
              disabled={!username.trim()}
              className={`flex-1 ${
                !username.trim()
                  ? "bg-gray-600"
                  : "bg-emerald-600 hover:bg-emerald-700"
              } text-white py-3 rounded-lg font-bold`}
            >
              Continue to Payment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ParticleBackground = () => {
  const particles = Array.from({ length: 50 }, (_, i) => {
    const isYellow = i % 4 === 0;
    const isDiamond = i % 3 === 0;
    return {
      id: `particle-${i}`,
      char: isDiamond ? "✦" : "❄",
      color: isYellow ? "text-yellow-300" : "text-white",
      size: 3 + (i % 6),
      left: 5 + ((i * 1.9) % 95),
      delay: i * 0.1,
      duration: 10 + (i % 10),
      rotation: i * 7.2,
      xOffset: ((i * 3) % 50) - 25,
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${particle.color} opacity-90`}
          style={{
            fontSize: `${particle.size}px`,
            left: `${particle.left}%`,
            top: "-20px",
            rotate: particle.rotation,
          }}
          animate={{
            y: `calc(100vh + 20px)`,
            x: `${particle.xOffset}px`,
            rotate: 360,
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            y: {
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            },
            x: {
              duration: particle.duration * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            },
            rotate: {
              duration: particle.duration * 3,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            },
            opacity: {
              duration: particle.duration / 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {particle.char}
        </motion.div>
      ))}
    </div>
  );
};

const GlowEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-blue-500 filter blur-[80px] opacity-20"
      animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500 filter blur-[80px] opacity-20"
      animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
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

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="relative w-64 h-64 mb-8"
    >
      <img
        src="/logo.png"
        alt="SansCraft Logo"
        className="w-full h-full object-contain animate-pulse"
      />
    </motion.div>

    <motion.h1
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text mb-6"
    >
      SansCraft Shop
    </motion.h1>

    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "60%" }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="h-2 bg-gray-700 rounded-full max-w-md"
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
        className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"
      />
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="mt-4 text-gray-400"
    >
      Loading awesome items...
    </motion.p>
  </motion.div>
);

export default function ShopPage() {
  const [selectedItem, setSelectedItem] = useState<RankItem | KeyItem | null>(
    null
  );
  const [username, setUsername] = useState("");
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [activeTab, setActiveTab] = useState<"ranks" | "keys">("ranks");
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const legacyRanks: RankItem[] = [
    {
      id: "silver-legacy",
      name: "Silver Legacy Rank",
      price: "8.00 EUR",
      description: "Unlock the Silver-tier Legacy Mine and Lightning Kit",
      perks: [
        "✅ Seasonal rank that never expires",
        "✅ Access to Silver-tier Legacy Mine (/warp LegacyMines)",
        "✅ Unlock Lightning (Seasonal) Rank Kit",
        "✅ Priority warp access",
        "✅ Exclusive Silver Legacy tag",
        "✅ Silver-tier mining rewards",
        "✅ 1.2x mining multiplier",
      ],
      type: "legacy",
      icon: <FaGem className="text-gray-300 text-3xl" />,
      color: "from-gray-400 to-gray-600",
    },
    {
      id: "gold-legacy",
      name: "Gold Legacy Rank",
      price: "15.00 EUR",
      description: "Access Gold-tier rewards and enhanced perks",
      perks: [
        "✅ Seasonal rank that never expires",
        "✅ Access to Gold-tier and all lower-tier mines",
        "✅ Unlock Lightning (Seasonal) Rank Kit",
        "✅ Priority warp access",
        "✅ Exclusive Gold Legacy tag",
        "✅ Gold-tier mining rewards",
        "✅ 1.5x mining multiplier",
        "✅ Special golden particle effect",
      ],
      type: "legacy",
      icon: <FaGem className="text-yellow-400 text-3xl" />,
      color: "from-yellow-500 to-yellow-700",
    },
    {
      id: "diamond-legacy",
      name: "Diamond Legacy Rank",
      price: "22.00 EUR",
      description: "Diamond-tier access with powerful benefits",
      perks: [
        "✅ Seasonal rank that never expires",
        "✅ Access to Diamond-tier and all lower-tier mines",
        "✅ Unlock Lightning (Seasonal) Rank Kit",
        "✅ Priority warp access",
        "✅ Exclusive Diamond Legacy tag",
        "✅ Diamond-tier mining rewards",
        "✅ 2x mining multiplier",
        "✅ Special diamond particle effect",
        "✅ Access to VIP chat channels",
      ],
      type: "legacy",
      icon: <FaGem className="text-blue-400 text-3xl" />,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "emerald-legacy",
      name: "Emerald Legacy Rank",
      price: "28.00 EUR",
      description: "Emerald-tier prestige with elite perks",
      perks: [
        "✅ Seasonal rank that never expires",
        "✅ Access to Emerald-tier and all lower-tier mines",
        "✅ Unlock Earth (Seasonal) Rank Kit",
        "✅ Priority warp access",
        "✅ Exclusive Emerald Legacy tag",
        "✅ Emerald-tier mining rewards",
        "✅ 2.5x mining multiplier",
        "✅ Special emerald particle effect",
        "✅ Access to VIP chat channels",
        "✅ Ability to nickname yourself",
      ],
      type: "legacy",
      icon: <FaGem className="text-emerald-400 text-3xl" />,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      id: "supreme-legacy",
      name: "Supreme Legacy Rank",
      price: "35.00 EUR",
      description: "The ultimate rank with all privileges",
      perks: [
        "✅ Seasonal rank that never expires",
        "✅ Access to Supreme-tier and all lower-tier mines",
        "✅ Unlock Earth (Seasonal) Rank Kit",
        "✅ Priority warp access",
        "✅ Exclusive Supreme Legacy tag",
        "✅ Supreme-tier mining rewards",
        "✅ 3x mining multiplier",
        "✅ Special supreme particle effect",
        "✅ Access to VIP chat channels",
        "✅ Ability to nickname yourself",
        "✅ Exclusive /fly access in LegacyMines",
        "✅ Custom join message",
      ],
      type: "legacy",
      icon: <FaGem className="text-purple-500 text-3xl" />,
      color: "from-purple-500 to-purple-700",
    },
  ];

  const seasonalRanks: RankItem[] = [
    {
      id: "lightning",
      name: "Lightning Rank",
      price: "5.00 EUR",
      description: "Harness the power of lightning",
      perks: [
        "✅ Lightning Kit (Diamond Sword with Sharpness II)",
        "✅ Access to Lightning Mine (/warp LightningMine)",
        "✅ Priority warp access",
        "✅ Lightning-themed armor set",
        "✅ Lightning strike ability (1 use per life)",
        "✅ 10% damage boost during thunderstorms",
      ],
      type: "seasonal",
      icon: <FaBolt className="text-yellow-300 text-3xl" />,
      color: "from-yellow-300 to-yellow-500",
    },
    {
      id: "earth",
      name: "Earth Rank",
      price: "12.00 EUR",
      description: "Command the strength of the earth",
      perks: [
        "✅ Everything in Lightning Rank",
        "✅ Earth Kit (Diamond Pickaxe with Efficiency IV)",
        "✅ Access to Earth Mine (/warp EarthMine)",
        "✅ Earth-themed armor (Protection II)",
        "✅ Earthquake ability (1 use per life)",
        "✅ Resistance I when underground",
        "✅ 15% mining speed boost",
      ],
      type: "seasonal",
      icon: <FaGem className="text-green-500 text-3xl" />,
      color: "from-green-500 to-green-700",
    },
    {
      id: "fire",
      name: "Fire Rank",
      price: "18.00 EUR",
      description: "Wield the destructive power of fire",
      perks: [
        "✅ Everything in Earth Rank",
        "✅ Fire Kit (Diamond Axe with Fire Aspect II)",
        "✅ Access to Fire Mine (/warp FireMine)",
        "✅ Fire-themed armor (Fire Protection IV)",
        "✅ Firestorm ability (1 use per life)",
        "✅ Permanent fire resistance",
        "✅ 20% fire damage boost",
        "✅ Exclusive /flame command",
      ],
      type: "seasonal",
      icon: <FaFire className="text-orange-500 text-3xl" />,
      color: "from-orange-500 to-red-600",
    },
  ];

  const keys: KeyItem[] = [
    {
      id: "special-crate",
      name: "Special Crate Key",
      price: "0.50 EUR",
      description: "Unlock rare offhands and exclusive items",
      rewards: [
        "🔑 Rare Offhands with Unique Effects:",
        "   - Health Boost (+2 hearts)",
        "   - Damage Bonus (+10% damage)",
        "   - Haste (Mining speed boost)",
        "   - Resistance (Damage reduction)",
        "✨ Exclusive Totems:",
        "   - Unique visual designs",
        "   - Special particle effects",
        "🎁 Other Powerful Rewards:",
        "   - Rare weapons and tools",
        "   - Mystery buff items",
        "   - Cosmetic customization items",
      ],
      icon: <FaKey className="text-yellow-400 text-3xl" />,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: "energy-crate",
      name: "Energy Crate Key",
      price: "1.50 EUR",
      description: "Unlock the powerful Energy Set",
      rewards: [
        "⚡ Energy Set Items:",
        "   - Energy Helmet (Protection III)",
        "   - Energy Chestplate (Protection III)",
        "   - Energy Leggings (Protection III)",
        "   - Energy Boots (Feather Falling III)",
        "🌟 Full Set Bonus:",
        "   - +15% movement speed",
        "   - Energy particle effect",
        "   - Night vision effect",
        "🎯 Other Rewards:",
        "   - Energy weapons with special abilities",
        "   - Rare resources and materials",
        "   - Mystery buff potions",
      ],
      icon: <FaBoxOpen className="text-blue-400 text-3xl" />,
      color: "from-blue-400 to-blue-600",
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleItemClick = (item: RankItem | KeyItem) => {
    setSelectedItem(item);
    setShowUsernameModal(true);
  };

  const handlePurchase = () => {
    if (!username.trim()) return;
    window.open(`https://sanscraft.craftingstore.net`, "_blank");
    setShowUsernameModal(false);
    setUsername("");
  };

  return (
    <div className="relative min-h-screen bg-[url('/background.jpg')] bg-cover bg-center overflow-hidden">
      <div className="absolute inset-0 opacity-90" />
      <ParticleBackground />
      <GlowEffect />

      {isMounted && (
        <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      )}

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 py-12"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
                SansCraft Shop
              </span>
            </h1>
            <p className="text-xl text-emerald-300 mb-6">
              Upgrade your experience with exclusive ranks and keys
            </p>

            <div className="flex justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("ranks")}
                className={`px-6 py-2 rounded-full font-bold ${
                  activeTab === "ranks"
                    ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                Ranks
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("keys")}
                className={`px-6 py-2 rounded-full font-bold ${
                  activeTab === "keys"
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                Keys
              </motion.button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "ranks" && (
              <motion.div
                key="ranks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    <span className="bg-gradient-to-r from-gray-300 to-gray-500 text-transparent bg-clip-text px-4 py-2 rounded-lg">
                      Legacy Ranks (Permanent)
                    </span>
                  </h2>

                  <div className="flex flex-wrap justify-center gap-6">
                    {legacyRanks.map((rank) => (
                      <ShopCard
                        key={rank.id}
                        item={rank}
                        isExpanded={!!expandedItems[rank.id]}
                        onExpand={() => toggleExpand(rank.id)}
                        onClick={() => handleItemClick(rank)}
                      />
                    ))}
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    <span className="bg-gradient-to-r from-yellow-300 to-orange-500 text-transparent bg-clip-text px-4 py-2 rounded-lg">
                      Seasonal Ranks
                    </span>
                  </h2>

                  <div className="flex flex-wrap justify-center gap-6">
                    {seasonalRanks.map((rank) => (
                      <ShopCard
                        key={rank.id}
                        item={rank}
                        isExpanded={!!expandedItems[rank.id]}
                        onExpand={() => toggleExpand(rank.id)}
                        onClick={() => handleItemClick(rank)}
                      />
                    ))}
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {activeTab === "keys" && (
              <motion.div
                key="keys"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text px-4 py-2 rounded-lg">
                      Crate Keys
                    </span>
                  </h2>

                  <div className="flex flex-wrap justify-center gap-6">
                    {keys.map((key) => (
                      <ShopCard
                        key={key.id}
                        item={key}
                        isExpanded={!!expandedItems[key.id]}
                        onExpand={() => toggleExpand(key.id)}
                        onClick={() => handleItemClick(key)}
                      />
                    ))}
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <UsernameModal
        show={showUsernameModal}
        item={selectedItem}
        username={username}
        setUsername={setUsername}
        onClose={() => setShowUsernameModal(false)}
        onPurchase={handlePurchase}
      />
    </div>
  );
}
