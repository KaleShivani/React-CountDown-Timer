import React from 'react';
import TimerControl from '.';
import BasicTable from '../LapControl/index';
import { TextField, Button, Grid, Input } from "@material-ui/core";

const VALUES = {
  laps:["00:00:00"],
  flag:false,
 };
  describe('Parent Component', () => {
    const wrapper = shallow(<TimerControl/>);
    it('shows 1 wrapper',() => {
      expect(wrapper.containsMatchingElement(TextField)).toEqual(true);
    });
    it('Calls start when start button is clicked',() => {
      const startbtn = wrapper.find('#primary');
      startbtn.simulate('submit');
    });
    it('Calls when stop button is clicked',() => {
      const stopbtn = wrapper.find('#secondary');
      stopbtn.simulate('submit');
    });
    it('Calls when reset button is clicked',() => {
      const resetbtn = wrapper.find('#reset');
      resetbtn.simulate('submit');
    });
   
    it('renders Child component', () => {
      expect(wrapper.containsMatchingElement(<BasicTable rows={VALUES.laps} flag={VALUES.flag}/>)).toEqual(false);
    });

  });