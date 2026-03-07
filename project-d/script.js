const yearNode = document.getElementById('year');
const cashValue = document.getElementById('cash-value');
const inventoryValueNode = document.getElementById('inventory-value');
const openedValueNode = document.getElementById('opened-value');
const incomeAmountNode = document.getElementById('income-amount');
const incomeIntervalNode = document.getElementById('income-interval');
const incomeCountdownNode = document.getElementById('income-countdown');
const caseListNode = document.getElementById('case-list');
const marketListNode = document.getElementById('market-list');
const inventoryListNode = document.getElementById('inventory-list');
const historyListNode = document.getElementById('history-list');
const rollWindowNode = document.getElementById('roll-window');
const rollTrackNode = document.getElementById('roll-track');
const rollResultNode = document.getElementById('roll-result');
const sellAllButton = document.getElementById('sell-all-btn');
const walletToggleButton = document.getElementById('wallet-toggle-btn');
const inventoryJumpButton = document.getElementById('inventory-jump-btn');
const inventoryPanel = document.getElementById('inventory-panel');
const searchInput = document.getElementById('market-search');
const containerCountNode = document.getElementById('container-count');
const categoryButtons = Array.from(document.querySelectorAll('[data-category]'));

const SAVE_COOKIE = 'caseRushSaveV3';
const SAVE_DAYS = 365;
const INCOME_AMOUNT = 70;
const INCOME_INTERVAL_MS = 90 * 1000;
const MIN_WALLET_RESERVE = 150;
const TARGET_PROFIT_CHANCE = 0.2;
const API_SKINS_URL = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json';
const API_CRATES_URL = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/crates.json';

function fallbackImage(label) {
    return `https://dummyimage.com/600x340/1a2e87/b3c7ff.png&text=${encodeURIComponent(label)}`;
}

function makeFallbackSkin(id, name, rarity, value) {
    return {
        id,
        name,
        rarity,
        value,
        image: fallbackImage(name)
    };
}

const skinCatalog = {
    elitebuild: makeFallbackSkin('elitebuild', 'AK-47 | Elite Build', 'mil-spec', 7.2),
    p250asiimov: makeFallbackSkin('p250asiimov', 'P250 | Asiimov', 'industrial', 6.8),
    frontside: makeFallbackSkin('frontside', 'AK-47 | Frontside Misty', 'restricted', 24.5),
    nightmare: makeFallbackSkin('nightmare', 'M4A1-S | Nightmare', 'restricted', 16.3),
    redline: makeFallbackSkin('redline', 'AK-47 | Redline', 'classified', 40.2),
    hyperbeast: makeFallbackSkin('hyperbeast', 'M4A1-S | Hyper Beast', 'classified', 59.4),
    mp9starlight: makeFallbackSkin('mp9starlight', 'MP9 | Starlight Protector', 'classified', 68.2),
    asiimovawp: makeFallbackSkin('asiimovawp', 'AWP | Asiimov', 'covert', 142.0),
    deagleblaze: makeFallbackSkin('deagleblaze', 'Desert Eagle | Blaze', 'covert', 530.0),
    atheris: makeFallbackSkin('atheris', 'AWP | Atheris', 'mil-spec', 12.7),
    famasrollcage: makeFallbackSkin('famasrollcage', 'FAMAS | Roll Cage', 'restricted', 14.9),
    fivezeblue: makeFallbackSkin('fivezeblue', 'Five-SeveN | Case Hardened', 'classified', 44.2),
    uspprintstream: makeFallbackSkin('uspprintstream', 'USP-S | Printstream', 'classified', 65.0),
    mac10neon: makeFallbackSkin('mac10neon', 'MAC-10 | Neon Rider', 'classified', 24.2),
    glockfade: makeFallbackSkin('glockfade', 'Glock-18 | Fade', 'covert', 480.0),
    vulcan: makeFallbackSkin('vulcan', 'AK-47 | Vulcan', 'covert', 210.0),
    asiimov: makeFallbackSkin('asiimov', 'AK-47 | Asiimov', 'covert', 120.0),
    dragonlore: makeFallbackSkin('dragonlore', 'AWP | Dragon Lore', 'covert', 1800.0),
    galilchatter: makeFallbackSkin('galilchatter', 'Galil AR | Chatterbox', 'classified', 19.1)
};

