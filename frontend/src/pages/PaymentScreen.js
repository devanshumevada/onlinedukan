import { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { save_payment_method } from '../actions/CartActions';

const PaymentScreen = ({ history }) => {
      	const cart = useSelector(state => state.cart);
      	const { shipping_address} = cart;
	const dispatch = useDispatch();
	const [payment_method, set_payment_method] = useState('Online Payment');

	if ( !shipping_address.address ) {
		history.push('/shipping');
	}

	const submit_handler = e => {
		e.preventDefault();
		dispatch(save_payment_method(payment_method));
		history.push('/place_order');
	}
	return (
	       <FormContainer>
	       		
			<CheckoutSteps step1 step2 step3 />

			<Form onSubmit={submit_handler}>
				{payment_method}
				<Form.Group>
					<Form.Label as='legend'>Select Payment Method</Form.Label>
					<Col>
						<Form.Control as='select' onChange={e => set_payment_method(e.target.value)}>
							<option value="online_payment">Online Pay</option>
							<option value="cash_on_delivery">Cash On Delivery</option>
						</Form.Control>
					</Col>
				</Form.Group>
				<Button type='submit' variant='primary'>Continue</Button>
			</Form>
		</FormContainer>
	);
}

export default PaymentScreen;