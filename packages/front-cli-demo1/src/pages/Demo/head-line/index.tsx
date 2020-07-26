import React, { FC, useMemo } from 'react';
import { RouteComponentProps } from 'dva/router';
import { Table, Button, Modal, DataSet } from 'choerodon-ui/pro';
import { RenderProps } from 'choerodon-ui/pro/lib/field/FormField';
import { PageHeaderWrapper } from 'hzero-boot/lib/components/Page';

import { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import { ColumnProps } from 'choerodon-ui/pro/lib/table/Column';
import Detail from './Detail';

import getDataSetProps from './dataSet/tableDataSet';
import getFormDsProps from './dataSet/formDataSet';

export interface HeadLineProps extends RouteComponentProps {}

const detailModalKey = Modal.key();
const newModalKey = Modal.key();

/**
 * 头行结构的表单示例
 */
const HeadLine: FC<HeadLineProps> = () => {
  const formDs = useMemo(() => new DataSet(getFormDsProps()), []);
  const dataSet = useMemo(() => new DataSet(getDataSetProps()), []);
  /**
   * 详情点击时，设置表单数据 -> 打开编辑Modal
   */
  const handleDetailClick = ({ record }: RenderProps) => {
    if (formDs.current) {
      formDs.current.set(record?.data || {});
    }
    Modal.open({
      key: detailModalKey,
      title: '详情',
      drawer: true,
      children: <Detail status="detail" ds={formDs} data={record?.data} />,
      onOk: () => {
        formDs.submit();
      },
    });
  };

  const renderOperations = (rp: RenderProps) => {
    return <a onClick={() => handleDetailClick(rp)}>详情</a>;
  };
  const columns: ColumnProps[] = [
    { name: 'companyNum' },
    { name: 'companyName' },
    { name: 'loginName' },
    { name: 'email' },
    { name: 'supplierFlag' },
    { header: '操作', renderer: renderOperations },
  ];
  /**
   * 创建时，清空formDS数据 -> 打开编辑Modal
   */
  const handleCreate = () => {
    if (formDs.current) {
      formDs.current.reset();
    }
    Modal.open({
      key: newModalKey,
      title: '新建',
      drawer: true,
      children: <Detail status="new" ds={formDs} />,
      onOk: async () => {
        await formDs.submit();
        dataSet.query();
      },
    });
  };
  const tableProps = {
    dataSet,
    columns,
  };
  return (
    <PageHeaderWrapper
      title="头行结构"
      header={
        <Button color={ButtonColor.primary} icon="add" onClick={handleCreate}>
          新增
        </Button>
      }
    >
      <Table {...tableProps} />
    </PageHeaderWrapper>
  );
};

export default HeadLine;
