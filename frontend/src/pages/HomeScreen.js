import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

import { list_products_action } from '../actions/ProductActions';



const HomeScreen = () => {
	const dispatch = useDispatch();
	const product_list = useSelector(state=>state.product_list);

	useEffect(()=>{
		dispatch(list_products_action())
	},[]);
	
	return (
		<div>
			{product_list.loading ?<LoadingSpinner /> : product_list.error ? <Message variant='danger'>{product_list.error}</Message> :
			<Row>
				{product_list.products.map(product => {
					return (
						<Col sm={12} md={6} lg={4} xs={12} key={product._id}>
							<Product product={product} />
						</Col>
					);
				})}
			</Row> }
		</div>
	)
}

export default HomeScreen;
