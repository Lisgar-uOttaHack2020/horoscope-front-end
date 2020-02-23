
import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import './css/ViewContainer.css';

class ViewContainer extends React.Component {

  state = {
    maxBodyHeight: 0
  }

  componentDidMount() {

    this.setState({
      bodyMaxHeight:
        'calc(100vh - 141px - 8px - ' /* 141px = height of footer + height of padding, 8px for buffer */
          + document.querySelector('#header-segment').clientHeight + 'px - '
          + document.querySelector('#footer-segment').clientHeight + 'px)'
    });
  }

  render() {

    // Separate header, body, and footer.
    let header = null, body = null, footer = null;
    this.props.children.forEach((child, i) => {
      if (i === 0) header = child;
      if (i === 1) body   = child;
      if (i === 2) footer = child;
    });

    let maxWidth = this.props.maxWidth ? this.props.maxWidth : '600px';

    return (
      <div className='view-container' style={{maxWidth: maxWidth}}>
        <Segment.Group>
          <Segment id='header-segment'>
            <Header as='h2'>{header}</Header>
          </Segment>
          <Segment style={{maxHeight: this.state.bodyMaxHeight, overflowY: 'auto'}}>{body}</Segment>
          <Segment id='footer-segment'>{footer}</Segment>
        </Segment.Group>
      </div>
    );
  }
}

export default ViewContainer;
