import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams, Link } from 'react-router-dom'
import Paginate from '../components/Paginate'
import SearchBox from '../components/SearchBox'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams()
  const { data: products, isLoading, error } = useGetProductsQuery({ keyword, pageNumber })

  return (
    <>
      {keyword ? (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
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
          <Paginate pages={products?.pages} page={products?.page} keyword={keyword ?? ''} />
        </>
      )}
    </>
  )
}

export default HomeScreen
