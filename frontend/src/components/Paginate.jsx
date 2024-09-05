import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

/**
 * Paginate component
 * @param {number} pages - Total number of pages
 * @param {number} page - Current page number
 * @param {boolean} isAdmin - Flag to indicate if the component is used for admin pages
 * @param {string} keyword - Search keyword (optional)
 * @returns {JSX.Element} - Rendered component
 */
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination className='justify-content-center'>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
