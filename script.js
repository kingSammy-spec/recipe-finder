document.querySelector('.search-bar button').addEventListener('click', () => {
    const input = document.querySelector('.search-bar input');
    if (input.value) {
        const query = input.value;
        input.value = '';

        // Intercept search with an interstitial ad before finding the fridge recipe!
        showSessionInterstitialAd(() => {
            const cardGrid = document.querySelector('.recipe-grid');
            if (cardGrid) {
                // High-quality food photog pool from Unsplash
                const foodImagesPool = [
                    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&h=300&q=80", // Pizza
                    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=400&h=300&q=80", // Sandwich
                    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=400&h=300&q=80", // Toast
                    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&h=300&q=80", // Steak
                    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&h=300&q=80"  // Salad Plate
                ];
                const randomFoodImg = foodImagesPool[Math.floor(Math.random() * foodImagesPool.length)];

                const newCard = document.createElement('div');
                newCard.className = 'recipe-card';
                newCard.innerHTML = `
                    <img src="${randomFoodImg}" alt="${query}">
                    <div class="recipe-info">
                        <h3>Gourmet ${query}</h3>
                        <div class="meta"><span>12 min</span> • <span>Fresh Find</span></div>
                    </div>
                `;
                newCard.addEventListener('click', () => {
                    showSessionInterstitialAd(() => {
                        openDetail(newCard, Math.floor(Math.random() * 5));
                    });
                });
                cardGrid.prepend(newCard);
                
                // Trigger recipe synchronized success modal!
                const celebrationModal = document.getElementById('celebrationModal');
                if (celebrationModal) celebrationModal.style.display = 'flex';
            }
        });
    }
});

document.querySelectorAll('.recipe-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        // Intercept recipe inspections with a skip-ad countdown!
        showSessionInterstitialAd(() => {
            openDetail(card, index);
        });
    });
});

function openDetail(card, id) {
    const title = card.querySelector('h3').innerText;
    const meta = card.querySelector('.meta').innerText;
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');
    
    // Choose beautiful food hero photos from Unsplash
    const heroPool = [
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&h=600&q=80", // Kitchen Cooking
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=1200&h=600&q=80", // Pancakes Setup
        "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=1200&h=600&q=80"  // Soup Cooking
    ];
    const randomHero = heroPool[id % heroPool.length];

    // High quality food galleries from Unsplash
    const galleryPool1 = [
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&h=400&q=80",
        "https://images.unsplash.com/photo-1496116211227-7d3ccb8f4180?auto=format&fit=crop&w=400&h=400&q=80"
    ];
    const galleryPool2 = [
        "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=400&h=400&q=80",
        "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&h=400&q=80"
    ];
    const galleryPool3 = [
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&h=400&q=80",
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=400&h=400&q=80"
    ];

    body.innerHTML = `
        <div class="modal-hero" style="background:url('${randomHero}') center/cover; height:400px; border-radius:12px; margin-bottom:2rem;"></div>
        <div class="meta" style="color:#e67e22; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:1rem;">${meta}</div>
        <h2 style="font-size:3.5rem; margin:1rem 0; font-family: 'Lora', serif; font-style:italic; color:#2d3436;">${title}</h2>
        <p style="font-size:1.2rem; color:#444; line-height:1.8; margin-bottom:2rem;">This ${title} recipe has been perfected over generations to deliver an explosion of flavor while remaining accessible for home cooks. We use only the freshest ingredients to ensure a gourmet experience in your own kitchen.</p>
        
        <div class="extensive-info" style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin:3rem 0;">
            <div style="background:#fff9f0; padding:2rem; border-radius:12px; border: 1px solid rgba(230,126,34,0.15);">
                <h3 style="margin-bottom:1rem; color:#d35400;">Ingredients</h3>
                <ul style="list-style:none; padding:0; color:#555;">
                    <li>• 500g High-Quality Produce</li>
                    <li>• 2tbsp Extra Virgin Olive Oil</li>
                    <li>• 1tsp Secret Spice Blend</li>
                    <li>• Fresh Herbs for Garnish</li>
                </ul>
            </div>
            <div style="background:#f0fff4; padding:2rem; border-radius:12px; border: 1px solid rgba(46,204,113,0.15);">
                <h3 style="margin-bottom:1rem; color:#27ae60;">Nutrition (Per Serving)</h3>
                <ul style="list-style:none; padding:0; color:#555;">
                    <li><strong>Calories:</strong> 450kcal</li>
                    <li><strong>Protein:</strong> 25g</li>
                    <li><strong>Fat:</strong> 15g</li>
                    <li><strong>Carbs:</strong> 40g</li>
                </ul>
            </div>
        </div>

        <div class="image-gallery" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; margin-top:3rem;">
            <img src="${galleryPool1[id % galleryPool1.length]}" style="width:100%; border-radius:8px; object-fit:cover; height:200px;">
            <img src="${galleryPool2[id % galleryPool2.length]}" style="width:100%; border-radius:8px; object-fit:cover; height:200px;">
            <img src="${galleryPool3[id % galleryPool3.length]}" style="width:100%; border-radius:8px; object-fit:cover; height:200px;">
        </div>
    `;
    
    modal.style.display = 'flex';
}

