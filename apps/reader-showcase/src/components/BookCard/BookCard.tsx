import type { CSSProperties } from 'react';
import './BookCard.css';

export interface BookCardProps {
  /** 书名 */
  title: string;
  /** 作者名 */
  author: string;
  /** 分类标签 */
  category: string;
  /** 简要介绍 */
  summary: string;
  /** 评分，建议使用 0 到 5 之间的值 */
  rating: number;
  /** 当前创作或阅读进度，范围 0 到 100 */
  progress: number;
  /** 右上角状态标签 */
  priceTag: string;
  /** 用于区分不同卡片主题色 */
  accentColor?: string;
}

export function BookCard({
  title,
  author,
  category,
  summary,
  rating,
  progress,
  priceTag,
  accentColor = '#7c5cff',
}: BookCardProps) {
  // 这里把进度值钳制在 0~100，避免调用方传入异常值时破坏 UI。
  const safeProgress = Math.max(0, Math.min(progress, 100));

  return (
    <article
      className="book-card"
      style={
        {
          '--book-accent': accentColor,
        } as CSSProperties
      }
    >
      {/* 卡片头部展示书籍类型和当前状态。 */}
      <header className="book-card__header">
        <span className="book-card__category">{category}</span>
        <span className="book-card__tag">{priceTag}</span>
      </header>

      {/* 主体内容由标题、作者和摘要组成，适合 Storybook 展示多种文案长度。 */}
      <div className="book-card__content">
        <h3>{title}</h3>
        <p className="book-card__author">作者：{author}</p>
        <p className="book-card__summary">{summary}</p>
      </div>

      {/* 底部信息块同时包含评分和进度，方便验证状态展示组件。 */}
      <footer className="book-card__footer">
        <div>
          <span className="book-card__label">推荐指数</span>
          <strong>{rating.toFixed(1)} / 5</strong>
        </div>

        <div className="book-card__progress">
          <div className="book-card__progress-head">
            <span className="book-card__label">完成进度</span>
            <strong>{safeProgress}%</strong>
          </div>
          <div aria-hidden="true" className="book-card__progress-track">
            <span
              className="book-card__progress-value"
              style={{ width: `${safeProgress}%` }}
            />
          </div>
        </div>
      </footer>
    </article>
  );
}
