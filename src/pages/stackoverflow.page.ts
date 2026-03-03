import { Page } from '@playwright/test';

export class StackoverflowPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://stackoverflow.com/questions?tab=Newest', {
            waitUntil: 'networkidle'
        });
    }

    async getFirstQuestionTitle(): Promise<string> {
        // Attendre que les questions soient chargées
        await this.page.waitForSelector('.question-summary', { timeout: 30000 });
        
        // Récupérer le premier titre
        const firstQuestion = await this.page.locator('.question-summary .question-hyperlink').first();
        const title = await firstQuestion.textContent();
        
        return title?.trim() ?? '';
    }
}
