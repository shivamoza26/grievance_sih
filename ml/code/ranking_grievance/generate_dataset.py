import csv
import random
import os

OUTPUT = "data/raw/grievances.csv"

random.seed(42)


DATA = {

    "LOW": {
        "english": [
            "park bench needs painting",
            "one dustbin is damaged",
            "park gate needs minor repair",
            "street sign is faded",
            "footpath has a small crack",
            "park wall needs painting",
            "public bench is old",
            "name board is damaged",
            "park railing needs repair",
        ],

        "hindi": [
            "पार्क की बेंच पर पेंट करने की जरूरत है",
            "एक कूड़ेदान खराब है",
            "पार्क के गेट की छोटी मरम्मत करनी है",
            "सड़क का साइन बोर्ड धुंधला है",
            "फुटपाथ में छोटी दरार है",
            "पार्क की दीवार पर पेंट करने की जरूरत है",
            "सार्वजनिक बेंच पुरानी है",
            "नाम का बोर्ड खराब है",
            "पार्क की रेलिंग की मरम्मत करनी है",
        ],

        "hinglish": [
            "park ki bench ko paint karna hai",
            "ek dustbin kharab hai",
            "park gate ki minor repair chahiye",
            "street sign faded ho gaya hai",
            "footpath mein chhota crack hai",
            "park ki wall ko paint karna hai",
            "public bench purani hai",
            "name board kharab hai",
            "park railing ki repair chahiye",
        ]
    },


    "MEDIUM": {
        "english": [
            "street light near my house is not working",
            "toilet door is broken",
            "garbage collection is irregular",
            "water supply is irregular",
            "drain is partially blocked",
            "road has several small cracks",
            "scholarship application status is not updated",
            "public toilet needs repair",
            "park lights are not working properly",
            "garbage bin is overflowing occasionally",
            "street light is flickering",
            "drainage needs cleaning",
        ],

        "hindi": [
            "मेरे घर के पास स्ट्रीट लाइट काम नहीं कर रही है",
            "टॉयलेट का दरवाजा टूटा हुआ है",
            "कूड़ा उठाने की व्यवस्था नियमित नहीं है",
            "पानी की सप्लाई नियमित नहीं है",
            "नाली आंशिक रूप से बंद है",
            "सड़क पर कई छोटी दरारें हैं",
            "स्कॉलरशिप आवेदन की स्थिति अपडेट नहीं हुई है",
            "सार्वजनिक टॉयलेट की मरम्मत करनी है",
            "पार्क की लाइट ठीक से काम नहीं कर रही है",
            "कूड़ेदान कभी-कभी भर जाता है",
            "स्ट्रीट लाइट बार-बार झपक रही है",
            "नाली की सफाई की जरूरत है",
        ],

        "hinglish": [
            "mere ghar ke paas street light kaam nahi kar rahi hai",
            "toilet ka door toot gaya hai",
            "garbage collection regular nahi hai",
            "water supply regular nahi hai",
            "drain partially blocked hai",
            "road par kai small cracks hain",
            "scholarship application ka status update nahi hua",
            "public toilet ki repair chahiye",
            "park lights properly kaam nahi kar rahi hain",
            "garbage bin kabhi kabhi overflow ho jata hai",
            "street light flicker kar rahi hai",
            "drainage ki cleaning chahiye",
        ]
    },


    "HIGH": {
        "english": [
            "many potholes are present on the main road",
            "public washroom is very dirty",
            "no street light is working in our area",
            "scholarship has not been released",
            "garbage has not been collected for many days",
            "there is no water supply in our locality",
            "road is completely damaged",
            "toilet is dirty and unusable",
            "large potholes are causing problems for vehicles",
            "sewage is overflowing near houses",
            "public toilet has been unusable for several days",
            "garbage is piling up near residential buildings",
            "no drinking water is available in the area",
            "main road is badly damaged",
        ],

        "hindi": [
            "मुख्य सड़क पर बहुत सारे गड्ढे हैं",
            "सार्वजनिक शौचालय बहुत गंदा है",
            "हमारे इलाके में कोई भी स्ट्रीट लाइट काम नहीं कर रही है",
            "स्कॉलरशिप जारी नहीं हुई है",
            "कई दिनों से कूड़ा नहीं उठाया गया है",
            "हमारे इलाके में पानी की सप्लाई नहीं है",
            "सड़क पूरी तरह खराब हो गई है",
            "टॉयलेट गंदा है और इस्तेमाल करने लायक नहीं है",
            "बड़े गड्ढों के कारण वाहनों को परेशानी हो रही है",
            "घरों के पास सीवेज का पानी बह रहा है",
            "सार्वजनिक टॉयलेट कई दिनों से इस्तेमाल नहीं हो रहा है",
            "रिहायशी इमारतों के पास कूड़ा जमा हो रहा है",
            "इलाके में पीने का पानी उपलब्ध नहीं है",
            "मुख्य सड़क बहुत खराब हो गई है",
        ],

        "hinglish": [
            "main road par bahut saare potholes hain",
            "public washroom bahut dirty hai",
            "hamare area mein koi street light kaam nahi kar rahi hai",
            "scholarship release nahi hui hai",
            "kai dino se garbage collect nahi hua hai",
            "hamare locality mein water supply nahi hai",
            "road completely damaged ho gayi hai",
            "toilet dirty hai aur use nahi ho sakta",
            "large potholes ki wajah se vehicles ko problem ho rahi hai",
            "houses ke paas sewage overflow ho raha hai",
            "public toilet kai dino se unusable hai",
            "residential buildings ke paas garbage pile ho raha hai",
            "area mein drinking water available nahi hai",
            "main road badly damaged hai",
        ]
    },


    "CRITICAL": {
        "english": [
            "open manhole near a school",
            "exposed electric wire on the road",
            "drinking water is contaminated",
            "gas leak near residential area",
            "fire in a public building",
            "sewage water is overflowing on the main road",
            "dangerous electric pole is about to fall",
            "major accident caused by damaged road",
            "live electric wire has fallen onto the street",
            "children are exposed to an open manhole",
            "fire emergency in a government building",
            "people are drinking contaminated water",
        ],

        "hindi": [
            "स्कूल के पास खुला मैनहोल है",
            "सड़क पर बिजली का खुला तार पड़ा है",
            "पीने का पानी दूषित है",
            "रिहायशी इलाके के पास गैस लीक हो रही है",
            "सार्वजनिक इमारत में आग लगी है",
            "मुख्य सड़क पर सीवेज का पानी बह रहा है",
            "खतरनाक बिजली का खंभा गिरने वाला है",
            "खराब सड़क के कारण बड़ा हादसा हुआ है",
            "बिजली का चालू तार सड़क पर गिर गया है",
            "बच्चे खुले मैनहोल के खतरे में हैं",
            "सरकारी इमारत में आग लगने की आपात स्थिति है",
            "लोग दूषित पानी पी रहे हैं",
        ],

        "hinglish": [
            "school ke paas open manhole hai",
            "road par exposed electric wire pada hai",
            "drinking water contaminated hai",
            "residential area ke paas gas leak ho rahi hai",
            "public building mein fire lagi hai",
            "main road par sewage water overflow ho raha hai",
            "dangerous electric pole girne wala hai",
            "damaged road ki wajah se major accident hua hai",
            "live electric wire street par gir gaya hai",
            "children open manhole ke danger mein hain",
            "government building mein fire emergency hai",
            "log contaminated water pee rahe hain",
        ]
    }
}


