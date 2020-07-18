import React, { useEffect, useMemo, useCallback } from 'react';
import { DataSet, Form, TextField, Table, Switch } from 'choerodon-ui/pro';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';
import { TableButtonType } from 'choerodon-ui/pro/lib/table/enum';

const getTableDs = () =>
  new DataSet({
    // name: 'detailTable',
    autoQuery: false,
    pageSize: 8,
    fields: [
      {
        name: 'order',
        type: FieldType.string,
        label: '订单编码',
      },
      {
        name: 'agent',
        type: FieldType.string,
        label: '采购人',
      },
    ],
    data: [
      {
        order: '1',
        agent: '张三',
      },
      {
        order: '2',
        agent: '李四',
      },
    ],
    events: {
      submit: ({ data }) => console.log('submit data', data),
    },
    transport: {
      read: {
        url: '/_api/detail-table',
        method: 'get',
      },
      submit: ({ data }) => ({
        url: '/_api/submit',
        method: 'post',
        data,
      }),
    },
  });

const Detail = ({ ds, status, data }) => {
  const tableDs = useMemo(() => getTableDs(), []);

  const queryTable = () => {
    tableDs.queryParameter = {
      code: data?.code,
    };
    tableDs.query();
  };

  useEffect(() => {
    if (status === 'detail') {
      queryTable();
    }
  }, []);

  const handleCancel = record => {
    record.reset();
    record.setState('editing', false);
  };

  const getCommands = useCallback(({ record }) => {
    if (record.getState('editing')) {
      return [
        <a
          onClick={() => record.setState('editing', false)}
          style={{
            marginRight: 8,
          }}
        >
          确定
        </a>,
        <a onClick={() => handleCancel(record)}>取消</a>,
      ];
    }

    return [
      <a
        onClick={() => record.setState('editing', true)}
        style={{
          marginRight: 8,
        }}
      >
        编辑
      </a>,
      <a onClick={() => tableDs.remove(record)}>删除</a>,
    ];
  }, []);
  return (
    <div>
      <h2>{status === 'new' ? '新建' : '详情'}</h2>
      <Form dataSet={ds}>
        <TextField name="code" label="编码" />
        <TextField name="name" label="名称" />
        <TextField name="permission" label="权限" />
        <TextField name="desc" label="描述" />
        <Switch name="status" label="启用状态" />
      </Form>
      {status !== 'new' && (
        <Table
          dataSet={tableDs}
          buttons={[TableButtonType.add, TableButtonType.delete, TableButtonType.save]}
          columns={[
            {
              name: 'order',
              editor: record => record.getState('editing'),
            },
            {
              name: 'agent',
              editor: record => record.getState('editing'),
            },
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
