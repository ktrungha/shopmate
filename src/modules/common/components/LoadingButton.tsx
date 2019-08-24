import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import React from 'react';
import IconLoadingB from '../../../svg/ic_loading_black.svg';
import IconLoadingW from '../../../svg/ic_loading_white.svg';
interface Props extends ButtonProps {
  loading?: boolean;
}
interface State {}
class LoadingButton extends React.PureComponent<Props, State> {
  render() {
    const { children, loading, ...rest } = this.props;
    const { variant, size } = rest;
    return (
      <Button
        {...rest}
        onClick={!loading ? this.props.onClick : undefined}
        disableRipple={loading ? true : this.props.disableRipple}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ opacity: loading ? 0 : 1 }}>{children}</div>
          {loading && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                overflow: 'hidden',
                left: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <img
                src={variant === 'contained' ? IconLoadingW : IconLoadingB}
                style={{ height: size === 'large' ? '40px' : size === 'medium' ? '35px' : '30px' }}
                alt=""
              />
            </div>
          )}
        </div>
      </Button>
    );
  }
}
export default LoadingButton;
