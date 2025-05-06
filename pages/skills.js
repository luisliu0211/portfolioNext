import Layout from '@/component/layouts/layout';
import Content from '@/component/layouts/content';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

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
    console.log('Fetching skills from:', skillsDataUrl);

    const response = await fetch(skillsDataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Received data:', data);

    // 处理数据结构
    const groupedData = data.reduce((acc, item) => {
      console.log('Processing item:', item);
      if (!item || !item.category_name) {
        console.warn('Invalid item in data:', item);
        return acc;
      }

      const categoryName = item.category_name;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }

      // 确保所有必要的字段都存在
      const skillItem = {
        id: item.id || Math.random().toString(36).substr(2, 9),
        name: item.skill_name || '未命名技能',
        level: parseInt(item.level) || 0,
        description: item.description || '',
        icon: item.icon || '',
      };

      acc[categoryName].push(skillItem);
      return acc;
    }, {});

    console.log('Transformed data:', groupedData);

    return {
      props: {
        skillsCardData: {
          dataName: 'skills',
          data: groupedData,
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        skillsCardData: null,
      },
      revalidate: 60,
    };
  }
}
