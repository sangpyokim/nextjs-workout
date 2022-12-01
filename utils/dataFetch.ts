const URL =
  'https://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1'
const SERVICE_KEY =
  'CPVzoQ8fogwnLrZrXLoVKsflk0KklcGJKGL0%2Bcvz6HRqWDbXn8bkuItH9l8I%2F7cZ9EmN7oSPxlbe4dQfszTMVw%3D%3D'

export const getFoodData = async (searchWord: string) => {
  const u = `${URL}?serviceKey=${SERVICE_KEY}&desc_kor=${searchWord}&numOfRows=20&type=json`
  const data = await fetch(u)
  const json = await data.json()
  return json.body.items
}
