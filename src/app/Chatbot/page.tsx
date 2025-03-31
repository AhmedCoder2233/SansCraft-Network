"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaTimes,
  FaDiscord,
  FaQuestionCircle,
  FaBook,
  FaGavel,
  FaUndo,
  FaMoneyBillWave,
} from "react-icons/fa";

const SansCraftAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      addBotMessage(
        "Hey there! I'm the SansCraft Assistant. How can I help you today?"
      );
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, isUser: false }]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, isUser: true }]);
    setInputValue("");
    respondToUser(text);
  };

  const respondToUser = (userInput: string) => {
    // Process after a short delay to simulate thinking
    setTimeout(() => {
      const input = userInput.toLowerCase();

      if (input.includes("discord")) {
        addBotMessage("Our Discord server is: https://discord.gg/hUdzUc4HFX");
      } else if (
        input.includes("java") ||
        (input.includes("ip") && !input.includes("bedrock"))
      ) {
        addBotMessage("Java Edition IP: sanscraft.top");
      } else if (input.includes("bedrock")) {
        addBotMessage("Bedrock Edition IP: sanscraft.top\nPort: 20041");
      } else if (input.includes("mode") || input.includes("game")) {
        addBotMessage(
          "Current game modes:\n- BoxPvP (Competitive 1v1 battles)\n- More coming soon!"
        );
      } else if (input.includes("help") || input.includes("support")) {
        addBotMessage(
          "You can ask me about:\n- Server IPs (Java/Bedrock)\n- Discord link\n- Game modes\n- Rules & Policies\n- How to join"
        );
      } else if (
        input.includes("rule") ||
        input.includes("conduct") ||
        input.includes("policy")
      ) {
        addBotMessage(`Here are our server rules and policies. What would you like to know more about?
        
[1] In-Game Rules & Conduct
[2] Modifications Policy
[3] Unban Policy
[4] Refund Policy

Reply with the number for details.`);
      } else if (
        input.includes("1") ||
        input.includes("game rules") ||
        input.includes("conduct")
      ) {
        addBotMessage(`**In-Game Rules & Conduct**

• Chat & Communication:
  - Keep all communication respectful, appropriate, and in English
  - Offensive usernames/skins are prohibited

• Fair Play:
  - No hacking/unfair mods
  - No IRL trading
  - No bug/glitch exploitation
  - No automation tools

• Behavior:
  - No drama/disputes
  - No doxing/threats
  - Scamming is allowed (no refunds)

• Prohibited:
  - No sensitive topics (politics, etc.)
  - No advertising
  - No report system abuse`);
      } else if (
        input.includes("2") ||
        input.includes("mod") ||
        input.includes("client")
      ) {
        addBotMessage(`**Modifications Policy**

🚫 Disallowed Mods:
- Freecam, Francium, CW
- Auto Clickers, Tweakeroo
- Elytra/Chestplate Swappers

✅ Allowed Mods:
- Performance mods (OptiFine, Sodium)
- Inventory HUD
- Totem Counter
- Health Indicators

Note: Any mod giving unfair advantage may be bannable.`);
      } else if (input.includes("3") || input.includes("unban")) {
        addBotMessage(`**Unban Policy**

We only consider unbans if:
- You provide clear, unedited video evidence
- The clip shows full context of the incident

❌ Requests without video proof will be denied`);
      } else if (input.includes("4") || input.includes("refund")) {
        addBotMessage(`**Refund Policy**

🔄 Eligible Cases:
- Death to confirmed cheaters
- Server faults (lag/crashes)
- False bans
- Elytra bugs

📌 Requirements:
- Evidence must be <24h old
- Show full Minecraft client
- Clearly display the issue

❌ No refunds for:
- Deaths during reboots
- Client-side issues`);
      } else if (input.includes("join") || input.includes("play")) {
        addBotMessage(`To join SansCraft:
        
1. Open Minecraft
2. Add server:
   - Java: sanscraft.top
   - Bedrock: sanscraft.top Port: 20041
3. Click Join Server!`);
      } else {
        addBotMessage(`I'm not sure I understand. Try asking about:
- Server IPs (Java/Bedrock)
- Discord
- Game modes
- Rules & Policies
Or type 'help' for options.`);
      }
    }, 800);
  };

  const handleQuickQuestion = (question: string) => {
    addUserMessage(question);
  };

  return (
    <>
      {/* Chatbot Icon - Fixed Position */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <FaRobot className="text-white text-2xl" />
          </div>
          <motion.div
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            !
          </motion.div>
        </div>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 h-96 bg-gray-800 rounded-lg shadow-xl flex flex-col z-50 overflow-hidden border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-3 flex justify-between items-center">
              <div className="flex items-center">
                <FaRobot className="text-white mr-2" />
                <h3 className="text-white font-bold">SansCraft Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-900/50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 flex items-center justify-center h-full">
                  Ask me anything about SansCraft!
                </div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={`mb-3 ${
                      msg.isUser ? "text-right" : "text-left"
                    }`}
                    initial={{ opacity: 0, x: msg.isUser ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div
                      className={`inline-block px-3 py-2 rounded-lg max-w-xs ${
                        msg.isUser
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {msg.text.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-3 py-2 bg-gray-800 border-t border-gray-700">
              <div className="flex overflow-x-auto pb-2 space-x-2">
                {["IP?", "Bedrock?", "Rules"].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q)}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-full whitespace-nowrap flex items-center"
                  >
                    {q === "Rules" && <FaBook className="mr-1" size={10} />}
                    {q === "IP?" && (
                      <FaQuestionCircle className="mr-1" size={10} />
                    )}
                    {q === "Bedrock?" && (
                      <FaQuestionCircle className="mr-1" size={10} />
                    )}
                    {q}
                  </button>
                ))}
                <button
                  onClick={() => handleQuickQuestion("Mods Policy")}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-full whitespace-nowrap flex items-center"
                >
                  <FaGavel className="mr-1" size={10} />
                  Mods
                </button>
                <button
                  onClick={() => handleQuickQuestion("Unban Policy")}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-full whitespace-nowrap flex items-center"
                >
                  <FaUndo className="mr-1" size={10} />
                  Unban
                </button>
                <button
                  onClick={() => handleQuickQuestion("Refund Policy")}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-full whitespace-nowrap flex items-center"
                >
                  <FaMoneyBillWave className="mr-1" size={10} />
                  Refund
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-gray-800 border-t border-gray-700">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputValue.trim()) addUserMessage(inputValue);
                }}
                className="flex"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-lg"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SansCraftAssistant;
