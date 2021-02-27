import React from 'react';
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const AcceptButton = ({label,Icon,onClick,component,to}) => {
    return(
        <AcceptButtonStyled 
            type='submit' 
            variant="contained" 
            endIcon={Icon}
            onClick={onClick}
            component={component}
            to={to}
            fullWidth
        >
            {label}
        </AcceptButtonStyled>
    )
}

const AcceptButtonStyled = styled(Button)`
    &&{
       background-color: #a7ca70;
       color: white;
    }
`

export default AcceptButton