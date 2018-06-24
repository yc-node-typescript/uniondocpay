export interface IQrReqParams {
  /**
   * 账单号 6-31
   */
  billNo: string;

  /**
   * 支付总金额，单位分
   */
  totalAmount: number;

  /**
   * 账单描述 <=255
   */
  billDesc?: string;

  /**
   * 网页跳转地址 <=255
   */
  returnUrl?: string;

  /**
   * 说明：1.单一钱包支付传SINGLE, 多钱包支付传MULTIPLE
   */
  walletOption?: 'SINGLE' | 'MULTIPLE';

  /**
   * 请求系统预留字段
   */
  srcReserve?: string;
}
