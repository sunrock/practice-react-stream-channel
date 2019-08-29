import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllStreams } from '../../actions';
import { Link } from 'react-router-dom';

import { deleteStream } from '../../actions';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchAllStreams();
  }

  renderButtons(id) {
    // if (stream.userId === this.props.currUserId)
    return (
      <div className="right floated content">
        <Link
          className="ui button primary clickable"
          to={`/streams/edit/${id}`}
        >
          Edit
        </Link>
        <Link
          className="ui button negative clickable"
          to={`/streams/delete/${id}`}
        >
          Delete
        </Link>
      </div>
    );
  }

  // <button
  //   className="ui button negative"
  //   onClick={() => this.onDeleteStream(id)}
  // >
  //   Delete
  // </button>

  onDeleteStream(id) {
    this.props.deleteStream(id);
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
          {this.renderButtons(stream.id)}
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
  { fetchAllStreams, deleteStream }
)(StreamList);
