import React, { FC, useEffect, useMemo, useCallback } from 'react';
import { DataSet, Form, TextField, Table, Switch } from 'choerodon-ui/pro';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';
import { TableButtonType } from 'choerodon-ui/pro/lib/table/enum';

import Record from 'choerodon-ui/pro/lib/data-set/Record';
import { commandProps } from 'choerodon-ui/pro/lib/table/Column';
import { Commands } from 'choerodon-ui/pro/lib/table/Table';

export interface DetailProps {
  ds: DataSet;
  status: 'new' | 'detail';
  data?: any;
}

const getTableDs = () =>
  new DataSet({
    // name: 'detailTable',
    autoQuery: false,
    pageSize: 5,
    fields: [
      { name: 'creationDate', type: FieldType.dateTime, label: '创建时间' },
      { name: 'lastUpdateDate', type: FieldType.dateTime, label: '最后修改时间' },
    ],
    data: [
      // {order: '1', agent: '张三'},
      // {order: '2', agent: '李四'},
    ],
    events: {
      submit: ({ data }: DataSet) => console.log('submit data', data),
    },
    transport: {
      read: {
        url: '/business/v1/0/supplier-roles',
        method: 'get',
      },
      submit: {
        url: '/business/v1/0/supplier-roles',
        method: 'post',
      },
      destroy: {
        url: '/business/v1/0/supplier-roles',
        method: 'delete',
      },
    },
  });

const Detail: FC<DetailProps> = ({ ds, status, data }) => {
  const tableDs = useMemo(() => getTableDs(), []);
  const queryTable = () => {
    console.log(data);
    tableDs.queryParameter = { supplierId: data?.supplierId };
    tableDs.query();
  };
  useEffect(() => {
    if (status === 'detail') {
      queryTable();
    }
  }, []);

  const handleCancel = (record: Record) => {
    record.reset();
    record.setState('editing', false);
  };

  const getCommands = useCallback(({ record }: commandProps): Commands[] => {
    if (record.getState('editing')) {
      return [
        <a onClick={() => record.setState('editing', false)} style={{ marginRight: 8 }}>
          确定
        </a>,
        <a onClick={() => handleCancel(record)}>取消</a>,
      ];
    }
    return [
      <a onClick={() => record.setState('editing', true)} style={{ marginRight: 8 }}>
        编辑
      </a>,
      <a onClick={() => tableDs.remove(record)}>删除</a>,
    ];
  }, []);
  return (
    <div>
      <h2>{status === 'new' ? '新建' : '详情'}</h2>
      <Form dataSet={ds}>
        <TextField name="companyNum" label="公司编码" />
        <TextField name="companyName" label="公司名称" />
        <TextField name="loginName" label="用户名" />
        <TextField name="email" label="email" />
        <Switch name="supplierFlag" label="是否已生成供应商" />
      </Form>
      {status !== 'new' && (
        <Table
          dataSet={tableDs}
          buttons={[TableButtonType.add, TableButtonType.delete, TableButtonType.save]}
          columns={[
            { name: 'creationDate', editor: (record) => record.getState('创建时间') },
            { name: 'lastUpdateDate', editor: (record) => record.getState('最后修改时间') },
            {
              header: '操作',
              command: getCommands,
            },
          ]}
        />
      )}
    </div>
  );
};

export default Detail;
