import React, { useMemo } from 'react';
import { Table, Button, Modal, DataSet } from 'choerodon-ui/pro';
import { PageHeaderWrapper } from 'hzero-boot/lib/components/Page';
import { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import Detail from './Detail';
import getDataSetProps from './dataSet/tableDataSet';
import getFormDsProps from './dataSet/formDataSet';
import ColorPickerBasic from './ColorPickerBasic';
import DatePickerExtraFooter from './DatePickerExtraFooter';
const detailModalKey = Modal.key();
const newModalKey = Modal.key();
/**
 * 头行结构的表单示例
 */

const HeadLine = () => {
  const formDs = useMemo(() => new DataSet(getFormDsProps()), []);
  const dataSet = useMemo(() => new DataSet(getDataSetProps()), []);
  /**
   * 详情点击时，设置表单数据 -> 打开编辑Modal
   */

  const handleDetailClick = ({ record }) => {
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

  const renderOperations = (rp) => <a onClick={() => handleDetailClick(rp)}>详情</a>;

  const columns = [
    {
      name: 'code',
    },
    {
      name: 'name',
    },
    {
      name: 'permission',
    },
    {
      name: 'desc',
    },
    {
      name: 'status',
    },
    {
      header: '操作',
      renderer: renderOperations,
    },
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
      <DatePickerExtraFooter />
      <ColorPickerBasic />
    </PageHeaderWrapper>
  );
};

export default HeadLine;
