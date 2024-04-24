type OwnMatcher<Params extends unknown[]> = (
  this: jest.MatcherContext,
  received: unknown,
  ...actual: Params
) => jest.CustomMatcherResult | Promise<jest.CustomMatcherResult>

declare global {
  namespace jest {
    interface Expect {
      toHaveDoneItem(): any
    }
    interface InverseAsymmetricMatchers {
      toHaveDoneItem(): any
    }
    interface Matchers<R, T> {
      toBeShorterThan(len: number): T
      toHaveValue(expected: any): R
      toBeDisabled(): R
      toMatchDiffSnapshot(expected: any): R
    }
    interface ExpectExtendMap {
      toBeShorterThan: OwnMatcher<[len: number]>
    }
  }
}

export {}
