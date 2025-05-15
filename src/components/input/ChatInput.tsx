import { HiOutlineFaceSmile, HiOutlinePaperAirplane } from "react-icons/hi2";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

type ChatInputProps = {
  handleSendMessage: () => void;
};

const ChatInput = ({ handleSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (
    // eslint-disable-next-line
    emojiData: any,
  ) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-gray-300 hover:text-white transition-colors"
        >
          <HiOutlineFaceSmile className="size-6" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 h-12 px-4 rounded-xl bg-black-100 border-2 border-gray-200 text-white focus:border-pink-100 outline-none transition-colors"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />

        <AnimatedButton
          onClick={handleSendMessage}
          disabled={message.trim() === ""}
          className={`size-12 rounded-full flex items-center justify-center ${message.trim() === "" ? "bg-gray-200 text-black-100 cursor-not-allowed" : "bg-pink-100 text-black-100"}`}
          hoverBackgroundColor="#E80352"
          hoverTextColor="#FFFFFF"
        >
          <HiOutlinePaperAirplane className="size-6" />
        </AnimatedButton>
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-12 left-12 z-50">
          <EmojiPicker
            // @ts-ignore
            theme={"dark"}
            onEmojiClick={handleEmojiClick}
          />
        </div>
      )}
    </div>
  );
};

export default ChatInput;
