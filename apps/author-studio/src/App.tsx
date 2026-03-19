import './App.css';
import { ChapterCard } from './components/ChapterCard/ChapterCard';
import { ReleaseChecklist } from './components/ReleaseChecklist/ReleaseChecklist';

const chapters = [
  {
    title: '第 12 章：旧码头上的回声',
    status: '待精修',
    wordCount: 4280,
    updatedAt: '今天 09:20',
    summary: '主角第一次确认失踪案与港口气象站之间存在时间线冲突。',
    accentColor: '#8a6cff',
  },
  {
    title: '番外：灯塔值夜人手记',
    status: '可发布',
    wordCount: 2100,
    updatedAt: '昨天 22:14',
    summary: '从配角视角补足世界观细节，适合作为订阅福利内容发布。',
    accentColor: '#4cb7a5',
  },
];

const checklistItems = [
  { label: '主线章节校对完成', done: true },
  { label: '封面文案已同步设计稿', done: true },
  { label: '会员版番外已排版', done: false },
  { label: '发布公告与预约页已创建', done: false },
];

function App() {
  return (
    <main className="studio-shell">
      <section className="studio-hero">
        <div className="studio-copy">
          <span className="studio-badge">Author Studio Workspace</span>
          <h1>独立运行的作者后台 Storybook</h1>
          <p>
            这个子项目模拟创作后台场景，组件、样式和 Storybook 配置都与其他 workspace 隔离，
            可以单独开发、单独启动、单独构建。
          </p>
          <div className="studio-actions">
            <a href="http://localhost:6007" target="_blank" rel="noreferrer">
              打开 author-studio Storybook
            </a>
            <a href="http://localhost:5174" target="_blank" rel="noreferrer">
              打开作者后台首页
            </a>
          </div>
        </div>

        <ReleaseChecklist
          title="本期发布清单"
          description="把上线前检查点拆成独立组件后，可以直接在 Storybook 中演练不同发布状态。"
          progress={50}
          items={checklistItems}
        />
      </section>

      <section className="chapter-section">
        <div className="chapter-heading">
          <span>章节状态</span>
          <h2>适合后台管理场景的内容卡片</h2>
          <p>这里演示了与读者端完全不同的一组 UI，但同样拥有自己独立的 Storybook。</p>
        </div>

        <div className="chapter-grid">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.title} {...chapter} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
