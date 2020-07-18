import React, { PureComponent } from 'react';
import { Form, Button, Row, Col, Spin, Icon } from 'hzero-ui';
import { connect } from 'dva';
import { Header, Content } from 'components/Page';
import { routerRedux } from 'dva/router';
import intl from 'utils/intl';
import { getCurrentOrganizationId } from 'utils/utils';
import classNames from 'classnames';
import { Bind } from 'lodash-decorators';
import moment from 'moment';
import notification from 'utils/notification';
import { isUndefined, isEmpty } from 'lodash';
import { DETAIL_DEFAULT_CLASSNAME } from 'utils/constants';

import styles from './index.less';
import InfoExhibit from './InfoExhibit';

@connect(({ forecastOrder, loading }) => ({
  forecastOrder,
  tenantId: getCurrentOrganizationId(),
  loading: {
    query: loading.effects['forecastOrder/queryDetail'],
    save:
      loading.effects['forecastOrder/createForecastOrder'] ||
      loading.effects['forecastOrder/updateForecastOrder'],
  },
}))
@Form.create({ fieldNameProp: null })
export default class Detail extends PureComponent {
  form;

  constructor(props) {
    super(props); // 将index.js传过来的参数绑定到props上
    this.state = {
      editFlag: false,
    };
  }

  /**
   * 传递表单对象
   * @param {object} ref - FilterForm对象
   */
  @Bind()
  handleBindRef(ref = {}) {
    this.form = (ref.props || {}).form;
  }

  /**
   * 编辑
   */
  @Bind()
  handleEdit() {
    const { editFlag } = this.state;
    this.setState({ editFlag: !editFlag });
  }

  componentDidMount() {
    const { dispatch, tenantId } = this.props;
    // 先清空model层的缓存
    dispatch({
      type: 'forecastOrder/updateState',
      payload: {
        detail: {},
      },
    });
    dispatch({
      type: 'forecastOrder/init',
      payload: {
        tenantId,
      },
    });
    this.handleSearch();
  }

  /**
   * 明细查询
   */
  @Bind()
  handleSearch() {
    const { tenantId, match, dispatch } = this.props;
    const { id } = match.params;
    dispatch({
      type: 'forecastOrder/updateState',
      payload: {
        detail: {},
      },
    });
    if (!isUndefined(id)) {
      dispatch({
        type: 'forecastOrder/queryDetail',
        payload: {
          tenantId,
          id,
        },
      });
    }
  }

  @Bind()
  handleSave() {
    const {
      dispatch,
      tenantId,
      match: {
        url,
        params: { id },
      },
    } = this.props;
    const fieldValues = isUndefined(this.form) ? {} : this.form.getFieldsValue(); // 获取form中的所有数据
    const { validateFields = e => e } = this.form;
    validateFields(err => {
      if (isEmpty(err)) {
        if (url.indexOf('create') !== -1) {
          dispatch({
            type: 'forecastOrder/createForecastOrder',
            payload: {
              tenantId,
              ...fieldValues,
            },
          }).then(res => {
            /* 请求成功后返回主界面 */
            if (res) {
              notification.success();
              dispatch(
                routerRedux.push({
                  pathname: `/smart-business/forecast-order/detail/${res.id}`,
                })
              );
            }
          });
        } else {
          dispatch({
            type: 'forecastOrder/updateForecastOrder',
            payload: {
              tenantId,
              ...fieldValues,
              id,
            },
          }).then(res => {
            if (res) {
              notification.success();
              this.setState({ editFlag: false });
              this.handleSearch();
            }
          });
        }
      }
    });
  }

  render() {
    const { editFlag } = this.state;
    const {
      form,
      loading,
      tenantId,
      dispatch,
      match: {
        url,
        params: { id },
      },
      forecastOrder,
    } = this.props;
    const { save, query } = loading;
    const { 
      detail, 
      selectMaps: { forecastOrderStatusMap = [] }, 
    } = forecastOrder;
    const isNew = url.indexOf('create') !== -1; // 判断是否新建,indexOf()方法判断url字符串中是否存在create字符串,indexOf()方法返回-1表示不存在
    const infoProps = {
      form,
      isNew,
      loading,
      editFlag,
      tenantId,
      dispatch,
      forecastOrderStatusMap,
      onRef: this.handleBindRef,
      detailSource: detail || {},
      handleDeleteLine: this.handleDeleteLine,
    };
    const displayFlag = isNew || editFlag ? { display: 'none' } : { display: 'block' };
    const displayFlagBtn = isNew || editFlag ? { display: 'block' } : { display: 'none' };
    const displayCloseBtn = isNew || !editFlag ? { display: 'none' } : { display: 'block' };
    return (
      <React.Fragment>
        <Header
          title={intl.get(`amtc.calibrationWork.view.message.detail.title`).d('预测单明细')}
          backPath="/smart-business/forecast-order/list"
        >
          <Button icon="save" type="primary" style={displayFlagBtn} onClick={this.handleSave}>
            {intl.get(`hzero.common.button.save`).d('保存')}
          </Button>
          <Button icon="edit" type="primary" style={displayFlag} onClick={this.handleEdit}>
            {intl.get('hzero.common.button.edit').d('编辑')}
          </Button>
          <Button icon="close" style={displayCloseBtn} onClick={this.handleEdit}>
            {intl.get('hzero.common.button.close').d('取消编辑')}
          </Button>
        </Header>
        <Content>
          <Col>
            <Spin
              spinning={!!(query || save)}
              wrapperClassName={classNames(
                styles['forecastOrder-detail'],
                DETAIL_DEFAULT_CLASSNAME
              )}
            >
              <InfoExhibit {...infoProps} />
            </Spin>
          </Col>
        </Content>
      </React.Fragment>
    );
  }
}
