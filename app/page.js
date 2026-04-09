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

const subscriberCount = 895;
const valueItems = [
  {
    emoji: "🚫",
    text: "Без советов «по-московски» — работает для любого умеренного климата"
  },
  {
    emoji: "✅",
    text: "Проверено на практике, а не красиво выглядит на картинке"
  },
  {
    emoji: "📅",
    text: "Сезонные подсказки и практичные разборы выходят по мере реальных задач на участке"
  },
  {
    emoji: "🌿",
    text: `${subscriberCount} дачников уже выбрали канал как основной источник`
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
              <span className="eyebrow">🍓 Моя дача</span>
            </div>
            <span className="locale-pill">RU</span>
          </div>
          <h1>Хватит гуглить и получать разные ответы</h1>
          <p className="hero-lead">Моя дача — один канал для дачи. Без противоречий, без регионального уклона, без воды.</p>
          <p className="hero-copy">
            {subscriberCount} дачников из России, Украины, Беларуси и Казахстана читают его как главный ориентир по
            огороду. Что делать на участке в ваши сроки, что пропускать, на что не тратить время и деньги —
            коротко, по делу и без лишнего шума.
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
              <img className="value-avatar" src="/avatar.png" alt="Аватар Telegram-канала Моя дача" />
              <div className="value-visual-copy">
                <strong>🍓 Моя дача в Telegram</strong>
                <p>Сезонные разборы, схемы посадки и практичные подсказки для обычной дачи.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className="closing-cta-section" data-block="closing_cta">
        <div className="closing-cta card">
          <div className="closing-header">
            <img className="mini-avatar" src="/avatar.png" alt="" aria-hidden="true" />
            <h2>Один источник вместо бесконечного гугления</h2>
          </div>
          <p>
            Подходит для дачников от южных регионов до севера умеренного климата. Без агрономического жаргона —
            понятно для обычного человека, не специалиста.
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
