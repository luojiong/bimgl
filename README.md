# bimgl.js  [![npm version](https://img.shields.io/npm/v/bimgl.svg?sanitize=true)](https://www.npmjs.com/package/bimgl)

### JavaScript 3D library ##

The project is a web GL rendering library, with BIM life cycle related functions and operations

### Installation
```javascript
 npm install bimgl
```

### Example
```html
<div id='viewer'></div>
```
```javascript
import BIMGL from "bimgl";
const bimgl = new BIMGL();
bimgl.init(document.getElementById('viewer'),{
    uri: `modelURL`,
})
```
### init
```javascript
import BIMGL from "BIMGL";
const bimgl = new BIMGL();
bimgl.init(element,options);
```

### Options

| Key   | Type  | Default |  Description |
|  ----  | :----:  | :----: | --- |
| * uri|`string` |  |  模型加载地址 |
| antialias|`boolean` | false |  抗锯齿 |
| width | `number` | el.width | 场景宽度 |
| height | `number` | el.height | 场景高度 |
| selectColor | `十六进制` | 0x5cadff | 构件选中颜色|
| loadingImage | `string` |  |加载图片地址|
| clearColor | `十六进制` | 0xb9d3ff |场景背景色|
| animation | `Function` | null |帧循环|

### Event
- **`new Color`** _( 十六进制 )_ - 实例化一个颜色
- **`resize`** _(width,height)_ - 更改场景的大小
- **`render`** _()_ - 重新渲染
- **`onload`** _()_ -  模型加载完成
- **`onError`** _()_ => error - 模型加载失败 
- **`onStart`** _()_ - 模型加载开始
- **`onProgress`** _(进度百分比)_ - 模型加载进度
- **`destroy`** _()_ - 销毁模型
- **`onSelect`** _()_ => 构件 - 构件选中
- **`transparentComponentsById`** _( [ componentsId ] , opacity0.0-1.0) 将构件透明化
- **`setComponentsColorById`** _( [ componentsId ] , Color) 构建着色
- **`clearComponentsColorById`** _([ componentsId ]) 通过构件id清除构件着色
- **`setWorldPosition`** _(componentsId, element, position ? ) 通过构件id给模型加标签

