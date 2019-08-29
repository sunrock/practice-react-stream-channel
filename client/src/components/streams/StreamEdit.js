import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from '../StreamForm';

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    const streamId = this.props.match.params.id;
    this.props.editStream(streamId, formValues);
  };

  render() {
    console.log(this.props.stream);
    const streamData = this.props.stream;
    if (!this.props.stream) {
      return <h3>Loading...</h3>;
    }

    // initialValues={this.props.stream}

    // lodash
    // initialValues={_.pick(streamData, 'title', 'description')}

    return (
      <div>
        <h3>Edit a Channel</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={{
            title: streamData.title,
            description: streamData.description
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  console.log(ownProps);
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
