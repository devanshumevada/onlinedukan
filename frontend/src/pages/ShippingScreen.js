import {useState, useEffect} from 'react';
import { Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import { save_shipping_address } from '../actions/CartActions';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
	// state was already defiend as a state so I had to use a different name
	const cart = useSelector(store_state => store_state.cart);
	const user_login = useSelector(store_state => store_state.user_login);
	const dispatch = useDispatch();

	const [address, set_address] = useState(cart.shipping_address.address);
	const [pin_code, set_pin_code] = useState(cart.shipping_address.pin_code);
	const [city, set_city] = useState(cart.shipping_address.city);
	const [state, set_state] = useState(cart.shipping_address.state);

	

	const handle_submit = e => {
		e.preventDefault();
		dispatch(save_shipping_address({
			address,
			city,
			pin_code,
			state
		}));
		history.push('/payment');

	}
	return (
		<FormContainer>
			<h1>Shipping</h1>
			
			{ user_login.user_info ? 
				<>
					<CheckoutSteps step1 step2 />
					<Form onSubmit={handle_submit}>
					<Form.Group controlId='address'>
							<Form.Label>Address</Form.Label>
							<Form.Control required type='text' placeholder='Enter Address' value={address ? address : ''} onChange={e => set_address(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='city'>
							<Form.Label>City</Form.Label>
							<Form.Control required type='text' placeholder='Enter city' value={city ? city : ''} onChange={e => set_city(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='pin_code'>
							<Form.Label>Pin Code</Form.Label>
							<Form.Control required type='text' placeholder='Enter Pin Code' value={pin_code ? pin_code : ''} onChange={e => set_pin_code(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='state'>
							<Form.Label>State</Form.Label>
							<Form.Control required type='text' placeholder='Enter State' value={state ? state : ''} onChange={e => set_state(e.target.value)}></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>Continue</Button>
					</Form>
				</>

				: //false condition

				<div style={{display: 'flex', justifyContent:'center'}}><Message variant="danger">Please Log In to view this section</Message></div>

				
			}
			
		</FormContainer>
	);
}

export default ShippingScreen;
