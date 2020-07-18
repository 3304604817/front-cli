import { DatePicker } from 'choerodon-ui';
import React from 'react';

const { RangePicker } = DatePicker;

const DatePick = () => (
  <div>
    <div id="components-date-picker-demo-extra-footer">
      <div>
        <DatePicker renderExtraFooter={() => 'extra footer'} />
        <br />
        <DatePicker renderExtraFooter={() => 'extra footer'} showTime />
        <br />
        <RangePicker renderExtraFooter={() => 'extra footer'} />
        <br />
        <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
        <br />
        <DatePicker renderExtraFooter={() => 'extra footer'} />
      </div>
    </div>
  </div>
);

export default DatePick;
