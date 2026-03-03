// src/hooks/hooks.ts
import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { fixture } from "./pageFixture";

setDefaultTimeout(60000); // 60 secondes

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
    browser = await chromium.launch({ 
        headless: false,  // ← CHANGE À false pour voir le navigateur
        slowMo: 100       // ← Ralentit les actions pour paraître plus humain
    });
    console.log('✅ Navigateur lancé (mode visible)');
});

Before(async function () {
    context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    const page = await context.newPage();
    fixture.page = page;
    console.log('✅ Page créée');
});

After(async function () {
    if (fixture.page) await fixture.page.close();
    if (context) await context.close();
    console.log('✅ Page fermée');
});

AfterAll(async () => {
    if (browser) await browser.close();
    console.log('✅ Navigateur fermé');
});