<!DOCTYPE html><html class="dark efsuoqbvg" lang="en" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Excel Date Fixer - Modern Utility</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;family=Courier+Prime&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-fixed-dim": "#a3c9ff",
                        "tertiary": "#ffb689",
                        "surface-container-high": "#2a2a2a",
                        "on-secondary-fixed": "#00210c",
                        "inverse-on-surface": "#313030",
                        "tertiary-fixed": "#ffdbc8",
                        "outline-variant": "#404752",
                        "surface-dim": "#131313",
                        "on-tertiary-container": "#ffffff",
                        "error-container": "#93000a",
                        "surface-bright": "#393939",
                        "primary-fixed": "#d3e3ff",
                        "on-primary-container": "#ffffff",
                        "outline": "#8a919e",
                        "on-primary": "#00315c",
                        "on-secondary-fixed-variant": "#005228",
                        "secondary": "#4ae183",
                        "on-primary-fixed": "#001c39",
                        "background": "#131313",
                        "secondary-container": "#06bb63",
                        "on-background": "#e5e2e1",
                        "on-surface-variant": "#c0c7d4",
                        "on-surface": "#e5e2e1",
                        "surface-container-low": "#1b1b1b",
                        "primary-container": "#0078d4",
                        "surface-container-lowest": "#0e0e0e",
                        "secondary-fixed-dim": "#4ae183",
                        "on-tertiary-fixed-variant": "#743500",
                        "on-error-container": "#ffdad6",
                        "inverse-primary": "#0060ab",
                        "tertiary-container": "#bc5b00",
                        "on-error": "#690005",
                        "surface-container": "#20201f",
                        "surface": "#131313",
                        "primary": "#a3c9ff",
                        "secondary-fixed": "#6bfe9c",
                        "tertiary-fixed-dim": "#ffb689",
                        "surface-variant": "#353535",
                        "surface-tint": "#a3c9ff",
                        "inverse-surface": "#e5e2e1",
                        "on-secondary": "#003919",
                        "on-secondary-container": "#00431f",
                        "on-tertiary": "#512300",
                        "on-primary-fixed-variant": "#004883",
                        "surface-container-highest": "#353535",
                        "error": "#ffb4ab",
                        "on-tertiary-fixed": "#311300"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "card-gap": "12px",
                        "internal-padding": "16px",
                        "container-padding": "24px",
                        "base-unit": "4px"
                    },
                    "fontFamily": {
                        "terminal-text": ["Courier Prime"],
                        "body-md": ["Inter"],
                        "headline-sm": ["Inter"],
                        "label-caps": ["Inter"]
                    },
                    "fontSize": {
                        "terminal-text": ["13px", {"lineHeight": "18px", "fontWeight": "400"}],
                        "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "headline-sm": ["18px", {"lineHeight": "24px", "fontWeight": "600"}],
                        "label-caps": ["11px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "700"}]
                    }
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .mica-effect {
            backdrop-filter: blur(40px) saturate(180%);
            -webkit-backdrop-filter: blur(40px) saturate(180%);
        }
        .card-active {
            box-shadow: 0 0 15px -2px rgba(163, 201, 255, 0.3);
            border: 2px solid #a3c9ff !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #404752;
            border-radius: 10px;
        }
        @keyframes flow {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .progress-flow {
            animation: flow 2s infinite ease-in-out;
        }
    </style>
</head>
<body class="bg-background text-on-background font-body-md text-body-md selection:bg-primary/30 min-h-screen flex flex-col overflow-hidden">
<!-- Top App Bar -->
<header class="bg-surface/70 backdrop-blur-3xl border-b border-white/10 flex justify-between items-center px-container-padding h-12 w-full shrink-0 z-50">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">account_tree</span>
<h1 class="font-headline-sm text-headline-sm font-semibold text-on-surface">Excel Date Fixer <span class="font-label-caps text-label-caps opacity-50 font-normal ml-2">By ivanmmz@live.cn</span></h1>
</div>
<div class="flex items-center gap-1">
<button class="p-2 hover:bg-surface-container-highest transition-colors rounded active:scale-95 duration-100"><span class="material-symbols-outlined text-on-surface-variant">minimize</span></button>
<button class="p-2 hover:bg-surface-container-highest transition-colors rounded active:scale-95 duration-100"><span class="material-symbols-outlined text-on-surface-variant">fullscreen</span></button>
<button class="p-2 hover:bg-red-500/20 hover:text-red-400 transition-colors rounded active:scale-95 duration-100"><span class="material-symbols-outlined text-on-surface-variant">close</span></button>
</div>
</header>
<main class="flex-grow flex flex-col p-container-padding gap-card-gap overflow-hidden relative">
<!-- Task Cards Row (5 horizontal cards) -->
<section class="grid grid-cols-5 gap-card-gap shrink-0">
<!-- Card 1: Date Format (Active/Selected) -->
<div class="mica-effect bg-surface-container border border-white/10 p-internal-padding rounded-xl card-active relative group">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline-sm text-headline-sm">Date Format</h3>
<span class="material-symbols-outlined text-primary text-sm">info</span>
</div>
<div class="space-y-2">
<div class="space-y-1">
<label class="font-label-caps text-label-caps text-on-surface-variant block">DATE FORMAT</label>
<input class="w-full bg-surface-container-lowest border-none text-body-md p-1.5 rounded focus:ring-1 focus:ring-primary" type="text" value="DD/MM/YYYY">
</div>
<div class="space-y-1">
<label class="font-label-caps text-label-caps text-on-surface-variant block">TIME FORMAT</label>
<input class="w-full bg-surface-container-lowest border-none text-body-md p-1.5 rounded focus:ring-1 focus:ring-primary" type="text" value="HH:mm:ss">
</div>
</div>
<!-- Tooltip -->
<div class="absolute -top-10 left-0 bg-surface-bright text-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-white/10 shadow-xl">
                    Define the output structure for ISO-standardized timestamps.
                </div>
</div>
<!-- Card 2: Gap Fill (Active/Selected) -->
<div class="mica-effect bg-surface-container border border-white/10 p-internal-padding rounded-xl card-active relative group">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline-sm text-headline-sm">Gap Fill</h3>
<span class="material-symbols-outlined text-primary text-sm">info</span>
</div>
<div class="space-y-1 mt-4">
<label class="font-label-caps text-label-caps text-on-surface-variant block">THRESHOLD (VAL)</label>
<input class="w-full bg-surface-container-lowest border-none text-body-md p-1.5 rounded focus:ring-1 focus:ring-primary" type="number" value="20">
</div>
<div class="mt-4 flex items-center gap-2">
<div class="h-1 flex-grow bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full w-2/3 bg-primary"></div>
</div>
<span class="font-label-caps text-[10px] text-on-surface-variant">ACTIVE</span>
</div>
<div class="absolute -top-10 left-0 bg-surface-bright text-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-white/10 shadow-xl">
                    Interpolate missing values between recognized date sequences.
                </div>
</div>
<!-- Card 3: 1440 Std -->
<div class="mica-effect bg-surface-container border border-white/10 p-internal-padding rounded-xl relative group hover:border-white/20 transition-all">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline-sm text-headline-sm">1440 Std</h3>
</div>
<div class="mt-8 flex flex-col items-center">
<span class="font-label-caps text-label-caps text-secondary px-2 py-1 bg-secondary/10 rounded">AUTOMATIC</span>
<p class="text-on-surface-variant text-[10px] mt-2 text-center">Normalizing to 1-minute intervals</p>
</div>
<div class="absolute -top-10 left-0 bg-surface-bright text-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-white/10 shadow-xl">
                    Force rows into perfect 1440-minute daily standardized blocks.
                </div>
</div>
<!-- Card 4: Date->Val -->
<div class="mica-effect bg-surface-container border border-white/10 p-internal-padding rounded-xl relative group hover:border-white/20 transition-all">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline-sm text-headline-sm">Date → Val</h3>
</div>
<div class="mt-8 flex flex-col items-center">
<span class="font-label-caps text-label-caps text-secondary px-2 py-1 bg-secondary/10 rounded">AUTOMATIC</span>
<p class="text-on-surface-variant text-[10px] mt-2 text-center">Numeric Unix timestamp conversion</p>
</div>
<div class="absolute -top-10 left-0 bg-surface-bright text-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-white/10 shadow-xl">
                    Converts string dates to float-point value representations.
                </div>
</div>
<!-- Card 5: Smart Format -->
<div class="mica-effect bg-surface-container border border-white/10 p-internal-padding rounded-xl relative group hover:border-white/20 transition-all">
<div class="flex justify-between items-start mb-2">
<h3 class="font-headline-sm text-headline-sm">Smart Format</h3>
</div>
<div class="mt-8 flex flex-col items-center">
<span class="font-label-caps text-label-caps text-secondary px-2 py-1 bg-secondary/10 rounded">AUTOMATIC</span>
<p class="text-on-surface-variant text-[10px] mt-2 text-center">AI-detected pattern matching</p>
</div>
<div class="absolute -top-10 left-0 bg-surface-bright text-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-white/10 shadow-xl">
                    Heuristically identifies broken formats and repairs them.
                </div>
</div>
</section>
<!-- Preview Grid Area -->
<section class="flex-grow bg-surface-container-low/50 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden flex flex-col">
<div class="bg-surface-container-high border-b border-white/10 p-2 flex items-center justify-between">
<span class="font-label-caps text-label-caps text-on-surface-variant ml-2 uppercase">Data Preview • Local Environment</span>
<div class="flex items-center gap-4">
<span class="text-[11px] text-primary/80 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Live Stream</span>
</div>
</div>
<div class="flex-grow overflow-auto custom-scrollbar">
<table class="w-full text-left border-collapse">
<thead class="sticky top-0 bg-surface-container-high z-10">
<tr class="font-label-caps text-label-caps text-on-surface-variant border-b border-white/10">
<th class="p-3 font-semibold">DATE</th>
<th class="p-3 font-semibold">TIME</th>
<th class="p-3 font-semibold">VALUE</th>
<th class="p-3 font-semibold">STATUS</th>
</tr>
</thead>
<tbody class="divide-y divide-white/5 font-terminal-text text-terminal-text">
<tr class="hover:bg-primary/5 transition-colors">
<td class="p-3 text-on-surface">2024-03-12</td>
<td class="p-3 text-on-surface">14:02:44</td>
<td class="p-3 text-on-surface">45.221</td>
<td class="p-3 text-secondary">Corrected</td>
</tr>
<tr class="hover:bg-primary/5 transition-colors">
<td class="p-3 text-on-surface">2024-03-12</td>
<td class="p-3 text-on-surface">14:03:01</td>
<td class="p-3 text-on-surface">45.230</td>
<td class="p-3 text-on-surface-variant">Validated</td>
</tr>
<tr class="hover:bg-primary/5 transition-colors">
<td class="p-3 text-on-surface">2024-03-12</td>
<td class="p-3 text-on-surface">14:04:12</td>
<td class="p-3 text-primary">FIXED_GAP</td>
<td class="p-3 text-tertiary">Interpolated</td>
</tr>
<tr class="hover:bg-primary/5 transition-colors">
<td class="p-3 text-on-surface">2024-03-12</td>
<td class="p-3 text-on-surface">14:05:00</td>
<td class="p-3 text-on-surface">45.301</td>
<td class="p-3 text-on-surface-variant">Validated</td>
</tr>
<tr class="hover:bg-primary/5 transition-colors">
<td class="p-3 text-on-surface">2024-03-12</td>
<td class="p-3 text-on-surface">14:06:55</td>
<td class="p-3 text-on-surface">45.298</td>
<td class="p-3 text-secondary">Corrected</td>
</tr>
<tr class="hover:bg-primary/5 transition-colors">
<td class="p-3 text-on-surface">2024-03-12</td>
<td class="p-3 text-on-surface">14:07:22</td>
<td class="p-3 text-on-surface">45.310</td>
<td class="p-3 text-on-surface-variant">Validated</td>
</tr>
<tr class="hover:bg-primary/5 transition-colors">
<td class="p-3 text-on-surface">2024-03-12</td>
<td class="p-3 text-on-surface">14:08:44</td>
<td class="p-3 text-on-surface">45.315</td>
<td class="p-3 text-on-surface-variant">Validated</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- Bottom Panel -->
<section class="h-64 grid grid-cols-12 gap-card-gap shrink-0">
<!-- Left: Actions -->
<div class="col-span-3 flex flex-col gap-2">
<button class="flex items-center gap-3 w-full p-4 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10">
<span class="material-symbols-outlined">add</span>
                    Add File
                </button>
<button class="flex items-center gap-3 w-full p-4 border border-white/10 bg-surface-container text-on-surface rounded-xl font-semibold hover:bg-surface-container-highest transition-all active:scale-95">
<span class="material-symbols-outlined">delete_sweep</span>
                    Clear All
                </button>
<div class="mt-auto">
<button class="flex items-center justify-center gap-3 w-full p-6 bg-secondary-container text-on-secondary-container rounded-xl font-bold hover:brightness-110 transition-all active:scale-[0.98] border border-white/20">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
                        RUN PIPELINE
                    </button>
</div>
</div>
<!-- Middle: File Queue -->
<div class="col-span-4 bg-surface-container border border-white/10 rounded-xl flex flex-col">
<div class="p-3 border-b border-white/5 font-label-caps text-label-caps text-on-surface-variant flex items-center justify-between">
<span class="">FILE QUEUE (2)</span>
<span class="material-symbols-outlined text-sm">description</span>
</div>
<div class="flex-grow overflow-auto custom-scrollbar p-2 space-y-1">
<div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg group hover:bg-white/5 transition-colors">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-secondary">file_present</span>
<div class="flex flex-col">
<span class="text-on-surface font-medium truncate w-40">data_v1.xlsx</span>
<span class="text-[10px] text-on-surface-variant">1.4 MB • Ready</span>
</div>
</div>
<button class="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded transition-all"><span class="material-symbols-outlined text-sm">close</span></button>
</div>
<div class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg group hover:bg-white/5 transition-colors">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-secondary">file_present</span>
<div class="flex flex-col">
<span class="text-on-surface font-medium truncate w-40">report_final.csv</span>
<span class="text-[10px] text-on-surface-variant">842 KB • Analyzing...</span>
</div>
</div>
<button class="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded transition-all"><span class="material-symbols-outlined text-sm">close</span></button>
</div>
</div>
</div>
<!-- Right: System Logs -->
<div class="col-span-5 bg-surface-container-high border border-white/10 rounded-xl flex flex-col">
<div class="p-3 border-b border-white/5 font-label-caps text-label-caps text-on-surface-variant flex items-center justify-between">
<span class="">SYSTEM LOGS</span>
<span class="material-symbols-outlined text-sm">terminal</span>
</div>
<div class="flex-grow p-4 font-terminal-text text-terminal-text custom-scrollbar overflow-auto">
<div class="text-[#4ae183] opacity-80">[14:02:01] System initialized. Mica engine active.</div>
<div class="text-[#4ae183] opacity-80">[14:02:05] Watching directory: C:/Users/Utility/Exports</div>
<div class="text-[#4ae183] opacity-80">[14:05:12] File 'data_v1.xlsx' loaded successfully.</div>
<div class="text-[#4ae183] opacity-80">[14:05:13] Mapping detected formats: DD-MM-YY.</div>
<div class="text-primary-fixed-dim">[14:05:14] INFO: Pipeline ready for execution.</div>
<div class="text-[#4ae183] opacity-80 animate-pulse">[14:06:00] Waiting for input..._</div>
</div>
</div>
</section>
</main>
<!-- Progress Bar (Ultra-thin, bottom fixed) -->
<div class="fixed bottom-0 left-0 w-full z-50 flex flex-col h-auto">
<div class="w-full h-[6px] bg-surface-container-highest relative">
<div class="h-full bg-primary shadow-[0_0_10px_#a3c9ff] relative overflow-hidden transition-all duration-700 ease-out" id="progress-bar" style="width: 63%;">
<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent progress-flow w-1/2"></div>
</div>
</div>
<!-- Footer Info -->
<footer class="bg-surface-container-highest flex justify-between items-center px-container-padding py-2 border-t border-primary/20">
<span class="font-terminal-text text-terminal-text text-primary">SYSTEM READY • IDLE</span>

<span class="font-label-caps text-label-caps text-on-surface-variant">© 2024 Excel Date Fixer</span>
</footer>
</div>
<!-- Script for simple interaction simulations -->
<script>
        // Simulate progress bar movement periodically
        const progressBar = document.getElementById('progress-bar');
        setInterval(() => {
            let currentWidth = parseInt(progressBar.style.width);
            if (currentWidth < 95) {
                progressBar.style.width = (currentWidth + 1) + '%';
            }
        }, 3000);

        // Simple button active state toggle simulation
        document.querySelectorAll('.mica-effect').forEach(card => {
            card.addEventListener('click', () => {
                if (!card.classList.contains('card-active')) {
                    // Just a visual toggle for demo
                    card.classList.add('card-active');
                } else {
                    card.classList.remove('card-active');
                }
            });
        });
    </script>


</body></html>