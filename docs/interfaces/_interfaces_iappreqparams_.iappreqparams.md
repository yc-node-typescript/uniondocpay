

# Hierarchy

**IAppReqParams**

# Properties

<a id="merorderid"></a>

##  merOrderId

**● merOrderId**: *`string`*

*Defined in interfaces/IAppReqParams.ts:5*

商户订单号 6-32 商户自行生成

___
<a id="msgtype"></a>

##  msgType

**● msgType**: * "wx.unifiedOrder" &#124; "trade.precreate" &#124; "qmf.order" &#124; "uac.appOrder"
*

*Defined in interfaces/IAppReqParams.ts:18*

微信: wx.unifiedOrder 支付宝: trade.precreate 全民付: qmf.order 银联全渠道: uac.appOrder

___
<a id="srcreserve"></a>

## `<Optional>` srcReserve

**● srcReserve**: * `undefined` &#124; `string`
*

*Defined in interfaces/IAppReqParams.ts:23*

请求系统预留字段

___
<a id="totalamount"></a>

##  totalAmount

**● totalAmount**: *`number`*

*Defined in interfaces/IAppReqParams.ts:10*

支付总金额，单位分

___

