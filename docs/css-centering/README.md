# 2026 年 CSS 居中与对齐规范指南

本指南记录了 2026 年原生 CSS 规范在元素居中和对齐领域的演进，以及相应的最佳实践。

---

## 1. 对齐模型与双轴线设计

任何 CSS 布局（如 Grid、Flexbox 或 Block）的对齐，都可以通过以下两维坐标系来理解：

| 对齐层面 | 垂直轴（Block Axis） | 水平轴（Inline Axis） | 简写属性 |
| :--- | :--- | :--- | :--- |
| **内容（Content）对齐** | `align-content` | `justify-content` | `place-content` |
| **项目（Item）对齐** | `align-items` / `align-self` | `justify-items` / `justify-self` | `place-items` / `place-self` |

* **内容对齐**：控制整个内容区域在容器剩余空间中的流动分布。
* **项目对齐**：控制单个元素在为其所分配的占位单元格或可用区域内的自我定位。

### 1.2 居中折行时的 Flexbox vs Grid 本质差异
当容器内仅有一个子元素时，Flexbox 和 CSS Grid 呈现出来的居中状态是一致的。但当存在**多个子元素且容器空间受限发生折行**时：
* **Flexbox（一维布局）**：换行后，在新的一行中会使子元素**独立执行重新水平居中对齐**，这会导致上下行的元素在垂直列线上发生错位。
* **CSS Grid（二维布局）**：换行后，子元素会严格**按照预设的网格列轨对齐**，即便下一行元素较少，也能保持规整垂直排列。

在绝大多数实际业务场景（如产品网格、卡片网格列表）中，元素在折行时保持整齐的列对齐比独立的单行居中更为符合直觉和常规使用的布局思路，因而在此类场景下 CSS Grid 往往更具优势；而 Flexbox 则非常适用于需要每行自适应流动分布对齐的特殊场景。

---

## 2. 核心特性与 2026 新属性

### 2.1 文本垂直裁剪对齐：`text-box` (又称 `text-box-trim`)
在过去，垂直居中一个含有文本的盒子时，文字四周固有的字号行高余白（Leading Whitespace）会导致视觉重心偏下或偏上。
2026 年推出的 `text-box` 属性（或 `text-box-trim` 和 `text-box-edge`）为这一顽疾提供了原生解法。

```css
.button-text {
  /* 简写语法 */
  text-box: cap alphabetic;
  
  /* 展开语法 */
  text-box-trim: both;       /* 裁剪顶部和底部 */
  text-box-edge: cap alphabetic; /* 裁剪边缘到大写字母高度及字母基线 */
}
```
* **`cap alphabetic`**：最适合全大写字母或数字，可裁切掉大部分上部白边。
* **`ex alphabetic`**：最适合无升部/降部的小写字母（如 a, c, e, o, x），裁切边缘至小写字母 x 的高度。

---

### 2.2 绝对定位与锚点居中：CSS Anchor Positioning
传统的绝对定位居中使用 `transform: translate(-50%, -50%)`，这极易与转场动画发生冲突。
现代规范利用锚点定位（Anchor Positioning）实现了优雅的居中。

```css
.anchor-element {
  anchor-name: --my-anchor; /* 声明锚点名称 */
}

.positioned-bubble {
  position: absolute;
  position-anchor: --my-anchor; /* 关联锚点 */
  
  position-area: top; /* 放置在锚点顶部 */
  place-self: end anchor-center; /* 在水平方向上与锚点中心重合 */
}
```
* **`anchor-center`**：这是一个专为锚点定位设计的全新对齐值，用于指示浏览器直接对齐至关联锚点的轴线中心。

---

### 2.3 安全对齐：`safe` 关键字
当子元素尺寸大于父容器且发生溢出时，默认的居中方式（`unsafe` 居中）会导致子元素的左侧和顶部被切断且无法滚动触及。

```css
.container {
  display: grid;
  place-content: safe center;
}
```
* 当空间足够时，表现为完美居中。
* 当空间不足发生溢出时，对齐方式自动转为 `start`（左上对齐），使用户能通过滚动条看清完整的内容，防止内容和功能丢失。

---

## 3. 组件库使用说明

我们在 `@template-book-stories/css-centering` 中封装了该特性的完整演示组件。
* **Story 演示路径**：`/apps/storybook` 启动后，在侧边栏导航至 `CSS Features/2026 Centering Guide` 或 `CSS Features/2026 Centering Demo`。
* **兼容性说明**：锚点定位和 `text-box` 特性要求较新的浏览器引擎支持。在旧版浏览器中，Demo 内部已集成 JS 自动降级模拟，确保演示正常，但生产环境使用前请评估目标用户的浏览器覆盖率。
