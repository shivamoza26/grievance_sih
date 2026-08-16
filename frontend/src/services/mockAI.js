const classificationRules = [
  {
    keywords: [
      "pothole",
      "road",
      "roads",
      "footpath",
      "pavement",
      "traffic",
      "bridge",
      "road damage",
      "road damaged",
      "street light",
    ],
    topic: "Road Infrastructure",
    category: "Roads",
    department: "Public Works Department",
    priority: "HIGH",
  },

  {
    keywords: [
      "water supply",
      "water",
      "pipeline",
      "tap",
      "leakage",
      "water leakage",
      "drainage",
      "no water",
    ],
    topic: "Water Supply",
    category: "Water Supply",
    department: "Water Department",
    priority: "HIGH",
  },

  {
    keywords: [
      "electricity",
      "electric",
      "power cut",
      "power outage",
      "transformer",
      "street light",
      "electric pole",
    ],
    topic: "Electricity",
    category: "Electricity",
    department: "Electricity Department",
    priority: "HIGH",
  },

  {
    keywords: [
      "scholarship",
      "college",
      "school",
      "education",
      "exam",
      "student",
      "admission",
      "fees",
      "fee",
    ],
    topic: "Education",
    category: "Education",
    department: "Education Department",
    priority: "MEDIUM",
  },

  {
    keywords: [
      "hospital",
      "doctor",
      "medicine",
      "health",
      "clinic",
      "ambulance",
      "medical",
    ],
    topic: "Healthcare",
    category: "Healthcare",
    department: "Health Department",
    priority: "HIGH",
  },

  {
    keywords: [
      "garbage",
      "waste",
      "cleaning",
      "sanitation",
      "toilet",
      "dirty",
      "dustbin",
    ],
    topic: "Sanitation",
    category: "Sanitation",
    department: "Municipal Sanitation Department",
    priority: "MEDIUM",
  },
];

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[.,!?;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export const classifyGrievance = (text = "") => {
  const normalizedText = normalizeText(text);

  if (!normalizedText) {
    return null;
  }

  let bestMatch = null;
  let highestScore = 0;

  classificationRules.forEach((rule) => {
    let score = 0;

    rule.keywords.forEach((keyword) => {
      const normalizedKeyword = normalizeText(keyword);

      /*
       * Match complete words/phrases instead of
       * blindly using includes().
       */
      const pattern = new RegExp(
        `(^|\\s)${normalizedKeyword.replace(
          /[-/\\^$*+?.()|[\]{}]/g,
          "\\$&"
        )}(?=\\s|$)`,
        "i"
      );

      if (pattern.test(normalizedText)) {
        /*
         * More specific phrases receive more weight.
         */
        if (normalizedKeyword.includes(" ")) {
          score += 3;
        } else {
          score += 1;
        }
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = rule;
    }
  });

  if (!bestMatch) {
    return {
      topic: "General Public Service",
      category: "Other",
      department: "General Administration",
      priority: "MEDIUM",
      confidence: 0.68,
    };
  }

  const confidence = Math.min(
    0.96,
    0.72 + highestScore * 0.08
  );

  return {
    ...bestMatch,
    confidence,
  };
};