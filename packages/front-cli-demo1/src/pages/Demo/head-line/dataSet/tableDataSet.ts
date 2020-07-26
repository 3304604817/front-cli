import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';

export default (): DataSetProps => ({
  primaryKey: 'code',
  name: 'head-line-example',
  queryUrl: '/business/v1/0/sbss-supplier-registers',
  autoQuery: true,
  pageSize: 10,
  queryFields: [
    {
      name: 'companyName',
      type: FieldType.string,
      label: '公司名称',
      bind: 'companyNum.value',
    },
    {
      name: 'companyNum',
      type: FieldType.object,
      lovCode: 'HPFM.COMPANY',
      textField: 'companyNum',
      valueField: 'companyName',
      dynamicProps: ({ record }) => {
        const companyName = record.get('companyNum') ? record.get('companyNum').companyName : null;
        return {
          lovPara: { companyNum: companyName },
        };
      },
      label: '公司编码',
    },
  ],
  fields: [
    { name: 'companyNum', type: FieldType.string, label: '公司编码' },
    { name: 'companyName', type: FieldType.string, label: '公司名称' },
    { name: 'loginName', type: FieldType.string, label: '用户' },
    { name: 'email', type: FieldType.string, label: '邮箱' },
    { name: 'supplierFlag', type: FieldType.boolean, label: '是否已生成供应商' },
  ],
  transport: {
    read: {
      url: '/business/v1/0/sbss-supplier-registers',
      method: 'get',
    },
    destroy: {
      url: '/business/v1/0/sbss-supplier-registers',
      method: 'delete',
    },
  },
});
