import React,{ useState,useEffect,forwardRef } from 'react';
import { Link } from "react-router-dom"
import AcceptButton from './AcceptButton'
import MaterialTable from "material-table"
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import DescriptionIcon from '@material-ui/icons/Description';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import promiseService from '../Services/promiseService'

const List = () => {
    const[orders,setOrders] = useState([])

    const columns = [
        { title: "Número de Orden", field: "orderNumber"},
        { title: "Tienda", field: "store"},
        { title: "Fecha de Creación(Hora Local)", field: "creationDate", render: (rowData) => new Date(rowData.creationDate).toLocaleString()},
        { title: "Método de Envío", field: "shippingMethod"}
    ]

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const actions = [
        rowData => ({
            icon: () =><Link to={`/order/${rowData.id}`}> <DescriptionIcon style={{ color: 'blue' }}/></Link>,
            tooltip: 'Ver Detalles',
        })
    ]

    const Toolbar = () => {
        return(
            <Grid container spacing={1}>
                <Grid item md={9}></Grid>
                <Grid item md={3}>
                    <AcceptButton 
                        label='Nueva Orden' 
                        Icon={<AddBoxIcon/>}
                        component={Link} 
                        to={'/newOrder'}
                    />
                </Grid> 
            </Grid>
        )
    }

    useEffect(() => {
        promiseService.getOrders().then(orders =>{
            setOrders(orders)
        })
    },[])

    return(
        <React.Fragment>
            <MaterialTable
                columns={columns}
                data={orders}
                icons={tableIcons}
                actions={actions}
                components={{
                    Container: props => <Paper {...props} elevation={0}/>,
                    Toolbar: props => <Toolbar/>
                }}
                options={{
                    actionsColumnIndex: -1,
                    search: false,
                }} 
                localization={{
                    header: {
                        actions: 'Detalles'
                    }
                }}
            />
        </React.Fragment>
    )
}

export default List