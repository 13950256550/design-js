import { isUrl } from '../utils/utils';
import { getStore } from '../index';

let menuData = [
  {
    name: '1D设计',
    icon: 'form',
    path: '/1d_design',
    children: [{
      name: '输入',
      path: '/1d_design/input',
    }, {
      name: '输出',
      path: '/1d_design/output',
    }],
  },
];
export function getMenuData() {
  function formatter(data, parentPath = '/', parentAuthority) {
    return data.map((item) => {
      let { path } = item;
      if (!isUrl(path)) {
        path = parentPath + item.path;
      }
      const result = {
        ...item,
        path,
        authority: item.authority || parentAuthority,
      };
      if (item.children) {
        result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
      }
      return result;
    });
  }

  if (menuData) {
    return menuData;
  }else{
    return [];
  }

}
