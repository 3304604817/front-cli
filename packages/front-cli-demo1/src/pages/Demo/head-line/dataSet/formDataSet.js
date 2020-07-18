import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';

export default () => ({
  autoCreate: true,
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
});
