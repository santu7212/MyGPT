 import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUserData, dummyChats } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteChat } from "../../../server/src/controllers/chat.controller";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChats, setSelectedChats] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch logged-in user data
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/data", {
        headers: { Authorization: token },
      });
      if (data.success) {
        setUser(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingUser(false);
    }
  };

  // Create a new chat
  const createNewChat = async () => {
    try {
      if (!user) return toast("Please Login to create a new chat");
      navigate("/");

      const { data } = await axios.post(
        "/api/v1/chats/chat",
        {},
        { headers: { Authorization: token } }
      );

      if (data.success && data.data) {
        setChats((prev) => [data.data, ...prev]);
        setSelectedChats(data.data);
      } else {
        toast.error("Failed to create new chat");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch user chats
  const fetchUserChats = async () => {
    try {
      const { data } = await axios.get("/api/v1/chats/get", {
        headers: { Authorization: token },
      });

      if (data.success) {
        const chatsData = Array.isArray(data.data) ? data.data : [];
        setChats(chatsData);

        if (chatsData.length > 0) {
          setSelectedChats(chatsData[0]);
        }

        return chatsData; // Return for later check
      } else {
        toast.error(data.message);
        return [];
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return [];
    }
  };

  // Handle theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Initialize chats on login
  useEffect(() => {
    const initChats = async () => {
      if (user) {
        const userChats = await fetchUserChats();

        // Create a chat only if user has no chats
        if (userChats.length === 0) {
          await createNewChat();
        }
      } else {
        setChats([]);
        setSelectedChats(null);
      }
    };

    initChats();
  }, [user, token]);

  // Fetch user on token change
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  }, [token]);

  const value = {
    navigate,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChats,
    setSelectedChats,
    theme,
    setTheme,
    createNewChat,
    loadingUser,
    fetchUserChats,
    token,
    setToken,
    axios,
    deleteChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
