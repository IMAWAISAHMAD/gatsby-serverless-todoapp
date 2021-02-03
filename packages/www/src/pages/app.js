import React,{useContext} from "react"
import { Router} from "@reach/router"
import {IdentityContext} from "../../identity-context"
import {Container,Heading,Button,Flex} from 'theme-ui'
import Dashboard from "../components/Dashboard"


const DashLoggedOut = props => {
    const {identity: netlifyIdentity } = useContext(IdentityContext);
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
    if (!user) {
        return (
        <Router>
            <DashLoggedOut path="/app" />
        </Router>
        );
    }
    return (
        <Router>
        <Dashboard path="/app" />
        </Router>
    ); 
}