import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';

export default () => ({
  primaryKey: 'code',
  name: 'head-line-example',
  queryUrl: '/_api/table',
  autoQuery: true,
  pageSize: 8,
  queryFields: [
    {
      name: 'code',
      type: FieldType.string,
      label: '编码',
    },
    {
      name: 'name',
      type: FieldType.string,
      label: '姓名',
    },
  ],
  fields: [
    {
      name: 'code',
      type: FieldType.string,
      label: '编码',
    },
    {
      name: 'name',
      type: FieldType.string,
      label: '名称',
    },
    {
      name: 'permission',
      type: FieldType.string,
      label: '权限',
    },
    {
      name: 'desc',
      type: FieldType.string,
      label: '说明',
    },
    {
      name: 'status',
      type: FieldType.boolean,
      label: '状态',
    },
  ],
  transport: {
    read: {
      url: '/_api/table',
      method: 'get',
    },
  },
});
