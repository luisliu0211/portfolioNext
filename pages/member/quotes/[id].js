import { useRouter } from 'next/router'; //用這個 hook 來做到
import Content from '@/component/layouts/content';
import Layout from '@/component/layouts/layout';
import Quotation from '../../quotation';
import { useEffect, useState } from 'react';
import { quoteDataFormatted } from '@/lib/quoteDataFormatted';
const apiUrl = process.env.REACT_APP_API_URL;

export default function QuoteDetail({ data }) {
  console.log(data, 'dd');
  const initialState = quoteDataFormatted(data);

  // const [data, setData] = useState({});
  // const router = useRouter();
  // console.log(router.query.id);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8080/api/quotes/${router.query.id}`,
  //         {
  //           credentials: 'include',
  //         }
  //       );
  //       const result = await response.json();
  //       setData(result[0]);
  //       console.log(result[0], 'rrrrrjij');
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  //   console.log(data, 'dd');
  // }, []);
  useEffect(() => {
    console.log(initialState, 'dd');
  }, [initialState]);
  return (
    <>
      <Quotation data={initialState} />
    </>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  try {
    const response = await fetch(`${apiUrl}/api/quotes/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return {
      props: {
        data: result[0],
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        data: null,
      },
    };
  }
}
// This function gets called at build time
