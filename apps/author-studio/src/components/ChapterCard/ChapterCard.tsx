import type { CSSProperties } from 'react';
import './ChapterCard.css';

export interface ChapterCardProps {
  /** 章节标题 */
  title: string;
  /** 当前状态，例如待精修、可发布 */
  status: string;
  /** 当前字数 */
  wordCount: number;
  /** 最近更新时间 */
  updatedAt: string;
  /** 摘要说明 */
  summary: string;
  /** 强调色 */
  accentColor?: string;
}

const formatNumber = (value: number) => new Intl.NumberFormat('zh-CN').format(value);

export function ChapterCard({
  title,
  status,
  wordCount,
  updatedAt,
  summary,
  accentColor = '#8a6cff',
}: ChapterCardProps) {
  return (
    <article
      className="chapter-card"
      style={
        {
          '--chapter-accent': accentColor,
        } as CSSProperties
      }
    >
      {/* 顶部用于展示章节的状态标签和更新时间，适合后台列表型场景。 */}
      <header className="chapter-card__header">
        <span className="chapter-card__status">{status}</span>
        <span className="chapter-card__time">{updatedAt}</span>
      </header>

      {/* 这里保留摘要区域，便于在 Storybook 中测试长文案与短文案的布局差异。 */}
      <div className="chapter-card__content">
        <h3>{title}</h3>
        <p>{summary}</p>
      </div>

      <footer className="chapter-card__footer">
        <span>当前字数</span>
        <strong>{formatNumber(wordCount)} 字</strong>
      </footer>
    </article>
  );
}
