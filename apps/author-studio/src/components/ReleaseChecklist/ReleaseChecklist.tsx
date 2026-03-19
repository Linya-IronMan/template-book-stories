import './ReleaseChecklist.css';

export interface ChecklistItem {
  /** 检查项文案 */
  label: string;
  /** 是否完成 */
  done: boolean;
}

export interface ReleaseChecklistProps {
  /** 面板标题 */
  title: string;
  /** 面板描述 */
  description: string;
  /** 总体进度 */
  progress: number;
  /** 检查项数组 */
  items: ChecklistItem[];
}

export function ReleaseChecklist({
  title,
  description,
  progress,
  items,
}: ReleaseChecklistProps) {
  // 对进度做钳制，避免外部传入异常值导致进度条越界。
  const safeProgress = Math.max(0, Math.min(progress, 100));

  return (
    <aside className="release-checklist">
      <div className="release-checklist__eyebrow">发布控制台</div>
      <h2>{title}</h2>
      <p>{description}</p>

      <div className="release-checklist__progress-head">
        <span>当前完成度</span>
        <strong>{safeProgress}%</strong>
      </div>
      <div className="release-checklist__track" aria-hidden="true">
        <span style={{ width: `${safeProgress}%` }} />
      </div>

      <ul className="release-checklist__list">
        {items.map((item) => (
          <li key={item.label} className={item.done ? 'is-done' : 'is-pending'}>
            <span className="release-checklist__dot" aria-hidden="true" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
