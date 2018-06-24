export interface IMpReqParams {
  /**
   * 商户订单号 6-32 商户自行生成
   */
  merOrderId: string;
  
  /**
   * 支付总金额，单位分
   */
  totalAmount: number;

  /**
   * 网页跳转地址 <=255
   */
  returnUrl?: string;

  /**
   * 请求系统预留字段
   */
  srcReserve?: string;
}
