import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllStreams } from '../actions';
import { Link } from 'react-router-dom';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchAllStreams();
  }

  renderButtons() {
    // if (stream.userId === this.props.currUserId)
    return (
      <div className="right floated content">
        <button className="ui button primary">Edit</button>
        <button className="ui button negative">Delete</button>
      </div>
    );
  }

  renderCreate() {
    // if (this.props.isSignIn) {}
    return (
      <div style={{ textAlign: 'right' }}>
        <Link to="/streams/new" className="ui button positive">
          Create Stream
        </Link>
      </div>
    );
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderButtons()}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Streams</h3>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // return {streams: state.streams}
  return {
    // To make it as an array
    streams: Object.values(state.streams)
    // currUserId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchAllStreams }
)(StreamList);
