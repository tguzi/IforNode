class Public {
  public catchError (msg?: string) {
    return (target: any, name: string, descriptor: PropertyDescriptor) => {
      const originFn = descriptor.value
      descriptor.value = () => {
        try {
          originFn()
        } catch (e) {
          console.error('[CATCH ERROR]', msg || e)
        }
      }
    }
  }
}

export const publicDecorator = new Public()

export const catchError = publicDecorator.catchError

export default Public