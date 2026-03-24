import React, { useEffect, useState } from "react"
import type { DiaryEntry, Visibility, Weather } from "./types"
import { createDiaryEntry, getAllDiaries } from "./diaryService"
import axios from "axios"


const App = () => {

  const [notification, setNotification] = useState('')
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility>("great")
  const [weather, setWeather] = useState<Weather>("sunny")
  const [comment, setComment] = useState('')

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  const entryCreation = (e: React.SyntheticEvent) => {
    e.preventDefault()

    
      createDiaryEntry({
        date: date,
        comment: comment,
        weather: weather,
        visibility: visibility
      }).then(data => {
        console.log(data)
        setDiaryEntries(diaryEntries.concat(data));
        setDate('')
        setVisibility("great")
        setWeather("sunny")
        setComment('')
        setNotification('')
      }).catch((error: unknown) => {
        if (axios.isAxiosError(error)) {  
          setNotification(error?.response?.data)            
        } else {
          console.error(error)
        }
      })
  }

  return (
    
    
    <div>
      <h2>Add new entry</h2>
            {notification ? <p style={{color: "red"}}>{notification}</p> : null}
            <form onSubmit={entryCreation}>
                date <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                
                /><br/>
                
                <div>
                  visibility 
                  <input type="radio" id="visibilityChoise1" name="visibility" value="great" onChange={() => setVisibility("great")}/>
                  <label >Great</label>
                  <input type="radio" id="visibilityChoise2" name="visibility" value="good" onChange={() => setVisibility("good")}/>
                  <label >Good</label>
                  <input type="radio" id="visibilityChoise3" name="visibility" value="ok" onChange={() => setVisibility("ok")}/>
                  <label >Ok</label>
                  <input type="radio" id="visibilityChoise4" name="visibility" value="poor" onChange={() => setVisibility("poor")}/>
                  <label >Poor</label>
                </div>

                <div>
                  weather
                  <input type="radio" id="weatherChoise1" name="weather" value="sunny" onChange={() => setWeather("sunny")}/>
                  <label >Sunny</label>
                  <input type="radio" id="weatherChoise2" name="weather" value="rainy" onChange={() => setWeather("rainy")}/>
                  <label >Rainy</label>
                  <input type="radio" id="weatherChoise3" name="weather" value="cloudy" onChange={() => setWeather("cloudy")}/>
                  <label >Cloydy</label>
                  <input type="radio" id="weatherChoise4" name="weather" value="windy" onChange={() => setWeather("windy")}/>
                  <label >Windy</label>
                  <input type="radio" id="weatherChoise5" name="weather" value="stormy" onChange={() => setWeather("stormy")}/>
                  <label >Stormy</label>
                </div>
                comment <input 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                
                /><br/>
                <button type="submit">add</button>
            </form>
      <h2>Diary Entries</h2>
      {diaryEntries.map(d => {
        return (
          <div key={d.id}>
          <b>{d.date}</b><br/>
          visibility: {d.visibility}<br/>
          weather: {d.weather}<br/><br/>       
          </div>

        )
      })}

    </div>

    
  )
}

export default App