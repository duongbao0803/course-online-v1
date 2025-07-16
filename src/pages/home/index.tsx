import { Helmet } from 'react-helmet';
import HomePage from './HomePage';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
        <meta name='description' content='Giới thiệu các khóa học' />
        <link rel='icon' href='/favicon.ico' />
      </Helmet>
      <section>
        <HomePage />
      </section>
    </>
  );
};

export default Home;
