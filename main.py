# Dictionary mapping Surah ID to its name
surah_names = {
    1: "Al-Fatihah",
    2: "Al-Baqarah",
    3: "Ali 'Imran",
    4: "An-Nisa",
    5: "Al-Ma'idah",
    6: "Al-An'am",
    7: "Al-A'raf",
    8: "Al-Anfal",
    9: "At-Tawbah",
    10: "Yunus",
    11: "Hud",
    12: "Yusuf",
    13: "Ar-Ra'd",
    14: "Ibrahim",
    15: "Al-Hijr",
    16: "An-Nahl",
    17: "Al-Isra",
    18: "Al-Kahf",
    19: "Maryam",
    20: "Taha",
    21: "Al-Anbya",
    22: "Al-Hajj",
    23: "Al-Mu'minun",
    24: "An-Nur",
    25: "Al-Furqan",
    26: "Ash-Shu'ara",
    27: "An-Naml",
    28: "Al-Qasas",
    29: "Al-'Ankabut",
    30: "Ar-Rum",
    31: "Luqman",
    32: "As-Sajdah",
    33: "Al-Ahzab",
    34: "Saba",
    35: "Fatir",
    36: "Ya-Sin",
    37: "As-Saffat",
    38: "Sad",
    39: "Az-Zumar",
    40: "Ghafir",
    41: "Fussilat",
    42: "Ash-Shuraa",
    43: "Az-Zukhruf",
    44: "Ad-Dukhan",
    45: "Al-Jathiyah",
    46: "Al-Ahqaf",
    47: "Muhammad",
    48: "Al-Fath",
    49: "Al-Hujurat",
    50: "Qaf",
    51: "Adh-Dhariyat",
    52: "At-Tur",
    53: "An-Najm",
    54: "Al-Qamar",
    55: "Ar-Rahman",
    56: "Al-Waqi'ah",
    57: "Al-Hadid",
    58: "Al-Mujadila",
    59: "Al-Hashr",
    60: "Al-Mumtahanah",
    61: "As-Saf",
    62: "Al-Jumu'ah",
    63: "Al-Munafiqun",
    64: "At-Taghabun",
    65: "At-Talaq",
    66: "At-Tahrim",
    67: "Al-Mulk",
    68: "Al-Qalam",
    69: "Al-Haqqah",
    70: "Al-Ma'arij",
    71: "Nuh",
    72: "Al-Jinn",
    73: "Al-Muzzammil",
    74: "Al-Muddaththir",
    75: "Al-Qiyamah",
    76: "Al-Insan",
    77: "Al-Mursalat",
    78: "An-Naba",
    79: "An-Nazi'at",
    80: "'Abasa",
    81: "At-Takwir",
    82: "Al-Infitar",
    83: "Al-Mutaffifin",
    84: "Al-Inshiqaq",
    85: "Al-Buruj",
    86: "At-Tariq",
    87: "Al-A'la",
    88: "Al-Ghashiyah",
    89: "Al-Fajr",
    90: "Al-Balad",
    91: "Ash-Shams",
    92: "Al-Layl",
    93: "Ad-Duhaa",
    94: "Ash-Sharh",
    95: "At-Tin",
    96: "Al-'Alaq",
    97: "Al-Qadr",
    98: "Al-Bayyinah",
    99: "Az-Zalzalah",
    100: "Al-'Adiyat",
    101: "Al-Qari'ah",
    102: "At-Takathur",
    103: "Al-'Asr",
    104: "Al-Humazah",
    105: "Al-Fil",
    106: "Quraysh",
    107: "Al-Ma'un",
    108: "Al-Kawthar",
    109: "Al-Kafirun",
    110: "An-Nasr",
    111: "Al-Masad",
    112: "Al-Ikhlas",
    113: "Al-Falaq",
    114: "An-Nas"
}

