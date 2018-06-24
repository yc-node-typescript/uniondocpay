export interface IAppReqParams {
  /**
   * 商户订单号 6-32 商户自行生成
   */
  merOrderId: string;

  /**
   * 支付总金额，单位分
   */
  totalAmount: number;

  /**
   * 微信: wx.unifiedOrder
   * 支付宝: trade.precreate
   * 全民付: qmf.order
   * 银联全渠道: uac.appOrder
   */
  msgType: 'wx.unifiedOrder' | 'trade.precreate' | 'qmf.order' | 'uac.appOrder';

  /**
   * 请求系统预留字段
   */
  srcReserve?: string;
}