document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('detailModal').style.display = 'none';
});

window.onclick = (event) => {
    const modal = document.getElementById('detailModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


// Close Celebration Modal Handler
const btnCloseCelebration = document.getElementById('btn-close-celebration');
if (btnCloseCelebration) {
    btnCloseCelebration.addEventListener('click', () => {
        document.getElementById('celebrationModal').style.display = 'none';
    });
}

// ========================================================
// STRATEGIC AD SYSTEM ENGINE (RECIPE FINDER EDITION)
// ========================================================

// 1. Rotating Bottom Banner Ad Pool
const FLOATING_ADS = [
    {
        badge: 'PRO SPONSOR',
        text: '🍳 <strong>ChefMate Premium:</strong> Unlock 5,000+ ad-free chef guides and recipe filters. Try 14 days free!',
        buttonText: 'Claim Trial',
        alertMsg: 'Opening ChefMate Premium trial signup... Your 14-day free trial has been activated!'
    },
    {
        badge: 'KITCHEN UPGRADE',
        text: '🔪 <strong>GourmetEdge Knives:</strong> High-carbon Japanese steel chef knives. Use code <strong>SHARP20</strong> for 20% off.',
        buttonText: 'Shop Knives',
        alertMsg: 'Opening GourmetEdge catalog... Coupon SHARP20 applied!'
    },
    {
        badge: 'MEAL DELIVERY',
        text: '🥗 <strong>Blue Apron Gourmet:</strong> Fresh organic ingredients & pre-measured meal kits delivered. Get $120 off!',
        buttonText: 'Claim $120',
        alertMsg: 'Opening Blue Apron gourmet portal... $120 savings code loaded!'
    },
    {
        badge: 'BAKING POWER',
        text: '🍰 <strong>MixMaster Pro:</strong> 10-speed planetary stand mixers with heavy-duty copper hooks. 25% off!',
        buttonText: 'Shop Mixers',
        alertMsg: 'Opening MixMaster official outlet... 25% holiday discount applied!'
    },
    {
        badge: 'WINE PAIRING',
        text: '🍷 <strong>Sommelier Reserve:</strong> Curated vintage wine pairing boxes delivered monthly. Get $50 off first box.',
        buttonText: 'Order Cellar',
        alertMsg: 'Redirecting to Sommelier Reserve wine pairing signup... $50 off coupon activated!'
    },
    {
        badge: 'COOKBOOK GUIDE',
        text: '📚 <strong>Mastering Soups E-Book:</strong> 250+ legendary Michelin-starred winter stew recipes. Just $2.99!',
        buttonText: 'Download',
        alertMsg: 'Redirecting to PDF cookbook download platform... Chef recipe catalog loaded!'
    }
];

// 2. Interchanging Full-Screen Recurring Pop-up Ad Pool
const POPUP_ADS = [
    {
        type: 'premium',
        badge: '🍳',
        title: 'ChefMate Premium',
        subtitle: 'UNLIMITED GOURMET ACCESS',
        desc: 'Unlock thousands of HD video tutorials, offline ingredient shopping list generation, exact calorie calculators, and disable all programmatic sponsor banners.',
        promoText: 'Special Gourmet Discount Expires In:',
        hasTimer: true,
        acceptBtnText: 'Go Premium ($2)',
        declineBtnText: 'No Thanks',
        alertMsg: '🎉 ChefMate Premium activated successfully! All cooking steps unlocked, and ads disabled.'
    },
    {
        type: 'sponsor',
        badge: '🥗',
        title: 'Blue Apron gourmet',
        subtitle: 'SPONSORED FRESH MEAL BOXES',
        desc: 'Skip the supermarket lines. Get pre-measured organic farm produce and step-by-step recipes delivered to your doorstep. Rated 4.8/5 by home chefs.',
        promoText: 'LIMITED TIME CODE: CHEFMATE120',
        hasTimer: false,
        acceptBtnText: 'Claim $120 Off',
        declineBtnText: 'Close Ad',
        alertMsg: 'Redirecting to Blue Apron discount portal... $120 promo code applied!'
    },
    {
        type: 'sponsor',
        badge: '🔪',
        title: 'GourmetEdge cutlery',
        subtitle: 'SPONSORED KITCHEN UPGRADES',
        desc: 'Handcrafted 67-layer Damascus steel kitchen knives with military-grade resin handles. Perfect balance and everlasting sharp edges.',
        promoText: 'SPECIAL 20% OFFER ON 7-PIECE COLLECTOR SETS',
        hasTimer: false,
        acceptBtnText: 'Shop Cutlery',
        declineBtnText: 'Skip Cutlery',
        alertMsg: 'Redirecting to GourmetEdge collection... Use code SHARP20 at checkout for 20% off!'
    },
    {
        type: 'sponsor',
        badge: '🍷',
        title: 'Sommelier Reserve',
        subtitle: 'SPONSORED VINTAGE CELLARS',
        desc: 'Elevate your dinners with hand-selected artisan wines paired specifically to your recipe search list.',
        promoText: 'GET FIRST WINE CELLAR BOX AT 50% OFF',
        hasTimer: false,
        acceptBtnText: 'Order Wine Box',
        declineBtnText: 'Dismiss Ad',
        alertMsg: 'Redirecting to Sommelier Reserve signup... 50% off discount activated!'
    },
    {
        type: 'sponsor',
        badge: '🍰',
        title: 'MixMaster Pro Studio',
        subtitle: 'NATIVE BAKING SPONSOR',
        desc: 'High-durability all-metal stand mixers with integrated food grinder and pasta roller attachments. Heavy duty 600W copper core motor.',
        promoText: 'FREE STAND MIXER SPLASH SHIELD INCLUDED',
        hasTimer: false,
        acceptBtnText: 'Shop Mixers',
        declineBtnText: 'Close Studio',
        alertMsg: 'Redirecting to MixMaster official outlet... Free shipping and splash shield added to order!'
    }
];

// 3. Floating Banner Rotation Logic
const floatingAdBanner = document.getElementById('floating-ad-banner');
let currentAdIdx = 0;
let bannerRotationInterval = null;

function renderBannerAd(idx) {
    if (!floatingAdBanner || FLOATING_ADS.length === 0) return;
    const ad = FLOATING_ADS[idx];
    floatingAdBanner.innerHTML = `
        <div class="banner-content">
            <span class="banner-badge">${ad.badge} ${ad.badge === 'PRO SPONSOR' ? 'PRO' : 'SPONSOR'}</span>
            <p>${ad.text}</p>
        </div>
        <div class="banner-actions">
            <button class="btn-banner-action" id="btn-banner-shop">${ad.buttonText}</button>
            <button class="btn-banner-close" id="btn-banner-close">&times;</button>
        </div>
    `;
}

function rotateFloatingAd() {
    if (!floatingAdBanner || floatingAdBanner.style.display === 'none') return;
    floatingAdBanner.classList.add('fade-out');
    setTimeout(() => {
        currentAdIdx = (currentAdIdx + 1) % FLOATING_ADS.length;
        renderBannerAd(currentAdIdx);
        floatingAdBanner.classList.remove('fade-out');
    }, 400);
}

// Slide-in the floating banner after 4 seconds
setTimeout(() => {
    if (floatingAdBanner) {
        renderBannerAd(currentAdIdx);
        floatingAdBanner.style.display = 'flex';
        bannerRotationInterval = setInterval(rotateFloatingAd, 10000);
    }
}, 4000);

// Safe Event Delegation for floating banner
if (floatingAdBanner) {
    floatingAdBanner.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'btn-banner-close') {
            floatingAdBanner.style.display = 'none';
            if (bannerRotationInterval) clearInterval(bannerRotationInterval);
        } else if (target.id === 'btn-banner-shop') {
            const activeAd = FLOATING_ADS[currentAdIdx];
            alert(activeAd.alertMsg);
            floatingAdBanner.style.display = 'none';
            if (bannerRotationInterval) clearInterval(bannerRotationInterval);
        }
    });
}

