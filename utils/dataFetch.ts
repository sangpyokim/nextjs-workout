const URL =
  'https://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1'
const SERVICE_KEY =
  'CPVzoQ8fogwnLrZrXLoVKsflk0KklcGJKGL0%2Bcvz6HRqWDbXn8bkuItH9l8I%2F7cZ9EmN7oSPxlbe4dQfszTMVw%3D%3D'

export const getFoodData = async (searchWord: string) => {
  const u = `${URL}?serviceKey=${SERVICE_KEY}&desc_kor=${searchWord}&numOfRows=40&pageNo=1&type=json`
  const data = await fetch(u)
  const json = await data.json()

  const FoodList: any = []
  const map = new Map()
  for (let item of json.body.items) {
    if (map.has(item.DESC_KOR)) {
      if (map.get(item.DESC_KOR)[0] < item.BGN_YEAR) {
        const FoodItem = new Food(item)
        map.set(item.DESC_KOR, [item.BGN_YEAR, FoodItem])
      }
    } else {
      const FoodItem = new Food(item)
      map.set(item.DESC_KOR, [item.BGN_YEAR, FoodItem])
    }
  }

  map.forEach((v, k) => FoodList.push(v[1]))
  return FoodList.slice(0, 20)
}

interface data {
  ANIMAL_PLANT: string
  BGN_YEAR: string
  DESC_KOR: string
  NUTR_CONT1: string
  NUTR_CONT2: string
  NUTR_CONT3: string
  NUTR_CONT4: string
  NUTR_CONT5: string
  NUTR_CONT6: string
  NUTR_CONT7: string
  NUTR_CONT8: string
  NUTR_CONT9: string
  SERVING_WT: string
}

class Food {
  name
  processor
  serving_size
  kcal
  carbohydrate
  protein
  fat
  sugars
  salt
  cholesterol
  saturated_fatty_acids
  trans_fatty_acids

  constructor(data: data) {
    this.name = data.DESC_KOR
    this.processor = data.ANIMAL_PLANT
    this.serving_size = data.SERVING_WT
    this.kcal = data.NUTR_CONT1
    this.carbohydrate = data.NUTR_CONT2
    this.protein = data.NUTR_CONT3
    this.fat = data.NUTR_CONT4
    this.sugars = data.NUTR_CONT5
    this.salt = data.NUTR_CONT6
    this.cholesterol = data.NUTR_CONT7
    this.saturated_fatty_acids = data.NUTR_CONT8
    this.trans_fatty_acids = data.NUTR_CONT9
  }
}
