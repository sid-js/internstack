import Head from 'next/head'
import { HomeLayout } from '../components/HomeLayout'


export default function Home() {
  return (

    <HomeLayout>
      <Head>
        <title>Internstack | Home</title>
      </Head>
      <div className='flex items-center justify-center w-full text-3xl'>This component is In Development</div>
    </HomeLayout>
  )
}
