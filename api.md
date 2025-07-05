# VIP影视解析接口文档

## 接口概述
VIP影视解析接口提供付费影视内容的解析服务，支持将各大视频平台的VIP视频链接转换为可播放资源。

当前路线: 普通路线 VIP影视解析服务

## 接口基本信息
- **接口地址**: https://api.svip10.top/
- **请求方式**: GET
- **返回格式**: HTML
- **频率限制**:
  - 默认QPS: 20次/分钟
  - Token QPS: 10000次/分钟

## 请求参数说明
| 参数名 | 是否必填 | 类型 | 说明 |
|--------|----------|------|------|
| id     | 是       | string | 路线ID |
| url    | 是       | string | 解析目标网址 |
| token  | 否       | string | 无 |

## 请求示例1
```
https://api.svip10.top/?id=2&url=https://m.v.qq.com/x/m/play?cid=mzc00200xyp87bp&vid=f4101ggd7xu
```

## 返回结果示例1
```html
<!-- 视频播放页面 -->
视频播放
```
## 请求示例2
```
https://api.svip10.top/?id=2&url=https%3A%2F%2Fm.v.qq.com%2Fx%2Fm%2Fplay%3Fcid%3Dmzc00200xyp87bp%26amp%3Bamp%3Bvid%3Df4101ggd7xu&token=真实Token
```

## 返回结果示例2
```html
<!-- 视频播放页面 -->
视频播放
```
