/*
 * Function: 'withFunction'
 *
 * A higher-order function used for executing the specified function (passed as
 * an argument) with other functions.
 */
export const withFunction = <T extends (...args: any[]) => any>(
  finalFunction: () => void,
) => {
  return (mainFunction: T): ((...args: Parameters<T>) => Promise<void>) => {
    return async (...args: Parameters<T>) => {
      await mainFunction(...args)
      await finalFunction()
    }
  }
}
