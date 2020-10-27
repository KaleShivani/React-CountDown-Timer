import React from 'react';
import BasicTable from '.';


const VALUES = {
 laps:["00:00:00"],
 flag:false,
};
describe('Renders Lap Table', () => {
  it('renders without crashing', () => {
     shallow(<BasicTable  rows={VALUES.laps} flag={VALUES.flag}/>);
   });
});