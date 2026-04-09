import Script from "next/script";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://v4.gardencompass.co"),
  title: "Огород без провалов | Telegram-канал про дачу",
  description:
    "Короткие сезонные советы для дачи и огорода: что делать сейчас, каких ошибок избегать и как не потерять урожай. Подпишитесь в Telegram.",
  openGraph: {
    title: "Огород без провалов | Telegram-канал про дачу",
    description:
      "Короткие сезонные советы для дачи и огорода: что делать сейчас, каких ошибок избегать и как не потерять урожай.",
    url: "https://v4.gardencompass.co",
    siteName: "Моя дача",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/avatar.png",
        width: 640,
        height: 640,
        alt: "Моя дача — Telegram-канал про дачу и огород"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "Огород без провалов | Telegram-канал про дачу",
    description:
      "Короткие сезонные советы для дачи и огорода: что делать сейчас, каких ошибок избегать и как не потерять урожай.",
    images: ["/avatar.png"]
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head />
      <body>
        <Script
          id="tracking-snippet"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?169",t.onload=function(){window.VK&&window.VK.Retargeting&&(window.VK.Retargeting.Init("3751181"),window.VK.Retargeting.Hit())},document.head.appendChild(t)}();`
          }}
        />
        {children}
      </body>
    </html>
  );
}
