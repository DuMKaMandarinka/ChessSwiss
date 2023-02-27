import './App.css';
import React,{useEffect, useState} from 'react'

function App() {
  const [id,setId] = useState(0)
  const[name,setName] = useState('')
  const[players,setPlayers] = useState([])
  const[round,setRound] = useState(0)
  const[round_now,setRound_now] = useState(0)
  const[start,setStart] = useState(false)
  const[game,setGame] = useState([])
  const [valueRadioButton, setValueRadioButton] = useState([]);

  // const [player,setPlayer] = useState({
  //   name:'',
  //   points:0,
  //   rivals:[],
  //   colors:[]
  // })

  const result = players.map((player, index) => {
    return(
      <React.Fragment key={index}>
      <p>{index+1}.{player.name}</p>
      </React.Fragment>
    );
  });

  const addPlayer=(name,id)=>{
     let player = {
      id:id,
      name:name,
      points:0,
      rivals:[],
      colors:[]
     }
     setPlayers([...players, player])
     setName('')
     setId(id+1)
    //  console.log(players)
  }

  function Pair(){
    return(
    this.whiteId = "",
    this.white = "",
    this.whitePoints = "",
    this.black = "",
    this.blackPoints = "",
    this.blackId = "",
    this.result = 0)
  }


  const startPlay=()=>{
    let pairs = []
    let waiting_room = players

    // let pair={
    //   white:"",
    //   black:"",
    //   result:0
    // }
      while(waiting_room.length!=0){
        let pair = new Pair()
        if(waiting_room.length%2==0){
          for(let i=0;i<2;i++)
          {
            let random = Math.floor(Math.random() * waiting_room.length)
            let player = waiting_room[random]
            waiting_room = [...waiting_room.slice(0,random),...waiting_room.slice(random+1)]
            if(i==0){
              pair.white=player.name
              pair.whiteId = player.id
              pair.whitePoints = player.points
            }
            else{
              pair.black = player.name
              pair.blackId = player.id
              pair.blackPoints = player.points
              console.log(pair)
              pairs.push(pair)
              console.log(pairs)
            }
          }
        }
        else{
          let random = Math.floor(Math.random() * waiting_room.length)
          let player = waiting_room[random]
          waiting_room = [...waiting_room.slice(0,random),...waiting_room.slice(random+1)]
          if(Math.floor(Math.random() * 2)==1){
            pair.white = player.name
            pair.whiteId = player.id
            pair.whitePoints = player.points
            pair.black = "bye"
            pair.blackPoints = "" 
            console.log(pair)
            pairs.push(pair)
            console.log(pairs)
          }
          else{
            pair.white = "bye"
            pair.whitePoints = "" 
            pair.black = player.name
            pair.blackId = player.id
            pair.blackPoints = player.points
            console.log(pair)
            pairs.push(pair)
            console.log(pairs)
          }
        }
      }
    let now = round_now+1
    setRound_now(now)
    setGame(pairs)
    let copy = []
    for(let i = 0;i<pairs.length;i++){
      copy.push(null)
    }
    setValueRadioButton(copy)
    setStart(true)
  }

  const editPlay=()=>{
    // waiting_room[0].name="Просто Гоша";


    // let random = waiting_room.slice(1)
    // setWaiting_room(random)
  }

  function chengeValue(e,index) {
    setValueRadioButton([...valueRadioButton.slice(0, index),e.target.value,...valueRadioButton.slice(index + 1)]);
    console.log(index)
 }

 const nextRound = ()=>{
    let sortPlayerById = players.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
    for(let i=0;i<valueRadioButton.length;i++){
      if(valueRadioButton[i]=='1'){
        let winner =sortPlayerById[game[i].whiteId]
        let loser = sortPlayerById[game[i].blackId]
        winner.points=winner.points+1
        winner.rivals.push(loser.id)
        winner.colors.push('w')
        loser.rivals.push(winner.id)
        loser.colors.push('b')
      }
      if(valueRadioButton[i]=='2'){
        let drawPlayer1 =sortPlayerById[game[i].whiteId]
        let drawPlayer2 = sortPlayerById[game[i].blackId]
        drawPlayer1.points=drawPlayer1.points+0.5
        drawPlayer1.rivals.push(drawPlayer2.id)
        drawPlayer1.colors.push('w')
        drawPlayer2.points=drawPlayer2.points+0.5
        drawPlayer2.rivals.push(drawPlayer1.id)
        drawPlayer2.colors.push('b')
      }
      if(valueRadioButton[i]=='3'){
        let loser =sortPlayerById[game[i].whiteId]
        let winner = sortPlayerById[game[i].blackId]
        winner.points=winner.points+1
        winner.rivals.push(loser.id)
        winner.colors.push('b')
        loser.rivals.push(winner.id)
        loser.colors.push('w')
      }
    }
    let sortPlayerByPoints = sortPlayerById.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)|| parseFloat(a.id) - parseFloat(b.id));
    console.log("Сортировка игроков:", sortPlayerByPoints)
    let pairs = []
    let impossiblePlayer = []
    while(sortPlayerByPoints.length!=0){
        let pair = new Pair()
        let player1 = sortPlayerByPoints[0]
        let points = player1.points
        sortPlayerByPoints = [...sortPlayerByPoints.slice(1)]
        let candidates=[]
        let player2 = null
        console.log("Работает")
        for(let i=points;player2==null;i=i-0.5){
          candidates = sortPlayerByPoints.filter(player => player.points == i&&player.colors[round_now-1]!=player1.colors[round_now-1]
          &&player1.rivals.every((id)=>id!=player.id)
          &&(impossiblePlayer[pairs.length]!=null?impossiblePlayer[pairs.length].every((id)=>id!=player.id) : true))
          // &&impossiblePlayer[pairs.length-1]?.every((id)=>id!=player.id))
          if(candidates.length!=0){
            let random = Math.floor(Math.random() * candidates.length)
            player2 = candidates[random]
            let indexPlayer = sortPlayerByPoints.findIndex(player => player.id == player2.id)
            sortPlayerByPoints = [...sortPlayerByPoints.slice(0,indexPlayer),...sortPlayerByPoints.slice(indexPlayer+1)]
            if(player1.colors[round_now-1]=='w'){
              pair.white=player2.name
              pair.whiteId = player2.id
              pair.whitePoints = player2.points
              pair.black = player1.name
              pair.blackId = player1.id
              pair.blackPoints = player1.points
              pairs.push(pair)
            }
            else{
              pair.white=player1.name
              pair.whiteId = player1.id
              pair.whitePoints = player1.points
              pair.black = player2.name
              pair.blackId = player2.id
              pair.blackPoints = player2.points
              pairs.push(pair)
            }
          }
          candidates = sortPlayerByPoints.filter(player => player.points == i
          &&player1.rivals.every((id)=>id!=player.id)
          &&(impossiblePlayer[pairs.length]!=null?impossiblePlayer[pairs.length].every((id)=>id!=player.id) : true))
          if(candidates.length!=0){
            
          }



          if(candidates.length==0 && i<0){
            pairs = pairs.sort((a, b) => parseFloat(b.whitePoints>b.blackPoints?b.whitePoints:b.blackPoints) - parseFloat(a.whitePoints>a.blackPoints?a.whitePoints:a.blackPoints))
            sortPlayerByPoints.push(player1)
            let returnPlayer;
            if(pairs[pairs.length-1].whitePoints>pairs[pairs.length-1].blackPoints){
              player1 = players.find(pl=>pl.id==pairs[pairs.length-1].whiteId)
              returnPlayer = players.find(pl=>pl.id==pairs[pairs.length-1].blackId)
            }
            else if(pairs[pairs.length-1].whitePoints==pairs[pairs.length-1].blackPoints&&pairs[pairs.length-1].whiteId<pairs[pairs.length-1].blackId){
              player1 = players.find(pl=>pl.id==pairs[pairs.length-1].whiteId)
              returnPlayer = players.find(pl=>pl.id==pairs[pairs.length-1].blackId)
            }
            else{
              player1 = players.find(pl=>pl.id==pairs[pairs.length-1].blackId)
              returnPlayer = players.find(pl=>pl.id==pairs[pairs.length-1].whiteId)
            }
            sortPlayerByPoints.push(returnPlayer)
            sortPlayerByPoints = sortPlayerByPoints.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)|| parseFloat(a.id) - parseFloat(b.id));
            i = player1.points
            impossiblePlayer[pairs.length-1] = []
            impossiblePlayer[pairs.length-1].push(returnPlayer.id)
            impossiblePlayer[pairs.length-2] = []
            pairs.splice(pairs.length-1, 1)
          }
              // Сделать для противоположных цветов
            
            
            
        }
    }
    console.log("Пары",pairs)
    let now = round_now+1
    setRound_now(now)
    setGame(pairs)
    let copy = []
    for(let i = 0;i<pairs.length;i++){
      copy.push(null)
    }
    setValueRadioButton(copy)
 }
   

  const games = game.map((element,index)=>{
    return(
      <div key={index} className='games'>
      <div>
      <p>{element.white} ({element.whitePoints})</p>
      </div>
      <div className='radio-buttons'>
      <input type="radio" name={index} value="1"
      checked={valueRadioButton[index] === '1' ? true : false}
      onChange={(e)=>chengeValue(e,index)} 
      />
      <label htmlFor={index}>1-0</label>
      <input type="radio" name={index} value="2"
      checked={valueRadioButton[index] === '2' ? true : false}
      onChange={(e)=>chengeValue(e,index)} 
      />
      <label htmlFor={index}>1/2-1/2</label>

      <input type="radio" name={index} value="3"
      checked={valueRadioButton[index] === '3' ? true : false}
      onChange={(e)=>chengeValue(e,index)}
      />
      <label htmlFor={index}>0-1</label>
      </div>
      <div>
      <p>{element.black} ({element.blackPoints})</p>
      </div>
      </div>
    )
  })
  

  return (
    <div className="App">
      {
      !start&&<div>
      <input type="text" value={name} onChange={e=>setName(e.target.value)}></input>
      <button onClick={()=>addPlayer(name,id)}>Добавить</button>
      <h3>Число раундов:</h3>
      <input type='number' min="1" onChange={e => setRound(Number(e.target.value))}></input>
      <h1>Игроки:</h1>
      <div className='line'></div>
      {result}
      <button onClick={()=>startPlay()}>Начать</button>
     </div>
      }
     {
      start&&
      <div>
        <h1>Тур:{round_now}</h1>
        
        {games}
        {/* <input type="text" value={value} onChange={e=>chengeValue(e)}/> */}
        <button onClick={()=>nextRound()}>Следующий тур</button>

        <button onClick={()=>console.log(game)}>Клик</button>
        <button onClick={()=>console.log(valueRadioButton)}>Значение</button>
        <button onClick={()=>console.log(players)}>Игроки</button>
      </div>
     }
     
    </div>
  );
}

export default App;
