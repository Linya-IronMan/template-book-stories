/**
 * @file CenteringDemo.tsx
 * @description 2026 年 CSS 居中演示交互组件，使用 Vanilla CSS 实现多功能控制面板。
 */

import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

/**
 * 2026 年 CSS 居中演示主组件
 * @returns {React.JSX.Element} 返回演示面板的 JSX 结构
 */
export function CenteringDemo(): React.JSX.Element {
  // --- 模块 1: Flex vs Grid 状态 ---
  const [layoutMode, setLayoutMode] = useState<'flex' | 'grid'>('flex');
  const [boxCount, setBoxCount] = useState<number>(3);
  const [boxSizes, setBoxSizes] = useState<'same' | 'different'>('different');

  // --- 模块 2: Text-box 状态 ---
  const [trimMode, setTrimMode] = useState<'none' | 'cap' | 'ex'>('none');

  // --- 模块 3: Anchor Positioning 状态 ---
  const [anchorAlign, setAnchorAlign] = useState<'area-center' | 'anchor-center' | 'classic'>('anchor-center');
  const [anchorPos, setAnchorPos] = useState<{ x: number; y: number }>({ x: 50, y: 60 }); // 百分比位置
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [supportsAnchor, setSupportsAnchor] = useState<boolean>(true);
  const anchorViewportRef = useRef<HTMLDivElement>(null);

  // 检测浏览器是否支持 CSS Anchor Positioning
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const supports = HTMLTemplateElement.prototype.hasOwnProperty('anchorName') || 
                       CSS.supports('anchor-name', '--test') ||
                       CSS.supports('position-anchor', '--test');
      setSupportsAnchor(supports);
    }
  }, []);

  /**
   * 处理锚点定位的拖拽移动逻辑
   * @param {React.MouseEvent<HTMLDivElement>} e 鼠标事件对象
   */
  const handleAnchorMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !anchorViewportRef.current) return;
    const rect = anchorViewportRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // 边界控制
    x = Math.max(5, Math.min(95, x));
    y = Math.max(15, Math.min(95, y));
    
    setAnchorPos({ x, y });
  };

  // --- 模块 4: Safe vs Unsafe 状态 ---
  // 本地不需要特殊的组件状态，纯靠 CSS grid 对比

  return (
    <div className="demo-dashboard">
      <header className="demo-header">
        <h1>The State of CSS Centering in&nbsp;2026</h1>
        <p>探索原生 CSS 居中对齐的最新演进与设计美学</p>
      </header>

      {/* 特性不兼容提示 */}
      {!supportsAnchor && (
        <div className="compat-banner">
          <span>⚠️</span>
          <span>您的浏览器当前不完全支持原生 CSS Anchor Positioning（锚点定位）。Demo 已启用 JS 降级计算进行模拟，但原生 CSS 属性（如 <code>position-area</code>）在真机下将更为轻量！建议使用最新版 Chrome 体验。</span>
        </div>
      )}

      <div className="demo-grid">
        
        {/* ==========================================
            模块 1: Flexbox vs Grid 多子元素居中
            ========================================== */}
        <section className="demo-card">
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
              Flexbox (place-content: center)
            </button>
            <button 
              className={`control-btn ${layoutMode === 'grid' ? 'active' : ''}`}
              onClick={() => setLayoutMode('grid')}
            >
              CSS Grid (place-content: center)
            </button>
          </div>

          <div className="card-controls">
            <span className="badge">元素数量:</span>
            <button className="control-btn" onClick={() => setBoxCount(Math.max(1, boxCount - 1))}>- 减少</button>
            <span style={{ minWidth: '24px', textAlign: 'center' }}>{boxCount}</span>
            <button className="control-btn" onClick={() => setBoxCount(Math.min(5, boxCount + 1))}>+ 增加</button>

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
        </section>

        {/* ==========================================
            模块 2: Text-box 文本裁剪对齐
            ========================================== */}
          <section className="demo-card">
          <h2 className="card-title">2. 文本完美垂直居中 (Text-box Trim)</h2>
          <p className="card-description">
            传统文本由于字体设计在字符四周留有行间距（Leading Whitespace），导致即使盒子完美居中，视觉上文本也会偏下。2026 新属性 <code>text-box</code> 可以精准裁剪留白。
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
              大写裁剪 (cap alphabetic)
            </button>
            <button 
              className={`control-btn ${trimMode === 'ex' ? 'active' : ''}`}
              onClick={() => setTrimMode('ex')}
            >
              小写裁剪 (ex alphabetic)
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
        </section>

        {/* ==========================================
            模块 3: CSS 锚点定位与居中
            ========================================== */}
        <section className="demo-card">
          <h2 className="card-title">3. 锚点定位与居中 (Anchor Positioning)</h2>
          <p className="card-description">
            使用 2026 锚点定位标准。传统绝对定位居中需要借助 <code>transform: translate</code>。现代浏览器允许我们设置 <code>position-area</code> 并通过 <code>anchor-center</code> 实现相对锚点居中。
          </p>

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
            ref={anchorViewportRef}
            onMouseMove={handleAnchorMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            <div className="align-container-anchor">
              {/* 锚点小球 */}
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

              {/* 悬浮气泡 */}
              {/* 原生 CSS 锚点方式使用 --my-anchor 关联；为了保证旧浏览器上也能呈现，使用 JS 兜底定位 */}
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
                        // 动态注册 anchor 变量以使原生锚点定位工作
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
        </section>

        {/* ==========================================
            模块 4: 安全与不安全居中
            ========================================== */}
        <section className="demo-card">
          <h2 className="card-title">4. 安全 vs 不安全居中 (Safe vs Unsafe)</h2>
          <p className="card-description">
            当子元素溢出父容器时，默认的居中对齐（不安全）会导致子元素的左侧和顶部溢出且无法通过滚动条触及（导致数据丢失）。而 <code>safe center</code> 可以在溢出时让元素靠左上对齐。
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
        </section>

      </div>
    </div>
  );
}
