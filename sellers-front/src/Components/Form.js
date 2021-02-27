import React,{ useEffect,useState,forwardRef } from 'react';
import { Link,useHistory } from "react-router-dom"
import AcceptButton from './AcceptButton'
import CancelButton from './CancelButton'
import Swal from 'sweetalert2'
import csc from 'country-state-city'
import MaterialTable from "material-table"
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete'
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
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone'
import sellerService from '../Services/sellerService'
import promiseService from '../Services/promiseService'

const Form = () => {
    const history = useHistory()

    const[shippingMethods,setShippingMethods] = useState([])
    const[countries,setCountries] = useState([])
    const[regions,setRegions] = useState([])
    const[cities,setCities] = useState([])

    const [formData,setFormData] = useState({
        store: "",
        shippingMethod: null,
        orderNumber: "",
        buyerName: "",
        buyerPhoneNumber: "",
        buyerEmail: "",
        address:"",
        items: []
    }) 

    const[country,setCountry] = useState(null)
    const[region,setRegion] = useState(null)
    const[city,setCity] = useState(null)

    const[nameProduct,setNameProduct] = useState("")
    const[qtyProduct,setQtyProduct] = useState("")
    const[weightProduct,setWeightProduct] = useState("")

    const addProduct = () => {
        if((nameProduct === "" || qtyProduct === "") || weightProduct === ""){
            Swal.fire({
                icon: 'error',
                title: 'Falta información del producto',
            })
            return
        }
        const newProduct = {
            nombreProducto: nameProduct,
            cantidadProducto: qtyProduct,
            pesoProducto: weightProduct
        }
        setFormData({...formData,items:[...formData.items,newProduct]})
        setNameProduct("")
        setQtyProduct("")
        setWeightProduct("")
    }

    const deleteProduct = (product) => {
        const newProducts = formData.items.filter(addedProduct => addedProduct.nombreProducto !== product.nombreProducto)
        setFormData({...formData,items:newProducts})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(formData.items.length === 0){
            Swal.fire({
                icon: 'error',
                title: 'No has agregado productos',
            })
            return
        }
        const newOrder = {...formData,
            creationDate: new Date().toUTCString(),
            idShippingMethod: formData.shippingMethod.id || 1,
            shippingMethod: formData.shippingMethod.name,
            country: country.name,
            region: region.name,
            city: city.name
        }

        Swal.fire({
            title: `Procesando`,
        })
        Swal.showLoading()
        const promise = await promiseService.create(newOrder)
        Swal.close()
        
        if(promise.message){
            Swal.fire({
                icon: 'error',
                title: `${promise.message}`,
            })
        }else{
            Swal.fire({
                icon: 'success',
                title: `Orden registrada exitosamente`
            }).then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: `
                        (Horas GMT-0)
                        pack_promise_min: ${promise.packPromiseMin || 'No aplica'} <br>
                        pack_promise_max: ${promise.packPromiseMax || 'No aplica'} <br>
                        ship_promise_min: ${promise.shipPromiseMin || 'No aplica'} <br>
                        ship_promise_max: ${promise.shipPromiseMax || 'No aplica'} <br>
                        delivery_promise_min: ${promise.deliveryPromiseMin || 'No aplica'} <br>
                        delivery_promise_min: ${promise.deliveryPromiseMax || 'No aplica'} <br>
                        ready_pickup_promise_min: ${promise.readyPickUpPromiseMin || 'No aplica'} <br>
                        ready_puckup_promise_max: ${promise.readyPickUpPromiseMax || 'No aplica'} <br>
                  `,
                }).then(result => history.push("/"))
            })
        }
    }

    const columns = [
        { title: "Nombre del producto", field: "nombreProducto"},
        { title: "Cantidad", field: "cantidadProducto"},
        { title: "Peso del producto(kg)", field: "pesoProducto"},
        { 
            title: "Eliminar", 
            field:"", 
            render: (rowData) => <IconButton size='medium' onClick={() => deleteProduct(rowData)}><DeleteForeverTwoToneIcon fontSize='large'/></IconButton>
        }
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

    const tableProducts = () => {
        if(formData.items.length === 0){
            return <React.Fragment></React.Fragment>
        }
        return(
            <Grid item md={12}>
                <MaterialTable
                    columns={columns}
                    data={formData.items}
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
        )
    }

    useEffect(() => {
        const countries = csc.getAllCountries()
        setCountries(countries)
        sellerService.getShippingMethods().then(items =>{
            setShippingMethods(items)
        })
    },[])

    useEffect(() => {
        setRegion(null)
        setCity(null)
        if(country){
            const regions = csc.getStatesOfCountry(country.isoCode)
            setRegions(regions)
        }else{
            setRegions([])
            setCities([])
        }
    },[country])

    useEffect(() => {
        setCity(null)
        if(region){
            const cities = csc.getCitiesOfState(region.countryCode,region.isoCode)
            setCities(cities)
        }else{
            setCities([])
        }
    },[region])

    return(
        <React.Fragment>
            <h2>Nueva Orden</h2>
            <form onSubmit={(event) => handleSubmit(event)}>
                <Grid container spacing={1}>
                    <Grid item md={6}>
                        <TextField 
                            required
                            value={formData.store}
                            onChange={(event)=> setFormData({...formData,store:event.target.value})}
                            id="tienda" 
                            label="Tienda" 
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={6}>
                        <Autocomplete
                            value={formData.shippingMethod}
                            options={shippingMethods}
                            onChange = {(event,value) => setFormData({...formData,shippingMethod:value})}
                            getOptionLabel={option => option?option.name:""}
                            id="metodoEnvio"
                            renderInput={(params) => <TextField {...params} required label="Método de Envío" fullWidth/>}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField 
                            required
                            value={formData.orderNumber}
                            onChange={(event)=> setFormData({...formData,orderNumber:Number(event.target.value)})}
                            type="number" 
                            id="ordenNumero" 
                            label="Número de Orden" 
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField 
                            required
                            value={formData.buyerName}
                            onChange={(event)=> setFormData({...formData,buyerName:event.target.value})}
                            id="nombreComprador" 
                            label="Nombre del Comprador" 
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField 
                            required
                            value={formData.buyerPhoneNumber}
                            onChange={(event)=> setFormData({...formData,buyerPhoneNumber:Number(event.target.value)})}
                            type="number" 
                            id="numeroComprador" 
                            label="Número de Teléfono del Comprador" 
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField 
                            required
                            value={formData.buyerEmail}
                            onChange={(event)=> setFormData({...formData,buyerEmail:event.target.value})}
                            type="email" 
                            id="emailComprador" 
                            label="Email del Comprador" 
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={6}>
                        <Autocomplete
                            required
                            value={country}
                            options={countries}
                            getOptionLabel={option => option?option.name:""}
                            onChange = {(event,value) => setCountry(value)}
                            id="pais"
                            renderInput={(params) => <TextField {...params} required label="País" fullWidth/>}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <Autocomplete
                            value={region}
                            options={regions}
                            getOptionLabel={option => option?option.name:""}
                            onChange = {(event,value) => setRegion(value)}
                            id="region"
                            renderInput={(params) => <TextField {...params} required label="Región/Departamento" fullWidth/>}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <Autocomplete
                            required
                            value={city}
                            options={cities}
                            getOptionLabel={option => option?option.name:""}
                            onChange = {(event,value) => setCity(value)}
                            id="ciudad"
                            renderInput={(params) => <TextField {...params} required label="Ciudad/Municipio" fullWidth/>}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField 
                            required
                            value={formData.address}
                            onChange={(event)=> setFormData({...formData,address:event.target.value})}
                            id="direccion" 
                            label="Dirección" 
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={5}>
                        <TextField 
                            value={nameProduct}
                            id="nameProduct" 
                            label="Nombre del Producto" 
                            fullWidth
                            onChange={(event)=> setNameProduct(event.target.value)}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField 
                            value={qtyProduct}
                            type='number'
                            id="cantidad" 
                            label="Cantidad" 
                            fullWidth
                            onChange={(event)=> setQtyProduct(event.target.value)}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField 
                            value={weightProduct}
                            type='number' 
                            id="peso" 
                            label="Peso(Kg)" 
                            fullWidth
                            onChange={(event)=> setWeightProduct(event.target.value)}
                        />
                    </Grid>
                    <Grid item md={1}>
                        <IconButton 
                            size='medium'
                            onClick={() => addProduct()}
                        >
                            <AddBoxIcon fontSize='large' style={{ color: '#a7ca70' }}/>
                        </IconButton>
                    </Grid>
                    {tableProducts()}
                    <Grid item md={3}></Grid>
                    <Grid item md={3}>
                        <AcceptButton label='Guardar'/>
                    </Grid>
                    <Grid item md={3}>
                        <CancelButton 
                            label='Cancelar'
                            component={Link} 
                            to={'/'}
                        />
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

export default Form
