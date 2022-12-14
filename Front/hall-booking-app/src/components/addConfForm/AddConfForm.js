import { useEffect, useState, useCallback, useMemo } from "react"
import { useNavigate, Link } from "react-router-dom"

import './addConfForm.scss'
import ConfService from "../../services/ConfService"
// import {useDispatch} from 'react-redux'




const AddConfForm =({userId, conf})=>{
    const {addConf, getHallColors, updateConf, loading, error} = ConfService()

    const[colors, setColors] = useState([])
    const [date, setDate] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [hall, setHall] = useState()
    // const[loading, setLoading] = useState(true)
    // const [hallList, setHallList] =useState()
    
    const navigate = useNavigate()
    const goBack = ()=> navigate(-1);
    const gotoMain = ()=> navigate('/edit');

    var root = document.querySelector(':root');

    useEffect(()=>{
        
        if(conf){
            var y=conf.start.getFullYear(),m=conf.start.getMonth()+1, d=conf.start.getDate(),
             hS= conf.start.getHours(), mS = conf.start.getMinutes(), hE=conf.end.getHours(), mE =conf.end.getMinutes();
            const dateStr = y + '-' + (m<10 ? `0${m}` : m ) + "-" + (d<10 ? `0${d}` : d) ;
            const timeStartStr = (hS <10 ? `0${hS}`: hS)+':'+(mS <10 ? `0${mS}`: mS)
            const timeEndStr = (hE <10 ? `0${hE}`: hE)+':'+(mE <10 ? `0${mE}`: mE)

            setDate(dateStr)
            setStart(timeStartStr)
            setEnd(timeEndStr)
            setHall(conf.title);

            root.style.setProperty('--main-color',conf.color );
        }
        getHallColors().then(res=>{setColors(res);})
        // return () => {
        //     dispatch(validate())
        //  }
    },[])


   

    // .toLocaleString('uk-UA')


    // useCallback(()=>{

    // useMemo(()=>{ getHallColors().then(res=>setColors(res));}, []) 
    

    // console.log(colors)

    const onHallsChange=(color, i)=>{
        root.style.setProperty('--main-color',color );
        setHall(i)
    }

    const onSubmitForm=()=>{
      addConf({
        dataEnd:date+" "+end+":00",
        userId: userId,
        hallId:hall,
        dataBeg: date+" "+start+":00"
      })
      .then(()=> {if(!error) goBack()})
    }
    const onRedForm=()=>{
        updateConf({
        id: conf.id,
        dataEnd:date+" "+end+":00",
        userId: userId,
        hallId:hall,
        dataBeg: date+" "+start+":00"
      })
      .then(()=> {if(!error) gotoMain()})
    }

     function renderHallInputs(){
         return colors.map((h, i) => {
            var checked = false;
            if(hall === i+1){
                checked = true
            }
             return (
                 <div className="inputGroup" onClick={()=>onHallsChange(h, i+1)}   key={i}>
                 <input 
                 name="hall" 
                 id = {`hallChoice${i+1}`}
                 type="radio"
                 value={i+1}
                 checked={checked}
                
                 // key={i}  
                 />
                 <label htmlFor={'hallChoice'+h}>{i+1}</label>
                 </div>
                 
             )})
         }
 
     const halls = renderHallInputs()
      

    console.log('render')
    return(
        <div className = "add-conf">
            {loading ? null :
                <form className="form"
                    onSubmit={(e)=>{
                        e.preventDefault();
                    }}>
                    <h2>????????</h2>
                    <div className="checkHall">
                        {halls}
                    </div>
                    <div className="datatime">
                        <h2>????????</h2>
                        <input type="date" className="dateInp" name="date" 
                            value={date} 
                            onChange={(e)=>setDate(e.target.value.toLocaleString())}/>
                    </div>
                    <div className="datatime">
                        <h2>?????? ??????????????</h2>
                        <input type="time" className="time-start" name="time"
                            value={start} 
                            onChange={(e)=>setStart(e.target.value.toLocaleString())} />
                        <h2>?????? ????????????????????</h2>
                        <input type="time" className="time-end" name="time"
                            value={end} 
                            onChange={(e)=>setEnd(e.target.value.toLocaleString())}/>
                    </div>   
                   {!conf ? <button  onClick={onSubmitForm}>??????????????????????????</button> :
                     <button  onClick={onRedForm}>????????????????????</button>
                    }
                </form>
         }
        </div>
    )
}
// const myBtn =(onSubmit, nameD)=>{
//     return(
//         <button onClick={onSubmit}>{nameD}</button>
//     )
// }


export default AddConfForm