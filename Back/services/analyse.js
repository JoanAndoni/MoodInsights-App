'use strict'
import { getSongs } from './spotify';
import { getPosts } from './facebook';
import { TextAnalyticsClient, AzureKeyCredential } from '@azure/ai-text-analytics';

export const analyzeSongs = async userId => {
    const azure = {
        endpoint: process.env.AZURE_ENDPOINT,
        key: process.env.AZURE_KEY
    }
    const textAnalyticsClient = new TextAnalyticsClient(azure.endpoint, new AzureKeyCredential(azure.key));
    const songsFromUser = await getSongs(userId);
    const numberSongs = songsFromUser.length;

    let analyzedSongs = 0;
    let data = {
        sumPositive: 0,
        sumNeutral: 0,
        sumNegative: 0
    };

    for (let index = 0; index < numberSongs; index++) {
        const result = await sentimentAnalysis(textAnalyticsClient, songsFromUser[index].lyrics.trim());
        if (result[0].confidenceScores) {
            analyzedSongs += 1;
            data.sumPositive += result[0].confidenceScores.positive;
            data.sumNeutral += result[0].confidenceScores.neutral;
            data.sumNeutral += result[0].confidenceScores.negative;
        }
    }

    return {
        positive: (data.sumPositive / analyzedSongs),
        neutral: (data.sumNeutral / analyzedSongs),
        negative: (data.sumNegative / analyzedSongs)
    };
};

export const analyzePosts = async (userId, before, after) => {
    const azure = {
        endpoint: process.env.AZURE_ENDPOINT,
        key: process.env.AZURE_KEY
    }
    const textAnalyticsClient = new TextAnalyticsClient(azure.endpoint, new AzureKeyCredential(azure.key));
    // const postsFromFacebook = await getPosts(userId, before, after);
    // const numberPosts = postsFromFacebook.length;
    const postsFromFacebook = [];
    const numberPosts = postsFromFacebook.length;

    if (numberPosts > 0) {
        let analyzedPosts = 0;
        let data = {
            sumPositive: 0,
            sumNeutral: 0,
            sumNegative: 0
        };

        for (let index = 0; index < numberPosts; index++) {
            const result = await sentimentAnalysis(textAnalyticsClient, postsFromFacebook[index].trim());
            if (result[0].confidenceScores) {
                analyzedPosts += 1;
                data.sumPositive += result[0].confidenceScores.positive;
                data.sumNeutral += result[0].confidenceScores.neutral;
                data.sumNeutral += result[0].confidenceScores.negative;
            }
        }

        return {
            result: true,
            positive: (data.sumPositive / analyzedPosts),
            neutral: (data.sumNeutral / analyzedPosts),
            negative: (data.sumNegative / analyzedPosts)
        };
    } else {
        return {
            result: false,
            positive: 0,
            neutral: 0,
            negative: 0
        };
    }

};

const sentimentAnalysis = async (client, texts) => {
    const textToaAnalyze = [texts];
    const sentimentResult = await client.analyzeSentiment(textToaAnalyze);
    return sentimentResult;
}