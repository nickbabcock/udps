import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { render as r, shallow as s, mount as m } from 'enzyme';

const muiTheme = getMuiTheme();
export const render = (node) => r(node, { context: { muiTheme } });
export const shallow = (node) => s(node, { context: { muiTheme } });
export const mount = (node) => m(node, { context: { muiTheme } });
