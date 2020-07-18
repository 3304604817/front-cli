import { DataSet, ColorPicker } from 'choerodon-ui/pro';
import React, { useMemo } from 'react';
import inputDs from './inputDataSet';

const colorPicker = () => {
  const inputDataSet = useMemo(() => new DataSet(inputDs()), []);
  return <ColorPicker dataSet={inputDataSet} name="color" />;
};

export default colorPicker;
