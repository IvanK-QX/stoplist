import { APIRequestContext } from '@playwright/test'
import { ApiLambdaStoplistsPage } from './lambdaStoplists_page'

export class Api {
    apiContext: APIRequestContext
    lambdaStoplists: ApiLambdaStoplistsPage
    

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
        this.lambdaStoplists = new ApiLambdaStoplistsPage(apiContext)
        
    }
}
