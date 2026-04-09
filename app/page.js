import TrackedTelegramLink from "./TrackedTelegramLink";
import { loadLandingRuntimeConfig } from "../lib/landing-runtime-config.js";

const {
  trafficLandingBaseUrl,
  landingSlug,
  landingVariant,
  channelId,
  provider,
  campaignId,
  adId,
  adsetId,
  providerClickToken,
  utmSource,
  utmCampaign,
  utmContent
} = loadLandingRuntimeConfig();

const subscriberCount = 694;
const valueItems = [
  {
    emoji: "🚫",
    text: "Без путаницы между югом и умеренным климатом — советы применимы для обычного дачного цветника"
  },
  {
    emoji: "✅",
    text: "Практика важнее красивых подборок — только то, что реально работает в саду"
  },
  {
    emoji: "📅",
    text: "Сезонные подсказки по розам, гортензиям, пионам, петуниям и другим садовым цветам"
  },
  {
    emoji: "🌿",
    text: `${subscriberCount} садоводов уже читают канал как главный ориентир по цветнику`
  }
];

export default function Page() {
  return (
    <main className="page-shell">
      <section className="hero-section" data-block="hero">
        <div className="hero card">
          <div className="eyebrow-row">
            <div className="eyebrow-group">
              <img className="mini-avatar" src="/avatar.png" alt="" aria-hidden="true" />
              <span className="eyebrow">🌷 Мой цветущий сад</span>
            </div>
            <span className="locale-pill">RU</span>
          </div>
          <h1>Хватит искать советы по цветнику в десяти местах сразу</h1>
          <p className="hero-lead">Мой цветущий сад — один канал про садовые цветы. Без противоречий, без воды, без случайных советов из ленты.</p>
          <p className="hero-copy">
            {subscriberCount} садоводов из России, Украины, Беларуси и Казахстана читают его как главный ориентир по
            цветнику. Что делать с клумбой и декоративными посадками в текущий сезон, что не трогать, чем не
            перекормить растения и как получить сад без хаоса — коротко, по делу и без лишнего шума.
          </p>
          <div className="cta-wrap">
            <TrackedTelegramLink
              className="primary-cta"
              trafficLandingBaseUrl={trafficLandingBaseUrl}
              landingSlug={landingSlug}
              landingVariant={landingVariant}
              channelId={channelId}
              provider={provider}
              campaignId={campaignId}
              adId={adId}
              adsetId={adsetId}
              providerClickToken={providerClickToken}
              utmSource={utmSource}
              utmCampaign={utmCampaign}
              utmContent={utmContent}
            >
              Подписаться в Telegram →
            </TrackedTelegramLink>
          </div>
        </div>
      </section>
      <section className="difference-section" data-block="value_list">
        <div className="value-section card">
          <div className="value-layout">
            <div className="value-copy">
              <h2>Что делает этот канал другим</h2>
              <ul className="bullet-list">
                {valueItems.map((item) => (
                  <li key={item.text}>
                    <span className="bullet-emoji" aria-hidden="true">
                      {item.emoji}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="value-visual">
              <img className="value-avatar" src="/avatar.png" alt="Аватар Telegram-канала Мой цветущий сад" />
              <div className="value-visual-copy">
                <strong>🌷 Мой цветущий сад в Telegram</strong>
                <p>Сезонные разборы по цветнику, уходу за садовыми цветами и понятные схемы без лишней теории.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className="closing-cta-section" data-block="closing_cta">
        <div className="closing-cta card">
          <div className="closing-header">
            <img className="mini-avatar" src="/avatar.png" alt="" aria-hidden="true" />
            <h2>Один источник вместо бесконечных противоречивых советов</h2>
          </div>
          <p>
            Подходит для обычного садовода, который хочет красивый участок без постоянных ошибок с цветами.
            Без профессионального жаргона — понятно человеку, который просто любит свой сад.
          </p>
          <div className="cta-wrap">
            <TrackedTelegramLink
              className="primary-cta"
              trafficLandingBaseUrl={trafficLandingBaseUrl}
              landingSlug={landingSlug}
              landingVariant={landingVariant}
              channelId={channelId}
              provider={provider}
              campaignId={campaignId}
              adId={adId}
              adsetId={adsetId}
              providerClickToken={providerClickToken}
              utmSource={utmSource}
              utmCampaign={utmCampaign}
              utmContent={utmContent}
            >
              Подписаться в Telegram →
            </TrackedTelegramLink>
          </div>
        </div>
      </section>
    </main>
  );
}
