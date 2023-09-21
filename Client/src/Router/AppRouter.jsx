import React from 'react'
import {Route,BrowserRouter,Routes} from 'react-router-dom'


import App from '../App'
import ProductTypesPage from '../Pages/ProductTypesPage';
import ProductsPage from '../Pages/ProductsPage';


const AppRouter =()=>{

    return (
        <BrowserRouter  >
        
            <Routes>
                <Route path="/" element={<App/>}>
                        <Route path="/Products" element={<ProductsPage fallback={<div>Loading...</div>} />} />
                        <Route path="/ProductTypes" element={<ProductTypesPage/>} />
                        {/* {user.role<=2 && <Route path="/tickets/:id" element={<TicketViewPage/>} />} */}
                        <Route path="*" element={<NotFound/>} />
                    
                </Route>
            </Routes>
        
        </BrowserRouter>
    )
}

const st = {
    height:'70vh',
    display:'grid',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize : '3rem',
    textAlign : 'center'
  }
const NotFound = ()=>(
        <div style={st} >
            <h1>Page not found</h1>
        </div>
        )

export default AppRouter