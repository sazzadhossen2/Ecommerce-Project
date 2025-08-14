
import WishList from '../components/WishList/WishList';
import WishListStore from '../store/WishStore';
import Layout from '../components/layout/Layout';
import { useEffect } from 'react';

function WishListPage() {
   const { WishListRequest } = WishListStore();

  useEffect(() => {
    (async () => { await WishListRequest(); })();
  }, [WishListRequest]);
   return (
    <Layout>
      <WishList />
    </Layout>
  );
}

export default WishListPage