// 4. Recurring Interchanging Pop-up Modal Logic
const premiumUpgradeModal = document.getElementById('premiumUpgradeModal');
let activePopupIdx = 0;
let upgradeCountdownTimer = null;
let nextPopupTimeout = null;

function startPremiumCountdown() {
    let durationSeconds = 10 * 60; // 10 minutes
    const display = document.getElementById('premium-timer-display');
    if (!display) return;
    
    if (upgradeCountdownTimer) clearInterval(upgradeCountdownTimer);
    upgradeCountdownTimer = setInterval(() => {
        durationSeconds--;
        if (durationSeconds >= 0) {
            const mins = Math.floor(durationSeconds / 60);
            const secs = durationSeconds % 60;
            display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            clearInterval(upgradeCountdownTimer);
            premiumUpgradeModal.style.display = 'none';
            scheduleNextPopup();
        }
    }, 1000);
}

function renderPopupAdContent(ad) {
    if (!premiumUpgradeModal) return;
    
    let promoHTML = ad.hasTimer
        ? `<div style="background: rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.08); padding: 1.2rem; border-radius: 12px; margin-bottom: 2.5rem; display: flex; justify-content: center; align-items: center; gap: 1rem; color:#333;">
               <span style="font-size: 0.85rem; font-weight: 700; color: #666;">${ad.promoText}</span>
               <span id="premium-timer-display" style="font-family: monospace; font-size: 1.5rem; font-weight: 800; color: #e67e22;">10:00</span>
           </div>`
        : `<div style="background: rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.08); padding: 1.2rem; border-radius: 12px; margin-bottom: 2.5rem; text-align: center;">
               <span style="font-size: 0.95rem; font-weight: 800; color: #e67e22; letter-spacing: 0.5px; text-transform: uppercase;">${ad.promoText}</span>
           </div>`;

    premiumUpgradeModal.innerHTML = `
        <div class="modal-content" style="max-width: 540px; text-align: center; border-color: rgba(230, 126, 34, 0.15); box-shadow: 0 0 40px rgba(230, 126, 34, 0.05);">
            <div class="celebration-badge" style="font-size: 4rem; animation: pulse 2s infinite; margin-bottom: 1rem;">${ad.badge}</div>
            <h2 style="font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 2.2rem; color: #e67e22; margin: 1rem 0 0.5rem; letter-spacing: -1px; text-transform: uppercase;">${ad.title}</h2>
            <p style="color: #888; font-size: 0.85rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1.5rem;">${ad.subtitle}</p>
            <p style="color: #555; font-size: 1.05rem; line-height: 1.6; margin-bottom: 2rem;">${ad.desc}</p>
            ${promoHTML}
            <div style="display: flex; gap: 1.5rem;">
                <button class="btn-secondary" id="btn-decline-upgrade" style="flex: 1; padding: 1rem;">${ad.declineBtnText}</button>
                <button class="ad-btn" id="btn-accept-upgrade" style="flex: 1; padding: 1rem; background: #e67e22; color:white; border-color:#e67e22;">${ad.acceptBtnText}</button>
            </div>
        </div>
    `;
    if (ad.hasTimer) startPremiumCountdown();
}

