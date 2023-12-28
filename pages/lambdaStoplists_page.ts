import { APIRequestContext, expect, request } from '@playwright/test'
import * as fs from 'fs';

export const failedWords: string[] = []; // array with Failed Words 

export class ApiLambdaStoplistsPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async lambdaStoplists(url: string, type: 'chat_only' | 'private_chat' | 'name_and_status', word: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            "string": `${word}`,
            "type": `${type}`,
            "languages": ["*"]
        }

        const apiRequest = await apiContext.post(url, { data })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const replaced = response.replaced
        const numberOfAsterisks = (replaced.match(/\*/g) || []).length;
        const expectedNumberOfAsterisks = word.length;
        const haveMatches = response.haveMatches
        //display the Test with World which Passed/Failed Test
        const actualStatusCode = apiRequest.status()
        const testStatus = actualStatusCode === 200 && numberOfAsterisks === expectedNumberOfAsterisks;
        console.log(`The test with the Word -> ${word} ${testStatus ? 'passed' : 'failed'}`)
        //add Failed Words to the array 
        !testStatus && failedWords.push(word);
        expect(haveMatches).toEqual(true)
        expect(replaced).toContain("*")
        expect(numberOfAsterisks).toEqual(expectedNumberOfAsterisks);
        console.log(`The Word: ${word} is blocked`)
        
    }

}

export async function readWordsFromFile(filePath: string) {
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        const wordsArray = Array.from(new Set(
        fileContent
          .split('\n')
          .map(word => word.trim())
          .filter(word => !word.includes('(') && !word.includes('['))
        ));
        return wordsArray;
    } catch (error) {
      console.error(`Reading Error: ${error.message}`);
      return [];
    }
}

export async function writeFailedWordsToFile(filePath: string) {
    try {
        const currentDate = new Date();
        const data = `${failedWords.join('\n')}\n\nThe Words added on: ${currentDate.toISOString()}\n`;
        await fs.promises.writeFile(filePath, data, 'utf-8');
    } catch (error) {
        console.error(`Writing Failed Words to File Error: ${error.message}`);
    }
}
