import React, { useState, useEffect, Component, useDebugValue, useRef, useCallback, useMemo} from 'react'
import ReactDOM from 'react-dom'
import { callStateFunction, stateFunction } from "./demo";


//callStateFunction(stateFunction)

function Demo(){
    const [time, setTime] = useState(Date.now())
    const [count, setCount] = useState(0)
    const prevCount = useRef()
    console.log('prev count', prevCount.current)
    useEffect(() => {
        console.log('componentDidMount')
        return () => {
            console.log('componentWillUnmount')
        }
    },[])
    useEffect(() => {
        prevCount.current = count
        if(count > 0) {
         console.log('componentDidUpdate')
        }
    })
    let mycallBack = useCallback(() => {
        console.log('useCallback', count)
    },[])
    let memoResult= useMemo(count => {
        console.log('memoried function called')
        return <div></div>
    },[count])
    mycallBack()
    useDebugValue('MyDemo')
    return (
        <div onClick={e => setCount(count + 1)}>{count}</div>
    )
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unmountDemo:false
        }
    }
    render(){
        return (
            <div>
                {!this.state.unmountDemo && <Demo /> }
                <button onClick={e => this.setState({unmountDemo: true})} >卸载demo</button>
                <button onClick={e => this.setState({unmountDemo: false})} >挂载demo</button>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'))