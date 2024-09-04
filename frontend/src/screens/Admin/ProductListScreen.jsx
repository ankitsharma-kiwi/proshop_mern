import React from 'react'
import { useGetProductsQuery } from '../../slices/productApiSlice'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { LinkContainer } from 'react-router-bootstrap'

const ProductListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()

  const deleteHandler = (id) => {
    console.log(id)
  }

  return (
    <>
      <Row className="align-item-center">
        <Col>Products</Col>
        <Col className="text-end">
          <Button>
            <FaEdit /> Create Product
          </Button>
        </Col>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={'danger'}>Error: {error.message}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Row>
    </>
  )
}

export default ProductListScreen