function triggerPopupAdFlow() {
    if (!premiumUpgradeModal) return;
    renderPopupAdContent(POPUP_ADS[activePopupIdx]);
    premiumUpgradeModal.style.display = 'flex';
}

function scheduleNextPopup(delayMs = 60000) {
    if (nextPopupTimeout) clearTimeout(nextPopupTimeout);
    nextPopupTimeout = setTimeout(() => {
        activePopupIdx = (activePopupIdx + 1) % POPUP_ADS.length;
        triggerPopupAdFlow();
    }, delayMs);
}

// Start recurring popup loop after 15 seconds
setTimeout(triggerPopupAdFlow, 15000);

// Event delegation on popup modal
if (premiumUpgradeModal) {
    premiumUpgradeModal.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'btn-decline-upgrade') {
            premiumUpgradeModal.style.display = 'none';
            if (upgradeCountdownTimer) clearInterval(upgradeCountdownTimer);
            scheduleNextPopup();
        } else if (target.id === 'btn-accept-upgrade') {
            const activeAd = POPUP_ADS[activePopupIdx];
            alert(activeAd.alertMsg);
            premiumUpgradeModal.style.display = 'none';
            if (upgradeCountdownTimer) clearInterval(upgradeCountdownTimer);
            
            if (activeAd.type === 'premium') {
                // Remove all ads for ChefMate Premium!
                if (floatingAdBanner) floatingAdBanner.style.display = 'none';
                if (bannerRotationInterval) clearInterval(bannerRotationInterval);
                if (nextPopupTimeout) clearTimeout(nextPopupTimeout);
            } else {
                scheduleNextPopup();
            }
        }
    });
}

