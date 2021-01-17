import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { BACKGROUND } from './colors';
import { AppState } from './redux/reducers';
import styles from './scss/webviewRouteTransition.module.scss';

interface WebViewAppProps extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
}

const WebViewApp: React.FunctionComponent<WebViewAppProps> = props => {
  const { router } = props;

  const { action } = router;
  const transitionClassNamesRef = React.useRef<CSSTransitionClassNames>({});

  const lastRouteYOffsetRef = React.useRef(0);

  const actionRef = React.useRef(action);
  actionRef.current = action;

  if (actionRef.current === 'PUSH') {
    transitionClassNamesRef.current.enter = styles.enter;
    transitionClassNamesRef.current.enterActive = styles.enterActive;
    transitionClassNamesRef.current.exit = undefined;
    transitionClassNamesRef.current.exitActive = undefined;
  } else {
    transitionClassNamesRef.current.enter = undefined;
    transitionClassNamesRef.current.enterActive = undefined;
    transitionClassNamesRef.current.exit = styles.exit;
    transitionClassNamesRef.current.exitActive = styles.exitActive;
  }

  return (
    <>
      <TransitionGroup style={{ background: BACKGROUND }}>
        <CSSTransition
          key={router.location.pathname}
          classNames={transitionClassNamesRef.current}
          timeout={300}
          onExited={() => {
            if (actionRef.current === 'PUSH') {
              window.scrollTo({ top: 0 });
            }
          }}
          unmountOnExit
        >
          {status => {
            const style: React.CSSProperties =
              status === 'entering' || status === 'exiting' ? {} : { position: 'absolute' };
            if (status === 'exiting' || status === 'exited') {
              if (status === 'exiting') {
                lastRouteYOffsetRef.current = window.pageYOffset;
              }
              style.top = -lastRouteYOffsetRef.current;
            }
            return (
              <div style={{ ...style, width: '100%' }}>
                <Switch location={router.location}>
                  <Route exact path="/" render={() => <div />} />
                </Switch>
              </div>
            );
          }}
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

function mapStateToProps(state: AppState) {
  return { common: state.common, router: state.router };
}

export default connect(mapStateToProps)(WebViewApp);