const fallbackContainers = [
    {
        id: 'alpha-case',
        name: 'Alpha Strike Case',
        category: 'cases',
        price: 60,
        image: fallbackImage('Alpha Strike Case'),
        loot: [
            { skinId: 'p250asiimov', weight: 24 },
            { skinId: 'elitebuild', weight: 20 },
            { skinId: 'nightmare', weight: 18 },
            { skinId: 'frontside', weight: 14 },
            { skinId: 'redline', weight: 10 },
            { skinId: 'hyperbeast', weight: 8 },
            { skinId: 'mp9starlight', weight: 6 }
        ]
    },
    {
        id: 'sniper-case',
        name: 'Longshot Vault Case',
        category: 'cases-more',
        price: 105,
        image: fallbackImage('Longshot Vault Case'),
        loot: [
            { skinId: 'atheris', weight: 23 },
            { skinId: 'famasrollcage', weight: 19 },
            { skinId: 'mac10neon', weight: 16 },
            { skinId: 'fivezeblue', weight: 14 },
            { skinId: 'uspprintstream', weight: 11 },
            { skinId: 'asiimovawp', weight: 9 },
            { skinId: 'vulcan', weight: 8 }
        ]
    },
    {
        id: 'souvenir-fallback',
        name: 'Souvenir Legacy Package',
        category: 'souvenirs',
        price: 130,
        image: fallbackImage('Souvenir Package'),
        loot: [
            { skinId: 'galilchatter', weight: 26 },
            { skinId: 'frontside', weight: 18 },
            { skinId: 'redline', weight: 14 },
            { skinId: 'uspprintstream', weight: 12 },
            { skinId: 'asiimov', weight: 10 },
            { skinId: 'glockfade', weight: 8 }
        ]
    },
    {
        id: 'sticker-fallback',
        name: 'Sticker Capsule Legacy',
        category: 'stickers',
        price: 45,
        image: fallbackImage('Sticker Capsule'),
        loot: [
            { skinId: 'p250asiimov', weight: 28 },
            { skinId: 'nightmare', weight: 20 },
            { skinId: 'redline', weight: 14 },
            { skinId: 'hyperbeast', weight: 12 },
            { skinId: 'deagleblaze', weight: 6 }
        ]
    },
    {
        id: 'armory-fallback',
        name: 'Armory Access Container',
        category: 'armory',
        price: 190,
        image: fallbackImage('Armory Container'),
        loot: [
            { skinId: 'famasrollcage', weight: 20 },
            { skinId: 'fivezeblue', weight: 18 },
            { skinId: 'uspprintstream', weight: 16 },
            { skinId: 'asiimovawp', weight: 12 },
            { skinId: 'vulcan', weight: 10 },
            { skinId: 'dragonlore', weight: 3 }
        ]
    }
];

let containers = fallbackContainers.slice();
let marketSkins = [
    'elitebuild',
    'nightmare',
    'frontside',
    'redline',
    'atheris',
    'uspprintstream',
    'asiimovawp',
    'vulcan'
];

const defaultState = {
    cash: 700,
    inventory: [],
    openedCases: 0,
    soldSkins: 0,
    nextId: 1,
    walletMode: false,
    lastIncomeAt: Date.now(),
    history: []
};

const skinNameIndex = new Map();
Object.values(skinCatalog).forEach((skin) => {
    skinNameIndex.set(skin.name.toLowerCase(), skin.id);
});

let activeCategory = 'home';
let searchTerm = '';
let isRolling = false;
let state = loadState();

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}
if (incomeAmountNode) {
    incomeAmountNode.textContent = formatMoney(INCOME_AMOUNT);
}
if (incomeIntervalNode) {
    incomeIntervalNode.textContent = `${Math.floor(INCOME_INTERVAL_MS / 1000)}s`;
}

bindUiActions();
bootstrap();

async function bootstrap() {
    await hydrateFromApi();
    applyPassiveIncome();
    renderAll();
    setInterval(tickIncomeCountdown, 1000);
    setRollMessage('Choose a container and click open.', '');
}

