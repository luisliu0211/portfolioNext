import { sampleWorks, sampleSkills } from '../../data/sample-data';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允许 POST 请求' });
  }

  try {
    // 这里应该替换为您的实际数据库操作
    // 示例：使用 fetch 发送到您的后端 API
    const worksResponse = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/works/seed`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleWorks),
      }
    );

    const skillsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/skills/seed`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleSkills),
      }
    );

    if (!worksResponse.ok || !skillsResponse.ok) {
      throw new Error('API 请求失败');
    }

    const worksData = await worksResponse.json();
    const skillsData = await skillsResponse.json();

    res.status(200).json({
      message: '数据已成功添加到数据库',
      works: worksData,
      skills: skillsData,
    });
  } catch (error) {
    console.error('添加示例数据时出错:', error);
    res.status(500).json({ message: '添加数据时出错', error: error.message });
  }
}