# Content to replace in each HTML file
content_template = """
<!DOCTYPE html>
<html lang="en">

<head>
    <link href="https://alquran.cloud/public/css/font-all.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/About Quran/aboutquran.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/assets/favicon2.jpg" type="image/x-icon">
    <title>{surah_name}</title>
    <style>
    .nextsurah {{
        background-color: #ff8000;
        color: white;
        border: none;
        width: 110px;
        border-radius: 15px;
        font-weight: bold;
        font-size: 20px;
        padding: 10px;
        margin: 10px;
        text-decoration: none;
        display: inline-block;
    }}
    </style>
</head>

<body>
    <center>
    <div style="padding: 1%;">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>
    <div style="padding: 1%;" id="surahContent"></div>

    <a class="nextsurah" href="//About Quran/{next_surah_id}.html">
        Next Surah
    </a>

    <script>
        function showsurah(id, name) {{
            fetch("https://api.quran.com/api/v4/quran/verses/uthmani_tajweed?chapter_number=" + id, {{
                headers: {{
                    "accept": "application/json"
                }}
            }})
                .then(response => response.json())
                .then(data => {{
                    var surahContent = document.getElementById("surahContent");
                    surahContent.innerHTML = ""; // Clear previous content

                    for (var i = 0; i < data.verses.length; i++) {{
                        var ayah = document.createElement("div");
                        ayah.textContent = extractTextFromHtml(data.verses[i].text_uthmani_tajweed);
                        surahContent.appendChild(ayah);
                    }}
                }})
                .catch(error => {{
                    console.error('Error fetching surah content:', error);
                }});
        }}

        // Function to extract text content from HTML strings
        function extractTextFromHtml(html) {{
            var doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        }}

        // Call the showsurah function with a valid surah ID and name
        showsurah({surah_id}, "{surah_name}");
    </script>
</body>

</html>
"""

# Dictionary mapping Surah ID to its name
surah_names = {
    1: "Al-Fatihah",
    2: "Al-Baqarah",
    3: "Ali 'Imran",
    4: "An-Nisa",
    5: "Al-Ma'idah",
    6: "Al-An'am",
    7: "Al-A'raf",
    8: "Al-Anfal",
    9: "At-Tawbah",
    10: "Yunus",
    11: "Hud",
    12: "Yusuf",
    13: "Ar-Ra'd",
    14: "Ibrahim",
    15: "Al-Hijr",
    16: "An-Nahl",
    17: "Al-Isra",
    18: "Al-Kahf",
    19: "Maryam",
    20: "Taha",
    21: "Al-Anbya",
    22: "Al-Hajj",
    23: "Al-Mu'minun",
    24: "An-Nur",
    25: "Al-Furqan",
    26: "Ash-Shu'ara",
    27: "An-Naml",
    28: "Al-Qasas",
    29: "Al-'Ankabut",
    30: "Ar-Rum",
    31: "Luqman",
    32: "As-Sajdah",
    33: "Al-Ahzab",
    34: "Saba",
    35: "Fatir",
    36: "Ya-Sin",
    37: "As-Saffat",
    38: "Sad",
    39: "Az-Zumar",
    40: "Ghafir",
    41: "Fussilat",
    42: "Ash-Shuraa",
    43: "Az-Zukhruf",
    44: "Ad-Dukhan",
    45: "Al-Jathiyah",
    46: "Al-Ahqaf",
    47: "Muhammad",
    48: "Al-Fath",
    49: "Al-Hujurat",
    50: "Qaf",
    51: "Adh-Dhariyat",
    52: "At-Tur",
    53: "An-Najm",
    54: "Al-Qamar",
    55: "Ar-Rahman",
    56: "Al-Waqi'ah",
    57: "Al-Hadid",
    58: "Al-Mujadila",
    59: "Al-Hashr",
    60: "Al-Mumtahanah",
    61: "As-Saf",
    62: "Al-Jumu'ah",
    63: "Al-Munafiqun",
    64: "At-Taghabun",
    65: "At-Talaq",
    66: "At-Tahrim",
    67: "Al-Mulk",
    68: "Al-Qalam",
    69: "Al-Haqqah",
    70: "Al-Ma'arij",
    71: "Nuh",
    72: "Al-Jinn",
    73: "Al-Muzzammil",
    74: "Al-Muddaththir",
    75: "Al-Qiyamah",
    76: "Al-Insan",
    77: "Al-Mursalat",
    78: "An-Naba",
    79: "An-Nazi'at",
    80: "'Abasa",
    81: "At-Takwir",
    82: "Al-Infitar",
    83: "Al-Mutaffifin",
    84: "Al-Inshiqaq",
    85: "Al-Buruj",
    86: "At-Tariq",
    87: "Al-A'la",
    88: "Al-Ghashiyah",
    89: "Al-Fajr",
    90: "Al-Balad",
    91: "Ash-Shams",
    92: "Al-Layl",
    93: "Ad-Duhaa",
    94: "Ash-Sharh",
    95: "At-Tin",
    96: "Al-'Alaq",
    97: "Al-Qadr",
    98: "Al-Bayyinah",
    99: "Az-Zalzalah",
    100: "Al-'Adiyat",
    101: "Al-Qari'ah",
    102: "At-Takathur",
    103: "Al-'Asr",
    104: "Al-Humazah",
    105: "Al-Fil",
    106: "Quraysh",
    107: "Al-Ma'un",
    108: "Al-Kawthar",
    109: "Al-Kafirun",
    110: "An-Nasr",
    111: "Al-Masad",
    112: "Al-Ikhlas",
    113: "Al-Falaq",
    114: "An-Nas"
}

