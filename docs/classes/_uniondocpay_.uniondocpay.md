

# Hierarchy

**Uniondocpay**

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new Uniondocpay**(mid: *`string`*, tid: *`string`*, msgSrc: *`string`*, msgId: *`string`*, md5: *`string`*, notifyUrl: *`string`*, debug?: *`boolean`*): [Uniondocpay](_uniondocpay_.uniondocpay.md)

*Defined in Uniondocpay.ts:9*

构造函数

```ts
import { Uniondocpay } from '@ycnt/uniondocpay';

const mid = '898340149000005';
const tid = '88880001';
const msgSrc = 'WWW.TEST.COM';
const msgId = '3194';
const md5 = 'fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR';
const notifyUrl = 'http://notifyUrl';

const uniondocpay = new Uniondocpay(mid, tid, msgSrc, msgId, md5, notifyUrl, true);
```

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| mid | `string` | - |
| tid | `string` | - |
| msgSrc | `string` | - |
| msgId | `string` | - |
| md5 | `string` | - |
| notifyUrl | `string` | - |
| `Default value` debug | `boolean` | false |

**Returns:** [Uniondocpay](_uniondocpay_.uniondocpay.md)

___

# Properties

<a id="debug"></a>

## `<Private>` debug

**● debug**: *`boolean`*

*Defined in Uniondocpay.ts:34*

___
<a id="md5"></a>

## `<Private>` md5

**● md5**: *`string`*

*Defined in Uniondocpay.ts:32*

___
<a id="mid"></a>

## `<Private>` mid

**● mid**: *`string`*

*Defined in Uniondocpay.ts:28*

___
<a id="msgid"></a>

## `<Private>` msgId

**● msgId**: *`string`*

*Defined in Uniondocpay.ts:31*

___
<a id="msgsrc"></a>

## `<Private>` msgSrc

**● msgSrc**: *`string`*

*Defined in Uniondocpay.ts:30*

___
<a id="notifyurl"></a>

## `<Private>` notifyUrl

**● notifyUrl**: *`string`*

*Defined in Uniondocpay.ts:33*

___
<a id="tid"></a>

## `<Private>` tid

**● tid**: *`string`*

*Defined in Uniondocpay.ts:29*

___

# Accessors

<a id="mpreqapi"></a>

##  mpReqApi

getmpReqApi():  "https://qr.chinaums.com/netpay-portal/webpay/pay.do" &#124; "https://qr-test2.chinaums.com/netpay-portal/webpay/pay.do"

*Defined in Uniondocpay.ts:37*

**Returns:**  "https://qr.chinaums.com/netpay-portal/webpay/pay.do" &#124; "https://qr-test2.chinaums.com/netpay-portal/webpay/pay.do"

___
<a id="netpayrouteserverapi"></a>

##  netpayRouteServerApi

getnetpayRouteServerApi():  "https://qr.chinaums.com/netpay-route-server/api/" &#124; "https://qr-test2.chinaums.com/netpay-route-server/api/"

*Defined in Uniondocpay.ts:45*

**Returns:**  "https://qr.chinaums.com/netpay-route-server/api/" &#124; "https://qr-test2.chinaums.com/netpay-route-server/api/"

___
<a id="nocardreqapi"></a>

##  noCardReqApi

getnoCardReqApi():  "https://qr.chinaums.com/netpay-portal/webpay/pay.do" &#124; "https://qr-test2.chinaums.com/netpay-portal/webpay/pay.do"

*Defined in Uniondocpay.ts:41*

**Returns:**  "https://qr.chinaums.com/netpay-portal/webpay/pay.do" &#124; "https://qr-test2.chinaums.com/netpay-portal/webpay/pay.do"

___

# Methods

<a id="appreq"></a>

##  appReq

▸ **appReq**(params: *[IAppReqParams](../interfaces/_interfaces_iappreqparams_.iappreqparams.md)*): `Promise`<`any`>

*Defined in Uniondocpay.ts:220*

APP支付

1.  使用此接口获得参数
2.  使用得到参数配合前端SDK完成支付
3.  结果发送至notifyUrl

```ts
import { Uniondocpay } from '@ycnt/uniondocpay';

const uniondocpay = new Uniondocpay(...);

// 支付宝支付
(async () => {
  const appAliRes = await uniondocpay.appReq({
    merOrderId: Math.floor(Math.random() * 999999).toString(),
    totalAmount: 1,
    msgType: 'trade.precreate',
    srcReserve: 'test001',
  });
  console.log(appAliRes)
});

// 银联全渠道
(async () => {
  const appUacRes = await uniondocpay.appReq({
    merOrderId: Math.floor(Math.random() * 999999).toString(),
    totalAmount: 1,
    msgType: 'uac.appOrder',
    srcReserve: 'test001',
  });
  console.log(appUacRes)
});
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| params | [IAppReqParams](../interfaces/_interfaces_iappreqparams_.iappreqparams.md) |

**Returns:** `Promise`<`any`>

___
<a id="mpreq"></a>

##  mpReq

▸ **mpReq**(params: *[IMpReqParams](../interfaces/_interfaces_impreqparams_.impreqparams.md)*): `string`

*Defined in Uniondocpay.ts:70*

公众号支付

1.  公众号完成支付
2.  结果发送至notifyUrl
3.  前端点击跳转至 returnUrl（成功）

```ts
import { Uniondocpay } from '@ycnt/uniondocpay';

