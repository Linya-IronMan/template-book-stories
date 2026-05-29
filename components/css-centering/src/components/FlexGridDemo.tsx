/**
 * @file FlexGridDemo.tsx
 * @description Flexbox 与 Grid 布局在多子元素居中与折行对齐差异的交互演示组件。
 */

import React, { useState } from 'react';
import '../styles.css';

/**
 * Flexbox 与 Grid 居中差异演示组件
 * @returns {React.JSX.Element} 返回 JSX 结构
 */
export function FlexGridDemo(): React.JSX.Element {
  const [layoutMode, setLayoutMode] = useState<'flex' | 'grid'>('flex');
  const [boxCount, setBoxCount] = useState<number>(5);
  const [boxSizes, setBoxSizes] = useState<'same' | 'different'>('different');

  return (
    <div className="demo-card" style={{ width: '600px', margin: '0 auto' }}>
      <h2 className="card-title">1. 多元素居中差异 (Flexbox vs Grid)</h2>
      <p className="card-description">
        当子元素折行时，Flexbox 在新行中会使元素独立执行居中对齐（导致上下行错开）；而 Grid 布局则会让每个元素严丝合缝地按照网格列线进行对齐。通常，Grid 的这种整齐列对齐效果更符合常规使用的布局思路。拉动右侧边缘改变宽度观察差异。
      </p>
      
      <div className="card-controls">
        <span className="badge">布局模式:</span>
        <button 
          className={`control-btn ${layoutMode === 'flex' ? 'active' : ''}`}
          onClick={() => setLayoutMode('flex')}
        >
          Flexbox
        </button>
        <button 
          className={`control-btn ${layoutMode === 'grid' ? 'active' : ''}`}
          onClick={() => setLayoutMode('grid')}
        >
          CSS Grid
        </button>
      </div>

      <div className="card-controls">
        <span className="badge">元素数量:</span>
        <button className="control-btn" onClick={() => setBoxCount(Math.max(1, boxCount - 1))}>- 减少</button>
        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>{boxCount}</span>
        <button className="control-btn" onClick={() => setBoxCount(Math.min(8, boxCount + 1))}>+ 增加</button>

        <span className="badge" style={{ marginLeft: '10px' }}>尺寸规格:</span>
        <button 
          className={`control-btn ${boxSizes === 'same' ? 'active' : ''}`}
          onClick={() => setBoxSizes('same')}
        >
          等大
        </button>
        <button 
          className={`control-btn ${boxSizes === 'different' ? 'active' : ''}`}
          onClick={() => setBoxSizes('different')}
        >
          参差不齐
        </button>
      </div>

      <div className="demo-viewport">
        <div className={`viewport-resizable ${layoutMode === 'flex' ? 'align-container-flex' : 'align-container-grid'}`}>
          {Array.from({ length: boxCount }).map((_, index) => {
            let sizeClass = 'box-size-1';
            if (boxSizes === 'different') {
              sizeClass = index % 3 === 0 ? 'box-size-1' : index % 3 === 1 ? 'box-size-2' : 'box-size-3';
            }
            return (
              <div key={index} className={`box-item ${sizeClass}`}>
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
