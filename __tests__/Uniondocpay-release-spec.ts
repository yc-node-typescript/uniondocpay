import { Uniondocpay } from '../src';
import { api_mpReq, api_netpayRouteServer, api_noCardReq } from '../src/apis';

describe('Uniondocpay debug', () => {
  it('should test mp', async () => {
    const uniondocpay = new Uniondocpay(
      '898340149000005',
      '88880001',
      'WWW.TEST.COM',
      '3194',
      'fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR',
      'http://api.midoull.com:9001/api/chinaums/webhook/mp',
    );

    expect(uniondocpay.mpReqApi).toBe(api_mpReq);
    expect(uniondocpay.noCardReqApi).toBe(api_noCardReq);
    expect(uniondocpay.netpayRouteServerApi).toBe(api_netpayRouteServer);

    expect(uniondocpay).toMatchObject({
      debug: false,
      md5: 'fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR',
      mid: '898340149000005',
      msgId: '3194',
      msgSrc: 'WWW.TEST.COM',
      notifyUrl: 'http://api.midoull.com:9001/api/chinaums/webhook/mp',
      tid: '88880001',
    });
  });
});
