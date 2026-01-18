$basePath = "c:\Users\almoa\OneDrive\Attachments\New Improved A.D.S Islam Test\surahs"

# Template HTML content
$template = @'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SURAH_TITLE | A.D.S Islam</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://alquran.cloud/public/css/font-all.css" rel="stylesheet">
    
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="../aboutquran.css">
    <style>
        .surah-viewer {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .surah-header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: linear-gradient(135deg, rgba(102, 51, 153, 0.1), rgba(138, 43, 226, 0.1));
            border-radius: 15px;
        }

        .surah-header h1 {
            font-size: 2.5em;
            margin: 10px 0;
            color: #064E3B;
            font-family: 'Playfair Display', serif;
        }

        .surah-header p {
            font-size: 1.1em;
            color: #666;
            margin: 5px 0;
        }

        .verses-container {
            background: #f9f9f9;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
        }

        .verse {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
        }

        .verse:last-child {
            border-bottom: none;
        }

        .verse-number {
            color: #064E3B;
            font-weight: bold;
            font-size: 0.9em;
            margin-bottom: 8px;
        }

        .verse-text-arabic {
            font-size: 1.5em;
            text-align: right;
            direction: rtl;
            margin-bottom: 12px;
            line-height: 2.2;
            color: #333;
            font-family: 'Arabic Text', 'Arial Unicode MS', sans-serif;
        }

        .verse-text-translation {
            font-size: 1em;
            line-height: 1.6;
            color: #555;
            font-style: italic;
            padding-left: 15px;
            border-left: 3px solid #064E3B;
        }

        .surah-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            gap: 10px;
            flex-wrap: wrap;
        }

        .nav-button {
            padding: 12px 20px;
            background: #064E3B;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            text-decoration: none;
            transition: background 0.3s;
            font-weight: 600;
        }

        .nav-button:hover {
            background: #0d5e47;
        }

        .nav-button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: #064E3B;
            text-decoration: none;
            font-weight: 600;
        }

        .back-link:hover {
            text-decoration: underline;
        }

        .menu-toggle {
            display: none;
            cursor: pointer;
            font-size: 1.5rem;
            color: var(--primary);
        }

        @media (max-width: 768px) {
            .surah-header h1 {
                font-size: 1.8em;
            }

            .verse-text-arabic {
                font-size: 1.2em;
            }

            .nav-button {
                padding: 10px 15px;
                font-size: 0.9em;
            }

            .surah-nav {
                justify-content: center;
                text-align: center;
            }

            .menu-toggle {
                display: block;
            }
        }
    </style>
</head>

