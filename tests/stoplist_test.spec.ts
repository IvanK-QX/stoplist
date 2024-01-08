import { request, test } from '@playwright/test'
import { Api } from '../pages/Api';
import { failedWords, stopListsFilter } from '../pages/lambdaStoplists_page';
import { dataSet } from '../utils/dataset';

let nameAndStatusCount, chatOnlyEs, chatOnlyRu, nameAndStatus, chatOnlyEn, testFailed = false, chatOnlyEsRaw, stopListRu, chatOnlyRuRaw, stopNameAndStatuses, NameAndStatusesRaw, stopListNameAndStatuses, stopListPrivateChat, privateChatRaw, privateChat, chatOnlyEnRaw = false

const faledChatOnlyEn = 'files/failedWordsEn.txt';
const failedChatOnlyEs = 'files/failedWordsEs.txt';
const failedChatOnlyRu = 'files/failedWordsRu.txt';
const failedNameAndStatusPart1 = 'files/failedWordsNameAndStatusPart1.txt';
const failedNameAndStatusPart2 = 'files/failedWordsNameAndStatusPart2.txt';
const failedPrivateChat = 'files/failedWordsPrivateChat.txt';


test.describe('3003 API test ', async () => {
    test.beforeAll(async () => {
        const apiContext = await request.newContext()
        const api = new Api(apiContext)
        const stopLists = await api.lambdaStoplists.getLambdaStoplists(dataSet.getStopListsProdUrl)
        
        const chatOnlyEnRaw = stopLists.chatOnlyEn
        const chatOnlyEsRaw = stopLists.chatOnlyEs
        const chatOnlyRuRaw = stopLists.chatOnlyRu
        const NameAndStatusesRaw = stopLists.nameAndStatuses
        const privateChatRaw = stopLists.privateChat

        chatOnlyEn = await api.lambdaStoplists.stopListsFilter(chatOnlyEnRaw)
        chatOnlyEs = await api.lambdaStoplists.stopListsFilter(chatOnlyEsRaw)
        chatOnlyRu = await api.lambdaStoplists.stopListsFilter(chatOnlyRuRaw)
        nameAndStatus = await api.lambdaStoplists.stopListsFilter(NameAndStatusesRaw)
        privateChat = await api.lambdaStoplists.stopListsFilter(privateChatRaw)
        nameAndStatusCount = Math.floor(nameAndStatus.length / 2)
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
        
        for (const word of chatOnlyEn) {
            try {
                await api.lambdaStoplists.lambdaStoplists(dataSet.prodUrl, 'chat_only', word);
            } catch (error) {
                console.error(`Test failed for word: ${word}, Error: ${error.message}`);
                testFailed = true;
            }
            if (testFailed) {
                const filePath = faledChatOnlyEn
                await api.lambdaStoplists.writeFailedWordsToFile(filePath)
            }
        }
        
    })

    test('Test Cases -> Chat Only Es', async () => {
        test.setTimeout(0); 
        const apiContext = await request.newContext();
        const api = new Api(apiContext);      
        
        for (const word of chatOnlyEs) {
            try {
                await api.lambdaStoplists.lambdaStoplists(dataSet.prodUrl, 'chat_only', word);
            } catch (error) {
                console.error(`Test failed for word: ${word}, Error: ${error.message}`);
                testFailed = true;
            }
            if (testFailed) {
                const filePath = failedChatOnlyEs
                await api.lambdaStoplists.writeFailedWordsToFile(filePath)
            }
        }
    })

    test('Test Cases -> Chat Only Ru', async () => {
        test.setTimeout(0); 
        const apiContext = await request.newContext();
        const api = new Api(apiContext);
        
        for (const word of chatOnlyRu) {
            try {
                await api.lambdaStoplists.lambdaStoplists(dataSet.prodUrl, 'chat_only', word);
            } catch (error) {
                console.error(`Test failed for word: ${word}, Error: ${error.message}`);
                testFailed = true;
            }
            if (testFailed) {
                const filePath = failedChatOnlyRu
                await api.lambdaStoplists.writeFailedWordsToFile(filePath)
            }
        }
    })



    test('Test Cases -> Name and Status part-1', async () => {
        test.setTimeout(0); 
        const apiContext = await request.newContext();
        const api = new Api(apiContext);
        const nameAndStatusList = nameAndStatus.slice(0, nameAndStatusCount); // Отримання всіх слів
        for (const word of nameAndStatusList) {
            try {
                await api.lambdaStoplists.lambdaStoplists(dataSet.prodUrl, 'name_and_status', word);
                console.log("Name and Status-1 Passed")
            } catch (error) {
                console.error(`Test failed for word: ${word}, Error: ${error.message}`);
                testFailed = true;
            }
            if (testFailed) {
                const filePath = failedNameAndStatusPart1
                await api.lambdaStoplists.writeFailedWordsToFile(filePath)
            }
        }
    })

    test('Test Cases -> Name and Status part-2', async () => {
        test.setTimeout(0); 
        const apiContext = await request.newContext();
        const api = new Api(apiContext);
        const nameAndStatusList = nameAndStatus.slice(nameAndStatusCount); // Отримання всіх слів
        for (const word of nameAndStatusList) {
            try {
                await api.lambdaStoplists.lambdaStoplists(dataSet.prodUrl, 'name_and_status', word);
                console.log("Name and Status-2 Passed")
            } catch (error) {
                console.error(`Test failed for word: ${word}, Error: ${error.message}`);
                testFailed = true;
            }
            if (testFailed) {
                const filePath = failedNameAndStatusPart2
                await api.lambdaStoplists.writeFailedWordsToFile(filePath)
            }
        }
    })

    test('Test Cases -> Private Chat', async () => {
        test.setTimeout(0); 
        const apiContext = await request.newContext();
        const api = new Api(apiContext);
      
        for (const word of privateChat) {
            try {
                await api.lambdaStoplists.lambdaStoplists(dataSet.prodUrl, 'private_chat', word);
            } catch (error) {
                console.error(`Test failed for word: ${word}, Error: ${error.message}`);
                testFailed = true;
            }
            if (testFailed) {
                const filePath = failedPrivateChat
                await api.lambdaStoplists.writeFailedWordsToFile(filePath)
            }
        }
    })
})


