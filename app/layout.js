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
          id="vk-ads-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function (d, w, id) {
  var storageKey = "vk_tracking_pid";
  var pid = null;

  function createPid() {
    if (w.crypto && typeof w.crypto.randomUUID === "function") {
      return w.crypto.randomUUID();
    }

    return "pid-" + Date.now() + "-" + Math.random().toString(16).slice(2, 10);
  }

  try {
    pid = w.localStorage.getItem(storageKey);
    if (!pid) {
      pid = createPid();
      w.localStorage.setItem(storageKey, pid);
    }
  } catch {
    pid = createPid();
  }

  w.__vkTrackingPid = pid;

  var _tmr = w._tmr || (w._tmr = []);
  _tmr.push({id: "3756886", type: "pageView", start: (new Date()).getTime(), pid: pid});

  if (d.getElementById(id)) return;
  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
  ts.src = "https://top-fwz1.mail.ru/js/code.js";
  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
})(document, window, "tmr-code");`
          }}
        />
        <noscript>
          <div>
            <img
              src="https://top-fwz1.mail.ru/counter?id=3756886;js=na"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
