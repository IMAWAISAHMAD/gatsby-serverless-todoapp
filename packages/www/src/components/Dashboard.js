import React,{useContext,useRef,useReducer} from "react"
import {Link} from "@reach/router"
import {IdentityContext} from "../../identity-context"
import {Container,Flex,NavLink,Label,Input,Button,Checkbox} from 'theme-ui'

const todoReducer = (state,action) => {
    switch(action.type){
        case "addTodo":
            return [{done:false,todo:action.payload},...state]
        case "toggleTodo":
            const newState=[...state]
            newState[action.payload]={
                done:!state[action.payload].done,
                todo:state[action.payload].todo
            }
            return newState
        default: 
            return state
    }
}
const Dashboard = () => {
    const {user,identity:netlifyIdentity} = useContext(IdentityContext);
    const [todos,dispatch] = useReducer(todoReducer,[]);
    const inputRef = useRef();
    return (
       <Container>
        <Flex as='nav'>
                <NavLink as={Link} to={"/"} p={2}>
                    Home
                </NavLink>
                <NavLink as={Link} to={"/app"} p={2}>
                    Dashboard
                </NavLink>
                {user &&
                 <NavLink  
                 href="#!"  
                 p={2}
                 onClick={() => {
                    netlifyIdentity.logout();
                  }}
                >
                    {`Logout ${user.user_metadata.full_name}`}
                 </NavLink>
                }
        </Flex>
            <div>Wecome Mr.{user.user_metadata.full_name}</div>
        <Flex
        as="form"
        onSubmit={(e,i)=> {
            e.preventDefault()
            dispatch({type:"addTodo",payload:inputRef.current.value})
            inputRef.current.value=""
        }     
        }
        >
            <Label sx={{display:"flex"}}>
                <span>Add&nbsp;Todo</span>
                <Input ref={inputRef} sx={{marginLeft:1}}/>
            </Label>
            <Button sx={{marginLeft:1}}>Submit</Button>
        </Flex>   
        <Flex sx={{flexDirection:"column"}}>
            <ul sx={{listStyleType:"none"}}>
                {todos.map((todo,i)=>(
                    <Flex
                     as="li"
                     onClick={()=>{
                        dispatch({type:"toggleTodo",payload:i})
                     }}>
                        <Checkbox checked={todo.done}/>
                        <span>{todo.todo}</span>
                    </Flex>
                ))}
            </ul>
        </Flex> 
        </Container>
    )
}
export default Dashboard;