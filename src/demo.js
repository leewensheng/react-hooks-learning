

let currentFunction = null
let hooks = []
let currentHookIndex = null
let mounted = false //是否调用过

export function stateFunction(){
  const [state, setState] = useState('dd')
  const [count, setCount] = useState(0)
  console.log(count)
  useEffect(() => {
    document.onclick = e => setCount(count + 1)
  })
}

export function callStateFunction(fn) {
  currentFunction = fn
  currentHookIndex  = 0
  //注: 此处省略调用前的副作用清除
  fn()
  mounted = true
  //执行副作用
  let effectHooks = hooks.filter(hook => typeof hook === 'function')
  effectHooks.forEach(effect => effect())
}
function useState(defaultValue) {
  let index = currentHookIndex
  if(!mounted) {
    hooks[index] = defaultValue
  }
  let value = hooks[index]
  let stateHook = value => {
    hooks[index] = value
    callStateFunction(currentFunction)
  }
  currentHookIndex ++
  return [value, stateHook]
}

function useEffect(effect) {
  let index = currentHookIndex
  hooks[index] = effect
  currentHookIndex ++
}