import { request, test } from '@playwright/test'
import { chatOnlyBlacklistEn, chatOnlyBlacklistEs, chatOnlyBlacklistRu, nameAndStatusBlacklist, privateChatBlacklist } from './../pages/labdaStoplist_Payload'
import { dataSet } from '../utils/dataset';
import { ApiLambdaStoplistsPage } from '../pages/stoplistPage';

test.describe('Stoplist Page', async () => {

    //Chat Only Blacklist En
    for (const word of chatOnlyBlacklistEn) {
        test(`Test Cases -> Chat Only En with the word: ${word}`, async () => {
            const apiContext = await request.newContext();
            const stoplistPage = new ApiLambdaStoplistsPage(apiContext);
            await stoplistPage.lambdaStoplists(dataSet.prodUrl, 'chat_only', word)
        });
    }

    //Chat Only Blacklist Es
    for (const word of chatOnlyBlacklistEs) {
        test(`Test Cases -> Chat Only Es with the word: ${word}`, async () => {
            const apiContext = await request.newContext();
            const stoplistPage = new ApiLambdaStoplistsPage(apiContext);
            await stoplistPage.lambdaStoplists(dataSet.prodUrl, 'chat_only', word)
        });
    }

    //Chat Only Blacklist Ru
    for (const word of chatOnlyBlacklistRu) {
        test(`Test Cases -> Chat Only Ru with the word: ${word}`, async () => {
            const apiContext = await request.newContext();
            const stoplistPage = new ApiLambdaStoplistsPage(apiContext);
            await stoplistPage.lambdaStoplists(dataSet.prodUrl, 'chat_only', word)
        });
    }

    //Private Chat Blacklist 
    for (const word of privateChatBlacklist) {
        test(`Test Cases -> Private Chat with the word: ${word}`, async () => {
            const apiContext = await request.newContext();
            const stoplistPage = new ApiLambdaStoplistsPage(apiContext);
            await stoplistPage.lambdaStoplists(dataSet.prodUrl, 'private_chat', word)
        });
    }

    //Name and Statuses Blacklist 
    for (const word of nameAndStatusBlacklist) {
        test(`Test Cases -> Name and Statuses with the word: ${word}`, async () => {
            const apiContext = await request.newContext();
            const stoplistPage = new ApiLambdaStoplistsPage(apiContext);
            await stoplistPage.lambdaStoplists(dataSet.prodUrl, 'name_and_status', word)
        });
    }
})