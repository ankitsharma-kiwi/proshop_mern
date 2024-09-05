import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
const SearchBox = () => {
  const { keyword: urlKeyword } = useParams()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState(urlKeyword ?? ' ')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
        setKeyword('')
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} className='d-flex gap-3'>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5 ml-5"
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="p-2">
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
