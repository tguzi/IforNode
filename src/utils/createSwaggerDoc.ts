import swaggerJSDoc from 'swagger-jsdoc'
import config from 'config/index'

const { OPEN_API_DOC } = config
// swagger definition

const createDOC = (ctx: any) => {
  const options = {
    swaggerDefinition: {
      info: {
        title: 'T谷子的接口文档',
        version: '1.0.0',
        description: 'T谷子博客站'
      },
      basePath: '/api'
    },
    apis: ['./src/controller/*.ts']
  }
  return OPEN_API_DOC ? swaggerJSDoc(options) : null
}

export default createDOC

