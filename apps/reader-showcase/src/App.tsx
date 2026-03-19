import './App.css';
import { BookCard } from './components/BookCard/BookCard';
import { ReadingStats } from './components/ReadingStats/ReadingStats';

const featuredBooks = [
  {
    title: '雾港回声',
    author: '林舟',
    category: '悬疑 / 长篇',
    summary:
      '一名电台主持人在海雾封港的七天里，逐步拼凑出一场跨越十五年的失踪案真相。',
    rating: 4.8,
    progress: 76,
    priceTag: '连载中',
    accentColor: '#7c5cff',
  },
  {
    title: '春山旅人',
    author: '周栖',
    category: '治愈 / 散文',
    summary:
      '围绕四季旅居写作展开，用轻巧片段记录人与小镇、植物和记忆之间的关系。',
    rating: 4.6,
    progress: 54,
    priceTag: '筹备出版',
    accentColor: '#e36f5d',
  },
];

function App() {
  return (
    <main className="app-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="hero-badge">React + Storybook Demo</span>
          <h1>template-book-stories</h1>
          <p>
            这是一个以当前目录为根目录搭建的 React + Storybook 示例仓库，
            用来演示“图书内容展示组件”的开发、预览与文档化流程。
          </p>
          <div className="hero-actions">
            <a href="http://localhost:6006" target="_blank" rel="noreferrer">
              打开 Storybook
            </a>
            <a href="http://localhost:5173" target="_blank" rel="noreferrer">
              打开应用首页
            </a>
          </div>
        </div>

        <ReadingStats
          title="本周创作面板"
          description="把组件和业务文案拆分出来后，可以在 Storybook 中单独校验不同状态。"
          totalWords={18600}
          chapters={12}
          activeReaders={328}
          completionRate={68}
        />
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>组件示例</span>
          <h2>可复用的图书卡片</h2>
          <p>
            下方组件同时在应用首页和 Storybook 中复用，便于后续继续扩展主题皮肤、空态和加载态。
          </p>
        </div>

        <div className="book-grid">
          {featuredBooks.map((book) => (
            <BookCard key={book.title} {...book} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
