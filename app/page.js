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

export default function Page() {
  return (
    <main className="page-shell">
      <section className="hero-section" data-block="hero">
        <div className="hero card">
          <div className="eyebrow-row">
            <div className="eyebrow-group">
              <img className="mini-avatar" src="/avatar.png" alt="" aria-hidden="true" />
              <span className="eyebrow">Мой цветущий сад</span>
            </div>
            <span className="locale-pill">RU</span>
          </div>
          <h1>Хватит собирать советы по кусочкам. Всё для дачного цветника уже в одном канале</h1>
          <p className="hero-lead">Практичные разборы по розам, гортензиям, пионам и петуниям, сезонные работы и понятные решения для обычного сада.</p>
          <p className="hero-copy">597 подписчиков уже читают канал как практичный ориентир по садовым цветам</p>
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
              Перейти в канал
            </TrackedTelegramLink>
          </div>
        </div>
      </section>
      <section className="difference-section" data-block="value_list">
        <div className="value-section card">
          <div className="value-layout">
            <div className="value-copy">
              <h2>Что делает этот канал полезным</h2>
              <p className="value-intro">Один практичный Telegram-канал про садовые цветы вместо разрозненных советов из интернета.</p>
              <ul className="bullet-list">
                <li>
                  <span className="bullet-emoji" aria-hidden="true">
                    🌿
                  </span>
                  <span>Уход за розами, гортензиями, пионами и петуниями без лишней теории</span>
                </li>
                <li>
                  <span className="bullet-emoji" aria-hidden="true">
                    ✅
                  </span>
                  <span>Подбор грунта, удобрений и сезонных работ под реальный дачный участок</span>
                </li>
                <li>
                  <span className="bullet-emoji" aria-hidden="true">
                    🪴
                  </span>
                  <span>Фото-идеи и понятные подсказки, которые помогают держать цветник в порядке</span>
                </li>
              </ul>
            </div>
            <aside className="value-visual">
              <img className="value-avatar" src="/avatar.png" alt="Аватар Telegram-канала Мой цветущий сад" />
              <div className="value-visual-copy">
                <strong>Мой цветущий сад в Telegram</strong>
                <p>Практичный Telegram-канал про садовые цветы: уход, грунт, обрезка, сезонные работы и идеи для дачного цветника.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className="closing-cta-section" data-block="closing_cta">
        <div className="closing-cta card">
          <div className="closing-header">
            <img className="mini-avatar" src="/avatar.png" alt="" aria-hidden="true" />
            <h2>Один Telegram-источник вместо информационного шума</h2>
          </div>
          <p>597 подписчиков уже читают канал как практичный ориентир по садовым цветам. Контент строится вокруг реальных сезонных задач: посев, грунт, свет, уход и порядок в цветнике. Открой канал и сохрани себе понятный источник идей, сезонных подсказок и решений для дачного сада.</p>
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
              Подписаться в Telegram
            </TrackedTelegramLink>
          </div>
        </div>
      </section>
    </main>
  );
}
