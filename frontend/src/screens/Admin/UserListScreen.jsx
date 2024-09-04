import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/usersApiSlice'
import { toast } from 'react-toastify'

const UserListScreen = () => {
  const { data, refetch, isLoading, isError } = useGetUsersQuery()
  const [deleteUser, { isLoadin: deleteLoading }] = useDeleteUserMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const res = await deleteUser(id).unwrap()
        refetch()
        toast.success(res.message)
      } catch (error) {
        toast.error(error?.data?.message || error?.message || error)
      }
    }
  }

  return (
    <>
      <Row className="align-item-center">
        <Col>Users</Col>
        <Col className="text-end">
          <Button onClick={() => {}}>
            <FaEdit /> Create Users
          </Button>
        </Col>
        {deleteLoading && <Loader />}
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">Error</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </>
  )
}

export default UserListScreen
