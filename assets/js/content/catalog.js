const signatures = {
  en: {
    heading: "Explore the opening collection",
    lead: "Nine diamond pieces, presented in warm and cool tones. The Ligne de Lumière tennis bracelet and both Céleste de l'Aunay rings are 14K gold; the remaining six pieces are 18K gold. Choose natural or lab-grown diamonds for any design. For availability or a private commission, DM us anytime.",
    groups: ["Warm tones", "Cool tones"],
    inquire: "Enquire on Instagram",
    concepts: "Explore the rest of the collection",
    items: [
      [
        "Fleur de l'Aunay — Pendant",
        "18K yellow-gold floral diamond necklace",
        "Pear-shaped diamonds form a flower pendant on a delicate gold chain.",
      ],
      [
        "Fleur de l'Aunay — Ring",
        "18K yellow-gold floral diamond ring",
        "A sculptural flower of pear-shaped diamonds, paired with the pendant.",
      ],
      [
        "Éternelle de l'Aunay",
        "18K yellow-gold diamond eternity ring",
        "A continuous circle of diamonds, made to be worn every day.",
      ],
      [
        "L’Amour de Tamara — Pear",
        "18K gold pink pear diamond ring",
        "A pear-shaped pink diamond framed by a sweep of white diamonds.",
      ],
      [
        "L’Amour de Tamara — Radiant",
        "18K gold pink radiant diamond ring",
        "A pink radiant-cut diamond, flanked by white diamonds.",
      ],
      [
        "Ligne de Lumière",
        "14K white-gold diamond tennis bracelet",
        "A clean line of white diamonds with a cool, even brilliance.",
      ],
    ],
  },
  ko: {
    heading: "오프닝 컬렉션 둘러보기",
    lead: "다이아몬드 주얼리 아홉 점을 웜톤과 쿨톤으로 선보입니다. Ligne de Lumière 테니스 브레이슬릿과 Céleste de l'Aunay 링 두 점은 14K 골드, 나머지 여섯 점은 18K 골드입니다. 모든 디자인에 천연 혹은 랩그로운 다이아몬드를 선택하실 수 있습니다. 주문 가능 여부와 1:1 맞춤제작 상담은 언제든 인스타그램 DM으로 문의해 주세요.",
    groups: ["웜톤", "쿨톤"],
    inquire: "인스타그램 DM 문의",
    concepts: "컬렉션의 다른 작품",
    items: [
      [
        "Fleur de l'Aunay — 목걸이",
        "18K 옐로 골드 플라워 다이아몬드 목걸이",
        "물방울 모양의 다이아몬드가 꽃을 이루는 펜던트 목걸이.",
      ],
      [
        "Fleur de l'Aunay — 반지",
        "18K 옐로 골드 플라워 다이아몬드 링",
        "목걸이와 한 세트를 이루는 플라워 링.",
      ],
      [
        "Éternelle de l'Aunay",
        "18K 옐로 골드 다이아몬드 이터니티 링",
        "다이아몬드가 끊임없이 이어지는 이터니티 링.",
      ],
      [
        "L’Amour de Tamara — 페어",
        "18K 골드 핑크 페어 다이아몬드 링",
        "핑크빛 물방울 모양 다이아몬드를 화이트 다이아몬드가 감싸는 링.",
      ],
      [
        "L’Amour de Tamara — 래디언트",
        "18K 골드 핑크 래디언트 다이아몬드 링",
        "핑크빛 래디언트 컷 다이아몬드와 화이트 다이아몬드가 어우러진 링.",
      ],
      [
        "Ligne de Lumière",
        "14K 화이트 골드 다이아몬드 테니스 브레이슬릿",
        "화이트 다이아몬드가 가지런히 이어지는 테니스 브레이슬릿.",
      ],
    ],
  },
};
const catalogSpecs = {
  signature: [
    { price: 3200, gold: "18K", total: "2.49 ct", goldWeight: "3.7 g" },
    { price: 3300, gold: "18K", total: "2.72 ct", goldWeight: "3.85 g" },
    { price: 2500, gold: "18K", total: "2.8 ct", pieces: 26, goldWeight: "2.55 g" },
    { price: 5400, gold: "18K", center: "2.44 ct", melee: "2.43 ct", goldWeight: "4.56 g" },
    { price: 4600, gold: "18K", center: "3.02 ct", melee: "0.79 ct", goldWeight: "3.04 g" },
    { price: 3900, gold: "14K", total: "7.1 ct", goldWeight: "8 g" },
  ],
  concept: [
    { price: 3900, gold: "18K", total: "5.49 ct", goldWeight: "5.16 g" },
    { price: 7600, gold: "14K" },
    { price: 3800, gold: "14K" },
  ],
};
const catalogLabels = {
  en: {
    starts: "From",
    request: "Price on request",
    gold: "gold",
    diamond: "Diamond weight",
    center: "Center diamond",
    melee: "Mêlée diamonds",
    goldWeight: "Gold weight",
    pieces: "Diamonds",
    origin: "Choose your diamond origin",
    choose: "Select an option",
    lab: "Lab-grown diamonds",
    natural: "Natural diamonds",
    note: "All carat weights, piece counts, gold weights, and starting prices are approximate. Starting prices vary with diamond origin, size, and final specifications; your selection does not change the displayed minimum price.",
  },
  fr: {
    starts: "À partir de",
    request: "Prix sur demande",
    gold: "or",
    diamond: "Poids des diamants",
    center: "Diamant central",
    melee: "Diamants de mêlée",
    goldWeight: "Poids de l’or",
    pieces: "Diamants",
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
    pieces: "다이아몬드 개수",
    origin: "다이아몬드 종류 선택",
    choose: "선택해 주세요",
    lab: "랩그로운 다이아몬드",
    natural: "천연 다이아몬드",
    note: "캐럿 중량과 다이아몬드 개수, 골드 중량, 시작 가격은 모두 대략적인 수치입니다. 최종 가격은 다이아몬드의 종류와 크기, 확정된 사양에 따라 달라집니다.",
  },
};
const jewelryOptions = {
  en: {
    origin: "Diamond origin",
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
    origin: "다이아몬드 종류",
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
const editorialPhotos = [1, 7, 4, 8, 9, 3].map(
  (i) => `assets/images/collection/collection-${i}-editorial.webp`,
);
const collectionIndex = { signature: [1, 7, 4, 8, 9, 3], more: [2, 5, 6] };
const toneGroups = { warm: [1, 7, 4, 2, 5], cool: [8, 9, 3, 6] };
const productPageCopy = {
  en: {
    back: "Back to the collection",
    view: "View piece",
    discuss: "Discuss this piece",
    details: "The piece",
    origin: "Select your preferred diamond",
    note: "Editorial visualization. Specifications and starting prices are approximate; the final proposal depends on the chosen diamonds and details.",
    moreDescriptions: [
      "A flowing sequence of pear-shaped diamonds in yellow gold.",
      "A radiant-cut center framed by a halo of diamonds.",
      "A round center framed by a halo of diamonds.",
    ],
  },
  ko: {
    back: "컬렉션으로 돌아가기",
    view: "작품 자세히 보기",
    discuss: "이 작품 상담하기",
    details: "작품 정보",
    origin: "다이아몬드 종류 선택",
    note: "연출 이미지는 작품의 분위기를 보여줍니다. 사양과 시작 가격은 대략적인 안내이며, 최종 조건은 선택하신 다이아몬드와 사양에 따라 개별적으로 확정됩니다.",
    moreDescriptions: [
      "물방울 모양 다이아몬드가 옐로 골드를 따라 흐르듯 이어지는 브레이슬릿.",
      "래디언트 컷 중심석을 다이아몬드 헤일로가 감싸는 링.",
      "라운드 중심석을 다이아몬드 헤일로가 감싸는 링.",
    ],
  },
};
const ringIds = new Set([4, 5, 6, 7, 8, 9]);
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
const picturedColor = {
  1: "white",
  2: "white",
  3: "white",
  4: "white",
  5: "white",
  6: "white",
  7: "white",
  8: "pink",
  9: "pink",
};
const picturedGold = {
  1: "yellow",
  2: "yellow",
  3: "white",
  4: "yellow",
  5: "yellow",
  6: "white",
  7: "yellow",
  8: "pictured",
  9: "pictured",
};

export {
  signatures,
  catalogSpecs,
  catalogLabels,
  jewelryOptions,
  editorialPhotos,
  collectionIndex,
  toneGroups,
  productPageCopy,
  ringIds,
  ringCopy,
  picturedColor,
  picturedGold,
};
