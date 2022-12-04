import { ThemeConfig } from 'antd/lib/config-provider/context';

export const darkTheme: ThemeConfig = {
  components: {
    Layout: {
      colorBgHeader: '#18181B',
      colorBgBody: '#0E0E10',
    },
    Menu: {
      colorItemBg: '#1F1F23',
      colorItemBgSelected: '#3C3C3F',

      colorItemTextSelected: '#E5F1FD',
      colorItemText: '#E5F1FD',

      colorItemTextHover: '#E5F1FD',
      colorItemBgHover: '#282828',

      radiusItem: 0,
    },
    Card: {
      colorBgContainer: '#3D3D40',
    },
  },
};
