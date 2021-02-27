import React from 'react';
import { Switch,Route } from "react-router-dom"
import Navbar from './Components/Navbar'
import Card from './Components/Card'
import Form from './Components/Form'
import List from './Components/List'
import Details from './Components/Details'
import styled from 'styled-components'

const App = () => {
  return (
    <AppContainer>
      <Navbar/>
      <Content> 
        <Card>
          <Switch>
              <Route exact path="/newOrder">
                <Form/>
              </Route>
              <Route exact path="/order/:id">
                <Details/>
              </Route>
              <Route path="/">
                <List/>
              </Route>
          </Switch>
        </Card>
      </Content>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
`
const Content = styled.div`
  margin-top: 5rem;
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

export default App;
