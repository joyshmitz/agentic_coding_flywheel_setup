/**
 * VPS Provider Data - Ukrainian
 *
 * Ukrainian translations for VPS provider descriptions.
 * Prices and specs remain from the original file.
 *
 * @see vpsProviders.ts for structure
 */

import type { VPSProvider } from "./vpsProviders";

export const VPS_PROVIDERS_UK: VPSProvider[] = [
  {
    id: "contabo",
    name: "Contabo",
    tagline: "Найкраще співвідношення характеристик до ціни",
    url: "https://contabo.com/en-us/vps/",
    recommended: {
      name: "Cloud VPS 50",
      ramGB: 64,
      vCPU: 16,
      storageGB: 400,
      priceUSD: 56,
    },
    budget: {
      name: "Cloud VPS 40",
      ramGB: 48,
      vCPU: 12,
      storageGB: 300,
      priceUSD: 36,
    },
    activationTime: "Хвилини (до ~1 год)",
    bestFor: "Найкраще співвідношення ціни та якості",
    regions: "US, EU, Asia, AU",
    isTopPick: true,
    note: "Ціна US датацентру включає ~$10/міс надбавку",
  },
  {
    id: "ovh",
    name: "OVH",
    tagline: "Зручний інтерфейс, швидка активація",
    url: "https://us.ovhcloud.com/vps/",
    recommended: {
      name: "VPS-5",
      ramGB: 64,
      vCPU: 16,
      storageGB: 640,
      priceUSD: 40,
    },
    budget: {
      name: "VPS-4",
      ramGB: 48,
      vCPU: 12,
      storageGB: 480,
      priceUSD: 26,
    },
    activationTime: "Хвилини",
    bestFor: "Найнижча ціна за 64GB",
    regions: "US, EU, CA, Asia",
  },
];

/** Date the pricing data was last verified */
export const PRICING_LAST_UPDATED_UK = "2026-01";
