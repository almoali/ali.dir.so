# Python script to replace content in existing HTML files with dynamic Surah names

# Dictionary mapping Surah ID to its name
surah_names = {
    35: "Surah Fatir",
    36: "Surah Ya-Sin",
    37: "Surah As-Saffat",
    38: "Surah Sad",
    39: "Surah Az-Zumar",
    40: "Surah Ghafir",
    41: "Surah Fussilat",
    42: "Surah Ash-Shuraa",
    43: "Surah Az-Zukhruf",
    44: "Surah Ad-Dukhan",
    45: "Surah Al-Jathiyah",
    46: "Surah Al-Ahqaf",
    47: "Surah Muhammad",
    48: "Surah Al-Fath",
    49: "Surah Al-Hujurat",
    50: "Surah Qaf",
    51: "Surah Adh-Dhariyat",
    52: "Surah At-Tur",
    53: "Surah An-Najm",
    54: "Surah Al-Qamar",
    55: "Surah Ar-Rahman",
    56: "Surah Al-Waqi'ah",
    57: "Surah Al-Hadid",
    58: "Surah Al-Mujadila",
    59: "Surah Al-Hashr",
    60: "Surah Al-Mumtahanah",
    61: "Surah As-Saf",
    62: "Surah Al-Jumu'ah",
    63: "Surah Al-Munafiqun",
    64: "Surah At-Taghabun",
    65: "Surah At-Talaq",
    66: "Surah At-Tahrim",
    67: "Surah Al-Mulk",
    68: "Surah Al-Qalam",
    69: "Surah Al-Haqqah",
    70: "Surah Al-Ma'arij",
    71: "Surah Nuh",
    72: "Surah Al-Jinn",
    73: "Surah Al-Muzzammil",
    74: "Surah Al-Muddaththir",
    75: "Surah Al-Qiyamah",
    76: "Surah Al-Insan",
    77: "Surah Al-Mursalat",
    78: "Surah An-Naba",
    79: "Surah An-Nazi'at",
    80: "Surah 'Abasa",
    81: "Surah At-Takwir",
    82: "Surah Al-Infitar",
    83: "Surah Al-Mutaffifin",
    84: "Surah Al-Inshiqaq",
    85: "Surah Al-Buruj",
    86: "Surah At-Tariq",
    87: "Surah Al-A'la",
    88: "Surah Al-Ghashiyah",
    89: "Surah Al-Fajr",
    90: "Surah Al-Balad",
    91: "Surah Ash-Shams",
    92: "Surah Al-Layl",
    93: "Surah Ad-Duhaa",
    94: "Surah Ash-Sharh",
    95: "Surah At-Tin",
    96: "Surah Al-'Alaq",
    97: "Surah Al-Qadr",
    98: "Surah Al-Bayyinah",
    99: "Surah Az-Zalzalah",
    100: "Surah Al-'Adiyat",
    101: "Surah Al-Qari'ah",
    102: "Surah At-Takathur",
    103: "Surah Al-'Asr",
    104: "Surah Al-Humazah",
    105: "Surah Al-Fil",
    106: "Surah Quraysh",
    107: "Surah Al-Ma'un",
    108: "Surah Al-Kawthar",
    109: "Surah Al-Kafirun",
    110: "Surah An-Nasr",
    111: "Surah Al-Masad",
    112: "Surah Al-Ikhlas",
    113: "Surah Al-Falaq",
    114: "Surah An-Nas"
}


# Content to replace in each HTML file
content_template = """
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/About Quran/aboutquran.css">
    <title>{surah_name}</title>
</head>

<body>
    <center>
    <div style="padding: 1%;" id="surahContent"></div>

    <script>
        function showsurah(id) {{
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
        showsurah({surah_id}); // {surah_name}
    </script>
</body>

</html>
"""

# Loop to read each HTML file, replace content, and overwrite the files
for surah_id, surah_name in surah_names.items():
    file_name = f'{surah_id}.html'
    with open(file_name, 'w') as f:
        f.write(content_template.format(surah_id=surah_id, surah_name=surah_name))
