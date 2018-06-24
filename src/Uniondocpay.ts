import * as moment from 'moment-timezone';
import * as rp from 'request-promise';
import {
  debugapi_mpReq,
  api_mpReq,
  debugapi_noCardReq,
  api_noCardReq,
  debugapi_netpayRouteServer,
  api_netpayRouteServer,
  debugapi_qrReq,
  api_qrReq,
} from './apis';
import {
  IMpReqParams,
  INoCardReqParams,
  IQueryParams,
  IRefundParams,
} from './interfaces';
import { createHash } from 'crypto';
import { IQrReqParams } from './interfaces/IQrReqParams';
import { IAppReqParams } from './interfaces/IAppReqParams';

export class Uniondocpay {
  /**
   * 构造函数
   *
   * ```ts
   * import { Uniondocpay } from '@ycnt/uniondocpay';
   *
   * const mid = '898340149000005';
   * const tid = '88880001';
   * const msgSrc = 'WWW.TEST.COM';
   * const msgId = '3194';
   * const md5 = 'fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR';
   * const notifyUrl = 'http://notifyUrl';
   *
   * const uniondocpay = new Uniondocpay(mid, tid, msgSrc, msgId, md5, notifyUrl, true);
   *
   * ```
   */
  constructor(
    private mid: string,
    private tid: string,
    private msgSrc: string,
    private msgId: string,
    private md5: string,
    private notifyUrl: string,
    private debug: boolean = false
  ) {}

  public get mpReqApi() {
    return this.debug ? debugapi_mpReq : api_mpReq;
  }

  public get noCardReqApi() {
    return this.debug ? debugapi_noCardReq : api_noCardReq;
  }

  public get netpayRouteServerApi() {
    return this.debug ? debugapi_netpayRouteServer : api_netpayRouteServer;
  }

  /**
   * 公众号支付
   * 1. 公众号完成支付
   * 2. 结果发送至notifyUrl
   * 3. 前端点击跳转至 returnUrl（成功）
   *
   * ```ts
   * import { Uniondocpay } from '@ycnt/uniondocpay';
   *
   * const uniondocpay = new Uniondocpay(...);
   *
   * const url = uniondocpay.mpReq({
   *   merOrderId: 'xxx',
   *   totalAmount: 1,
   *   returnUrl: 'https://frontUrl',
   *   srcReserve: 'xxx',
   * });
   * console.log(url);
   *
   * ```
   */
  public mpReq(params: IMpReqParams) {
    const reqParams = Object.assign(
      {
        mid: this.mid,
        tid: this.tid,
        instMid: 'YUEDANDEFAULT',
        msgSrc: this.msgSrc,
        msgId: this.msgId,
        notifyUrl: this.notifyUrl,
        requestTimestamp: moment
          .tz('Asia/Shanghai')
          .format('YYYY-MM-DD HH:mm:ss'),
      },
      params
    );
    reqParams.merOrderId = reqParams.msgId + reqParams.merOrderId;
    this.sign(reqParams);
    return (
      this.mpReqApi +
      '?' +
      Object.keys(reqParams)
        .map(k => `${k}=${encodeURIComponent(reqParams[k])}`)
        .join('&')
    );
  }

  /**
   * 无卡支付
   * 1. 公众号完成支付
   * 2. 结果发送至notifyUrl
   * 3. 前端点击跳转至 returnUrl（成功）
   *
   * ```ts
   * import { Uniondocpay } from '@ycnt/uniondocpay';
   *
   * const uniondocpay = new Uniondocpay(...);
   *
   * const url = uniondocpay.noCardReq({
   *   merOrderId: 'xxx',
   *   totalAmount: 1,
   *   returnUrl: 'https://frontUrl',
   *   srcReserve: 'xxx',
   * });
   * console.log(url);
   *
   * ```
   */
  public noCardReq(params: INoCardReqParams) {
    const reqParams = Object.assign(
      {
        mid: this.mid,
        tid: this.tid,
        instMid: 'YUEDANDEFAULT',
        msgType: 'qmf.webPay',
        msgSrc: this.msgSrc,
        msgId: this.msgId,
        notifyUrl: this.notifyUrl,
        requestTimestamp: moment
          .tz('Asia/Shanghai')
          .format('YYYY-MM-DD HH:mm:ss'),
      },
      params
    );
    reqParams.merOrderId = reqParams.msgId + reqParams.merOrderId;
    this.sign(reqParams);
    return (
      this.noCardReqApi +
      '?' +
      Object.keys(reqParams)
        .map(k => `${k}=${encodeURIComponent(reqParams[k])}`)
        .join('&')
    );
  }

