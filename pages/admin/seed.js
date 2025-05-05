import { useState } from 'react';
import Layout from '../../component/layouts/layout';

export default function SeedData() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSeedData = async () => {
    try {
      setStatus('正在添加数据...');
      setError('');

      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '添加数据失败');
      }

      setStatus('数据添加成功！');
    } catch (err) {
      setError(err.message);
      setStatus('');
    }
  };

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1>添加示例数据</h1>
        <button
          onClick={handleSeedData}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          添加数据
        </button>

        {status && (
          <p style={{ color: 'green', marginTop: '10px' }}>{status}</p>
        )}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </Layout>
  );
}