function bindUiActions() {
    if (sellAllButton) {
        sellAllButton.addEventListener('click', sellAllSkins);
    }

    if (walletToggleButton) {
        walletToggleButton.addEventListener('click', () => {
            state.walletMode = !state.walletMode;
            addHistory(`Wallet mode ${state.walletMode ? 'enabled' : 'disabled'}.`, 'info');
            saveState();
            renderAll();
        });
    }

    if (inventoryJumpButton && inventoryPanel) {
        inventoryJumpButton.addEventListener('click', () => {
            inventoryPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            inventoryPanel.classList.add('pulse-highlight');
            window.setTimeout(() => {
                inventoryPanel.classList.remove('pulse-highlight');
            }, 900);
        });
    }

    categoryButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const nextCategory = button.getAttribute('data-category') || 'home';
            activeCategory = nextCategory;
            categoryButtons.forEach((node) => {
                node.classList.toggle('active', node === button);
            });
            renderCases();
            renderMarket();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            searchTerm = (searchInput.value || '').trim().toLowerCase();
            renderCases();
        });
    }
}

function formatMoney(value) {
    return `$${value.toFixed(2)}`;
}

function addHistory(text, kind = 'info') {
    const entry = {
        text,
        kind,
        time: Date.now()
    };

    state.history.push(entry);
    if (state.history.length > 35) {
        state.history = state.history.slice(-35);
    }
}

function clampInventorySize() {
    if (state.inventory.length > 130) {
        state.inventory = state.inventory.slice(-130);
    }
}

function saveState() {
    clampInventorySize();
    const serialized = encodeURIComponent(JSON.stringify(state));
    document.cookie = `${SAVE_COOKIE}=${serialized};max-age=${SAVE_DAYS * 24 * 60 * 60};path=/;samesite=lax`;
}

function getCookie(name) {
    const prefix = `${name}=`;
    const chunks = document.cookie.split(';');
    for (const chunk of chunks) {
        const trimmed = chunk.trim();
        if (trimmed.startsWith(prefix)) {
            return trimmed.slice(prefix.length);
        }
    }
    return null;
}

function loadState() {
    const raw = getCookie(SAVE_COOKIE);
    if (!raw) {
        return { ...defaultState };
    }

    try {
        const parsed = JSON.parse(decodeURIComponent(raw));
        return {
            cash: Number(parsed.cash) || defaultState.cash,
            inventory: Array.isArray(parsed.inventory) ? parsed.inventory : [],
            openedCases: Number(parsed.openedCases) || 0,
            soldSkins: Number(parsed.soldSkins) || 0,
            nextId: Number(parsed.nextId) || 1,
            walletMode: Boolean(parsed.walletMode),
            lastIncomeAt: Number(parsed.lastIncomeAt) || Date.now(),
            history: Array.isArray(parsed.history) ? parsed.history : []
        };
    } catch (error) {
        return { ...defaultState };
    }
}

async function hydrateFromApi() {
    try {
        const [skinsResponse, cratesResponse] = await Promise.all([
            fetch(API_SKINS_URL),
            fetch(API_CRATES_URL)
        ]);

        if (!skinsResponse.ok || !cratesResponse.ok) {
            throw new Error('api-unavailable');
        }

        const [skinsData, cratesData] = await Promise.all([
            skinsResponse.json(),
            cratesResponse.json()
        ]);

        if (Array.isArray(skinsData)) {
            skinsData.forEach((apiSkin) => {
                ingestApiSkin(apiSkin);
            });
        }

        if (Array.isArray(cratesData)) {
            const parsedContainers = cratesData
                .map((crate) => makeContainerFromApi(crate))
                .filter(Boolean);

            if (parsedContainers.length) {
                containers = parsedContainers;
                addHistory(`Loaded ${parsedContainers.length} CS2 containers from live API.`, 'good');
            }
        }

        rebuildMarketListings();
    } catch (error) {
        addHistory('Live API unavailable. Using fallback container set.', 'bad');
    }
}

function slugify(value) {
    return (value || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);
}

function hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
        hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
    }
    return hash;
}

