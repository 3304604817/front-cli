import React, { PureComponent } from 'react';
import { DataSet, Table } from 'choerodon-ui/pro';
import intl from 'utils/intl';
import { Bind } from 'lodash-decorators';
import { itemDs } from '../../stores/forecastDs';

export default class ListTable extends PureComponent {
  itemDs = new DataSet(itemDs);

  @Bind()
  operationRender(value, data) {
    const { onLinkToDetail } = this.props;
    return (
      onLinkToDetail(data.id, false)
    )
  }

  get columns() {
    return [
      { name: 'id', align: 'center', width: 100 },
      {
        name: 'forecastNum',
        align: 'center',
        width: 200,
        renderer: ({ value, record }) => {
          return (
            <a onClick={() => this.operationRender(value, record.data)}>{value}</a>
          );
        },
      },
      { name: 'purchaseCompanyName', align: 'center', width: 200 },
      { name: 'supplierNum', align: 'center', width: 150 },
      { name: 'supplierName', align: 'center', width: 200 },
      { name: 'forecastOrderStatus', align: 'center', width: 100 },
    ];
  }

  render() {
    return <Table dataSet={this.itemDs} columns={this.columns} />;
  }
}