<body>
    <header class="main-header">
        <nav class="nav-container">
            <a href="../index.html" class="logo">
                <img src="../assets/logo-icon.png" alt="A.D.S Islam Logo">
                A.D.S <span>ISLAM</span>
            </a>
            <div class="nav-links" id="navLinks">
                <a href="../index.html">Home</a>
                <a href="../aboutislam.html">About Islam</a>
                <a href="../thepillars.html">Pillars</a>
                <a href="../theka3ba.html">The Ka'aba</a>
                <a href="../contact.html">Contact</a>
            </div>
            <div class="menu-toggle" onclick="toggleNav()">
                <i class="fas fa-bars"></i>
            </div>
        </nav>
    </header>

    <main>
        <section class="surah-viewer">
            <a href="../aboutquran.html" class="back-link">← Back to All Surahs</a>
            
            <div id="surahContent" class="verses-container"></div>

            <div class="surah-nav">
                <a id="prevBtn" class="nav-button" href="#">← Previous Surah</a>
                <span id="surahCounter" style="color: #666;"></span>
                <a id="nextBtn" class="nav-button" href="#">Next Surah →</a>
            </div>
        </section>
    </main>

    <footer class="main-footer">
        <p>&copy; 2023-2026 A.D.S Islam. All Rights Reserved.</p>
    </footer>

    <script>
        const SURAH_ID = SURAH_ID_PLACEHOLDER;
        const SURAH_NAME = "SURAH_NAME_PLACEHOLDER";
        const TOTAL_SURAHS = 114;

        document.addEventListener("DOMContentLoaded", function() {
            loadSurah(SURAH_ID);
            setupNavigation();
        });

        function loadSurah(id) {
            const loading = document.getElementById("surahContent");
            loading.innerHTML = '<p style="text-align: center; padding: 20px;">Loading Surah...</p>';
            
            // Fetch from alquran.cloud API with better CORS support
            // Get translation and Arabic text from different endpoints
            Promise.all([
                fetch(`https://api.alquran.cloud/v1/surah/${id}/en.asad`)
                    .then(response => {
                        if (!response.ok) throw new Error('API response error');
                        return response.json();
                    }),
                fetch(`https://api.alquran.cloud/v1/surah/${id}`)
                    .then(response => {
                        if (!response.ok) throw new Error('API response error');
                        return response.json();
                    })
            ])
            .then(([translationData, arabicData]) => {
                if (translationData.status !== 'OK') throw new Error('Invalid API response');
                
                // Merge data: use translation text but add Arabic from other endpoint
                const merged = translationData.data;
                if (arabicData.status === 'OK') {
                    arabicData.data.ayahs.forEach((arabicAyah, index) => {
                        if (merged.ayahs[index]) {
                            merged.ayahs[index].arabicText = arabicAyah.text;
                        }
                    });
                }
                renderSurah(merged);
            })
            .catch(error => {
                console.error('Error:', error);
                loading.innerHTML = '<p style="text-align: center; color: #d32f2f; padding: 20px;">Error loading Surah. Please try again later.</p>';
            });
        }

        function renderSurah(surah) {
            const surahContent = document.getElementById("surahContent");
            let html = `
                <div class="surah-header">
                    <p class="eyebrow">Surah ${surah.number} of ${TOTAL_SURAHS}</p>
                    <h1>${surah.englishName}</h1>
                    <p>${surah.englishNameTranslation}</p>
                    <p>${surah.numberOfAyahs} Verses • ${surah.revelationType}</p>
                </div>
            `;

            surah.ayahs.forEach(ayah => {
                html += `
                    <div class="verse">
                        <div class="verse-number">Verse ${ayah.numberInSurah}</div>
                        <div class="verse-text-arabic">${ayah.arabicText || ''}</div>
                        <div class="verse-text-translation">${ayah.text}</div>
                    </div>
                `;
            });

            surahContent.innerHTML = html;

            // Update counter
            document.getElementById("surahCounter").textContent = `Surah ${SURAH_ID} of ${TOTAL_SURAHS}`;
        }

        function setupNavigation() {
            const prevBtn = document.getElementById("prevBtn");
            const nextBtn = document.getElementById("nextBtn");

            if (SURAH_ID > 1) {
                prevBtn.href = `${SURAH_ID - 1}.html`;
            } else {
                prevBtn.style.visibility = "hidden";
            }

            if (SURAH_ID < TOTAL_SURAHS) {
                nextBtn.href = `${SURAH_ID + 1}.html`;
            } else {
                nextBtn.style.visibility = "hidden";
            }
        }

        function toggleNav() {
            const nav = document.getElementById('navLinks');
            nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
        }
    </script>
</body>
</html>
'@

