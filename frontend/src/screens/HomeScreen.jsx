import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'

const HomeScreen = () => {
  const { pageNumber } = useParams()
  const { data: products, isLoading, error } = useGetProductsQuery({ pageNumber })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error?.data?.message}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products?.products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={products?.pages} page={products?.page} />
        </>
      )}
    </>
  )
}

export default HomeScreen
