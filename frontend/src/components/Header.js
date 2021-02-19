import { Navbar,Nav,Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/UserActions';
const Header = () => {
	const user_login = useSelector(state => state.user_login);
	const dispatch = useDispatch();

	const log_out_user = () => {
		dispatch(logout());
	}
	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand href="#home">Online Dukan</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<LinkContainer to="/cart">
							<Nav.Link><i className="fas fa-shopping-cart fa-margin-right"></i>Cart</Nav.Link>
						</LinkContainer>

						{user_login.user_info ? 
						(
							<NavDropdown title={user_login.user_info.name} id='username'>
								<LinkContainer to='/profile'>
									<NavDropdown.Item>
										Profile
									</NavDropdown.Item>
								</LinkContainer>

								<NavDropdown.Item onClick={log_out_user}>
										LogOut
								</NavDropdown.Item>
							</NavDropdown>
						) 
						: // false condition
						(
							<LinkContainer to="/login">
								<Nav.Link><i className="fas fa-user fa-margin-right"></i>Login</Nav.Link>
							</LinkContainer>
						)}

						{user_login.user_info && user_login.user_info.is_admin && (
							<NavDropdown title='Admin' id='admin_menu'>
								<LinkContainer to='/admin/users_list'>
									<NavDropdown.Item>
										Users
									</NavDropdown.Item>
								</LinkContainer>

								<LinkContainer to='/admin/products_list'>
									<NavDropdown.Item>
										Products
									</NavDropdown.Item>
								</LinkContainer>

								<LinkContainer to='/admin/orders_list'>
									<NavDropdown.Item>
										Orders
									</NavDropdown.Item>
								</LinkContainer>

							</NavDropdown>

						)}
						
					</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
