import * as React from 'react'
import { ComponentClass } from 'react'
import { connect } from 'react-redux'
import GenerateRequireSignInWrapperConfig from './types'
import ReduxState from './types'
import RequireSignInWrapper from './types'

const generateRequireSignInWrapper = (
  { redirectPathIfNotSignedIn }: GenerateRequireSignInWrapperConfig
): RequireSignInWrapper => {
  const requireSignInWrapper = (PageComponent: ComponentClass): ComponentClass => {
    interface WrapperProps {
      readonly hasVerificationBeenAttempted: boolean
      readonly isSignedIn: boolean
      readonly history: {
        readonly replace: (path: string) => void
      }
    }

    class GatedPage extends React.Component<WrapperProps> {
      public UNSAFE_componentWillReceiveProps(nextProps: WrapperProps): void {
        const {
          history,
          hasVerificationBeenAttempted,
          isSignedIn,
        } = nextProps
        console.log("in UNSAFE_componentWillReceiveProps", hasVerificationBeenAttempted, isSignedIn)
        if (hasVerificationBeenAttempted && !isSignedIn) {
          history.replace(redirectPathIfNotSignedIn)
        }
      }

      public render (): JSX.Element {
        const {
          hasVerificationBeenAttempted,
          isSignedIn,
        } = this.props
        console.log("in render",hasVerificationBeenAttempted, isSignedIn)
        return (hasVerificationBeenAttempted && isSignedIn) ?
        // <PageComponent {...this.props} />
        React.createElement(PageComponent.type, Object.assign({}, this.props))
          :
          history.pushState(null, '', redirectPathIfNotSignedIn);    
      }
    }

    const mapStateToProps = (state: ReduxState) => ({
      hasVerificationBeenAttempted: state.reduxTokenAuth.currentUser.hasVerificationBeenAttempted,
      isSignedIn: state.reduxTokenAuth.currentUser.isSignedIn
    })

    return connect(
      mapStateToProps,
    )(GatedPage)
  }

  return requireSignInWrapper
}

export default generateRequireSignInWrapper
