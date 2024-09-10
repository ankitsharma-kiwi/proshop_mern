import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const EditorRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return userInfo && userInfo.isEditor ? <Outlet /> : <Navigate to="/login" replace />
}

export default EditorRoute
