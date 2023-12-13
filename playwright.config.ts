/* eslint-disable no-irregular-whitespace */
import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'
import 'dotenv/config'

const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 2 * 60 * 1000,
    expect: {
        timeout: 20000,
    },
    fullyParallel: true,
    reportSlowTests: { max: 0, threshold: 60001 },
    forbidOnly: !!process.env.CI,
    retries: 1,
    workers: process.env.CI ? 6 : undefined,
    reporter: [['line'], ['allure-playwright']],
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        actionTimeout: 20000,
        baseURL: 'https://webclient.streamsqa.com',
    },

    // grep:[new RegExp("@smoke")],
    projects: [
        {
            name: 'chromium',
            use: {
                launchOptions: {
                    args: [
                        '--use-fake-ui-for-media-stream', // avoids the need to grant camera/microphone permissions
                        '--use-fake-device-for-media-stream', // feeds a test pattern to getUserMedia() instead of live camera input
                        // '--use-file-for-fake-video-capture=~/utils/webcam.y4m'
                    ],
                },
                ...devices['Desktop Chrome'],
            },
        }
    ],
    outputDir: 'test-results/',
    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   port: 3000,
    // },
}

export default config
