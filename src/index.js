import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'


function Demo(){
    const [time, setTime] = useState(Date.now())
    useEffect(() => {
        document.title = time
        return () => {
            setTimeout(() => {
                document.title = 'clear effect'
            }, 1000);
        }
    })
    return (
        <div onClick={e => setTime(Date.now())}>{time}</div>
    )
}

ReactDOM.render(<Demo />, document.getElementById('root'))