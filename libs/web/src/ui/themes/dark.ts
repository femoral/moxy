import { ThemeConfig } from 'antd/lib/config-provider/context';

export const darkTheme: ThemeConfig = {
  hashed: false,
  components: {
    Layout: {
      colorBgHeader: '#071B2F',
      colorBgBody: '#001E3C',
    },
    Menu: {
      colorItemBg: '#071B2F',
      colorItemBgSelected: '#132F4C',

      colorItemTextSelected: '#91B9E3',
      colorItemText: '#fff',

      colorItemTextHover: '#91B9E3',
      colorItemBgHover: '#132F4C',

      radiusItem: 20,
    },
    Card: {
      colorBgContainer: '#3D3D40',
    },
    Typography: {
      colorTextHeading: '#fff',
      fontSizeHeading1: 40,
    },
  },
};
