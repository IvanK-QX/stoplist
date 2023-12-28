import { request, test } from '@playwright/test'
import { Api } from '../pages/Api';
import { failedWords, readWordsFromFile, writeFailedWordsToFile } from '../pages/lambdaStoplists_page';
import { dataSet } from '../utils/dataset';

let chatOnlyEn, chatOnlyEs, chatOnlyRu, nameAndStatus, privateChat, testFailed = false

test.describe.only('3003 API test ', async () => {


    test.beforeAll(async () => {
        const filePathChatOnlyEn = 'Files/chat_only_en.txt';
        const filePathChatOnlyEs = 'Files/chat_only_es.txt';
        const filePathChatOnlyRu = 'Files/chat_only_ru.txt';
        const filePathNameAndStatus = 'Files/name_and_status.txt';
        const filePathPrivateChat = 'Files/private_chat.txt';
        
        chatOnlyEn = await readWordsFromFile(filePathChatOnlyEn);
        chatOnlyEs = await readWordsFromFile(filePathChatOnlyEs);
        chatOnlyRu = await readWordsFromFile(filePathChatOnlyRu);
        nameAndStatus = await readWordsFromFile(filePathNameAndStatus);
        privateChat = await readWordsFromFile(filePathPrivateChat);
    })

    test.afterEach(async () => {
        if (testFailed) {
            const errorMessage = `Test failed due to one or more words in the list. Failed Words: \n${failedWords.join('\n')}`;
            throw new Error(errorMessage);
        }
    })
      
    test('Test Cases -> Chat Only En', async () => {
        test.setTimeout(0); 
        const apiContext = await request.newContext();
        const api = new Api(apiContext);
      
        // Використовуємо for of, оскільки wordsArray вже повинен бути доступний
        for (const word of chatOnlyEn) {
            try {
                await api.lambdaStoplists.lambdaStoplists(dataSet.prodUrl, 'chat_only', word);
            } catch (error) {
                console.error(`Test failed for word: ${word}, Error: ${error.message}`);
                testFailed = true;
            }
            if (testFailed) {
                const filePath = 'Files/failedWordsEn.txt';
                writeFailedWordsToFile(filePath)
            }
            
        }
    })

    test('Test Cases -> Chat Only Es', async () => {
        test.setTimeout(0); 
        const apiContext = await request.newContext();
        const api = new Api(apiContext);
      
        // Використовуємо for of, оскільки wordsArray вже повинен бути доступний
        for (const word of chatOnlyEs) {
            try {
                await api.lambdaStoplists.lambdaStoplists(dataSet.prodUrl, 'chat_only', word);
            } catch (error) {
                console.error(`Test failed for word: ${word}, Error: ${error.message}`);
                testFailed = true;
            }
            if (testFailed) {
                const filePath = 'Files/failedWordsEs.txt';
                writeFailedWordsToFile(filePath)
            }
        }
    })

    test('Test Cases -> Chat Only Ru', async () => {
        test.setTimeout(0); 
        const apiContext = await request.newContext();
        const api = new Api(apiContext);
      
        // Використовуємо for of, оскільки wordsArray вже повинен бути доступний
        for (const word of chatOnlyRu) {
            try {
                await api.lambdaStoplists.lambdaStoplists(dataSet.prodUrl, 'chat_only', word);
            } catch (error) {
                console.error(`Test failed for word: ${word}, Error: ${error.message}`);
                testFailed = true;
            }
            if (testFailed) {
                const filePath = 'Files/failedWordsRu.txt';
                writeFailedWordsToFile(filePath)
            }
        }
    })

    test('Test Cases -> Name and Status', async () => {
        const apiContext = await request.newContext();
        const api = new Api(apiContext);
      
        // Використовуємо for of, оскільки wordsArray вже повинен бути доступний
        for (const word of nameAndStatus) {
            try {
                await api.lambdaStoplists.lambdaStoplists(dataSet.prodUrl, 'name_and_status', word);
            } catch (error) {
                console.error(`Test failed for word: ${word}, Error: ${error.message}`);
                testFailed = true;
            }
            if (testFailed) {
                const filePath = 'Files/failedWordsNameAndStatus.txt';
                writeFailedWordsToFile(filePath)
            }
        }
    })

    test('Test Cases -> Private Chat', async () => {
        const apiContext = await request.newContext();
        const api = new Api(apiContext);
      
        // Використовуємо for of, оскільки wordsArray вже повинен бути доступний
        for (const word of privateChat) {
            try {
                await api.lambdaStoplists.lambdaStoplists(dataSet.prodUrl, 'private_chat', word);
            } catch (error) {
                console.error(`Test failed for word: ${word}, Error: ${error.message}`);
                testFailed = true;
            }
            if (testFailed) {
                const filePath = 'Files/failedWordsPrivateChat.txt';
                writeFailedWordsToFile(filePath)
            }
        }
    })
})
