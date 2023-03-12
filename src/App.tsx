import {Routing} from './components/routing/routing';
import {PayPalScriptProvider} from "@paypal/react-paypal-js";


function App() {

    return (
        <PayPalScriptProvider
            options={{"client-id": "Ae42UZ-pT_v8Apgvz8-qraR_B4QEN19Gl9k13gyurtTN1-W7LfbaBTwCF6IsT7vG0DsjiPOceWpLJl3B"}}>
            <div className='App'>
                <Routing/>
            </div>
        </PayPalScriptProvider>


    );
}

export default App;
