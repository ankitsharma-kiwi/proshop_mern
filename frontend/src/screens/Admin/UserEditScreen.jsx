import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice'

const UserEditScreen = () => {
  const { id: userId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const { data: user, refetch, isLoading, error } = useGetUserDetailsQuery(userId)
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()
  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])
  const submitHandler = async (e) => {
    e.preventDefault()
    const updatedProduct = {
      userId,
      name,
      email,
      isAdmin,
    }
    const result = await updateUser(updatedProduct)
    if (result.error) {
      toast.error(result.error.message)
    } else {
      toast.success('Product updated successfully')
      navigate('/admin/productlist')
    }
  }

  if (isLoading || loadingUpdate) {
    return <Loader />
  }
  if (error) {
    return <Message variant="danger">{error?.data?.message}</Message>
  }
  if (!user) {
    return <Message variant="danger">Product not found</Message>
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-2">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default UserEditScreen
