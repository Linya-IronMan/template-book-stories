/**
 * @file AnchorDemo.tsx
 * @description 绝对定位元素在 2026 CSS Anchor Positioning 规范下的 anchor-center 居中对齐演示。
 */

import React, { useState, useRef, useEffect } from 'react';
import '../styles.css';

/**
 * Anchor 定位居中对齐演示组件
 * @returns {React.JSX.Element} 返回 JSX 结构
 */
export function AnchorDemo(): React.JSX.Element {
  const [anchorAlign, setAnchorAlign] = useState<'area-center' | 'anchor-center' | 'classic'>('anchor-center');
  const [anchorPos, setAnchorPos] = useState<{ x: number; y: number }>({ x: 50, y: 60 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [supportsAnchor, setSupportsAnchor] = useState<boolean>(true);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const supports = HTMLTemplateElement.prototype.hasOwnProperty('anchorName') || 
                       CSS.supports('anchor-name', '--test') ||
                       CSS.supports('position-anchor', '--test');
      setSupportsAnchor(supports);
    }
  }, []);

  /**
   * 处理拖拽移动
   * @param {React.MouseEvent<HTMLDivElement>} e 鼠标事件
   */
  const handleAnchorMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    
    x = Math.max(5, Math.min(95, x));
    y = Math.max(15, Math.min(95, y));
    
    setAnchorPos({ x, y });
  };

  return (
    <div className="demo-card" style={{ width: '600px', margin: '0 auto' }}>
      <h2 className="card-title">3. 锚点定位与居中 (Anchor Positioning)</h2>
      <p className="card-description">
        CSS 锚点定位无需使用 <code>transform: translate</code> 来对绝对定位元素居中。通过 <code>position-area</code> 与 <code>anchor-center</code> 声明，可以让定位元素直接跟随锚点水平中心对齐。
      </p>

      {!supportsAnchor && (
        <div className="compat-banner" style={{ margin: '0 0 10px 0' }}>
          <span>⚠️</span>
          <span>当前浏览器不完全支持 CSS Anchor Positioning。已启用 JS 降级计算进行模拟。</span>
        </div>
      )}

      <div className="card-controls">
        <span className="badge">居中方案:</span>
        <button 
          className={`control-btn ${anchorAlign === 'area-center' ? 'active' : ''}`}
          onClick={() => setAnchorAlign('area-center')}
        >
          1. 区域居中 (center)
        </button>
        <button 
          className={`control-btn ${anchorAlign === 'anchor-center' ? 'active' : ''}`}
          onClick={() => setAnchorAlign('anchor-center')}
        >
          2. 锚点居中 (anchor-center)
        </button>
        <button 
          className={`control-btn ${anchorAlign === 'classic' ? 'active' : ''}`}
          onClick={() => setAnchorAlign('classic')}
        >
          3. 传统 Translate
        </button>
      </div>

      <div 
        className="demo-viewport"
        ref={viewportRef}
        onMouseMove={handleAnchorMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div className="align-container-anchor">
          <div 
            className="anchor-element"
            style={{
              left: `${anchorPos.x}%`,
              top: `${anchorPos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
          >
            ⚓
          </div>

          <div 
            className={`positioned-bubble ${
              supportsAnchor 
                ? anchorAlign === 'area-center'
                  ? 'bubble-area-center'
                  : anchorAlign === 'anchor-center'
                    ? 'bubble-anchor-center'
                    : 'bubble-classic-transform'
                : 'bubble-classic-transform'
            }`}
            style={
              !supportsAnchor || anchorAlign === 'classic'
                ? {
                    left: `${anchorPos.x}%`,
                    top: `${anchorPos.y}%`,
                    position: 'absolute',
                    transform: 'translate(-50%, -100%) translateY(-12px)',
                  }
                : {
                    // @ts-ignore
                    '--my-anchor': 'anchor',
                    position: 'absolute',
                  }
            }
          >
            {anchorAlign === 'area-center' ? '区域居中 (place-self: center)' :
             anchorAlign === 'anchor-center' ? '锚点居中 (anchor-center)' :
             '传统翻译 (translate(-50%, -100%))'}
          </div>

          <div className="anchor-status-overlay">
            当前锚点坐标: X: {Math.round(anchorPos.x)}%, Y: {Math.round(anchorPos.y)}%
          </div>

          <div className="drag-tip">
            鼠标按住 ⚓ 拖拽移动
          </div>
        </div>
      </div>
    </div>
  );
}