// 5. Interstitial Search/Details Completion Skip-Ad
const interstitialModal = document.getElementById('interstitialAdModal');
const btnSkipAd = document.getElementById('btn-skip-ad');
const btnClaimAd = document.getElementById('btn-claim-ad');
let interstitialTimer = null;
let interstitialCallback = null;

const INTERSTITIAL_CAMPAIGNS = [
    {
        title: 'Blue Apron gourmet',
        desc: 'Enjoy premium ingredients and chef-quality recipe guides delivered to your doorstep. $120 off first boxes.',
        promo: 'ENTER CODE "CHEFMATE120" AT CHECKOUT',
        img: 'https://images.unsplash.com/photo-1543083115-638c32cd3d58?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'GourmetEdge cutlery',
        desc: 'Handcrafted 67-layer Damascus steel kitchen knives with military-grade resin handles. Perfect balance.',
        promo: 'GET 20% OFF: SHARP20',
        img: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Sommelier Wine pairing',
        desc: 'Elevate your dinners with hand-selected artisan vintage wines paired directly to your Lora search list.',
        promo: 'CODE "SOMM50" SAVES 50%',
        img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=200&h=200&q=80'
    }
];

function showSessionInterstitialAd(onClosed) {
    if (!interstitialModal) {
        onClosed();
        return;
    }
    
    interstitialCallback = onClosed;
    
    // Choose random interstitial campaign
    const campaign = INTERSTITIAL_CAMPAIGNS[Math.floor(Math.random() * INTERSTITIAL_CAMPAIGNS.length)];
    const imgEl = document.getElementById('interstitial-ad-img');
    const titleEl = document.getElementById('interstitial-ad-title');
    const descEl = document.getElementById('interstitial-ad-desc');
    const promoEl = document.getElementById('interstitial-ad-promo');
    
    if (imgEl) imgEl.src = campaign.img;
    if (titleEl) titleEl.innerText = campaign.title;
    if (descEl) descEl.innerText = campaign.desc;
    if (promoEl) promoEl.innerText = campaign.promo;

    interstitialModal.style.display = 'flex';
    
    btnSkipAd.disabled = true;
    btnSkipAd.style.opacity = '0.4';
    btnSkipAd.style.cursor = 'not-allowed';
    btnSkipAd.innerText = 'Skip Ad in 5s';
    
    let count = 5;
    if (interstitialTimer) clearInterval(interstitialTimer);
    
    interstitialTimer = setInterval(() => {
        count--;
        if (count > 0) {
            btnSkipAd.innerText = `Skip Ad in ${count}s`;
        } else {
            clearInterval(interstitialTimer);
            btnSkipAd.innerText = 'Skip Ad';
            btnSkipAd.disabled = false;
            btnSkipAd.style.opacity = '1';
            btnSkipAd.style.cursor = 'pointer';
        }
    }, 1000);
}

if (btnSkipAd) {
    btnSkipAd.addEventListener('click', () => {
        interstitialModal.style.display = 'none';
        
        // Render precise synchronization celebration modal
        const celebrationModal = document.getElementById('celebrationModal');
        if (celebrationModal) {
            celebrationModal.style.display = 'flex';
        } else if (interstitialCallback) {
            interstitialCallback();
        }
    });
}

if (btnClaimAd) {
    btnClaimAd.addEventListener('click', () => {
        alert('🎉 Gourmet Offer Claimed! Promo code copied to your clipboard.');
        interstitialModal.style.display = 'none';
        
        const celebrationModal = document.getElementById('celebrationModal');
        if (celebrationModal) {
            celebrationModal.style.display = 'flex';
        } else if (interstitialCallback) {
            interstitialCallback();
        }
    });
}

// Celebration Close Handler
const btnCloseCelebrationModal = document.getElementById('btn-close-celebration');
if (btnCloseCelebrationModal) {
    btnCloseCelebrationModal.addEventListener('click', () => {
        document.getElementById('celebrationModal').style.display = 'none';
        if (interstitialCallback) {
            interstitialCallback();
            interstitialCallback = null;
        }
    });
}



