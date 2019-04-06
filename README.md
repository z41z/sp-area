# sp-area

根据区划代码找关联区划。

## Install

``` node
  npm i sp-area //or yarn add sp-area
```

## Build

``` node
  npm run build
```

## CDN

``` js
  <script src="https://unpkg.com/sp-area/dist/index.min.js"></script>
  <script>
    let {area} = __AREA;
    let origion = [
          { '510000': '四川省'},
          { '510100': '成都市' },
          { '510200': '绵阳市' },
          { '510201': '涪城区' },
          { '510202': '三台县' },
          { '510101': '武侯区' },
          { '510112': '青羊区' },
          { '520000': '贵州省' },
          { '520100': '贵阳市' },
          { '520101': '花溪区' },
          { '520102': '小河区' },
          { '520200': '安顺市' },
          { '520201': '安顺区'}]
    area({
      origion: origion,
      target: '510112',
      type: 'siblings',
      hasOwn: true,
      formatter(result) {
        result.forEach(item => {
          item.name = item.name.replace(/区|县/,'')
        })
        return result
      }
    })
    // [ { code: '510101', name: '武侯' },{ code: '510112', name: '青羊' } ]
  </script>
```

### Usage

``` js
  const {
    area
  } = require("sp-area")
```

* area(obj = {})
  * {Object} option
    * {Array} option.origion 区划数组
    * {String|Number} option.target 区划代码或区划名称
    * {String} option.type = children、siblings、parent
    * {Boolean} option.hasOwn 包括本身
    * {Function} option.formater 回调处理函数

  ``` js
    let origion = [
          { '510000': '四川省'},
          { '510100': '成都市' },
          { '510200': '绵阳市' },
          { '510201': '涪城区' },
          { '510202': '三台县' },
          { '510101': '武侯区' },
          { '510112': '青羊区' },
          { '520000': '贵州省' },
          { '520100': '贵阳市' },
          { '520101': '花溪区' },
          { '520102': '小河区' },
          { '520200': '安顺市' },
          { '520201': '安顺区'}];
    area(
      {
        origion: origion,
        target: '510100',
        type: 'children',
        hasOwn: false,
        formatter(result) {
          result.forEach(item => {
            item.name = item.name.replace(/区|县/,'')
          })
          return result
        }
      }
    );
    // '[ { code: '510101', name: '武侯' },{ code: '510112', name: '青羊' } ]'
    area(
      {
        origion: origion,
        target: '510100',
        type: 'children',
        hasOwn: true,
        formatter(result) {
          result.forEach(item => {
            item.name = item.name.replace(/区|县/,'')
          })
          return result
        }
      }
    );
    // '[ { code: '510100', name: '成都市' },{ code: '510101', name: '武侯' },{ code: '510112', name: '青羊' } ]'
    area(
      {
        origion: origion,
        target: '510100',
        type: 'siblings',
        hasOwn: false,
        formatter(result) {
          result.forEach(item => {
            item.name = item.name.replace(/区|县/,'')
          })
          return result
        }
      }
    );
    // '[ { code: '510200', name: '绵阳市' } ]'
    area(
      {
        origion: origion,
        target: '510100',
        type: 'siblings',
        hasOwn: true,
        formatter(result) {
          result.forEach(item => {
            item.name = item.name.replace(/区|县/,'')
          })
          return result
        }
      }
    );
    // [ { code: '510100', name: '成都市' },{ code: '510200', name: '绵阳市' } ]
    area(
      {
        origion: origion,
        target: '510100',
        type: 'parent',
        formatter(result) {
          result.forEach(item => {
            item.name = item.name.replace(/区|县/,'')
          })
          return result
        }
      }
    );
    // [ { code: '510000', name: '四川省' } ]
  ```