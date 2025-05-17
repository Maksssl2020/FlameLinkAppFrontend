import {
  HiOutlineArrowSmallLeft,
  HiOutlineEllipsisHorizontal,
  HiOutlinePaperAirplane,
  HiOutlineXMark,
} from "react-icons/hi2";
import Page from "../../animations/Page.tsx";
import SectionContainer from "../../components/section/SectionContainer.tsx";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import { HiOutlineSearch } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import useAuthentication from "../../hooks/useAuthentication.ts";
import { motion } from "framer-motion";
import useUserConversationsQuery from "../../hooks/queries/useUserConversationsQuery.ts";
import Spinner from "../../components/spinner/Spinner.tsx";
import useUsersMessagesQuery from "../../hooks/queries/useUsersMessagesQuery.ts";
import { ConversationPreview } from "../../types/messageTypes.ts";
import useSendMessageMutation from "../../hooks/muatations/useSendMessageMutation.ts";
import ChatInput from "../../components/input/ChatInput.tsx";

const DashboardMessages = () => {
  const { userId } = useAuthentication();
  const [conversations, setConversations] = useState<ConversationPreview[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationPreview | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [showMobileConversation, setShowMobileConversation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedRecipientId, setSelectedRecipientId] = useState<number | null>(
    null,
  );

  const { usersMessages, fetchingUsersMessages } =
    useUsersMessagesQuery(selectedRecipientId);
  const { userConversations, fetchingUserConversations } =
    useUserConversationsQuery();
  const { sendMessage, sendingMessage } = useSendMessageMutation();

  useEffect(() => {
    if (userConversations) setConversations(userConversations);
  }, [userConversations]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedRecipientId || !userId) return;
    sendMessage(
      { senderId: userId, recipientId: selectedRecipientId, content: message },
      {
        onSuccess: () => setMessage(""),
      },
    );
  };

  const handleSelectConversation = (conversation: ConversationPreview) => {
    setSelectedRecipientId(conversation.userId);
    setSelectedConversation(conversation);

    if (isMobile) setShowMobileConversation(true);
  };

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const filteredConversations = conversations.filter((c) =>
    c.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (fetchingUserConversations || fetchingUsersMessages) return <Spinner />;

  return (
    <Page>
      <SectionContainer>
        <SectionBanner title="Messages">
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-10 pr-4 rounded-xl bg-black-200 border-2 border-gray-200 text-white focus:border-pink-100 outline-none transition-colors w-[250px]"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 size-5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  <HiOutlineXMark className="size-5" />
                </button>
              )}
            </div>
          </div>
        </SectionBanner>

        <div className="mt-6 flex h-[calc(100vh-220px)] w-full min-h-[500px] overflow-hidden rounded-xl border-2 border-pink-100 bg-black-200 shadow-lg shadow-pink-100/10">
          <div
            className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${isMobile && showMobileConversation ? "hidden" : "flex"}`}
          >
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-white">Conversations</h3>
            </div>

            {filteredConversations.length > 0 ? (
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <motion.div
                    key={conversation.userId}
                    onClick={() => handleSelectConversation(conversation)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-black-100 transition-colors ${selectedConversation?.id === conversation.id ? "bg-black-100" : ""}`}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`data:image/jpeg;base64,${conversation.avatar.imageData}`}
                        alt={conversation.username}
                        className="size-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white truncate">
                          {conversation.username}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="size-16 rounded-full bg-black-100 flex items-center justify-center mb-4">
                  <HiOutlineSearch className="size-8 text-pink-200" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No Conversations Found
                </h3>
                <p className="text-gray-300 text-center">
                  {searchQuery
                    ? `No conversations match "${searchQuery}".`
                    : "You don't have any conversations yet."}
                </p>
              </div>
            )}
          </div>

          <div
            className={`w-full md:w-2/3 flex flex-col ${isMobile && !showMobileConversation ? "hidden" : "flex"}`}
          >
            {selectedConversation ? (
              <>
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isMobile && (
                      <button
                        onClick={() => setShowMobileConversation(false)}
                        className="text-white mr-2"
                      >
                        <HiOutlineArrowSmallLeft className="size-6" />
                      </button>
                    )}
                    <img
                      src={`data:image/jpeg;base64,${selectedConversation.avatar.imageData}`}
                      alt={selectedConversation.username}
                      className="size-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <h4 className="font-bold text-white">
                        {selectedConversation.username}
                      </h4>
                    </div>
                  </div>
                  <button className="text-white hover:text-pink-200 transition-colors">
                    <HiOutlineEllipsisHorizontal className="size-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {sendingMessage ? (
                    <Spinner />
                  ) : (
                    usersMessages?.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl p-3 ${msg.senderId === userId ? "bg-pink-100 text-black-100" : "bg-black-100 text-white"}`}
                        >
                          <p className="text-lg text-white font-medium">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <ChatInput handleSendMessage={handleSendMessage} />
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="size-20 rounded-full bg-black-100 flex items-center justify-center mb-4">
                  <HiOutlinePaperAirplane className="size-10 text-pink-200" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Your Messages
                </h3>
                <p className="text-gray-300 text-center max-w-md mb-6">
                  Select a conversation from the list to start chatting or match
                  with new people to create conversations.
                </p>
              </div>
            )}
          </div>
        </div>
      </SectionContainer>
    </Page>
  );
};

export default DashboardMessages;
