import { APIRequestContext, expect, request } from '@playwright/test'

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
        const apiRequest = await apiContext.post(url, { data})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const replaced = response.replaced
        const numberOfAsterisks = (replaced.match(/\*/g) || []).length;
        const expectedNumberOfAsterisks = word.length;
        const haveMatches = response.haveMatches
        //display the Test with World which Passed/Failed Test
        const actualStatusCode = apiRequest.status()
        const testStatus = actualStatusCode === 200
        console.log(`The test with the Word -> ${word} ${testStatus ? 'passed' : 'failed'}`)
        // console.log(numberOfAsterisks)
        // console.log(expectedNumberOfAsterisks)
        // console.log(word)
        //check the response 
        expect(haveMatches).toEqual(true)
        expect(replaced).toContain("*")
        expect(numberOfAsterisks).toEqual(expectedNumberOfAsterisks);
        console.log(`The Word: ${word} is blocked`)

    }
}