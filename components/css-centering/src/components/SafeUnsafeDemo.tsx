/**
 * @file SafeUnsafeDemo.tsx
 * @description 溢出情况下的 safe 对齐和默认 unsafe 对齐及滚动条完整性对比演示组件。
 */

import React from 'react';
import '../styles.css';

/**
 * Safe vs Unsafe 居中对齐演示组件
 * @returns {React.JSX.Element} 返回 JSX 结构
 */
export function SafeUnsafeDemo(): React.JSX.Element {
  return (
    <div className="demo-card" style={{ width: '600px', margin: '0 auto' }}>
      <h2 className="card-title">4. 安全 vs 不安全居中 (Safe vs Unsafe)</h2>
      <p className="card-description">
        当子元素尺寸溢出父容器时，默认的居中对齐（不安全对齐）会使子元素原点超出负坐标，导致左侧和顶部内容被截断且无法通过滚动条触及（造成数据丢失）。而 <code>safe center</code> 会在溢出时让元素靠左上对齐以供滚动。
      </p>

      <div className="demo-viewport" style={{ height: '240px' }}>
        <div className="align-container-safe">
          <div className="scroll-wrapper">
            <span className="scroll-title">不安全 (默认 center)</span>
            <div className="scroll-container align-unsafe">
              <div className="huge-box">
                🚨 左上角内容无法滚出
              </div>
            </div>
          </div>

          <div className="scroll-wrapper">
            <span className="scroll-title">安全 (safe center)</span>
            <div className="scroll-container align-safe">
              <div className="huge-box">
                <span className="safe-indicator">✨ 溢出时左上对齐以供滚动</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
