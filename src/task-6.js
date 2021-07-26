export default class EnhancedPromise extends Promise {
  static some(promises, count) {
    const rejects = promises.length - count;
    const errors = [];
    const result = [];

    if (rejects < 0) {
      return EnhancedPromise.reject(new Error());
    } else if (rejects === 0) {
      return EnhancedPromise.resolve(result);
    }

    const enhancedPromise = new EnhancedPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(
          (data) => {
            result.push(data);
            if (result.length >= count) {
              resolve(result);
            }
          },
          (error) => {
            errors.push(error);
            if (errors.length >= rejects) {
              reject(new Error());
            }
          }
        );
      });
    });

    return enhancedPromise;
  }
}
