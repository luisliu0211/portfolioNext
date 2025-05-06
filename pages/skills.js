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

    // 处理数据结构
    const groupedData = data.reduce((acc, item) => {
      const categoryName = item.category_name || '其他';
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      // 转换数据结构
      acc[categoryName].push({
        id: item.id,
        name: item.name || '',
        level: item.level || 0,
        description: item.description || '',
        icon: item.icon || '',
      });
      return acc;
    }, {});

    return {
      props: {
        skillsCardData: {
          dataName: 'skills',
          data: groupedData,
        },
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
