import React from 'react';
import styled from 'styled-components'
import logo from '../Images/logo.png'

const NavBar = () => {
    return (
        <StyledAppBar>
            <Logo>
                <img src={logo} alt='logo'/>
            </Logo>
        </StyledAppBar>
    );
}

const Logo = styled.div`
    margin-left: 2rem;
    align-self: center;
`

const StyledAppBar = styled.div`
    z-index:1;
    position: fixed;
    background-color: #f8f8f9;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0.1px;
    height: 4rem;
    width: 100%;
`

export default NavBar;
