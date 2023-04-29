const BASE_URL =
  'https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app'

export const ENDPOINT = {
  ALL_TOKEN_URL: `${BASE_URL}/pushToken.json`,
  TOKEN_URL: (email: string) => `${BASE_URL}/pushToken/${email}.json`,
  ALL_GROUP_URL: `${BASE_URL}/groups.json`,
  GROUP_URL: (id: string) => `${BASE_URL}/groups/${id}.json`,
  USER_GROUP_URL: (email: string) => `${BASE_URL}/users/${email}/groups.json`,
  GROUP_USER_URL: (groupID: string) =>
    `${BASE_URL}/groups/${groupID}/users.json`,
  USER_URL: (email: string) => `${BASE_URL}/users/${email}.json`,
}
