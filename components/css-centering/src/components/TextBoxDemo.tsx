/**
 * @file TextBoxDemo.tsx
 * @description 文本垂直完美居中与 text-box (text-box-trim) 裁剪规范的交互演示组件。
 */

import React, { useState } from 'react';
import '../styles.css';

/**
 * Text-box 文本裁剪对齐演示组件
 * @returns {React.JSX.Element} 返回 JSX 结构
 */
export function TextBoxDemo(): React.JSX.Element {
  const [trimMode, setTrimMode] = useState<'none' | 'cap' | 'ex'>('none');

  return (
    <div className="demo-card" style={{ width: '600px', margin: '0 auto' }}>
      <h2 className="card-title">2. 文本完美垂直居中 (Text-box Trim)</h2>
      <p className="card-description">
        传统文本由于字体设计在字符四周留有行间距（Leading Whitespace），导致即使盒子完美居中，视觉上文本也会偏下。2026 新属性 <code>text-box</code> 可以精准裁剪留白，实现纯几何级完美居中。
      </p>

      <div className="card-controls">
        <span className="badge">裁剪策略:</span>
        <button 
          className={`control-btn ${trimMode === 'none' ? 'active' : ''}`}
          onClick={() => setTrimMode('none')}
        >
          无裁剪 (默认)
        </button>
        <button 
          className={`control-btn ${trimMode === 'cap' ? 'active' : ''}`}
          onClick={() => setTrimMode('cap')}
        >
          大写裁剪 (cap)
        </button>
        <button 
          className={`control-btn ${trimMode === 'ex' ? 'active' : ''}`}
          onClick={() => setTrimMode('ex')}
        >
          小写裁剪 (ex)
        </button>
      </div>

      <div className="demo-viewport">
        <div className="align-container-textbox">
          <div className="text-box-wrapper">
            <span className="badge">参考对比（无裁剪）</span>
            <div className="text-box-container">
              <span className="text-element trim-none">
                {trimMode === 'ex' ? 'awesome' : 'TEXT'}
              </span>
            </div>
          </div>

          <div className="text-box-wrapper">
            <span className="badge">启用 text-box-trim</span>
            <div className="text-box-container">
              <span className={`text-element ${trimMode === 'cap' ? 'trim-cap' : trimMode === 'ex' ? 'trim-ex' : 'trim-none'}`}>
                {trimMode === 'ex' ? 'awesome' : 'TEXT'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
