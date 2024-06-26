import { Helmet } from "react-helmet-async"

const Error = () => {
  return (
    <div>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <h1 className="text-3xl text-error">404 not found</h1>
    </div>
  )
}

export default Error
