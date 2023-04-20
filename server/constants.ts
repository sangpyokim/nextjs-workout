const BASE_URL =
  'https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app'

export const ENDPOINT = {
  ALL_TOKEN_URL: `${BASE_URL}/pushToken.json`,
  TOKEN_URL: (email: string) => `${BASE_URL}/pushToken/${email}.json`,
}
