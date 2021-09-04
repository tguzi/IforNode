export default {
  unknown: { code: 0, message: '未知错误！' },
  noContent: { code: 204, message: '内容为空' },
  success: { code: 200, message: '操作成功！' },
  error: { code: 400, message: '操作失败！' },
  authorization: { code: 401, message: '身份认证失败！' },
  preconditionFailed: { code: 412, message: '请求参数校验失败' },
}