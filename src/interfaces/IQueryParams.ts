export interface IQueryParams {
  /**
   * 业务类型
   * YUEDANDEFAULT: 微信公众号或无卡支付
   * QRPAYDEFAULT: 二维码支付
   * APPDEFAULT: APP支付
   * 
   */
  instMid: 'YUEDANDEFAULT' | 'QRPAYDEFAULT' | 'APPDEFAULT';
  
  /**
   * 商户订单号 6-32 商户自行生成
   */
  merOrderId: string;
}