function rarityFromApi(apiRarity) {
    const rarityName = String(apiRarity?.name || '').toLowerCase();
    if (rarityName.includes('consumer')) return 'consumer';
    if (rarityName.includes('industrial')) return 'industrial';
    if (rarityName.includes('mil-spec') || rarityName.includes('mid grade')) return 'mil-spec';
    if (rarityName.includes('restricted') || rarityName.includes('high grade')) return 'restricted';
    if (rarityName.includes('classified') || rarityName.includes('remarkable')) return 'classified';
    if (rarityName.includes('covert') || rarityName.includes('extraordinary') || rarityName.includes('contraband')) return 'covert';
    return 'mil-spec';
}

function estimateSkinValue(rarity, name) {
    const ranges = {
        consumer: [4, 10],
        industrial: [6, 16],
        'mil-spec': [12, 36],
        restricted: [22, 85],
        classified: [48, 180],
        covert: [90, 900]
    };

    const [min, max] = ranges[rarity] || ranges['mil-spec'];
    const ratio = (hashString(name) % 1000) / 999;
    return min + (max - min) * ratio;
}

function rarityWeight(rarity) {
    const table = {
        consumer: 30,
        industrial: 23,
        'mil-spec': 18,
        restricted: 13,
        classified: 9,
        covert: 5
    };
    return table[rarity] || 14;
}

function ensureSkinFromName(name, maybeImage, maybeRarity) {
    const key = String(name || '').trim();
    if (!key) return null;

    const existingId = skinNameIndex.get(key.toLowerCase());
    if (existingId && skinCatalog[existingId]) {
        return skinCatalog[existingId];
    }

    const rarity = maybeRarity || 'mil-spec';
    const id = slugify(key) || `skin-${Date.now()}`;
    let finalId = id;
    let suffix = 2;
    while (skinCatalog[finalId]) {
        finalId = `${id}-${suffix}`;
        suffix += 1;
    }

    skinCatalog[finalId] = {
        id: finalId,
        name: key,
        rarity,
        value: estimateSkinValue(rarity, key),
        image: maybeImage || fallbackImage(key)
    };
    skinNameIndex.set(key.toLowerCase(), finalId);
    return skinCatalog[finalId];
}

function ingestApiSkin(apiSkin) {
    if (!apiSkin || !apiSkin.name) return;

    const rarity = rarityFromApi(apiSkin.rarity);
    const image = apiSkin.image || fallbackImage(apiSkin.name);
    const skin = ensureSkinFromName(apiSkin.name, image, rarity);

    if (skin && apiSkin.image) {
        skin.image = apiSkin.image;
    }
}

function classifyContainer(name, type) {
    const stack = `${String(name || '')} ${String(type || '')}`.toLowerCase();
    if (/armory/.test(stack)) return 'armory';
    if (/souvenir/.test(stack)) return 'souvenirs';
    if (/(sticker|capsule|patch|pin capsule|graffiti)/.test(stack)) return 'stickers';
    if (/case/.test(stack)) return 'cases';
    return 'cases-more';
}

function estimateContainerPrice(category, name) {
    const hash = hashString(name);
    const spread = (hash % 1000) / 999;
    const ranges = {
        cases: [50, 185],
        'cases-more': [38, 160],
        armory: [110, 260],
        souvenirs: [80, 240],
        stickers: [18, 92]
    };
    const [min, max] = ranges[category] || ranges['cases-more'];
    return Math.round((min + (max - min) * spread) * 100) / 100;
}

function lootNameFromEntry(entry) {
    if (!entry) return '';
    if (typeof entry === 'string') return entry;
    if (typeof entry.name === 'string') return entry.name;
    if (typeof entry.item_name === 'string') return entry.item_name;
    return '';
}

