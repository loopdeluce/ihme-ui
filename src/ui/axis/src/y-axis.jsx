import { PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import { oneOfProp, propsChanged } from '../../../utils';

import Axis, { AXIS_SCALE_PROP_TYPES } from './axis';

export default class YAxis extends Axis {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      scale: props.scale || props.scales.y,
    };
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);

    this.setState({
      scale: nextProps.scale || nextProps.scales.y,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return propsChanged(this.props, nextProps, undefined, ['scale', 'scales']) ||
           propsChanged(this.state, nextState);
  }
}

const Y_AXIS_SCALE_PROP_TYPES = {
  ...AXIS_SCALE_PROP_TYPES,
  scales: PropTypes.shape({
    x: PropTypes.func,
    y: PropTypes.func.isRequired,
  }).isRequired,
};

YAxis.propTypes = {
  ...Axis.propTypes,

  /* OVERRIDE - orientation of ticks relative to axis line */
  orientation: PropTypes.oneOf(['left', 'right']),

  /* scales are provided by axis-chart, only y scale is used by YAxis */
  scale: oneOfProp(Y_AXIS_SCALE_PROP_TYPES),
  scales: oneOfProp(Y_AXIS_SCALE_PROP_TYPES),
};

YAxis.defaultProps = {
  orientation: 'left',
  scales: { y: scaleLinear() },
};
