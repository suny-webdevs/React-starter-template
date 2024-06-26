import { Helmet } from "react-helmet-async"

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1 className="text-3xl">React starter template</h1>
    </div>
  )
}

export default Home
