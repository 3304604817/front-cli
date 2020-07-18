import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Form,
  Input,
  Row,
  Col,
  Icon,
  Select,
  Tabs,
  Divider,
  DatePicker,
  InputNumber,
} from 'hzero-ui';
import intl from 'utils/intl';
import { Bind } from 'lodash-decorators';
import {
  EDIT_FORM_ITEM_LAYOUT,
  EDIT_FORM_ROW_LAYOUT,
  FORM_COL_3_LAYOUT,
  EDIT_FORM_ITEM_LAYOUT_COL_3,
} from 'utils/constants';
import { FORM_COL_1_LAYOUT } from '@/utils/constants';
import Lov from 'components/Lov';

export default class InfoExhibit extends Component {
  constructor(props) {
    super(props); // 将主页面传过来的数据绑定到props上
    props.onRef(this); // 数据回传index
    this.state = {
      maintSitesId: null,
      collapseKeys: ['A', 'B'],
    };
  }

  componentDidMount() {}

  handleChangeKey(collapseKeys) {
    this.setState({ collapseKeys });
  }

  render() {
    const { maintSitesId, collapseKeys = [] } = this.state;
    const {
      form,
      isNew,
      editFlag,
      tenantId,
      dispatch,
      detailSource,
      handleDeleteLine,
      forecastOrderStatusMap,
    } = this.props;
    const { getFieldDecorator } = form;
    const modelPrompt = 'smartBusiness.model.forecastOrder';
    return (
      <React.Fragment>
        <Tabs defaultActiveKey="basicTab">
          <Tabs.TabPane
            tab={intl.get(`${modelPrompt}.tab.basicTab`).d('基本信息')}
            key="basicTab"
            style={{ height: window.screen.availHeight / 2, overflow: 'auto' }}
          >
            <Collapse
              bordered={false}
              defaultActiveKey={['A', 'B']}
              className="form-collapse"
              onChange={this.handleChangeKey.bind(this)}
            >
              <Collapse.Panel
                showArrow={false}
                key="A"
                header={
                  <Fragment>
                    <h3>{intl.get(`${modelPrompt}.panel.A`).d('预测单头信息')}</h3>
                    <a>
                      {collapseKeys.includes('A')
                        ? intl.get(`hzero.common.button.up`).d('收起')
                        : intl.get(`hzero.common.button.expand`).d('展开')}
                    </a>
                    <Icon type={collapseKeys.includes('A') ? 'up' : 'down'} />
                  </Fragment>
                }
              >
                <Form>
                  <Row
                    {...EDIT_FORM_ROW_LAYOUT}
                    className={isNew || editFlag ? 'inclusion-row' : 'read-row'}
                  >
                    <Col {...FORM_COL_3_LAYOUT}>
                      <Form.Item
                        label={intl.get(`${modelPrompt}.forecastNum`).d('预测单号')}
                        {...EDIT_FORM_ITEM_LAYOUT}
                      >
                        {isNew || editFlag ? (
                          getFieldDecorator('forecastNum', {
                            initialValue: detailSource.forecastNum,
                            rules: [],
                          })(<Input placeholder="保存后自动分配" disabled />)
                        ) : (
                          <span>{detailSource.forecastNum}</span>
                        )}
                      </Form.Item>
                    </Col>
                    <Col {...FORM_COL_3_LAYOUT}>
                      <Form.Item
                        label={intl.get(`${modelPrompt}.purchaseCompanyName`).d('采购公司名称')}
                        {...EDIT_FORM_ITEM_LAYOUT}
                      >
                        {isNew || editFlag ? (
                          getFieldDecorator('purchaseCompanyName', {
                            initialValue: detailSource.purchaseCompanyName,
                            rules: [],
                          })(<Input placeholder="中国商飞" disabled/>)
                        ) : (
                          <span>{detailSource.purchaseCompanyName}</span>
                        )}
                      </Form.Item>
                    </Col>
                    <Col {...FORM_COL_3_LAYOUT}>
                      <Form.Item
                        label={intl.get(`${modelPrompt}.supplierNum`).d('供应商编码')}
                        {...EDIT_FORM_ITEM_LAYOUT}
                      >
                        {isNew || editFlag ? (
                          getFieldDecorator('supplierNum', {
                            initialValue: detailSource.supplierNum,
                            rules: [],
                          })(<Input />)
                        ) : (
                          <span>{detailSource.supplierNum}</span>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row
                    {...EDIT_FORM_ROW_LAYOUT}
                    className={isNew || editFlag ? 'inclusion-row' : 'read-row'}
                  >
                    <Col {...FORM_COL_3_LAYOUT}>
                      <Form.Item
                        label={intl.get(`${modelPrompt}.supplierName`).d('供应商名称')}
                        {...EDIT_FORM_ITEM_LAYOUT}
                      >
                        {isNew || editFlag ? (
                          getFieldDecorator('supplierName', {
                            initialValue: detailSource.supplierName,
                            rules: [],
                          })(<Input />)
                        ) : (
                          <span>{detailSource.supplierName}</span>
                        )}
                      </Form.Item>
                    </Col>
                    <Col {...FORM_COL_3_LAYOUT}>
                      <Form.Item
                        label={intl.get(`${modelPrompt}.creationDate`).d('预测发布日期')}
                        {...EDIT_FORM_ITEM_LAYOUT}
                      >
                        {isNew || editFlag ? (
                          getFieldDecorator('creationDate', {
                            initialValue: isNew
                              ? null
                              : moment(detailSource.forecastStartDate, 'YYYY-MM-DD'),
                            rules: [],
                          })(
                            <DatePicker placeholder="保存后自动分配" disabled
                              style={{ width: '100%' }}
                              format="YYYY-MM-DD"
                              showTime
                            />
                          )
                        ) : (
                          <span>{detailSource.creationDate}</span>
                        )}
                      </Form.Item>
                    </Col>
                    <Col {...FORM_COL_3_LAYOUT}>
                      <Form.Item
                        label={intl.get(`${modelPrompt}.forecastOrderStatus`).d('预测单状态')}
                        {...EDIT_FORM_ITEM_LAYOUT}
                      >
                        {isNew || editFlag ? (
                          getFieldDecorator('forecastOrderStatus', {
                            initialValue: detailSource.forecastOrderStatus,
                            rules: [],
                          })(
                          <Select placeholder="新建" disabled>
                            {forecastOrderStatusMap.map(i => (
                              <Select.Option key={i.value}>{i.meaning}</Select.Option>
                            ))}
                          </Select>
                          )
                        ) : (
                          <span>{detailSource.forecastOrderStatus}</span>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Collapse.Panel>
            </Collapse>
          </Tabs.TabPane>
        </Tabs>
      </React.Fragment>
    );
  }
}
