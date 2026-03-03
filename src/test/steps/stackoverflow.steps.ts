import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { StackoverflowPage } from '../../pages/stackoverflow.page';
import { fixture } from '../../hooks/pageFixture';

let apiTitle: string;
let webTitle: string;

When('je récupère la première question via lAPI', async function () {
    console.log('🔵 Appel API');
    
    const response = await fetch('https://api.stackexchange.com/2.3/questions?order=desc&sort=creation&site=stackoverflow&pagesize=1');
    const data: any = await response.json(); // ← Utilise "any"
    apiTitle = data.items[0].title;
    
    console.log('✅ API:', apiTitle);
});

When('je récupère la première question sur la page web', async function () {
    console.log('🟢 Récupération web');
    
    if (!fixture.page) {
        throw new Error('❌ Page non initialisée');
    }

    const page = new StackoverflowPage(fixture.page);
    await page.goto();
    webTitle = await page.getFirstQuestionTitle();
    
    console.log('✅ Web:', webTitle);
});

Then('les deux titres devraient être identiques', function () {
    console.log('🟣 Comparaison');
    console.log('API:', apiTitle);
    console.log('Web:', webTitle);
    
    expect(apiTitle).toBe(webTitle);
    console.log('🎉 SUCCÈS!');
});