# Arabic surah names mapping
$surahNames = @{
    1 = "Al-Fatihah"
    2 = "Al-Baqarah"
    3 = "Aal-E-Imran"
    4 = "An-Nisa"
    5 = "Al-Ma'idah"
    6 = "Al-An'am"
    7 = "Al-A'raf"
    8 = "Al-Anfal"
    9 = "At-Taubah"
    10 = "Yunus"
    11 = "Hud"
    12 = "Yusuf"
    13 = "Ar-Ra'd"
    14 = "Ibrahim"
    15 = "Al-Hijr"
    16 = "An-Nahl"
    17 = "Al-Isra"
    18 = "Al-Kahf"
    19 = "Maryam"
    20 = "Ta-Ha"
    21 = "Al-Anbiya"
    22 = "Al-Hajj"
    23 = "Al-Mu'minun"
    24 = "An-Nur"
    25 = "Al-Furqan"
    26 = "Ash-Shu'ara"
    27 = "An-Naml"
    28 = "Al-Qasas"
    29 = "Al-Ankabut"
    30 = "Ar-Rum"
    31 = "Luqman"
    32 = "As-Sajda"
    33 = "Al-Ahzab"
    34 = "Saba"
    35 = "Fatir"
    36 = "Ya-Sin"
    37 = "As-Saffat"
    38 = "Sad"
    39 = "Az-Zumar"
    40 = "Ghafir"
    41 = "Fussilat"
    42 = "Ash-Shura"
    43 = "Az-Zukhruf"
    44 = "Ad-Dukhan"
    45 = "Al-Jathiyah"
    46 = "Al-Ahqaf"
    47 = "Muhammad"
    48 = "Al-Fath"
    49 = "Al-Hujurat"
    50 = "Qaf"
    51 = "Adh-Dhariyat"
    52 = "At-Tur"
    53 = "An-Najm"
    54 = "Al-Qamar"
    55 = "Ar-Rahman"
    56 = "Al-Waqi'a"
    57 = "Al-Hadid"
    58 = "Al-Mujadila"
    59 = "Al-Hashr"
    60 = "Al-Mumtahina"
    61 = "As-Saff"
    62 = "Al-Jumu'a"
    63 = "Al-Munafiqun"
    64 = "At-Taghabun"
    65 = "At-Talaq"
    66 = "At-Tahrim"
    67 = "Al-Mulk"
    68 = "Al-Qalam"
    69 = "Al-Haqqah"
    70 = "Al-Ma'arij"
    71 = "Nuh"
    72 = "Al-Jinn"
    73 = "Al-Muzzammil"
    74 = "Al-Muddaththir"
    75 = "Al-Qiyamah"
    76 = "Al-Insan"
    77 = "Al-Mursalat"
    78 = "An-Naba"
    79 = "An-Nazi'at"
    80 = "Abasa"
    81 = "At-Takwir"
    82 = "Al-Infitar"
    83 = "Al-Mutaffifin"
    84 = "Al-Inshiqaq"
    85 = "Al-Buruj"
    86 = "At-Tariq"
    87 = "Al-A'la"
    88 = "Al-Ghashiyah"
    89 = "Al-Fajr"
    90 = "Al-Balad"
    91 = "Ash-Shams"
    92 = "Al-Layl"
    93 = "Ad-Duha"
    94 = "Ash-Sharh"
    95 = "At-Tin"
    96 = "Al-Alaq"
    97 = "Al-Qadr"
    98 = "Al-Bayyinah"
    99 = "Az-Zalzalah"
    100 = "Al-Adiyat"
    101 = "Al-Qari'ah"
    102 = "At-Takathur"
    103 = "Al-Asr"
    104 = "Al-Humazah"
    105 = "Al-Fil"
    106 = "Quraysh"
    107 = "Al-Ma'un"
    108 = "Al-Kawthar"
    109 = "Al-Kaffirun"
    110 = "An-Nasr"
    111 = "Al-Masad"
    112 = "Al-Ikhlas"
    113 = "Al-Falaq"
    114 = "An-Nas"
}

# Update all files 1-114
for ($id = 1; $id -le 114; $id++) {
    $filePath = Join-Path -Path $basePath -ChildPath "$id.html"
    $surahName = $surahNames[$id]
    
    # Replace placeholders
    $updatedContent = $template -replace 'SURAH_TITLE', "$surahName" `
                               -replace 'SURAH_ID_PLACEHOLDER', "$id" `
                               -replace 'SURAH_NAME_PLACEHOLDER', "$surahName"
    
    # Write the updated content with error handling
    try {
        Set-Content -Path $filePath -Value $updatedContent -Encoding UTF8 -Force -ErrorAction Stop
        Write-Host "Updated $id.html ($surahName)"
    } catch {
        Write-Host "Error updating $id.html: $_"
    }
}

Write-Host "All 114 surah files have been updated with alquran.cloud API!"
