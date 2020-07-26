import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';

export default (): DataSetProps => ({
  autoCreate: true,
  fields: [
    { name: 'companyNum', type: FieldType.string, label: '公司编码' },
    { name: 'companyName', type: FieldType.string, label: '公司名称' },
    { name: 'loginName', type: FieldType.string, label: '用户名' },
    { name: 'email', type: FieldType.string, label: 'email' },
    { name: 'supplierFlag', type: FieldType.boolean, label: '是否已生成供应商' },
  ],
  transport: {
    create: {
      url: '/business/v1/0/sbss-supplier-registers',
      method: 'post',
    },
  },
});
