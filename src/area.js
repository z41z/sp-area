/**
 * 根据区划代码或区划名找对应关系的区划值
 * @param {Object} option 
 * @param {Array} option.origion 区划数组
 * @param {String|Number} option.target 区划代码或区划名称
 * @param {String} option.type = children、siblings、parent
 * @param {Boolean} option.hasOwn 包括本身
 * @param {Function} option.formater 回调处理函数
 */
const area = (option = {}) => {
  let {
    origion = [],
    target = '',
    type = 'children',
    hasOwn = false,
    formatter = function () { }
  } = option;

  /**
   * 将传入区划数据转换成标准的{区划代码:区划名称}格式，匹配数字和汉字
   */
  let areaData = [];
  origion.forEach(item => {
    let code = JSON.stringify(item).replace(/\D+/ig, '');
    let name = JSON.stringify(item).replace(/[^\u4e00-\u9fa5]+/ig, '');
    areaData.push({
      code,
      name
    });
  })

  let result = areaData.filter(item => {
    let targetStr;
    if (+target) {
      targetStr = ("" + target);
    }
    else {
      targetStr = getCodeByName(areaData, target)
    }
    let substr, value, flag;
    switch (type) {
      // 子区划
      case 'children':
        // 省
        if (!(targetStr % 1e4)) {
          substr = targetStr.substring(0, 2);
          value = 1e2;
        }
        // 市
        else if (!(targetStr % 1e2)) {
          substr = targetStr.substring(0, 4);
          value = 1;
        }
        // 区县
        else {
          substr = targetStr;
          value = 1;
        }
        flag = item.code.indexOf(substr) > -1 && !(item.code % value);
        return hasOwn ? (flag) : (flag && item.code != targetStr);
        break;
      
      // 兄弟区划
      case 'siblings':
        // 省
        if (!(targetStr % 1e4)) {
          substr = '';
          value = 1e4;
          flag = !(item.code % 1e4);
        }
        // 市
        else if (!(targetStr % 1e2)) {
          substr = targetStr.substring(0, 2);
          value = 1e2;
          flag = item.code.indexOf(substr) > -1 && !(item.code % 1e2) && (item.code % 1e4);
        }
        // 区县
        else {
          substr = targetStr.substring(0, 4);
          value = 1;
          flag = item.code.indexOf(substr) > -1 && (item.code % 10);
        }
        return hasOwn ? (flag) : (flag && item.code != targetStr);
        break;
      
      // 父区划
      case 'parent':
        // 省
        if (!(targetStr % 1e4)) {
          substr = '';
          value = 1e5;
        }
        // 市
        else if (!(targetStr % 1e2)) {
          substr = targetStr.substring(0, 2);
          value = 1e4;
        }
        // 区县
        else {
          substr = targetStr.substring(0, 4);
          value = 1e2;
        }
        return item.code.indexOf(substr) > -1 && !(item.code % value);
        break;
      default:
        return [];
        break;
    }
  });
  return formatter(result);
}

/**
 * 根据区划名找区划代码
 * @param {Array} data 
 * @param {String} name 
 */
const getCodeByName = (data, name) => {
  let code = '';
  data.forEach(item => {
    if (item.name.indexOf(name) > -1) {
      code = item.code;
    }
  })
  return ""+code;
}

module.exports.default = module.exports = area;