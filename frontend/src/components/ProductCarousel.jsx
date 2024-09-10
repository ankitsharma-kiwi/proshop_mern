import React from 'react'
import Loader from './Loader'
import Message from './Message'
import { Carousel, Image } from 'react-bootstrap'
import { useGetTopProductsQuery } from '../slices/productApiSlice'
import { Link } from 'react-router-dom'

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery()
  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <Message variant={'danger'}>{error?.data?.message}</Message>
  }
  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
