import { labelsEN, copyEN } from "./en.js";
import { labelsKO, copyKO } from "./ko.js";

const labels = { en: labelsEN, ko: labelsKO };
const copy = { en: copyEN, ko: copyKO };
const photoLabels = { en: "Editorial visualization", ko: "연출 이미지" };
const editorialNote = {
  en: "Editorial visualization. Final materials and details are confirmed before ordering.",
  ko: "연출 이미지입니다. 실제 제작 소재와 사양은 주문 전 개별적으로 확정합니다.",
};

export { labels, copy, photoLabels, editorialNote };
