import React, { Component } from 'react';
import { Header, Content } from 'components/Page';
import { Form, Button, Modal } from 'hzero-ui';
import { DataSet, Table } from 'choerodon-ui/pro';
import intl from 'utils/intl';
import { Bind } from 'lodash-decorators';
import { connect } from 'dva';
import { getCurrentOrganizationId, filterNullValueObject } from 'utils/utils';
import { isUndefined, isEmpty } from 'lodash';
import { routerRedux } from 'dva/router';
import notification from 'utils/notification';

import ListTable from './ListTable';

@connect(({ forecastOrder, loading }) => ({
  forecastOrder,
  tenantId: getCurrentOrganizationId(),
  loading: {
    queryList: loading.effects['forecastOrder/queryList'],
  },
}))
@Form.create({ fieldNameProp: null })
export default class ForecastOrder extends Component {
  form;

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
    };
  }

  /**
   * 数据行选择操作
   */
  @Bind()
  handleSelectRow(selectedRowKeys, selectedRows) {
    this.setState({ selectedRowKeys, selectedRows });
  }

  @Bind()
  handleBindRef(ref = {}) {
    this.form = (ref.props || {}).form;
  }

  componentDidMount() {
    this.handleSearch();
  }

  @Bind()
  handleSearch(page = {}) {
    const { dispatch, tenantId } = this.props;
    const filterValues = (this.form && filterNullValueObject(this.form.getFieldsValue())) || {};
    dispatch({
      type: 'forecastOrder/queryList',
      payload: {
        tenantId,
        ...filterValues,
        page: isEmpty(page) ? {} : page,
      },
    });
  }

  /**
   * 新建或编辑
   */
  @Bind()
  handleLinkToDetail(id) {
    const { dispatch } = this.props;
    const linkUrl = isUndefined(id) ? 'create' : `detail/${id}`;
    dispatch(
      routerRedux.push({
        pathname: `/smart-business/forecast-order/${linkUrl}`,
      })
    );
  }

  render() {
    const { selectedRowKeys = [] } = this.state;
    const {
      form,
      loading: { queryList },
      forecastOrder: { list = [], pagination = {} },
    } = this.props;
    const filterProps = {
      form,
      onSearch: this.handleSearch,
      onRef: this.handleBindRef,
    };
    const listProps = {
      queryList,
      dataSource: list,
      pagination,
      selectedRowKeys,
      selectedRows: this.handleSelectRow,
      onSelectRow: this.handleSelectRow,
      onLinkToDetail: this.handleLinkToDetail,
      onSearch: this.handleSearch,
    };

    return (
      <React.Fragment>
        <Header title={intl.get(`${'forecastOrder'}.view.message.title`).d('预测单')}>
          <Button
            icon="delete"
            disabled={isEmpty(selectedRowKeys)}
            onClick={() => this.handleDelete()}
          >
            {intl.get('hzero.common.button.delete').d('删除')}
          </Button>
          <Button icon="plus" type="primary" onClick={() => this.handleLinkToDetail()}>
            {intl.get('hzero.common.button.create').d('新建')}
          </Button>
        </Header>
        <Content>
          <ListTable {...listProps} />
        </Content>
      </React.Fragment>
    );
  }
}
