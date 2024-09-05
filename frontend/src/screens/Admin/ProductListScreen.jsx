import React from 'react'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Paginate from '../../components/Paginate'

const ProductListScreen = () => {
  const { keyword, pageNumber } = useParams()
  const { data: products, isLoading, error } = useGetProductsQuery({ keyword, pageNumber })
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()
  const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap()
      } catch (error) {
        toast.error(error?.data?.message || error.message || error)
      }
    }
  }

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct().unwrap()
      } catch (error) {
        toast.error(error?.data?.message || error.message || error)
      }
    }
  }

  return (
    <>
      <Row className="align-item-center">
        <Col>Products</Col>
        <Col className="text-end">
          <Button onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
        {(deleteLoading || loadingCreate) && <Loader />}
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
                {products.products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
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
            <Paginate pages={products.pages} page={products.page} isAdmin={true} keyword={keyword ?? ''} />
          </>
        )}
      </Row>
    </>
  )
}

export default ProductListScreen
