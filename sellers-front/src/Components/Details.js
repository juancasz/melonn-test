import React,{ useState,useEffect,forwardRef } from 'react';
import { Link,useParams } from "react-router-dom"
import CancelButton from './CancelButton'
import MaterialTable from "material-table"
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import { DateTimePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
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
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import promiseService from '../Services/promiseService'

const Details = () => {
    const id = useParams().id

    const[order,setOrder] = useState(null)

    useEffect(() => {
        const getOrder = async () => {
            const order = await promiseService.getOrderDetails(id)
            setOrder(order)
        }
        getOrder()
    },[id])

    const columns = [
        { title: "Nombre del producto", field: "nombreProducto"},
        { title: "Cantidad", field: "cantidadProducto"},
        { title: "Peso del producto(kg)", field: "pesoProducto"},
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

    const promiseDates = () => {
        const field = (dateUTCString,label) => {
            if(dateUTCString && dateUTCString !== 'Invalid Date'){
                return(
                    <DateTimePicker
                        id={label}
                        fullWidth
                        value={new Date(dateUTCString).toISOString()}
                        disabled
                        format="yyyy/MM/dd HH:mm"
                        label={label}
                    />
                )
            }
            return(
                <TextField 
                    id={label}
                    disabled
                    value={"No aplica"} 
                    label={label}
                    fullWidth
                />
            )
        }
        return(
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <Grid container spacing={1}>
                    <Grid item md={6}>
                        {field(order.packPromiseMin,"pack_promise_min")}
                    </Grid>
                    <Grid item md={6}>
                        {field(order.packPromiseMax,"pack_promise_max")}
                    </Grid>
                    <Grid item md={6}>
                        {field(order.shipPromiseMin,"ship_promise_min")}
                    </Grid>
                    <Grid item md={6}>
                        {field(order.shipPromiseMax,"ship_promise_max")}
                    </Grid>
                    <Grid item md={6}>
                        {field(order.deliveryPromiseMin,"delivery_promise_min")}
                    </Grid>
                    <Grid item md={6}>
                        {field(order.deliveryPromiseMax,"delivery_promise_max")}
                    </Grid>
                    <Grid item md={6}>
                        {field(order.readyPickUpPromiseMin,"ready_pickup_promise_min")}
                    </Grid>
                    <Grid item md={6}>
                        {field(order.readyPickUpPromiseMax,"ready_pickup_promise_max")}
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        )
    }

    if(!order ){
        return(
            <h1>Cargando...</h1>
        )
    }

    if(order.error){
        return(
            <React.Fragment>
                <h1>Error: Orden Inexistente</h1>
                <CancelButton label='Volver' component={Link} to='/' Icon={<SettingsBackupRestoreIcon/>}/>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <h2>Detalles</h2>
            <h3>Información de la Orden</h3>
            <Grid container spacing={1}>
                <Grid item md={6}>
                    <TextField 
                        disabled
                        value={order?order.orderNumber:""}
                        type="number" 
                        id="ordenNumero" 
                        label="Número de Orden" 
                        fullWidth
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField 
                        disabled
                        value={order?order.buyerName:""}
                        id="nombreComprador" 
                        label="Nombre del Comprador" 
                        fullWidth
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField 
                        disabled
                        value={order?order.buyerPhoneNumber:""}
                        type="number" 
                        id="numeroComprador" 
                        label="Número de Teléfono del Comprador" 
                        fullWidth
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField 
                        disabled
                        value={order?order.buyerEmail:""}
                        type="email" 
                        id="emailComprador" 
                        label="Email del Comprador" 
                        fullWidth
                    />
                </Grid>
            </Grid>
            <h3>Información de Envío</h3>
            <Grid container spacing={1}>
                <Grid item md={6}>
                    <TextField 
                        disabled
                        value={order?order.address:""}
                        id="direccion" 
                        label="Dirección" 
                        fullWidth
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField 
                        disabled
                        value={order?order.city:""}
                        id="ciudad" 
                        label="Ciudad" 
                        fullWidth
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField 
                        disabled
                        value={order?order.region:""}
                        id="region" 
                        label="Región" 
                        fullWidth
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField 
                        disabled
                        value={order?order.country:""}
                        id="country" 
                        label="País" 
                        fullWidth
                    />
                </Grid>
            </Grid>
            <h3>Fechas Proceso de Entrega (Hora Local 0-24h)</h3>
            {promiseDates()}
            <h3>Productos</h3>
            <Grid container spacing={1}>
                <Grid item md={12}>
                    <MaterialTable
                        columns={columns}
                        data={order?order.items:[]}
                        icons={tableIcons}
                        components={{
                            Container: props => <Paper {...props} elevation={0}/>
                        }}
                        options={{
                            search: false,
                            toolbar: false
                        }} 
                    />
                </Grid>
                <Grid item md={4}></Grid>
                <Grid item md={4}>
                    <CancelButton label='Volver' component={Link} to='/' Icon={<SettingsBackupRestoreIcon/>}/>
                </Grid>
                <Grid item md={4}></Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Details