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
    async getLambdaStoplists(url: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
            const data = {
                "language": "en", 
                "type": "chat_only",
                "name": ""
            }
            const headers = {
                'Authorization': 'Bearer F5MhEkJ7xbrkgjy7ZZFzQVQXYv9Rdva3',
                'packagename': 'com.plamfy',
                'content-type': 'application/json',
                'appversion': '1',
                'os': 'ios'
            }
            const apiRequest = await apiContext.get(url, { data, headers: headers })
            expect(apiRequest.ok()).toBeTruthy()
            const response = await apiRequest.json()
            const chatOnlyEs = response[0].words
            const chatOnlyRu = response[1].words
            const nameAndStatuses = response[2].words
            const chatOnlyEn = response[3].words
            const privateChat = response[4].words
            return { chatOnlyEn, chatOnlyEs, chatOnlyRu, nameAndStatuses, privateChat }
    }

    async stopListsFilter(stopListArray: any) {
        const newStopListArray = Array.from(new Set(
            stopListArray
                .map((word: string) => word.trim())
                .filter((word: string) => !word.includes('(') && !word.includes('['))
        ));
        return Promise.resolve(newStopListArray);
    }

    async writeFailedWordsToFile(filePath: string) {
        try {
            const currentDate = new Date();
            const data = `${failedWords.join('\n')}\n\nThe Words added on: ${currentDate.toISOString()}\n`;
            await fs.promises.writeFile(filePath, data, 'utf-8');
        } catch (error) {
            console.error(`Writing Failed Words to File Error: ${error.message}`);
        }
    }

}

export function stopListsFilter(stopListArray: any) {
    const newStopListArray = Array.from(new Set(
        stopListArray
            .map((word: string) => word.trim())
            .filter((word: string) => !word.includes('(') && !word.includes('['))
    ));
    return Promise.resolve(newStopListArray);
}