
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
        'calc(100vh - 218px - ' /* 218px = height of footer + height of padding */
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

    return (
      <div className='view-container' style={{width: this.props.width ? this.props.width : '50vw'}}>
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
