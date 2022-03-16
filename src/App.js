import { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import styled from "styled-components";
import actionContext from "./context/actionContext";
import DataTable from './components/dataTable';
import CardComponent from './components/cardComponent';
import { Link } from "react-router-dom";




function App() {
  const Nav = styled.nav`
      >a{
        text-decoration : none;
        font-color : #000000;
        font-size : 15px;
        font-weight : 600;
        &.home{
          &:after{
            content : "|";
            display : inline-block;
            padding: 5px;
          }
        }
      }
      
`
  const { rowData, updateRows } = useContext(actionContext);
  console.log("rowDattttttttt", rowData);
  return (
    <div className="App">
      
      <h1><img style={{
        height : 30,
        width  : 30
      }} src={`${process.env.PUBLIC_URL}/favicon.ico`}></img> Endpoints Manager</h1>
      <Router>
        <Nav>
          <Link to='/' className="home">Home</Link>
          <Link to='/audit'>Audit Table</Link>
        </Nav>

        <Routes>
          <Route path="/audit" element={(

            <DataTable />

          )} />
          <Route path='/' exact element={
            <>
              <CardComponent/>
            </>}

          />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
