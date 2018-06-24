[![Build Status](https://travis-ci.org/yc-node-typescript/uniondocpay.svg?branch=master)](https://travis-ci.org/yc-node-typescript/uniondocpay.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/yc-node-typescript/uniondocpay/badge.svg?branch=master)](https://coveralls.io/github/yc-node-typescript/uniondocpay?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## 介绍
中国银联支付非开放平台 Nodejs SDK

> 申请测试地址：[https://open.uniondocpay.com/ajweb/index](https://open.uniondocpay.com/ajweb/index)

目前支持
- 微信公众号支付
- 微信公众号无卡支付
- 微信/支付宝 扫码支付
- APP支付（支付宝）
- APP支付（银联全渠道）
- 订单查寻
- 退款

注：APP支付暂时没有测试。


## 安装

```bash
npm i -S @ycnt/uniondocpay
```
或
```bash
yarn add @ycnt/uniondocpay
```

## 使用例子

#### 构造函数

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

#### 微信公众号支付

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

#### 微信公众号无卡支付

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

#### 微信/支付宝 扫码支付

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

#### APP支付

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

#### 订单查寻
- YUEDANDEFAULT: 微信公众号支付，微信公众号无卡支付
- QRPAYDEFAULT: 微信/支付宝 扫码支付
- APPDEFAULT: APP支付

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

#### 退款

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

#### 验签

后台通知验签，本例使用 [koa](https://koajs.com) 和 [koa-better-body](https://github.com/tunnckoCore/koa-better-body)

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

## Summary

[/docs/SUMMARY.md](https://github.com/yc-node-typescript/uniondocpay/blob/master/docs/SUMMARY.md)