# Content to replace in each HTML file
content_template = """
<!DOCTYPE html>
<html lang="en">

<head>
    <link href="https://alquran.cloud/public/css/font-all.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/About Quran/aboutquran.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/assets/favicon2.jpg" type="image/x-icon">
    <title>{surah_name}</title>
    <style>
    .nextsurah {{
        background-color: #ff8000;
        color: white;
        border: none;
        width: 110px;
        border-radius: 15px;
        font-weight: bold;
        font-size: 20px;
        padding: 10px;
        margin: 10px;
        text-decoration: none;
        display: inline-block;
    }}
    </style>
</head>

<body>
    <center>
    <div style="padding: 1%;">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>
    <div style="padding: 1%;" id="surahContent"></div>

    <a class="nextsurah" href="/About Quran/{next_surah_id}.html">
        Next Surah
    </a>

    <script>
        function showsurah(id, name) {{
            fetch("https://api.quran.com/api/v4/quran/verses/uthmani_tajweed?chapter_number=" + id, {{
                headers: {{
                    "accept": "application/json"
                }}
            }})
                .then(response => response.json())
                .then(data => {{
                    var surahContent = document.getElementById("surahContent");
                    surahContent.innerHTML = ""; // Clear previous content

                    for (var i = 0; i < data.verses.length; i++) {{
                        var ayah = document.createElement("div");
                        ayah.textContent = extractTextFromHtml(data.verses[i].text_uthmani_tajweed);
                        surahContent.appendChild(ayah);
                    }}
                }})
                .catch(error => {{
                    console.error('Error fetching surah content:', error);
                }});
        }}

        // Function to extract text content from HTML strings
        function extractTextFromHtml(html) {{
            var doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        }}

        // Call the showsurah function with a valid surah ID and name
        showsurah({surah_id}, "{surah_name}");
    </script>
</body>

</html>
"""
# Loop to read each HTML file, replace content, and overwrite the files
for i in range(1, 115):
    surah_id = i
    surah_name = surah_names[surah_id]
    next_surah_id = i + 1 if i < 114 else 1  # If it's the last Surah, loop back to the first one
    file_name = f'{surah_id}.html'
    with open(file_name, 'wb') as f:  # Open the file in binary mode
        content = content_template.format(surah_id=surah_id, surah_name=surah_name, next_surah_id=next_surah_id)
        f.write(content.encode('utf-8'))  # Encode content as UTF-8 before writing
