import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import sinon  from 'sinon';
configure({ adapter: new Adapter() });

global.sinon = sinon;
global.shallow = shallow;
