import { labelsEN, copyEN } from "./en.js";
import { labelsKO, copyKO } from "./ko.js";

const labels = { en: labelsEN, ko: labelsKO };
const copy = { en: copyEN, ko: copyKO };
const brandStoryText = {
  en: {
    collection: "The opening collection · editorial visualization",
    floral: "Fleur de l'Aunay · editorial visualization",
    pink: "L’Amour de Tamara · editorial visualization",
    people: "The people behind the atelier",
    peopleLead: "Two perspectives, one shared eye for exceptional materials and thoughtful making.",
  },
  ko: {
    collection: "오프닝 컬렉션 아홉 작품 · 연출 이미지",
    floral: "Fleur de l'Aunay · 연출 이미지",
    pink: "L’Amour de Tamara · 연출 이미지",
    people: "아뜰리에 타마라 드 로네의 구성원",
    peopleLead: "서로 다른 경험에서 출발해 보석과 제작에 관한 하나의 안목으로 만났습니다.",
  },
};
const heroVisualNote = {
  en: "An editorial visualization of Atelier Tamara de Launay’s nine-piece opening collection. Discover ready-to-wear fine jewelry, or commission a piece of your own.",
  fr: "Une interprétation éditoriale de la première collection de neuf pièces d’Atelier Tamara de Launay. Découvrez la joaillerie fine prêt-à-porter ou imaginez une création sur mesure.",
  ko: "Atelier Tamara de Launay의 오프닝 컬렉션 아홉 작품을 연출한 이미지입니다. 파인 주얼리 컬렉션을 살펴보거나, 나만의 1:1 맞춤제작 주얼리를 만나보세요.",
};
const customEditorialNote = {
  en: "These editorial visualizations illustrate designs available to commission now. The possibilities extend far beyond what you see here—DM us to imagine yours together.",
  fr: "Ces visuels éditoriaux illustrent des créations que vous pouvez commander dès maintenant. Les possibilités vont bien au-delà de ces images : écrivez-nous en message privé.",
  ko: "지금 주문할 수 있는 1:1 맞춤제작 주얼리의 디자인을 연출한 이미지입니다. 여기에 없는 디자인도 가능합니다. 원하시는 주얼리를 인스타그램 DM으로 들려주세요.",
};
const photoLabels = { en: "Editorial visualization", ko: "연출 이미지" };
const editorialNote = {
  en: "Editorial visualization. Final materials and details are confirmed before ordering.",
  ko: "연출 이미지입니다. 실제 제작 소재와 사양은 주문 전 개별적으로 확정합니다.",
};
const sourceLinks = [
  [
    "Rapaport, Diamond Market Cautious at Start of Year, January 2026",
    "https://rapaport.com/news/diamond-market-cautious-at-start-of-year/",
  ],
  [
    "Tiffany & Co., Form 10-K for fiscal year ended January 31, 2020, SEC",
    "https://www.sec.gov/Archives/edgar/data/98246/000009824620000042/tif-2020131x10k.htm",
  ],
  [
    "Reuters, gold share of luxury jewelry sales, October 2025",
    "https://www.reuters.com/business/soaring-gold-prices-bring-new-headache-tiffany-owner-lvmh-2025-10-13/",
  ],
  [
    "Reuters, Dior supplier investigation, June 2024",
    "https://www.reuters.com/business/retail-consumer/italian-court-seeks-tougher-checks-luxury-suppliers-after-worker-exploitation-2024-06-12/",
  ],
  [
    "World Gold Council, 2025 gold price",
    "https://www.gold.org/goldhub/gold-focus/2026/01/india-gold-market-update-enduring-demand-strength",
  ],
  [
    "CHIC, Tiffany & Co. February 2026 price comparison",
    "https://chicpap.com/blog/2026-2%EC%9B%94-%ED%8B%B0%ED%8C%8C%EB%8B%88-%EA%B0%80%EA%B2%A9%EC%9D%B8%EC%83%81-%EC%B4%9D%EC%A0%95%EB%A6%AC",
  ],
];

export {
  labels,
  copy,
  brandStoryText,
  heroVisualNote,
  customEditorialNote,
  photoLabels,
  editorialNote,
  sourceLinks,
};
