
import { analyzeSongs, analyzePosts } from './analyse';
import User from '../db/models/user';
import cron from 'node-cron';
import moment from 'moment';
import { beginningOfDay, endOfDay } from '../helpers/dates.helper';

// Cron timming
const everyMinute = '* * * * *'; // Every minute
const everyDay = '0 0 0 * * *'; // Every day at 12pm
export const runCronTask = cron.schedule(everyDay, async () => {
    console.log('Cron started')
    await User.find({}, async (err, users) => {
        if (err) throw err;
        if (users) {
            let usersToAnalyze = [];
            for (let index = 0; index < users.length; index++) {
                if (users[index].connectedAccounts.facebook.token &&
                    users[index].connectedAccounts.facebook.userID ||
                    users[index].connectedAccounts.spotify.token.value &&
                    users[index].connectedAccounts.spotify.token.expires &&
                    users[index].connectedAccounts.spotify.refreshToken
                ) usersToAnalyze.push(users[index]._id);
            }
            await makeAnalysis(usersToAnalyze);
        }
    });
});

const makeAnalysis = async (users) => {
    const today = moment().format("MMM Do YY");

    for (let index = 0; index < users.length; index++) {
        const user = await User.findById(users[index]);
        if (user) {
            let accountsConnected = 0;
            let spotify = {
                positive: 0,
                neutral: 0,
                negative: 0
            };
            let fb = {
                result: Boolean,
                positive: 0,
                neutral: 0,
                negative: 0
            };
            if (user.connectedAccounts.facebook.token &&
                user.connectedAccounts.facebook.userID) {
                console.log(user.name + ': Making facebook');
                fb = await analyzePosts(users[index], beginningOfDay(), endOfDay());
                if (fb.result) {
                    accountsConnected += 1;
                }
            }

            if (user.connectedAccounts.spotify.token.value &&
                user.connectedAccounts.spotify.token.expires &&
                user.connectedAccounts.spotify.refreshToken) {
                console.log(user.name + ': Making Spotify');
                spotify = await analyzeSongs(users[index]);
                accountsConnected += 1;
            }

            user.analysis.push({
                day: today,
                averageGrade: {
                    positive: ((spotify.positive + fb.positive) / accountsConnected), // Need to add facebook
                    neutral: ((spotify.neutral + fb.neutral) / accountsConnected),
                    negative: ((spotify.negative + fb.negative) / accountsConnected)
                },
                facebookGrade: {
                    positive: fb.positive,
                    neutral: fb.neutral,
                    negative: fb.negative
                },
                spotifyGrade: spotify
            })

            const userSaved = await user.save();
            console.log(userSaved.name + ': User saved');
        }
    }
}