  /**
   * 二维码支付
   * 1. 使用此接口获得URL
   * 2. 将得到的URL做成二维码
   * 3. 使用微信或支付宝扫码完成支付
   * 4. 结果发送至notifyUrl
   * 5. 前端点击跳转至 returnUrl（成功）
   *
   * ```ts
   * import { Uniondocpay } from '@ycnt/uniondocpay';
   *
   * const uniondocpay = new Uniondocpay(...);
   * (async () => {
   *   const url = await uniondocpay.qrReq({
   *     billNo: 'xxx',
   *     totalAmount: 1,
   *     returnUrl: 'https://frontUrl',
   *     srcReserve: 'xxx',
   *   });
   *   console.log(url);
   * });
   *
   * ```
   */
  public async qrReq(params: IQrReqParams): Promise<string> {
    const reqParams = Object.assign(
      {
        mid: this.mid,
        tid: this.tid,
        instMid: 'QRPAYDEFAULT',
        msgType: 'bills.getQRCode',
        msgSrc: this.msgSrc,
        msgId: this.msgId,
        notifyUrl: this.notifyUrl,
        requestTimestamp: moment
          .tz('Asia/Shanghai')
          .format('YYYY-MM-DD HH:mm:ss'),
        qrCodeId:
          this.msgId +
          moment.tz('Asia/Shanghai').format('YYYYMMDDmmHHssSSS') +
          Math.floor(Math.random() * 9999),
      },
      params
    );
    reqParams.billNo = reqParams.msgId + reqParams.billNo;
    this.sign(reqParams);
    const res = await this.request(this.netpayRouteServerApi, reqParams);
    return res.billQRCode;
  }

  /**
   * APP支付
   * 1. 使用此接口获得参数
   * 2. 使用得到参数配合前端SDK完成支付
   * 3. 结果发送至notifyUrl
   *
   * ```ts
   * import { Uniondocpay } from '@ycnt/uniondocpay';
   *
   * const uniondocpay = new Uniondocpay(...);
   *
   * // 支付宝支付
   * (async () => {
   *   const appAliRes = await uniondocpay.appReq({
   *     merOrderId: Math.floor(Math.random() * 999999).toString(),
   *     totalAmount: 1,
   *     msgType: 'trade.precreate',
   *     srcReserve: 'test001',
   *   });
   *   console.log(appAliRes)
   * });
   *
   * // 银联全渠道
   * (async () => {
   *   const appUacRes = await uniondocpay.appReq({
   *     merOrderId: Math.floor(Math.random() * 999999).toString(),
   *     totalAmount: 1,
   *     msgType: 'uac.appOrder',
   *     srcReserve: 'test001',
   *   });
   *   console.log(appUacRes)
   * });
   *
   * ```
   */
  public async appReq(params: IAppReqParams) {
    const reqParams: any = Object.assign(
      {
        mid: this.mid,
        tid: this.tid,
        instMid: 'APPDEFAULT',
        msgSrc: this.msgSrc,
        msgId: this.msgId,
        notifyUrl: this.notifyUrl,
        requestTimestamp: moment
          .tz('Asia/Shanghai')
          .format('YYYY-MM-DD HH:mm:ss'),
      },
      params
    );
    reqParams.merOrderId = reqParams.msgId + reqParams.merOrderId;
    // if(reqParams.msgType === 'wx.unifiedOrder') reqParams.tradeType = 'APP';
    this.sign(reqParams);
    return this.request(this.netpayRouteServerApi, reqParams);
  }

