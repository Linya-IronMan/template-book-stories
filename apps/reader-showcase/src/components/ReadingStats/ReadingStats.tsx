import './ReadingStats.css';

export interface ReadingStatsProps {
  /** 面板标题 */
  title: string;
  /** 面板副标题 */
  description: string;
  /** 当前累计字数 */
  totalWords: number;
  /** 当前章节数 */
  chapters: number;
  /** 活跃读者数 */
  activeReaders: number;
  /** 整体完成率 */
  completionRate: number;
}

const formatNumber = (value: number) => new Intl.NumberFormat('zh-CN').format(value);

export function ReadingStats({
  title,
  description,
  totalWords,
  chapters,
  activeReaders,
  completionRate,
}: ReadingStatsProps) {
  // 把面板中的统计项集中定义，后续更容易扩展为从接口返回的数据。
  const stats = [
    { label: '累计字数', value: `${formatNumber(totalWords)} 字` },
    { label: '已写章节', value: `${chapters} 章` },
    { label: '活跃读者', value: `${formatNumber(activeReaders)} 人` },
  ];

  const safeCompletionRate = Math.max(0, Math.min(completionRate, 100));

  return (
    <aside className="reading-stats">
      <div className="reading-stats__eyebrow">Storybook 预览面板</div>
      <h2>{title}</h2>
      <p>{description}</p>

      <div className="reading-stats__grid">
        {stats.map((item) => (
          <section key={item.label} className="reading-stats__item">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </section>
        ))}
      </div>

      <div className="reading-stats__progress">
        <div className="reading-stats__progress-head">
          <span>本期里程碑</span>
          <strong>{safeCompletionRate}%</strong>
        </div>
        <div className="reading-stats__track" aria-hidden="true">
          <span style={{ width: `${safeCompletionRate}%` }} />
        </div>
      </div>
    </aside>
  );
}