function makeContainerFromApi(crate) {
    if (!crate || !crate.name) return null;

    const category = classifyContainer(crate.name, crate.type);
    const price = estimateContainerPrice(category, crate.name);
    const id = slugify(crate.id || crate.market_hash_name || crate.name);
    const image = crate.image || fallbackImage(crate.name);

    const rawLootEntries = [
        ...(Array.isArray(crate.contains) ? crate.contains : []),
        ...(Array.isArray(crate.contains_rare) ? crate.contains_rare : [])
    ];

    const seen = new Set();
    const loot = [];

    rawLootEntries.forEach((entry) => {
        const skinName = lootNameFromEntry(entry);
        if (!skinName) return;

        const rarity = rarityFromApi(entry.rarity);
        const skin = ensureSkinFromName(skinName, entry.image || '', rarity);
        if (!skin || seen.has(skin.id)) return;

        seen.add(skin.id);
        loot.push({
            skinId: skin.id,
            weight: rarityWeight(skin.rarity)
        });
    });

    if (!loot.length) {
        // Keep all containers openable even when API metadata misses drop tables.
        const fallbackPool = Object.values(skinCatalog).slice(0, 16);
        fallbackPool.forEach((skin) => {
            loot.push({ skinId: skin.id, weight: rarityWeight(skin.rarity) });
        });
    }

    return {
        id: id || `container-${Date.now()}`,
        name: crate.name,
        category,
        price,
        image,
        loot
    };
}

function rebuildMarketListings() {
    const allSkins = Object.values(skinCatalog).sort((a, b) => a.value - b.value);
    if (!allSkins.length) return;

    const selected = [];
    const step = Math.max(1, Math.floor(allSkins.length / 12));
    for (let i = 0; i < allSkins.length && selected.length < 12; i += step) {
        selected.push(allSkins[i].id);
    }

    if (!selected.length) {
        return;
    }

    marketSkins = selected;
}

function applyPassiveIncome() {
    const now = Date.now();
    const elapsed = now - state.lastIncomeAt;
    const ticks = Math.floor(elapsed / INCOME_INTERVAL_MS);

    if (ticks > 0) {
        const payout = ticks * INCOME_AMOUNT;
        state.cash += payout;
        state.lastIncomeAt += ticks * INCOME_INTERVAL_MS;
        addHistory(`Offline payout received: ${formatMoney(payout)}.`, 'good');
        saveState();
    }

    tickIncomeCountdown();
}

function tickIncomeCountdown() {
    const now = Date.now();
    const passed = now - state.lastIncomeAt;

    if (passed >= INCOME_INTERVAL_MS) {
        state.cash += INCOME_AMOUNT;
        state.lastIncomeAt = now;
        addHistory(`Passive payout collected: ${formatMoney(INCOME_AMOUNT)}.`, 'good');
        saveState();
        renderStats();
        renderHistory();
    }

    const remaining = Math.max(0, INCOME_INTERVAL_MS - (Date.now() - state.lastIncomeAt));
    if (incomeCountdownNode) {
        incomeCountdownNode.textContent = `${Math.ceil(remaining / 1000)}s`;
    }
}

