import type { NextPage } from 'next'
import Main from './components/main'
import Header from './components/header'
const style = {
  wrapper: 'h-5/6  w-screen  text-white select-none flex flex-col justify-between',
  bg:'bg-gradient-to-b from-violet-600 via-purple-900 to-gray-900',
}
const Home: NextPage = () => {
  return (
    <div className={`${style.wrapper} ${style.bg}`} >
      <Header />
      <Main></Main>
      
    </div>
  )
}

export default Home
