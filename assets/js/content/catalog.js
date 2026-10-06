import { products } from "./products.js";

const signatures = {
  "en": {
    "heading": "Explore the opening collection",
    "lead": "Enter the world of Tamara de Launay through nine diamond creations, each an invitation to begin a collection of your own.\n\nMake your chosen design personal with natural or lab-grown diamonds, set in 14k or 18k gold in white, yellow, or rose. For a larger center stone, a change of color, or further bespoke details, we invite you to contact us to explore the possibilities.",
    "inquire": "Enquire on Instagram",
    "concepts": "Explore the rest of the collection"
  },
  "ko": {
    "heading": "오프닝 컬렉션 둘러보기",
    "lead": "아홉 가지 다이아몬드 주얼리와 함께 Tamara de Launay의 세계로 초대합니다. 당신만의 컬렉션을 시작해 보세요.\n\n천연 또는 랩그로운 다이아몬드를 선택하고, 14K 또는 18K의 화이트, 옐로우, 혹은 로즈 골드로 당신의 취향을 담아보세요. 센터 스톤의 사이즈 및 컬러 변경 등 더욱 섬세한 맞춤 제작을 원하신다면 문의해 주세요. 오직 당신을 위한 주얼리를 함께 완성해 드립니다.",
    "inquire": "인스타그램 DM 문의",
    "concepts": "컬렉션의 다른 작품"
  }
};
const catalogLabels = {
  en: {
    starts: "from",
    request: "Price on request",
    gold: "gold",
    diamond: "Diamond weight",
    center: "Center diamond",
    melee: "Mêlée diamonds",
    goldWeight: "Gold weight",
    pieces: "Mêlée diamond count",
    origin: "Choose your diamond origin",
    choose: "Select an option",
    lab: "Lab-grown diamonds",
    natural: "Natural diamonds",
    note: "All carat weights, piece counts, gold weights, and starting prices are approximate. Displayed starting prices follow your selected diamond origin; final prices depend on size and confirmed specifications.",
  },
  fr: {
    starts: "À partir de",
    request: "Prix sur demande",
    gold: "or",
    diamond: "Poids des diamants",
    center: "Diamant central",
    melee: "Diamants de mêlée",
    goldWeight: "Poids de l’or",
    pieces: "Nombre de diamants de mêlée",
    origin: "Choisissez l’origine des diamants",
    choose: "Choisir",
    lab: "Diamants de laboratoire",
    natural: "Diamants naturels",
    note: "Les poids en carats, le nombre de pierres, les poids d’or et les prix de départ sont approximatifs. Le prix final dépend de l’origine des diamants, de la taille et des caractéristiques retenues.",
  },
  ko: {
    starts: "시작가",
    request: "가격 문의",
    gold: "골드",
    diamond: "다이아몬드 총중량",
    center: "중심 다이아몬드",
    melee: "주변 다이아몬드",
    goldWeight: "골드 중량",
    pieces: "주변 다이아몬드 개수",
    origin: "다이아몬드 종류 선택",
    choose: "선택해 주세요",
    lab: "랩그로운 다이아몬드",
    natural: "천연 다이아몬드",
    note: "캐럿 중량과 다이아몬드 개수, 골드 중량, 시작 가격은 모두 대략적인 수치입니다. 표시되는 시작 가격은 선택하신 다이아몬드 종류에 따라 바뀌며, 최종 가격은 크기와 확정된 사양에 따라 달라집니다.",
  },
};
const jewelryOptions = {
  en: {
    origin: "Diamond origin selection",
    colors: "Diamond color",
    metals: "Gold color",
    lab: "Lab-grown",
    natural: "Natural",
    diamond: [
      ["white", "White"],
      ["pink", "Pink"],
      ["yellow", "Yellow"],
      ["blue", "Blue"],
      ["other", "Other"],
    ],
    gold: [
      ["yellow", "Yellow gold"],
      ["white", "White gold"],
      ["rose", "Rose gold"],
    ],
    hint: "Select your preferences. Every combination is subject to stone availability, design feasibility, and an individual quote.",
  },
  ko: {
    origin: "다이아몬드 종류 선택",
    colors: "다이아몬드 색상",
    metals: "골드 색상",
    lab: "랩그로운",
    natural: "천연",
    diamond: [
      ["white", "화이트"],
      ["pink", "핑크"],
      ["yellow", "옐로"],
      ["blue", "블루"],
      ["other", "기타"],
    ],
    gold: [
      ["yellow", "옐로 골드"],
      ["white", "화이트 골드"],
      ["rose", "로즈 골드"],
    ],
    hint: "원하시는 조합을 선택해 주세요. 실제 제작 가능 여부와 최종 가격은 보석 수급, 디자인 검토 후 개별적으로 안내합니다.",
  },
};
const productPageCopy = {
  "en": {
    "back": "Back to the collection",
    "view": "View piece",
    "discuss": "Discuss this piece",
    "details": "The piece",
    "origin": "Select your preferred diamond",
    "note": "Editorial visualization. Specifications and starting prices are approximate; the final proposal depends on the chosen diamonds and details."
  },
  "ko": {
    "back": "컬렉션으로 돌아가기",
    "view": "작품 자세히 보기",
    "discuss": "이 작품 상담하기",
    "details": "작품 정보",
    "origin": "다이아몬드 종류 선택",
    "note": "연출 이미지는 작품의 분위기를 보여줍니다. 사양과 시작 가격은 대략적인 안내이며, 최종 조건은 선택하신 다이아몬드와 사양에 따라 개별적으로 확정됩니다."
  }
};
const ringIds = new Set(products.filter((product) => product.category === "ring").map((product) => product.id));
const ringCopy = {
  en: {
    label: "Ring size · finger circumference",
    guide: "Size chart & how to measure",
    unsure: "I am not sure — please advise",
    note: "Select a finger circumference in millimetres. We will confirm the fit before making your ring.",
    title: "Find your ring size",
    intro:
      "Use the circumference of the finger on which you will wear the ring. The table is a guide; we will confirm sizing with you before production.",
    steps: [
      "Wrap a narrow strip of paper around the base of that finger, comfortably snug and able to pass the knuckle. Mark where the ends meet.",
      "Lay the strip flat and measure to the mark in millimetres. Repeat at the end of the day, when fingers are warmer.",
      "If you have a ring that fits, measure its inside diameter straight across. Compare it with the approximate diameter below.",
    ],
    circ: "Finger circumference",
    diam: "Inside diameter",
    foot: "Approximate measurements. For a wide band or a size between entries, request fitting advice.",
    source: "Ring measurement guidance: GIA and Cartier.",
    close: "Close",
    variant: "Ring size",
  },
  ko: {
    label: "반지 사이즈 · 손가락 둘레",
    guide: "사이즈표와 재는 법",
    unsure: "사이즈를 모르겠어요 · 상담 후 결정",
    note: "착용하실 손가락의 둘레(mm)를 선택해 주세요. 제작 전 사이즈를 다시 확인합니다.",
    title: "반지 사이즈 가이드",
    intro:
      "반지를 착용할 손가락의 둘레를 기준으로 선택해 주세요. 아래 수치는 참고용이며 제작 전 상담을 통해 확인합니다.",
    steps: [
      "얇은 종이 띠를 착용할 손가락 밑부분에 감습니다. 마디를 통과할 수 있을 정도로 편안하게 맞춘 뒤 겹치는 지점을 표시하세요.",
      "종이를 펴서 끝에서 표시한 지점까지의 길이를 밀리미터로 잽니다. 손가락이 따뜻한 저녁에 한 번 더 재보세요.",
      "잘 맞는 반지가 있다면 반지 안쪽의 지름을 가로로 재어 아래 표와 비교할 수도 있습니다.",
    ],
    circ: "손가락 둘레",
    diam: "반지 안지름",
    foot: "표는 대략적인 치수입니다. 폭이 넓은 반지나 중간 사이즈가 필요하다면 상담해 주세요.",
    source: "측정 방법 참고: GIA 및 까르띠에.",
    close: "닫기",
    variant: "반지 사이즈",
  },
};
const picturedColor = Object.fromEntries(products.map((product) => [product.id, product["diamond-color"]]));
const picturedGold = Object.fromEntries(products.map((product) => [product.id, product["gold-color"]]));

export {
  signatures,
  catalogLabels,
  jewelryOptions,
  productPageCopy,
  ringIds,
  ringCopy,
  picturedColor,
  picturedGold,
};
