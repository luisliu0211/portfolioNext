import Layout from '@/component/layouts/layout';
import Content from '@/component/layouts/content';
const apiUrl = process.env.REACT_APP_API_URL;
export default function Skills({ skillsCardData }) {
  if (!skillsCardData) {
    return (
      <>
        <Layout>
          <div>Loading</div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout>
        <Content data={skillsCardData} />
      </Layout>
    </>
  );
}

//抓取靜態資料（來自資料庫）
export async function getStaticProps() {
  try {
    let skillsDataUrl = `${apiUrl}/api/skills`;
    const response = await fetch(skillsDataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.category_name]) {
        acc[item.category_name] = [];
      }
      acc[item.category_name].push(item);
      return acc;
    }, {});
    console.log('groupedData', groupedData);
    return {
      props: {
        skillsCardData: { dataName: 'skills', data: groupedData },
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        skillsCardData: null,
      },
    };
  }
}
