import Script from "next/script";
import "./globals.css";

const vkPixelId =
  process.env.NEXT_PUBLIC_VK_PIXEL_ID ?? process.env.VK_PIXEL_ID ?? "3756921";

export const metadata = {
  metadataBase: new URL("https://v5.gardencompass.co"),
  title: "Цветник без провалов | Telegram-канал про садовые цветы",
  description:
    "Короткие сезонные советы по садовым цветам: что делать сейчас, как ухаживать за клумбой и каких ошибок избегать. Подпишитесь в Telegram.",
  openGraph: {
    title: "Цветник без провалов | Telegram-канал про садовые цветы",
    description:
      "Короткие сезонные советы по садовым цветам: что делать сейчас, как ухаживать за клумбой и каких ошибок избегать.",
    url: "https://v5.gardencompass.co",
    siteName: "Мой цветущий сад",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/avatar.png",
        width: 640,
        height: 640,
        alt: "Мой цветущий сад — Telegram-канал про садовые цветы"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "Цветник без провалов | Telegram-канал про садовые цветы",
    description:
      "Короткие сезонные советы по садовым цветам: что делать сейчас, как ухаживать за клумбой и каких ошибок избегать.",
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
  _tmr.push({id: "${vkPixelId}", type: "pageView", start: (new Date()).getTime(), pid: pid});

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
              src={`https://top-fwz1.mail.ru/counter?id=${vkPixelId};js=na`}
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