  /**
   * 订单查寻
   *
   * ```ts
   * import { Uniondocpay } from '@ycnt/uniondocpay';
   *
   * const uniondocpay = new Uniondocpay(...);
   *
   * (async () => {
   *   try {
   *     const res = await uniondocpay.query({
   *       instMid: 'YUEDANDEFAULT',
   *       merOrderId: 'xxx',
   *     });
   *     console.log(res);
   *   } catch(e) {
   *     console.error(e);
   *   }
   * })();
   *
   * ```
   */
  public query(params: IQueryParams) {
    const reqParams = Object.assign(
      {
        mid: this.mid,
        tid: this.tid,
        msgType: 'query',
        msgSrc: this.msgSrc,
        msgId: this.msgId,
        requestTimestamp: moment
          .tz('Asia/Shanghai')
          .format('YYYY-MM-DD HH:mm:ss'),
      },
      params
    );
    reqParams.merOrderId = reqParams.msgId + reqParams.merOrderId;

    this.sign(reqParams);
    return this.request(this.netpayRouteServerApi, reqParams);
  }

  /**
   * 退款
   *
   * ```ts
   * import { Uniondocpay } from '@ycnt/uniondocpay';
   *
   * const uniondocpay = new Uniondocpay(...);
   *
   * (async () => {
   *   try {
   *     const res = await uniondocpay.refund({
   *       instMid: 'YUEDANDEFAULT',
   *       merOrderId: 'xxx',
   *       refundAmount: 0,
   *     });
   *     console.log(res);
   *   } catch(e) {
   *     console.error(e);
   *   }
   * })();
   *
   * ```
   */
  public refund(params: IRefundParams) {
    const reqParams = Object.assign(
      {
        mid: this.mid,
        tid: this.tid,
        msgType: 'refund',
        msgSrc: this.msgSrc,
        msgId: this.msgId,
        requestTimestamp: moment
          .tz('Asia/Shanghai')
          .format('YYYY-MM-DD HH:mm:ss'),
      },
      params
    );
    reqParams.merOrderId = reqParams.msgId + reqParams.merOrderId;

    this.sign(reqParams);
    return this.request(this.netpayRouteServerApi, reqParams);
  }

  /**
   * 后台通知验签，本例使用[koa](https://koajs.com)和[koa-better-body](https://github.com/tunnckoCore/koa-better-body)
   *
   * ```ts
   * import { Uniondocpay } from '@ycnt/uniondocpay';
   *
   * const uniondocpay = new Uniondocpay(...);
   *
   * public webhook = async (ctx: IContext) => {
   *   try {
   *     if (!uniondocpay.verify(ctx.request.fields)) throw new Error('签名错误');
   *     // 这里处理支付成功
   *     ctx.status = 200;
   *     ctx.body = 'SUCCESS';
   *   } catch (e) {
   *     console.error(e);
   *     ctx.body = 'FAIL';
   *   }
   * };
   *
   * ```
   */
  public verify(params) {
    const obj = Object.assign({}, params);
    const sign = obj.sign;
    delete obj.sign;
    const str =
      Object.keys(obj)
        .sort()
        .map(k => `${k}=${obj[k]}`)
        .join('&') + this.md5;
    const ss1 = createHash('md5')
      .update(str)
      .digest('hex')
      .toUpperCase();

    return sign === ss1;
  }

  private sign(params) {
    const str =
      Object.keys(params)
        .sort()
        .map(k => `${k}=${params[k]}`)
        .join('&') + this.md5;
    params.sign = createHash('md5')
      .update(str)
      .digest('hex')
      .toUpperCase();
  }

  private async request(api: string, params: any) {
    const requestOptions: rp.RequestPromiseOptions = {
      method: 'POST',
      url: this.netpayRouteServerApi,
      body: params,
      headers: {
        'Content-type': 'application/json',
      },
      resolveWithFullResponse: true,
      json: true,
    };
    const res = await rp(api, requestOptions);
    if (res.body.errCode !== 'SUCCESS') throw res.body.errMsg;
    return res.body;
  }
}
