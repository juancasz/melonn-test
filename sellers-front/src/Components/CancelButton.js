import React from 'react';
import Button from '@material-ui/core/Button'

const CancelButton = ({label,Icon,onClick,component,to}) => {
    return(
        <Button
            variant="contained" 
            endIcon={Icon}
            onClick={onClick}
            component={component}
            to={to}
            fullWidth
        >
            {label}
        </Button>
    )
}

export default CancelButton