import React, { ReactElement, useEffect } from 'react'
import styles from '../styles/Timer.module.css'
import OTimer from '../components/organisms/OTimer'
import { Inter } from '@next/font/google'
import TodayWorkOutList from '../components/organisms/TodayWorkOutList'
import { getAllExercises } from '../utils/firebase/Database'

const inter = Inter()
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1a5469d0ecmshf29b48061348bf5p103842jsnbb2bb1fdb10b',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

const Timer = () => {



  return (
      <div className={styles.container} >
        {/* 데이터 가져와서 initSec 변경 시켜주기 */}
        <div className={styles.timerWrapper} >
          <OTimer initSec={60} />
        </div>

        <div className={styles.listWrapper} >
          <TodayWorkOutList />
        </div>
      </div>
  )
}

export default Timer
const bodylist = [
  "back",
  "cardio",
  "chest",
  "lower arms",
  "lower legs",
  "neck",
  "shoulders",
  "upper arms",
  "upper legs",
  "waist"
]
const exerlist = [
  "abductors",
  "abs",
  "adductors",
  "biceps",
  "calves",
  "cardiovascular system",
  "delts",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "levator scapulae",
  "pectorals",
  "quads",
  "serratus anterior",
  "spine",
  "traps",
  "triceps",
  "upper back"
]
