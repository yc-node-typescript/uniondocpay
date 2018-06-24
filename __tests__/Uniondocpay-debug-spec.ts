import { Uniondocpay } from '../src';
import { debugapi_mpReq, debugapi_netpayRouteServer, debugapi_noCardReq, debugapi_qrReq } from '../src/apis';

describe('Uniondocpay debug', () => {
  it('should test mp', async () => {
    const uniondocpay = new Uniondocpay(
      '898340149000005',
      '88880001',
      'WWW.TEST.COM',
      '3194',
      'fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR',
      'http://api.midoull.com:9001/api/chinaums/webhook/mp',
      true,
    );

    expect(uniondocpay.mpReqApi).toBe(debugapi_mpReq);
    expect(uniondocpay.netpayRouteServerApi).toBe(debugapi_netpayRouteServer);

    expect(uniondocpay).toMatchObject({
      debug: true,
      md5: 'fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR',
      mid: '898340149000005',
      msgId: '3194',
      msgSrc: 'WWW.TEST.COM',
      notifyUrl: 'http://api.midoull.com:9001/api/chinaums/webhook/mp',
      tid: '88880001',
    });

    const merOrderId = Math.floor(Math.random() * 999999).toString();

    const payUrl = uniondocpay.mpReq({
      merOrderId,
      totalAmount: 1,
      returnUrl: 'https://frontUrl',
      srcReserve: 'xxx',
    });
    expect(payUrl).toBeTruthy();

    try {
      const query = await uniondocpay.query({
        instMid: 'YUEDANDEFAULT',
        merOrderId: '58761467fe50158d36652cf6',
      });
      expect(query).toBeTruthy();
    } catch (e) {
      fail(e);
    }

    try {
      await uniondocpay.refund({
        instMid: 'YUEDANDEFAULT',
        merOrderId: '58761467fe50158d36652cf6',
        refundAmount: 1,
      });
      fail();
    } catch (e) {
      expect(e).toBe('累计退货金额超过支付金额');
    }

    const webhook = {
      payTime: '2018-06-22 18:35:33',
      connectSys: 'OPENCHANNEL',
      sign: 'ECDE41DDB722D39FDA8F87AA9C1C8C12',
      mid: '898340149000005',
      invoiceAmount: '1',
      settleDate: '2018-06-22',
      billFunds: '现金:1',
      buyerId: 'oOUAZv-AEz7LPKlVWbS-ppH846Vo',
      tid: '88880001',
      totalAmount: '1',
      couponAmount: '0',
      BT: 'NCWr',
      attachedData: 'string',
      buyerPayAmount: '1',
      targetOrderId: '4200000123201806228160677592',
      notifyId: 'd92d498b-b9e0-4a9e-bdbd-08305d33ac1a',
      billFundsDesc: '现金支付0.01元。',
      subInst: 'UMS-MARKET',
      orderDesc: '仲晶晶二维码测试',
      seqId: '00254400524N',
      merOrderId: '319458761467fe50158d36652cf7',
      status: 'TRADE_SUCCESS',
      targetSys: 'WXPay',
    };

    expect(uniondocpay.verify(webhook)).toBe(true);
  });

  it('should test no card', async () => {
    const uniondocpay = new Uniondocpay(
      '898310060514001',
      '88880001',
      'WWW.TEST.COM',
      '3194',
      'fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR',
      'http://api.midoull.com:9001/api/chinaums/webhook/mp',
      true,
    );

    expect(uniondocpay.noCardReqApi).toBe(debugapi_noCardReq);
    expect(uniondocpay.netpayRouteServerApi).toBe(debugapi_netpayRouteServer);

    expect(uniondocpay).toMatchObject({
      debug: true,
      md5: 'fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR',
      mid: '898310060514001',
      msgId: '3194',
      msgSrc: 'WWW.TEST.COM',
      notifyUrl: 'http://api.midoull.com:9001/api/chinaums/webhook/mp',
      tid: '88880001',
    });

    const merOrderId = Math.floor(Math.random() * 999999).toString();

    const payUrl = uniondocpay.noCardReq({
      merOrderId,
      totalAmount: 1,
      returnUrl: 'https://frontUrl',
      srcReserve: 'xxx',
    });
    expect(payUrl).toBeTruthy();
  });

  it('should test qr', async () => {
    const uniondocpay = new Uniondocpay(
      '898340149000005',
      '88880001',
      'WWW.TEST.COM',
      '3194',
      'fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR',
      'http://api.midoull.com:9001/api/chinaums/webhook/mp',
      true,
    );

    expect(uniondocpay.netpayRouteServerApi).toBe(debugapi_netpayRouteServer);

    expect(uniondocpay).toMatchObject({
      debug: true,
      md5: 'fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR',
      mid: '898340149000005',
      msgId: '3194',
      msgSrc: 'WWW.TEST.COM',
      notifyUrl: 'http://api.midoull.com:9001/api/chinaums/webhook/mp',
      tid: '88880001',
    });

    const billNo = Math.floor(Math.random() * 999999).toString();

    try {
      const qrRes = await uniondocpay.qrReq({
        billNo,
        totalAmount: 1,
        returnUrl: 'https://frontUrl',
        billDesc: 'xxx',
        srcReserve: 'test001',
      });
      expect(qrRes).toBeTruthy();
    } catch(e) {
      console.error(e);
      fail(e);
    }

  });
  
  it('should test app', async () => {
    const uniondocpay = new Uniondocpay(
      '898340149000005',
      '88880001',
      'WWW.TEST.COM',
      '3194',
      'fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR',
      'http://api.midoull.com:9001/api/chinaums/webhook/mp',
      true,
    );

    try {
      const appAliRes = await uniondocpay.appReq({
        merOrderId: Math.floor(Math.random() * 999999).toString(),
        totalAmount: 1,
        msgType: 'trade.precreate',
        srcReserve: 'test001',
      });
      expect(appAliRes).toBeTruthy();

      // const appWxRes = await uniondocpay.appReq({
      //   merOrderId: Math.floor(Math.random() * 999999).toString(),
      //   totalAmount: 1,
      //   msgType: 'wx.unifiedOrder',
      //   srcReserve: 'test001',
      // });
      // console.log(appWxRes);
      // expect(appWxRes).toBeTruthy();

      const appUacRes = await uniondocpay.appReq({
        merOrderId: Math.floor(Math.random() * 999999).toString(),
        totalAmount: 1,
        msgType: 'uac.appOrder',
        srcReserve: 'test001',
      });
      expect(appUacRes).toBeTruthy();
    } catch(e) {
      console.error(e);
      fail(e);
    }

  });
});