PREFIXES = {
    "english": [
        "",
        "please help, ",
        "I want to report that ",
        "there is a problem where ",
        "please take action, ",
        "in our locality, ",
        "near my house, ",
    ],

    "hindi": [
        "",
        "कृपया मदद करें, ",
        "मैं शिकायत करना चाहता हूं कि ",
        "हमारे इलाके में समस्या है कि ",
        "कृपया कार्रवाई करें, ",
        "हमारे इलाके में, ",
        "मेरे घर के पास, ",
    ],

    "hinglish": [
        "",
        "please help, ",
        "main report karna chahta hoon ki ",
        "hamare area mein problem hai ki ",
        "please action lein, ",
        "hamare locality mein, ",
        "mere ghar ke paas, ",
    ]
}


SUFFIXES = {
    "english": [
        "",
        " please take action",
        " please resolve this",
        " in our area",
        " for many days",
        " and residents are facing problems",
    ],

    "hindi": [
        "",
        " कृपया कार्रवाई करें",
        " कृपया इसे जल्द हल करें",
        " हमारे इलाके में",
        " कई दिनों से",
        " और लोगों को परेशानी हो रही है",
    ],

    "hinglish": [
        "",
        " please action lein",
        " please ise resolve karein",
        " hamare area mein",
        " kai dino se",
        " aur residents ko problem ho rahi hai",
    ]
}


TYPO_MAP = {
    "toilet": ["toilt", "tolet", "toilett"],
    "scholarship": ["schoship", "scholrship", "scholarshp"],
    "released": ["relased", "relesed"],
    "street": ["strete", "stret"],
    "light": ["ligt", "ligth"],
    "water": ["watr", "wter"],
    "garbage": ["garbge", "garbej"],
    "potholes": ["pothols", "pothoels"],
    "pothole": ["pothol", "potohle"],
    "school": ["schol", "shcool"],
    "road": ["roaad", "rod"],
    "washroom": ["washrom", "washrm"],
}


def add_typo(text):

    words = text.split()

    if random.random() > 0.30:
        return text

    candidates = [
        i for i, word in enumerate(words)
        if word.lower() in TYPO_MAP
    ]

    if not candidates:
        return text

    index = random.choice(candidates)

    word = words[index].lower()

    words[index] = random.choice(
        TYPO_MAP[word]
    )

    return " ".join(words)


def create_variation(sentence, language):

    prefix = random.choice(
        PREFIXES[language]
    )

    suffix = random.choice(
        SUFFIXES[language]
    )

    sentence = prefix + sentence + suffix

    # Typos mainly for English/Hinglish
    if language != "hindi":
        sentence = add_typo(sentence)

    return sentence


def generate_dataset(per_class=1000):

    os.makedirs(
        os.path.dirname(OUTPUT),
        exist_ok=True
    )

    rows = []

    languages = [
        "english",
        "hindi",
        "hinglish"
    ]

    for urgency, language_data in DATA.items():

        for _ in range(per_class):

            language = random.choice(languages)

            sentence = random.choice(
                language_data[language]
            )

            grievance = create_variation(
                sentence,
                language
            )

            rows.append({
                "grievance": grievance,
                "urgency": urgency
            })

    random.shuffle(rows)

    with open(
        OUTPUT,
        "w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=[
                "grievance",
                "urgency"
            ]
        )

        writer.writeheader()

        writer.writerows(rows)

    print(f"Dataset created: {OUTPUT}")
    print(f"Total records: {len(rows)}")

    for label in DATA:
        print(f"{label}: {per_class}")


if __name__ == "__main__":
    generate_dataset(1000)