function safeImg(url, alt, className) {
    const safeAlt = String(alt).replace(/"/g, '&quot;');
    return `<img class="${className}" src="${url}" alt="${safeAlt}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage(alt)}';">`;
}

function rarityBadgeClass(rarity) {
    return rarity.toLowerCase().replace(/\s+/g, '-');
}

function renderStats() {
    if (cashValue) {
        cashValue.textContent = formatMoney(state.cash);
    }
    if (openedValueNode) {
        openedValueNode.textContent = String(state.openedCases);
    }

    const inventoryValue = state.inventory.reduce((sum, item) => {
        const skin = skinCatalog[item.skinId];
        return skin ? sum + skin.value : sum;
    }, 0);

    if (inventoryValueNode) {
        inventoryValueNode.textContent = formatMoney(inventoryValue);
    }

    if (walletToggleButton) {
        walletToggleButton.textContent = `Wallet Mode: ${state.walletMode ? 'ON' : 'OFF'}`;
        walletToggleButton.classList.toggle('active', state.walletMode);
    }
}

function getFilteredContainers() {
    const byCategory = containers.filter((containerDef) => {
        if (activeCategory === 'home') return true;
        return containerDef.category === activeCategory;
    });

    if (!searchTerm) {
        return byCategory;
    }

    return byCategory.filter((containerDef) => {
        if (containerDef.name.toLowerCase().includes(searchTerm)) return true;
        return containerDef.loot.some((entry) => {
            const skin = skinCatalog[entry.skinId];
            return skin && skin.name.toLowerCase().includes(searchTerm);
        });
    });
}

function canOpenCase(caseDef) {
    if (isRolling) return false;
    if (state.cash < caseDef.price) return false;
    if (state.walletMode && state.cash - caseDef.price < MIN_WALLET_RESERVE) return false;
    return true;
}

function caseOddsText(caseDef) {
    const rarityTotals = {
        consumer: 0,
        industrial: 0,
        'mil-spec': 0,
        restricted: 0,
        classified: 0,
        covert: 0
    };

    let totalWeight = 0;
    caseDef.loot.forEach((entry) => {
        const skin = skinCatalog[entry.skinId];
        if (!skin) return;
        rarityTotals[skin.rarity] = (rarityTotals[skin.rarity] || 0) + entry.weight;
        totalWeight += entry.weight;
    });

    if (!totalWeight) {
        return `Profit chance: ${Math.round(TARGET_PROFIT_CHANCE * 100)}%`;
    }

    const topRarity = Object.entries(rarityTotals)
        .filter(([, value]) => value > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([rarity, value]) => `${rarity} ${Math.round((value / totalWeight) * 100)}%`)
        .join(' · ');

    return `Profit chance: ${Math.round(TARGET_PROFIT_CHANCE * 100)}% · ${topRarity}`;
}

function renderCases() {
    if (!caseListNode) return;

    const visibleContainers = getFilteredContainers();

    if (containerCountNode) {
        containerCountNode.textContent = `${visibleContainers.length} listed`;
    }

    if (!visibleContainers.length) {
        caseListNode.innerHTML = '<p class="empty-note">No containers match this filter.</p>';
        return;
    }

    caseListNode.innerHTML = visibleContainers.map((caseDef) => {
        const canAfford = canOpenCase(caseDef);
        const warning = state.walletMode && state.cash >= caseDef.price && state.cash - caseDef.price < MIN_WALLET_RESERVE
            ? `<p class="case-sub log-bad">Wallet reserve active (${formatMoney(MIN_WALLET_RESERVE)} min cash).</p>`
            : '';

        return `
            <article class="case-card">
                ${safeImg(caseDef.image, caseDef.name, 'case-thumb')}
                <div class="case-title">
                    <h3>${caseDef.name}</h3>
                    <p class="case-sub">Price: <strong>${formatMoney(caseDef.price)}</strong></p>
                    <p class="case-sub">${caseOddsText(caseDef)}</p>
                    ${warning}
                </div>
                <button class="btn" data-open-case="${caseDef.id}" ${!canAfford ? 'disabled' : ''}>Open</button>
            </article>
        `;
    }).join('');

    caseListNode.querySelectorAll('[data-open-case]').forEach((button) => {
        button.addEventListener('click', () => {
            const caseId = button.getAttribute('data-open-case');
            const caseDef = containers.find((entry) => entry.id === caseId);
            if (!caseDef) return;
            openCase(caseDef);
        });
    });
}

function renderMarket() {
    if (!marketListNode) return;

    marketListNode.innerHTML = marketSkins.map((skinId) => {
        const skin = skinCatalog[skinId];
        if (!skin) return '';

        const buyPrice = skin.value * 1.13;
        return `
            <article class="skin-row">
                ${safeImg(skin.image, skin.name, 'skin-thumb')}
                <div>
                    <h3>${skin.name}</h3>
                    <p class="skin-meta"><span class="rarity ${rarityBadgeClass(skin.rarity)}">${skin.rarity}</span> <span class="skin-value">${formatMoney(skin.value)}</span></p>
                </div>
                <button class="btn ghost" data-buy-skin="${skin.id}" ${state.cash < buyPrice || isRolling ? 'disabled' : ''}>Buy ${formatMoney(buyPrice)}</button>
            </article>
        `;
    }).join('');

    marketListNode.querySelectorAll('[data-buy-skin]').forEach((button) => {
        button.addEventListener('click', () => {
            const skinId = button.getAttribute('data-buy-skin');
            buySkin(skinId);
        });
    });
}

function renderInventory() {
    if (!inventoryListNode) return;

    if (!state.inventory.length) {
        inventoryListNode.innerHTML = '<p class="empty-note">No skins yet. Open containers or buy from market.</p>';
        if (sellAllButton) sellAllButton.disabled = true;
        return;
    }

    if (sellAllButton) sellAllButton.disabled = false;

    inventoryListNode.innerHTML = state.inventory.slice().reverse().map((item) => {
        const skin = skinCatalog[item.skinId];
        if (!skin) return '';

        const sellPrice = skin.value * 0.92;

        return `
            <article class="inventory-card">
                ${safeImg(skin.image, skin.name, 'skin-thumb')}
                <div>
                    <h3>${skin.name}</h3>
                    <p class="skin-meta"><span class="rarity ${rarityBadgeClass(skin.rarity)}">${skin.rarity}</span> <span class="skin-value">Sell ${formatMoney(sellPrice)}</span></p>
                </div>
                <button class="btn" data-sell-item="${item.uid}">Sell</button>
            </article>
        `;
    }).join('');

    inventoryListNode.querySelectorAll('[data-sell-item]').forEach((button) => {
        button.addEventListener('click', () => {
            const uid = Number(button.getAttribute('data-sell-item'));
            sellSkin(uid);
        });
    });
}

function renderHistory() {
    if (!historyListNode) return;

    if (!state.history.length) {
        historyListNode.innerHTML = '<p class="empty-note">No actions yet.</p>';
        return;
    }

    historyListNode.innerHTML = state.history
        .slice()
        .reverse()
        .map((item) => {
            const stamp = new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const kindClass = item.kind === 'good' ? 'log-good' : item.kind === 'bad' ? 'log-bad' : '';
            return `<article class="history-item ${kindClass}"><p>${item.text}</p><p class="history-time">${stamp}</p></article>`;
        })
        .join('');
}

function renderAll() {
    renderStats();
    renderCases();
    renderMarket();
    renderInventory();
    renderHistory();
}

function addSkinToInventory(skinId, source) {
    state.inventory.push({
        uid: state.nextId,
        skinId,
        source,
        acquiredAt: Date.now()
    });
    state.nextId += 1;
}

function buySkin(skinId) {
    const skin = skinCatalog[skinId];
    if (!skin || isRolling) return;

    const buyPrice = skin.value * 1.13;
    if (state.cash < buyPrice) {
        setRollMessage('Not enough cash for this listing.', 'log-bad');
        return;
    }

    state.cash -= buyPrice;
    addSkinToInventory(skinId, 'market');
    addHistory(`Bought ${skin.name} for ${formatMoney(buyPrice)}.`, 'good');
    saveState();
    renderAll();
    setRollMessage(`Bought ${skin.name} for ${formatMoney(buyPrice)}.`, 'log-good');
}

function sellSkin(uid) {
    const index = state.inventory.findIndex((item) => item.uid === uid);
    if (index < 0) return;

    const item = state.inventory[index];
    const skin = skinCatalog[item.skinId];
    if (!skin) return;

    const sellPrice = skin.value * 0.92;
    state.cash += sellPrice;
    state.inventory.splice(index, 1);
    state.soldSkins += 1;
    addHistory(`Sold ${skin.name} for ${formatMoney(sellPrice)}.`, 'good');
    saveState();
    renderAll();
    setRollMessage(`Sold ${skin.name} for ${formatMoney(sellPrice)}.`, 'log-good');
}

function sellAllSkins() {
    if (!state.inventory.length) return;

    const payout = state.inventory.reduce((sum, item) => {
        const skin = skinCatalog[item.skinId];
        return skin ? sum + skin.value * 0.92 : sum;
    }, 0);

    state.cash += payout;
    const count = state.inventory.length;
    state.soldSkins += count;
    state.inventory = [];
    addHistory(`Sold ${count} skins for ${formatMoney(payout)}.`, 'good');
    saveState();
    renderAll();
    setRollMessage(`Sold all skins for ${formatMoney(payout)}.`, 'log-good');
}

function setRollMessage(text, className) {
    if (!rollResultNode) return;
    rollResultNode.textContent = text;
    rollResultNode.classList.remove('log-good', 'log-bad');
    if (className) {
        rollResultNode.classList.add(className);
    }
}

function chooseWeightedEntry(entries) {
    const totalWeight = entries.reduce((acc, item) => acc + item.weight, 0);
    if (!totalWeight) return entries[entries.length - 1] || null;

    let roll = Math.random() * totalWeight;
    for (const entry of entries) {
        roll -= entry.weight;
        if (roll <= 0) {
            return entry;
        }
    }

    return entries[entries.length - 1] || null;
}

function chooseCaseWinner(caseDef) {
    const lootEntries = caseDef.loot
        .map((entry) => {
            const skin = skinCatalog[entry.skinId];
            if (!skin) return null;
            return {
                skin,
                weight: entry.weight
            };
        })
        .filter(Boolean);

    if (!lootEntries.length) {
        return null;
    }

    const profitEntries = lootEntries.filter((entry) => entry.skin.value > caseDef.price);
    const lossEntries = lootEntries.filter((entry) => entry.skin.value <= caseDef.price);

    const targetProfit = Math.random() < TARGET_PROFIT_CHANCE;
    const selectedPool = targetProfit && profitEntries.length ? profitEntries : (lossEntries.length ? lossEntries : lootEntries);
    const winnerEntry = chooseWeightedEntry(selectedPool);

    return winnerEntry ? winnerEntry.skin : null;
}

function renderRollStrip(items) {
    if (!rollTrackNode) return;

    rollTrackNode.style.transition = 'none';
    rollTrackNode.style.transform = 'translateX(0px)';
    rollTrackNode.innerHTML = items.map((skin) => {
        return `
            <article class="roll-item">
                ${safeImg(skin.image, skin.name, '')}
                <p>${skin.name}</p>
            </article>
        `;
    }).join('');
}

function spinToWinner(winner, poolSkins) {
    const spinItems = [];
    const totalItems = 42;
    const winnerIndex = 33;

    for (let i = 0; i < totalItems; i += 1) {
        const randomSkin = poolSkins[Math.floor(Math.random() * poolSkins.length)];
        spinItems.push(randomSkin);
    }

    spinItems[winnerIndex] = winner;
    renderRollStrip(spinItems);

    const itemWidth = 118;
    const gap = 12;
    const step = itemWidth + gap;
    const centerOffset = (rollWindowNode ? rollWindowNode.clientWidth : 720) / 2 - itemWidth / 2;
    const targetX = -(winnerIndex * step) + centerOffset;

    requestAnimationFrame(() => {
        if (!rollTrackNode) return;
        rollTrackNode.style.transition = 'transform 4.4s cubic-bezier(0.08, 0.75, 0.13, 1)';
        rollTrackNode.style.transform = `translateX(${targetX}px)`;
    });

    return new Promise((resolve) => {
        window.setTimeout(() => resolve(), 4500);
    });
}

async function openCase(caseDef) {
    if (isRolling) return;

    if (state.cash < caseDef.price) {
        setRollMessage('You need more cash for this container.', 'log-bad');
        return;
    }

    if (state.walletMode && state.cash - caseDef.price < MIN_WALLET_RESERVE) {
        setRollMessage(`Wallet mode keeps at least ${formatMoney(MIN_WALLET_RESERVE)} in reserve.`, 'log-bad');
        return;
    }

    isRolling = true;

    state.cash -= caseDef.price;
    addHistory(`Opened ${caseDef.name} for ${formatMoney(caseDef.price)}.`, 'info');
    saveState();
    renderAll();

    const casePool = caseDef.loot
        .map((entry) => skinCatalog[entry.skinId])
        .filter(Boolean);

    const winner = chooseCaseWinner(caseDef);
    if (!winner || !casePool.length) {
        isRolling = false;
        setRollMessage('Container loot unavailable.', 'log-bad');
        renderAll();
        return;
    }

    setRollMessage(`Opening ${caseDef.name}...`, '');
    await spinToWinner(winner, casePool);

    addSkinToInventory(winner.id, caseDef.id);
    state.openedCases += 1;

    const profit = winner.value - caseDef.price;
    const madeProfit = profit > 0;

    addHistory(
        `Unboxed ${winner.name} worth ${formatMoney(winner.value)} (${madeProfit ? '+' : ''}${formatMoney(profit)}).`,
        madeProfit ? 'good' : 'info'
    );

    isRolling = false;
    saveState();
    renderAll();
    setRollMessage(
        `You unboxed ${winner.name} (${formatMoney(winner.value)} | ${madeProfit ? 'profit' : 'loss'} ${formatMoney(Math.abs(profit))}).`,
        madeProfit ? 'log-good' : ''
    );
}
