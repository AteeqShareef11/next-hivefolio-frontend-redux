import { getTweets } from "./twitter"

export default aysnc (_, res) => {
    const tweets =await getTweets(['1426487528996102149'])

    return res.status(200).json(tweets)
}