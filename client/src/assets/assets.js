import logo_full from "./logo_full.png";
import logo_full_dark from "./logo_full_dark.png";
import search_icon from "./search_icon.png";
import bin_icon from "./bin_icon.png";
import gallery_icon from "./gallery_icon.png";
import diamond_icon from "./diamond_icon.png";
import theme_icon from "./theme_icon.png";
import user_icon from "./user_icon.png";
import logout_icon from "./logout_icon.png";
import close_icon from "./close_icon.png";
import menue_icon from "./menue_icon.png";
import stop_icon from "./stop_icon.png"
import send_icon from "./send_icon.png"

export const dummyUserData = {
  _id: "68cfe940c7e2f3ac1bb54269",
  name: "Santu Pramanik",
  email: "copy@gmail.com",
  password: "$2b$10$37pnKp4AixjTJ22C6TlBZeUlmX0j3AjKD0Gbdljjm6zWmR2DVxoCy",
  credits: 200,
};
export const dummyChats = [
  {
    _id: "68d02170dc5281acfb78ede5",
    userId: "68cfe940c7e2f3ac1bb54269",
    userName: "Santu Pramanik",
    chatName: "New Chat",
    messages: [
      {
        _id: "68d11516e244bab6eb150469",
        role: "user",
        content: "how AI works",
        isImage: false,
        isPublished: false,
        timestamp: "2025-09-26T09:00:00Z",
      },
      {
        _id: "68d11524e244bab6eb15046c",
        role: "assistant",
        content: `\`\`\`javascript
const x = 10;
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};
greet('Santu');
\`\`\``,
          
        isImage: false,
        isPublished: false,
        timestamp: "2025-09-26T09:01:00Z",
      },
      {
        _id: "68d2a541736e6eadf2c9397c",
        role: "user",
        content: "A boy playing football",
        isImage: false,
        isPublished: false,
        timestamp: "2025-09-26T09:05:00Z",
      },
      {
        _id: "68d2a577736e6eadf2c9397d",
        role: "assistant",
        content:
          "https://ik.imagekit.io/lyzocgiwf/mygpt/1758635379914_p3flgJX6s.png",
        isImage: true,
        isPublished: true,
        timestamp: "2025-09-26T09:06:00Z",
      },
      {
        _id: "68d2a66fcef5e1b914c71f39",
        role: "user",
        content: "A boy playing football",
        isImage: false,
        isPublished: false,
        timestamp: "2025-09-26T09:10:00Z",
      },
      {
        _id: "68d2a68dcef5e1b914c71f3a",
        role: "assistant",
        content:
          "https://ik.imagekit.io/lyzocgiwf/mygpt/1758635657863_tbqMXMg_S.png",
        isImage: true,
        isPublished: true,
        timestamp: "2025-09-26T09:11:00Z",
      },
      {
        _id: "68d2a707cef5e1b914c71f45",
        role: "user",
        content:
          "Tanjiro kamado playing cricket with nezuko and zenitsu in demon slayer infinity castle",
        isImage: false,
        isPublished: false,
        timestamp: "2025-09-26T09:15:00Z",
      },
      {
        _id: "68d2a734cef5e1b914c71f46",
        role: "assistant",
        content:
          "https://ik.imagekit.io/lyzocgiwf/mygpt/1758635825216_-kqUfZim2.png",
        isImage: true,
        isPublished: true,
        timestamp: "2025-09-26T09:16:00Z",
      },
      {
        _id: "68d2a787cef5e1b914c71f53",
        role: "user",
        content:
          "Tanjiro kamado playing cricket with nezuko and zenitsu and virat kohli, rohit sharma and ms dhoni in demon slayer infinity castle",
        isImage: false,
        isPublished: false,
        timestamp: "2025-09-26T09:20:00Z",
      },
      {
        _id: "68d2a7bdcef5e1b914c71f54",
        role: "assistant",
        content:
          "https://ik.imagekit.io/lyzocgiwf/mygpt/1758635961634_gSTmWOvTOD.png",
        isImage: true,
        isPublished: true,
        timestamp: "2025-09-26T09:21:00Z",
      },
    ],
    createdAt: "2025-09-26T09:00:00Z",
    updatedAt: "2025-09-26T09:21:00Z",
  },
];

export const assets = {
  logo_full,
  logo_full_dark,
  search_icon,
  bin_icon,
  gallery_icon,
  diamond_icon,
  theme_icon,
  user_icon,
  logout_icon,
  close_icon,
  menue_icon,
  stop_icon,
  send_icon,
};



export const dummyPublishedImages = [
  {
    imageUrl: "https://picsum.photos/400/300?random=1",
    userName: "Alice Johnson"
  },
  {
    imageUrl: "https://picsum.photos/400/300?random=2",
    userName: "Bob Smith"
  },
  {
    imageUrl: "https://picsum.photos/400/300?random=3",
    userName: "Charlie Brown"
  },
  {
    imageUrl: "https://picsum.photos/400/300?random=4",
    userName: "Diana Prince"
  },
  {
    imageUrl: "https://picsum.photos/400/300?random=5",
    userName: "Ethan Clark"
  },
  {
    imageUrl: "https://picsum.photos/400/300?random=6",
    userName: "Fiona Davis"
  },
  {
    imageUrl: "https://picsum.photos/400/300?random=7",
    userName: "George Miller"
  },
  {
    imageUrl: "https://picsum.photos/400/300?random=8",
    userName: "Hannah Lee"
  }
];


export const dummyPlans = [
  {
    _id: "basic",
    name: "Basic",
    price: 10,
    credits: 100,
    features: [
      "100 text generations",
      "50 image generations",
      "Standard support",
      "Access to basic model",
    ],
  },
  {
    _id: "pro",
    name: "Pro",
    price: 20,
    credits: 500,
    features: [
      "500 text generations",
      "200 image generations",
      "Priority support",
      "Access to pro models",
      "Faster response time",
    ],
  },
  {
    _id: "premium",
    name: "Premium",
    price: 30,
    credits: 1000,
    features: [
      "1000 text generations",
      "500 image generations",
      "24/7 VIP support",
      "Access premium models",
      "Dedicated account manager",
    ],
  },
];
