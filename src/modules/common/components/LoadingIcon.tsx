import * as React from 'react';
import styles from './LoadingIcon.module.scss';

class LoadingIcon extends React.Component<{ style?: React.CSSProperties }> {
  public render(): JSX.Element {
    const { style } = this.props;
    return (
      <div style={{ textAlign: 'center', ...style }}>
        <div className={styles['lds-roller']}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default LoadingIcon;
