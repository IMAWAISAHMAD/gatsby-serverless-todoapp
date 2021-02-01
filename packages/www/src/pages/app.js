import React,{useContext} from "react"
import { Router,Link} from "@reach/router"
import {IdentityContext} from "../../identity-context"
import {Container,Heading,Button,Flex,NavLink} from 'theme-ui'
const Dash = () => {
    const {user,identity:netlifyIdentity} = useContext(IdentityContext);
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
        </Container>
    )
}


let DashLoggedOut = props => {
    const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  
    return (
      <Container>
        <Flex sx={{ flexDirection: "column", padding: 3 }}>
          <Heading as="h1">Get Stuff Done</Heading>
          <Button
            sx={{ marginTop: 2 }}
            onClick={() => {
              netlifyIdentity.open();
            }}
          >
            Log In
          </Button>
        </Flex>
      </Container>
    );
  };

export default app => {
    const { user } = useContext(IdentityContext);
    console.log(user);
    if (!user) {
        return (
        <Router>
            <DashLoggedOut path="/app" />
        </Router>
        );
    }
    return (
        <Router>
        <Dash path="/app" />
        </Router>
    ); 
}