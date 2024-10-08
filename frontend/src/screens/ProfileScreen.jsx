import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Row, Col, Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useUpdateProfileMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useGetMyOrdersQuery } from '../slices/orderApiSlices'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const { data, isError, isLoading } = useGetMyOrdersQuery()
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useUpdateProfileMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.name, userInfo.email])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Profile updated successfully')
      } catch (err) {
        toast.error(err?.data?.message || err.error || err)
      }
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-2">
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">{isError?.data?.message}</Message>
        ) : data.length === 0 ? (
          <Message variant="info">No orders found</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>SubTotal</th>
                <th>Shipping</th>
                <th>Tax</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.itemsPrice}</td>
                  <td>${order.shippingPrice}</td>
                  <td>${order.taxPrice}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                        <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                        <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
