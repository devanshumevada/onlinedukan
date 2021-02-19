import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap';

import Rating from '../components/Rating';
import LoadingScreen from '../components/LoadingSpinner';
import Message from '../components/Message';

import { useDispatch, useSelector } from 'react-redux';
import { list_product_detail } from '../actions/ProductActions';
import { add_to_cart } from '../actions/CartActions';

const ProductScreen = ({ match, history })  => {
	const [qty, set_qty] = useState(1);
	const dispatch = useDispatch();
	const product_details = useSelector(state=>state.product_detail);
	const {loading, error, product} = product_details;


	useEffect(()=> {
		dispatch(list_product_detail(match.params.id));
	},[]);

	const handle_add_to_cart_event = () => {
		dispatch(add_to_cart(match.params.id,qty));
		history.push('/cart');

	}


	return (
		<div>
			<Link to="/" className="btn btn-light my-3">Go Back</Link>
			{loading ? <LoadingScreen /> : error ? <Message variant='danger'>{error}</Message> :
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>

				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>

						<ListGroup.Item>
							<Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
						</ListGroup.Item>

						<ListGroup.Item>
							Price: &#8377;{product.price}
						</ListGroup.Item>
								
						<ListGroup.Item>
							Description: {product.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col><strong> &#8377;{product.price}</strong></Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Status</Col>
									<Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
								</Row>
							</ListGroup.Item>

							{product.countInStock > 0 &&
								<ListGroup.Item>
									<Row>
										<Col>Qty</Col>
										<Col xs='auto' className="my-1">
											<Form.Control as="select" value={qty} onChange={e => set_qty(parseInt(e.target.value))}>
												{
													[...Array(product.countInStock).keys()].map(i=>{
														return <option key={i} value={i+1}>{i+1}</option>
													})
												}
											</Form.Control>
										</Col>
									</Row>
								</ListGroup.Item>
							}

							<ListGroup.Item>
								<Button onClick={handle_add_to_cart_event} disabled={product.countInStock === 0} className="btn-block" type="button">Add to Cart</Button>
							</ListGroup.Item>
							
						</ListGroup>
					</Card>
				</Col>
			</Row> }
		</div>
	);
}

export default ProductScreen;