const uniondocpay = new Uniondocpay(...);

const url = uniondocpay.mpReq({
  merOrderId: 'xxx',
  totalAmount: 1,
  returnUrl: 'https://frontUrl',
  srcReserve: 'xxx',
});
console.log(url);
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| params | [IMpReqParams](../interfaces/_interfaces_impreqparams_.impreqparams.md) |

**Returns:** `string`

___
<a id="nocardreq"></a>

##  noCardReq

▸ **noCardReq**(params: *[INoCardReqParams](../interfaces/_interfaces_inocardreqparams_.inocardreqparams.md)*): `string`

*Defined in Uniondocpay.ts:115*

无卡支付

1.  公众号完成支付
2.  结果发送至notifyUrl
3.  前端点击跳转至 returnUrl（成功）

```ts
import { Uniondocpay } from '@ycnt/uniondocpay';

const uniondocpay = new Uniondocpay(...);

const url = uniondocpay.noCardReq({
  merOrderId: 'xxx',
  totalAmount: 1,
  returnUrl: 'https://frontUrl',
  srcReserve: 'xxx',
});
console.log(url);
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| params | [INoCardReqParams](../interfaces/_interfaces_inocardreqparams_.inocardreqparams.md) |

**Returns:** `string`

___
<a id="qrreq"></a>

##  qrReq

▸ **qrReq**(params: *[IQrReqParams](../interfaces/_interfaces_iqrreqparams_.iqrreqparams.md)*): `Promise`<`string`>

*Defined in Uniondocpay.ts:164*

二维码支付

1.  使用此接口获得URL
2.  将得到的URL做成二维码
3.  使用微信或支付宝扫码完成支付
4.  结果发送至notifyUrl
5.  前端点击跳转至 returnUrl（成功）

```ts
import { Uniondocpay } from '@ycnt/uniondocpay';

const uniondocpay = new Uniondocpay(...);
(async () => {
  const url = await uniondocpay.qrReq({
    billNo: 'xxx',
    totalAmount: 1,
    returnUrl: 'https://frontUrl',
    srcReserve: 'xxx',
  });
  console.log(url);
});
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| params | [IQrReqParams](../interfaces/_interfaces_iqrreqparams_.iqrreqparams.md) |

**Returns:** `Promise`<`string`>

___
<a id="query"></a>

##  query

▸ **query**(params: *[IQueryParams](../interfaces/_interfaces_iqueryparams_.iqueryparams.md)*): `Promise`<`any`>

*Defined in Uniondocpay.ts:261*

订单查寻

```ts
import { Uniondocpay } from '@ycnt/uniondocpay';

const uniondocpay = new Uniondocpay(...);

(async () => {
  try {
    const res = await uniondocpay.query({
      instMid: 'YUEDANDEFAULT',
      merOrderId: 'xxx',
    });
    console.log(res);
  } catch(e) {
    console.error(e);
  }
})();
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| params | [IQueryParams](../interfaces/_interfaces_iqueryparams_.iqueryparams.md) |

**Returns:** `Promise`<`any`>

___
<a id="refund"></a>

##  refund

▸ **refund**(params: *[IRefundParams](../interfaces/_interfaces_irefundparams_.irefundparams.md)*): `Promise`<`any`>

*Defined in Uniondocpay.ts:302*

退款

```ts
import { Uniondocpay } from '@ycnt/uniondocpay';

const uniondocpay = new Uniondocpay(...);

(async () => {
  try {
    const res = await uniondocpay.refund({
      instMid: 'YUEDANDEFAULT',
      merOrderId: 'xxx',
      refundAmount: 0,
    });
    console.log(res);
  } catch(e) {
    console.error(e);
  }
})();
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| params | [IRefundParams](../interfaces/_interfaces_irefundparams_.irefundparams.md) |

**Returns:** `Promise`<`any`>

___
<a id="request"></a>

## `<Private>` request

▸ **request**(api: *`string`*, params: *`any`*): `Promise`<`any`>

*Defined in Uniondocpay.ts:364*

**Parameters:**

| Param | Type |
| ------ | ------ |
| api | `string` |
| params | `any` |

**Returns:** `Promise`<`any`>

___
<a id="sign"></a>

## `<Private>` sign

▸ **sign**(params: *`any`*): `void`

*Defined in Uniondocpay.ts:358*

**Parameters:**

| Param | Type |
| ------ | ------ |
| params | `any` |

**Returns:** `void`

___
<a id="verify"></a>

##  verify

▸ **verify**(params: *`any`*): `boolean`

*Defined in Uniondocpay.ts:342*

后台通知验签，本例使用[koa](https://koajs.com)和[koa-better-body](https://github.com/tunnckoCore/koa-better-body)

```ts
import { Uniondocpay } from '@ycnt/uniondocpay';

const uniondocpay = new Uniondocpay(...);

public webhook = async (ctx: IContext) => {
  try {
    if (!uniondocpay.verify(ctx.request.fields)) throw new Error('签名错误');
    // 这里处理支付成功
    ctx.status = 200;
    ctx.body = 'SUCCESS';
  } catch (e) {
    console.error(e);
    ctx.body = 'FAIL';
  }
};
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| params | `any` |

**Returns:** `boolean`

___

