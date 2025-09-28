 import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import toast from "react-hot-toast";

const Sidebar = ({ isMenueOpen, setIsMenueOpen }) => {
  const {
    chats = [],
    setSelectedChats,
    theme,
    setTheme,
    user,
    navigate,
    createNewChat,
    axios,
     fetchUserChats,
    setToken,
    token,
      setChats,   
  } = useAppContext();

  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out successfully");
  };

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this chat?"
      );
      if (!confirmDelete) return;

      const { data } = await axios.post(
        "/api/v1/chats/delete-chat",
        { chatId },
        { headers: { Authorization: token } }
      );

      if (data.success) {
        setChats((prev) => prev.filter((chat) => chat._id !== chatId));

        setSelectedChats((prev) =>
          prev?._id === chatId ? chats[0] || null : prev
        );

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className={`relative flex flex-col h-screen min-w-72 p-5
      dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30
      border-r border-[#80609F]/30 backdrop-blur-3xl
      transition-all duration-500 max-md:absolute left-0 z-10 ${
        !isMenueOpen && "max-md:-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={theme === "dark" ? assets.logo_full_dark : assets.logo_full_dark}
          alt="Logo"
          className="w-12"
        />
        <span className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
          MyGPT
        </span>
      </div>

      {/* New Chat Button */}
      <button
        onClick={createNewChat}
        className="flex justify-center items-center w-full py-2 mt-10 text-white text-sm rounded-md cursor-pointer bg-gradient-to-r from-sky-400 to-purple-500"
      >
        <span className="mr-2 text-xl">+</span>New Chat
      </button>

      {/* Search Conversations */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
        <img src={assets.search_icon} className="w-6 not-dark:invert" alt="" />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversations"
          className="text-xs placeholder:text-gray-400 outline-none w-full"
        />
      </div>

      {/* Recent Chats */}
      {chats?.length > 0 && <p className="mt-4 text-sm">Recent Chats</p>}
      <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
        {(chats || [])
          .filter((chat) =>
            chat.messages?.[0]?.content
              ? chat.messages[0].content.toLowerCase().includes(search.toLowerCase())
              : chat.chatName?.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              onClick={() => {
                navigate("/");
                setSelectedChats(chat);
                setIsMenueOpen(false);
              }}
              key={chat._id}
              className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between items-center group"
            >
              <div className="flex-1">
                <p className="truncate w-full">
                  {chat.messages?.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.chatName}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>

              {/* Bin Icon */}
              <img
                onClick={(e) =>
                  toast.promise(deleteChat(e, chat._id), {
                    loading: "Deleting...",
                  })
                }
                src={assets.bin_icon}
                className="hidden group-hover:block w-5 h-5 cursor-pointer ml-2"
                style={{
                  backgroundColor: "#e5e5e5",
                  borderRadius: "9999px",
                  padding: "2px",
                }}
                alt="Delete"
              />
            </div>
          ))}
      </div>

      {/* Community Images */}
      <div
        onClick={() => {
          navigate("/community");
          setIsMenueOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all"
      >
        <img src={assets.gallery_icon} className="w-4.5 not-dark:invert" alt="Gallery" />
        <div className="flex flex-col text-sm">
          <p>Community Images</p>
        </div>
      </div>

      {/* Credit Purchase Options */}
      <div
        onClick={() => {
          navigate("/credits");
          setIsMenueOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all"
      >
        <img src={assets.diamond_icon} className="w-4.5 dark:invert" alt="Crown" />
        <div className="flex flex-col text-sm">
          <p>Credits: {user?.credits}</p>
          <p className="text-xs text-grey-400">Purchase credits to use MyGPT</p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md">
        <div className="flex items-center gap-2 text-sm">
          <img src={assets.theme_icon} className="w-4 dark:invert" alt="Theme" />
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>

      {/* User Account */}
      <div className="flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
        <img src={assets.user_icon} className="w-7 rounded-full" alt="user" />
        <p className="flex-1 text-sm dark:text-primary truncate">
          {user ? user.name : "Login your account "}
        </p>
        {user && (
          <img
            onClick={logout}
            src={assets.logout_icon}
            className="h-5 cursor-pointer hidden not-dark:invert group-hover:block"
          />
        )}
      </div>

      <img
        onClick={() => setIsMenueOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
        alt="Close"
      />
    </div>
  );
};

export default Sidebar;
